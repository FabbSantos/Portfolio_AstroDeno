/**
 * Templates — home band, /templates gallery, /templates/<slug> sales page
 * and the demo-only widgets (toast on fake forms).
 *
 * Placeholders: {N} = count as a capitalised word ("Quatro"), {n} = lowercase
 * word, {days} = SITE.promises.templateDays, {months} = adjustments months,
 * {min}/{max} = formatted prices, {name} = "Mirante Captação".
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
		/** Shown only when every template is measured and the lowest mobile score is 90+. {min} = that score. */
		scoreLine: 'Nota mínima de {min} no Lighthouse no celular, medida em cada demo',
		listLabel: 'Templates disponíveis',
		scrollPrev: 'Template anterior',
		scrollNext: 'Próximo template',
	},

	gallery: {
		eyebrow: 'Templates',
		head: 'Escolha um',
		headAccent: 'ponto de partida.',
		lead: '{N} estruturas prontas, cada uma mostrada com um exemplo de conteúdo. O seu negócio entra no lugar do exemplo, e o preço inclui personalização, domínio configurado, SEO e {months} meses de ajustes.',
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
		/** Label before the template's `fits` list. */
		fits: 'Serve pra:',
		/** {what} = example labels joined ("clínica e salão"). */
		demoAs: 'Na demo: {what}',
		/** Chip on templates flagged isNew. */
		isNew: 'Novo',
		/** Lighthouse badge over the preview: short visible label, full sentence for screen readers. */
		scoreLabel: 'Lighthouse',
		scoreDevice: 'celular',
		scoreSr: 'Nota {score} de 100 no Lighthouse, celular',
		/** Wide card only: the four scores under the description (title reuses detail.scores.title). */
		scoreShort: {
			mobile: 'Celular',
			desktop: 'Computador',
			accessibility: 'Acessibilidade',
			bestPractices: 'Boas práticas',
		},
	},

	/**
	 * Gallery: pricing table above the grid (delivery toggle, one card per
	 * template, feature matrix, one CTA). {days} = SITE.promises.templateDays,
	 * {hours} = express hours, {months} = adjustments, {name} = "Mirante Captação".
	 */
	compare: {
		eyebrow: 'Qual é o meu?',
		title: 'Compare em dez segundos',
		sub: 'Pra que serve, prazo e preço lado a lado. Toca no card pra selecionar.',
		criterion: 'Critério',
		rows: {
			who: 'serve pra',
			days: 'prazo',
			price: 'a partir de',
			sections: 'seções',
		},
		toggle: {
			label: 'Prazo de entrega',
			standard: 'Entrega padrão · {days} dias úteis',
			express: 'Entrega express · {hours}h',
		},
		plansLabel: 'Escolha um template',
		selectedLabel: 'Selecionado',
		/** Delivery chip while express is on (standard uses common.businessDays). */
		deliveryExpress: '{hours}h',
		matrixCaption: 'O que vem em cada template',
		included: 'Incluso',
		notIncluded: 'Não incluso',
		features: {
			lead: 'Formulário de lead + WhatsApp',
			menu: 'Cardápio com preços',
			reservation: 'Reserva de mesa pelo WhatsApp',
			booking: 'Agendamento pelo WhatsApp',
			hours: 'Horário com "aberto agora"',
			gallery: 'Galeria de fotos',
			plans: 'Opções com imagem e mapa',
			pricing: 'Tabela de planos e perguntas',
			countdown: 'Contagem regressiva e vitrine',
			cases: 'Grid de trabalhos',
			newsletter: 'Newsletter',
			legal: 'Página de privacidade e 404',
			seo: 'SEO técnico e analytics',
			adjustments: '{months} meses de ajustes',
		},
		cta: 'Quero o {name}',
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
		/** Hero: kinds of business the structure serves (from tpl.fits). */
		fitsTitle: 'Serve pra',
		/** Demo: switch between content examples when a template has more than one. */
		exampleLabel: 'Exemplo',
		exampleNote: 'Mesma estrutura, outro negócio. Troque o exemplo pra ver.',
		/**
		 * Score panel in the hero, from src/data/lighthouse.json. {version} = Lighthouse
		 * version, {runs} = runs per preset, {date} = measurement date.
		 */
		scores: {
			title: 'Nota no Google Lighthouse',
			mobile: 'Performance no celular',
			desktop: 'Performance no computador',
			accessibility: 'Acessibilidade',
			bestPractices: 'Boas práticas',
			outOf: 'de 100',
			note: 'Medido nesta demo com o Lighthouse {version}, a mesma análise do PageSpeed Insights. Mediana de {runs} medições, em {date}.',
		},
		/** Desktop / phone switch above the demo frame. */
		device: {
			label: 'Ver como',
			desktop: 'Desktop',
			mobile: 'Celular',
		},
	},

	included: {
		title: 'O que vem junto',
		items: [
			'Publicado no seu domínio (o domínio é por sua conta; eu configuro DNS e SSL)',
			'SEO técnico e Lighthouse acima de 90 no celular',
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
