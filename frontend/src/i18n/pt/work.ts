/** /work — flagships, client cases and the lab. Work data lives in src/data/works.ts. */
export const work = {
	hero: {
		/** `{from}` = SITE.since, `{to}` = current year */
		eyebrow: '{from} → {to} · anos em produção',
		head1: 'Trabalho',
		head2: 'de verdade.',
		lead: 'Estes são os projetos que posso mostrar abertamente. Há mais: alguns sob NDA, outros que preferi não publicar. Quer saber sobre eles? Me escreve.',
	},

	flagships: {
		eyebrow: 'Produtos próprios',
		head1: 'Coisas que eu',
		head2: 'mesmo lancei.',
		lead: 'Produtos que eu desenhei, construí e mantenho. Do banco à interface, sem ninguém pra dividir a culpa.',
	},

	cases: {
		eyebrow: 'Cases',
		head1: 'Entregue pra',
		head2: 'empresas.',
		lead: 'Sites e sistemas que entraram em produção pra clientes de verdade, e o que eu fiz em cada um.',
	},

	lab: {
		eyebrow: 'Lab',
		head1: 'Desafios e',
		head2: 'experimentos.',
		lead: 'Coisa pequena que eu fiz pra aprender uma stack, resolver um desafio técnico ou só por diversão. Nada aqui foi pra cliente.',
		/** `{n}` = number of lab items */
		summary: 'Ver {n} experimentos',
	},

	/** Labels inside each case card. */
	card: {
		role: 'Meu papel:',
		outcome: 'Resultado',
		thumbAlt: '{title}',
		packages: 'Pacotes',
	},

	cta: {
		head1: 'Parecido com',
		head2: 'o seu?',
		sub: 'Se sim, vamos conversar. Respondo em 24h úteis.',
	},
} as const;
