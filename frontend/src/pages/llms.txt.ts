/**
 * /llms.txt (https://llmstxt.org): who I am, every service and template with
 * its starting price and link, and how to get in touch, in plain text for AI
 * assistants and their crawlers. Built from the same data as the site, so a
 * price changed in services.ts / templates.ts / servicePages.ts changes here
 * on the next build, and the template promo is written with its end date.
 */
import type { APIRoute } from 'astro';
import { SERVICES } from '../data/services';
import { servicePages } from '../data/servicePages';
import { SITE } from '../data/site';
import { TEMPLATE_PROMO, formatBRL, fullName, promoOn, promoPrice, templates } from '../data/templates';
import { meta } from '../i18n/pt/meta';

const abs = (path: string) => new URL(path, SITE.url).href;
const endDate = TEMPLATE_PROMO.until.split('-').reverse().join('/');

function servicesBlock(): string[] {
	return SERVICES.map((s) => {
		const page = servicePages.find((p) => p.serviceId === s.id);
		const link = page ? abs(`/servicos/${page.slug}`) : abs(`/#servico-${s.id}`);
		const price = s.priceFrom > 0 ? `a partir de ${formatBRL(s.priceFrom)}${page ? `, ${page.priceNote.pt}` : ''}` : 'valor sob consulta';
		return `- [${s.name.pt}](${link}): ${price}. ${s.forWhom.pt} Inclui: ${s.outcome.pt} Prazo: ${s.timeline.pt}.`;
	});
}

function templatesBlock(): string[] {
	const on = promoOn();
	return templates.map((tpl) => {
		const fits = tpl.fits.pt.join(', ');
		const price =
			tpl.priceFrom === undefined
				? 'valor sob consulta'
				: on
					? `a partir de ${formatBRL(tpl.priceFrom)} (${formatBRL(promoPrice(tpl.priceFrom))} em promoção até ${endDate})`
					: `a partir de ${formatBRL(tpl.priceFrom)}`;
		return `- [${fullName(tpl)}](${abs(`/templates/${tpl.slug}`)}): ${tpl.desc.pt} Serve pra ${fits}. ${price}.`;
	});
}

function faqBlock(): string[] {
	return servicePages.flatMap((p) => [`### ${p.name.pt}`, '', ...p.faq.items.flatMap((i) => [`- ${i.q.pt} ${i.a.pt}`]), '']);
}

export const GET: APIRoute = () => {
	const wa = SITE.whatsapp.number.replace(/\D/g, '');
	const lines = [
		`# ${SITE.name}`,
		'',
		`> ${meta.home.description} Programo desde ${SITE.since}.`,
		'',
		`Site: ${SITE.url}. Respondo em ${SITE.responseTime.pt}.`,
		'',
		'## Serviços',
		'',
		...servicesBlock(),
		'',
		`## Templates (entrega em ${SITE.promises.templateDays.pt} dias úteis)`,
		'',
		...templatesBlock(),
		'',
		'## Perguntas frequentes',
		'',
		...faqBlock(),
		'## Contato',
		'',
		...(wa ? [`- WhatsApp: https://wa.me/${wa}`] : []),
		`- E-mail: ${SITE.email}`,
		`- Formulário: ${abs('/#contato')}`,
		`- LinkedIn: ${SITE.social.linkedin}`,
		`- GitHub: ${SITE.social.github}`,
		`- Instagram: ${SITE.social.instagram}`,
		'',
		'## Páginas',
		'',
		`- [Trabalhos](${abs('/work')})`,
		`- [Sobre](${abs('/about')})`,
		`- [Templates](${abs('/templates')})`,
		`- [English version](${abs('/en')})`,
		'',
	];
	return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
