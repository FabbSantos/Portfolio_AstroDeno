/** /about — the recruiter/CTO page. Honest, specific, chronological. */
export const about = {
	hero: {
		eyebrow: 'Sobre',
		head1: 'Sobre',
		head2: 'mim.',
		/** `{year}` = SITE.since */
		since: 'desde {year}',
		lead: 'Meu nome é Fabrício Bahiense, do Rio de Janeiro. Comecei como técnico no CEFET/RJ, estagiei em 2018 e não parei mais de colocar coisa em produção. Aqui vai o resumo honesto.',
	},

	/** Labels under the big numbers (values come from SITE.stats / SITE.responseTime). */
	stats: {
		years: 'anos em produção',
		products: 'produtos no ar',
		clients: 'empresas e clientes',
		response: 'tempo de resposta',
	},

	story: {
		quote: 'Código é só metade do trabalho. A outra metade é entender o problema antes de escrever a primeira linha.',
		by: '— Fab',
		p1: 'Comecei a estudar desenvolvimento ainda na escola e peguei o primeiro estágio como full stack — o combo padrão da época: PHP, jQuery, MySQL.',
		p2: 'De lá passei por agências e consultorias como engenheiro frontend e full stack, trabalhando com React, Vue, Next e Node, até chegar à liderança técnica.',
		p3: 'Hoje atuo como engenheiro de software sênior em plataformas web de alto impacto — e continuo pegando projetos por conta própria, porque é onde eu mais aprendo.',
		human: 'Pai, marido, resolvedor de problemas — várias camadas, como uma cebola. Amo futebol, música, games, cerveja, ciência, astronomia e, claro, tecnologia.',
	},

	career: {
		eyebrow: 'Trajetória',
		head1: 'Do estágio',
		head2: 'ao sênior.',
		lead: 'Algumas posições, algumas stacks, um princípio: software que entra em produção e fica de pé.',
		/** Visible mark on the current row. */
		current: 'atual',
		/** Chronological. The last row is the current one. */
		rows: [
			{
				period: '2016 — 19',
				role: 'Médio técnico · CEFET/RJ',
				desc: 'Ensino médio + técnico em informática. Comecei a programar por curiosidade.',
				tags: ['HTML', 'JS', 'PHP'],
			},
			{
				period: '2018 — 19',
				role: 'Estágio full stack',
				desc: 'Primeiro emprego — sites institucionais, formulários, integrações simples.',
				tags: ['PHP', 'jQuery', 'MySQL'],
			},
			{
				period: '2020 — 22',
				role: 'Frontend · MKT4Edu',
				desc: 'Landing pages e campanhas de marketing em volume. HubSpot + React.',
				tags: ['HubSpot', 'React', 'HTML'],
			},
			{
				period: '2022 — 24',
				role: 'Frontend / Full stack · BJ Consulting',
				desc: 'Clientes diversos. Astro na maior parte; Qwik quando fez sentido.',
				tags: ['Astro', 'Qwik', 'TypeScript'],
			},
			{
				period: 'ago/24 — jan/25',
				role: 'Líder de produto · LocalApp / Lumina Lab',
				desc: 'Startup de produtos com IA. Liderei a Eleodora — agente com personalidade, feita pra soar como o cliente que ia contratá-la.',
				tags: ['IA', 'LLM', 'React'],
			},
			{
				period: 'jan/25 — mai/25',
				role: 'Tech Lead · Nexus Comunicação',
				desc: 'Plataforma multicanal (SMS, WhatsApp, RCS): painel do cliente, API em Node, filas com Redis, infra AWS/Lightsail. Vue + Nuxt + Astro + Next.',
				tags: ['Vue', 'Nuxt', 'Node', 'AWS'],
			},
			{
				period: 'mai/25 — hoje',
				role: 'Especialista Sênior · NTT Data',
				desc: 'Full stack sênior no maior banco da América Latina.',
				tags: ['C#', 'AWS', 'DevOps'],
			},
		],
	},

	how: {
		eyebrow: 'Como eu trabalho',
		head1: 'Sem surpresa',
		head2: 'no meio do caminho.',
		lead: 'Quatro regras que valem pra todo projeto — do template de uma semana ao sistema de seis meses.',
		principles: [
			{
				title: 'Escopo fechado por fase',
				desc: 'Você sabe o que entra, o que fica de fora e quanto custa antes da primeira linha. Mudou a ideia? A gente fecha a fase seguinte, sem refazer a conta da anterior.',
			},
			{
				title: 'Preview toda semana',
				desc: 'Toda semana você recebe um link pra ver o projeto do jeito que está. Nada de sumir por um mês e voltar com surpresa.',
			},
			{
				title: 'Código é seu',
				desc: 'Repositório no seu GitHub desde o dia 1. Quer trocar de dev amanhã? O projeto vai junto, documentado e sem amarra.',
			},
			{
				title: 'Sem intermediário',
				desc: 'Você fala comigo. Quem orça, quem programa e quem responde a mensagem é a mesma pessoa.',
			},
		],
		availabilityLabel: 'Disponibilidade',
		format: 'Projetos fechados ou pacote mensal de horas.',
	},

	stack: {
		label: 'Stack do dia a dia',
		line: 'TypeScript · React · Vue · Next · Nuxt · Astro · Node · C# · AWS · Redis · Postgres',
	},

	cta: {
		head1: 'Curtiu?',
		head2: 'Vamos conversar.',
		sub: 'Respondo em 24h úteis. Você fala direto comigo.',
	},
} as const;
