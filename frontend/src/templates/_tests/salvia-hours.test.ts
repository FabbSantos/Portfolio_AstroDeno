/**
 * Sálvia opening hours: labels, "aberto agora" and the LocalBusiness JSON-LD.
 * Lives outside templates/salvia so the client scaffold never vendors it.
 * America/Sao_Paulo is UTC-3 all year (no DST since 2019).
 */
import { describe, expect, it } from 'vitest';
import { formatDays, formatTime, hoursSummary, hoursTable, openStatus, OPEN_STRINGS, type Slot } from '../salvia/hours';
import { defineSalvia } from '../salvia/schema';

const HOURS: Slot[] = [
	{ days: ['mon', 'tue', 'wed', 'thu', 'fri'], opens: '08:00', closes: '19:00' },
	{ days: ['sat'], opens: '08:00', closes: '12:00' },
];
const TZ = 'America/Sao_Paulo';
const status = (iso: string) => openStatus(HOURS, TZ, 'pt-BR', OPEN_STRINGS['pt-BR'], new Date(iso));

describe('labels', () => {
	it('collapses consecutive days into a range', () => {
		expect(formatDays(['mon', 'tue', 'wed', 'thu', 'fri'], 'pt-BR')).toBe('Seg a Sex');
		expect(formatDays(['fri', 'mon', 'wed'], 'pt-BR')).toBe('Seg, Qua e Sex');
		expect(formatDays(['sat', 'sun'], 'pt-BR')).toBe('Sáb e Dom');
		expect(formatDays(['mon', 'tue', 'wed'], 'en')).toBe('Mon to Wed');
	});
	it('formats times the Brazilian way', () => {
		expect(formatTime('08:00', 'pt-BR')).toBe('8h');
		expect(formatTime('08:30', 'pt-BR')).toBe('8h30');
		expect(hoursSummary(HOURS, 'pt-BR')).toBe('Seg a Sex, 8h às 19h · Sáb, 8h às 12h');
	});
	it('lists all seven days, closed ones included', () => {
		const rows = hoursTable(HOURS, 'pt-BR');
		expect(rows).toHaveLength(7);
		expect(rows[6]).toMatchObject({ day: 'sun', label: 'Domingo', value: 'Fechado', closed: true });
	});
});

describe('openStatus (clinic time zone)', () => {
	it('is open on a weekday afternoon', () => {
		expect(status('2026-09-14T13:00:00-03:00')).toEqual({ open: true, text: 'Aberto agora · fecha às 19h' });
	});
	it('opens later today before the first slot', () => {
		expect(status('2026-09-14T07:15:00-03:00')?.text).toBe('Fechado agora · abre às 8h');
	});
	it('opens tomorrow after closing time, even when the visitor clock is UTC', () => {
		// 22:30 UTC = 19:30 in São Paulo
		expect(status('2026-09-14T22:30:00Z')?.text).toBe('Fechado · abre amanhã às 8h');
	});
	it('skips a closed Sunday', () => {
		expect(status('2026-09-19T13:00:00-03:00')?.text).toBe('Fechado · abre segunda às 8h');
	});
	it('returns null when the hours never open', () => {
		expect(openStatus([], TZ, 'pt-BR', OPEN_STRINGS['pt-BR'])).toBeNull();
	});
});

describe('defineSalvia', () => {
	const site = defineSalvia({
		brand: { name: 'Clínica Teste' },
		theme: { accent: '#3b7457', bg: '#f5f6f1', ink: '#18231c' },
		seo: { title: 'Clínica Teste', description: 'Teste', canonical: 'https://clinica.example' },
		contact: { phone: '(21) 3000-0000' },
		hero: { tagline: 'Clínica', title: 'Título', sub: 'Sub' },
		services: { items: [{ name: 'Clínica geral', desc: 'Consulta' }] },
		location: { address: { street: 'Rua A, 1', city: 'Rio de Janeiro', state: 'RJ' }, hours: HOURS.map((h) => ({ ...h, days: [...h.days] })) },
		footer: { line: '© 2026' },
	});

	it('fills neutral section defaults so the client config can be mostly data', () => {
		expect(site.booking.periods).toEqual(['Manhã', 'Tarde']);
		expect(site.services.title).toBe('Serviços');
		expect(site.services.items[0]?.photo).toBeNull();
		expect(site.team).toBeUndefined();
	});
	it('describes the business as a schema.org LocalBusiness by default', () => {
		expect(site.seo.jsonLd).toMatchObject({
			'@type': 'LocalBusiness',
			name: 'Clínica Teste',
			telephone: '(21) 3000-0000',
			address: { addressRegion: 'RJ', addressCountry: 'BR' },
			openingHoursSpecification: [
				{ dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '19:00' },
				{ dayOfWeek: ['Saturday'], opens: '08:00', closes: '12:00' },
			],
		});
	});
	it('uses the configured schema.org subtype', () => {
		const salon = defineSalvia({
			...site,
			businessType: 'BeautySalon',
			seo: { title: 'Salão', description: 'Teste', canonical: 'https://salao.example' },
			location: { ...site.location, hours: site.location.hours.map((h) => ({ ...h, days: [...h.days] })) },
		});
		expect(salon.seo.jsonLd).toMatchObject({ '@type': 'BeautySalon' });
	});
	it('rejects a business type that is not a schema.org name', () => {
		expect(() => defineSalvia({ ...site, businessType: 'salão de beleza' })).toThrow();
	});
});
