/**
 * Templates — home band, /templates gallery, /templates/<slug> sales page
 * and the demo-only widgets (toast on fake forms).
 *
 * Placeholders: {N} = count as a capitalised word ("Quatro"), {n} = lowercase
 * word, {days} = SITE.promises.templateDays, {months} = adjustments months,
 * {min}/{max} = formatted prices, {name} = "Mirante Lançamento".
 */
export const templates = {
	/** Number words, index = number. Used so counts read as prose ("quatro templates"). */
	numberWords: ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez'],

	band: {
		eyebrow: 'Templates · sites prontos em dias',
		head: 'Precisa de algo',
		headAccent: 'no ar essa semana?',
		lead: '{N} templates que eu mesmo escrevi. Você escolhe, eu troco marca, cores e copy e publico no seu domínio em {days} dias úteis. De {min} a {max}.',
		viewAll: 'Ver todos os templates',
		listLabel: 'Templates disponíveis',
		scrollPrev: 'Template anterior',
		scrollNext: 'Próximo template',
	},

	gallery: {
		eyebrow: 'Templates',
		head: 'Escolha um',
		headAccent: 'ponto de partida.',
		lead: '{N} direções, {n} públicos. Cada um abre um demo completo; o preço inclui personalização, domínio configurado, SEO e {months} meses de ajustes.',
		listLabel: 'Todos os templates',
	},

	card: {
		open: 'Ver template',
		includes: 'Inclui domínio, SSL, SEO e {months} meses de ajustes',
		previewAlt: 'Prévia do template {name}',
		/** Mono label over the preview; fades out when the page starts panning. */
		hoverHint: 'passe o mouse pra rolar',
		/** Small overlay link to the live demo (always visible on touch). */
		demo: 'Ver demo',
		/** Label before templates.solves.<slug>. */
		solves: 'Resolve:',
	},

	/** One short phrase per template: the problem it solves. Key = slug. */
	solves: {
		mirante: 'lançamento imobiliário que precisa de lead',
		stratus: 'SaaS B2B que precisa de trial',
		atelier: 'estúdio/agência que precisa de portfólio',
		brava: 'drop de e-commerce com countdown',
	},

	/** Gallery: compact comparison strip above the grid. */
	compare: {
		eyebrow: 'Qual é o meu?',
		title: 'Compare em dez segundos',
		sub: 'Público, prazo e preço lado a lado.',
		criterion: 'Critério',
		rows: {
			who: 'pra quem',
			days: 'prazo',
			price: 'a partir de',
			sections: 'seções',
		},
	},

	detail: {
		back: 'Todos os templates',
		meta: 'Template {n}/{total} · {cat} · entrega em {days} dias úteis',
		want: 'Quero esse template',
		fullDemo: 'Abrir demo em tela cheia',
		demoTitle: 'Demo do template {name}',
		demoNote: 'Demo ao vivo: role e clique à vontade. Marca, textos e imagens são fictícios; no seu, entram os seus.',
		sectionsTitle: 'O que vem no template',
		related: 'Outros templates',
	},

	included: {
		title: 'O que vem junto',
		items: [
			'Publicado no seu domínio (o domínio é por sua conta; eu configuro DNS e SSL)',
			'SEO técnico, Lighthouse > 95',
			'Personalização de logo, cores, copy e imagens',
			'{months} meses de ajustes',
			'Código entregue no seu repositório após o pagamento',
		],
	},

	steps: {
		title: 'Como funciona',
		items: [
			{
				title: 'Escolha um template',
				desc: 'Abra os demos, veja qual conversa com o seu público e me manda o link.',
			},
			{
				title: 'Eu personalizo',
				desc: 'Marca, cores, copy e imagens. Você manda o material, eu adapto.',
			},
			{
				title: 'Vai pro ar',
				desc: 'No seu domínio, com SSL e SEO configurados. Ajustes inclusos por {months} meses.',
			},
		],
	},

	cta: {
		head: 'Esse é',
		headAccent: 'o seu?',
		sub: 'Manda seu domínio, logo e o que precisa mudar. Em poucos dias úteis o site sobe.',
		button: 'Quero um template',
		whatsappGallery: 'Oi Fabrício! Quero saber mais sobre os templates.',
		whatsappDetail: 'Oi Fabrício! Quero saber mais sobre o template {name}.',
	},

	/** Shown by demo pages when someone submits one of the fake forms. */
	demoFormNote: 'Demo: o formulário real é ligado no seu deploy',
} as const;
