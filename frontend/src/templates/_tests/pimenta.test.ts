/**
 * Pimenta helpers: prices, the WhatsApp reservation message, schema defaults
 * and the Restaurant JSON-LD. Lives outside templates/pimenta so the client
 * scaffold never vendors it.
 */
import { describe, expect, it } from 'vitest';
import type { ImageMetadata } from 'astro';
import { composeReservation, formatDate, formatPrice, peopleLabel } from '../pimenta/menu';
import { definePimenta } from '../pimenta/schema';
import { openStatus, OPEN_STRINGS } from '../core/hours';

const photo = { src: '/x.jpg', width: 1200, height: 1200, format: 'jpg' } as ImageMetadata;

describe('labels', () => {
	it('formats prices without cents unless there are some', () => {
		// Intl puts a no-break space after "R$", which is what the page should show
		const plain = (s: string) => s.replace(/\s/g, ' ');
		expect(plain(formatPrice(38))).toBe('R$ 38');
		expect(plain(formatPrice(38.9))).toBe('R$ 38,90');
	});
	it('formats the reservation date and head count', () => {
		expect(formatDate('2026-09-19')).toBe('19/09');
		expect(formatDate('not a date')).toBe('not a date');
		expect(peopleLabel(1)).toBe('1 pessoa');
		expect(peopleLabel(4)).toBe('4 pessoas');
		expect(peopleLabel(2, 'en')).toBe('2 people');
	});
});

describe('composeReservation', () => {
	const base = { message: 'Olá! Gostaria de reservar uma mesa para {pessoas} no dia {data}, às {horario}.', nameSentence: 'Meu nome é {nome}.' };
	it('fills people, date and time', () => {
		expect(composeReservation({ ...base, people: 4, date: '2026-09-19', time: '20:00' })).toBe('Olá! Gostaria de reservar uma mesa para 4 pessoas no dia 19/09, às 20:00.');
	});
	it('reads an empty date as "a combinar" and adds the name only when given', () => {
		expect(composeReservation({ ...base, people: 1, date: '', time: '12:00', name: '  ' })).toBe('Olá! Gostaria de reservar uma mesa para 1 pessoa no dia a combinar, às 12:00.');
		expect(composeReservation({ ...base, people: 2, date: '', time: '12:00', name: 'Ana' })).toMatch(/Meu nome é Ana\.$/);
	});
});

describe('openStatus with a midnight close', () => {
	const HOURS = [{ days: ['fri'] as const, opens: '18:00', closes: '00:00' }].map((h) => ({ ...h, days: [...h.days] }));
	it('is open late at night when it closes at 00:00', () => {
		// Friday 23:30 in São Paulo
		expect(openStatus(HOURS, 'America/Sao_Paulo', 'pt-BR', OPEN_STRINGS['pt-BR'], new Date('2026-09-18T23:30:00-03:00'))).toEqual({ open: true, text: 'Aberto agora · fecha às 0h' });
	});
});

describe('definePimenta', () => {
	const site = definePimenta({
		brand: { name: 'Bar Teste' },
		theme: { accent: '#f2b705', bg: '#f6f6f3', ink: '#121210' },
		seo: { title: 'Bar Teste', description: 'Teste', canonical: 'https://bar.example' },
		contact: { phone: '(21) 3000-0000' },
		cuisine: ['Brasileira'],
		hero: { tagline: 'Boteco', title: 'Fogo\nbaixo', photo, photoAlt: 'Prato' },
		menu: { categories: [{ name: 'Petiscos', items: [{ name: 'Pastel', price: 12 }] }] },
		location: { address: { street: 'Rua A, 1', city: 'Rio de Janeiro', state: 'RJ' }, hours: [{ days: ['fri', 'sat'], opens: '18:00', closes: '00:00' }] },
		footer: { line: '© 2026' },
	});

	it('fills defaults so the client config can be mostly data', () => {
		expect(site.menu.title).toBe('Cardápio');
		expect(site.menu.categories[0]?.items[0]?.tags).toEqual([]);
		expect(site.reservation.times).toContain('20:00');
		expect(site.reservation.maxPeople).toBe(12);
		expect(site.signature).toBeUndefined();
		expect(site.crew).toBeUndefined();
	});
	it('describes the place as a schema.org Restaurant with menu and reservations', () => {
		expect(site.seo.jsonLd).toMatchObject({
			'@type': 'Restaurant',
			name: 'Bar Teste',
			telephone: '(21) 3000-0000',
			servesCuisine: ['Brasileira'],
			hasMenu: 'https://bar.example#cardapio',
			acceptsReservations: 'True',
			openingHoursSpecification: [{ dayOfWeek: ['Friday', 'Saturday'], opens: '18:00', closes: '00:00' }],
		});
	});
	it('rejects a signature row with fewer than three dishes', () => {
		expect(() =>
			definePimenta({
				...site,
				seo: { title: 'x', description: 'x', canonical: 'https://bar.example' },
				signature: { items: [{ name: 'A', photo, alt: 'a' }] },
			})
		).toThrow(/signature\.items/);
	});
});
