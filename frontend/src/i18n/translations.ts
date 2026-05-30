export type Locale = 'en' | 'pt';

/**
 * UI string table. Swapped client-side via [data-i18n] (textContent only — so
 * highlighted words live in their own span/key, e.g. *.head1 + *.head2).
 * Dynamic content coming from the works API is not translated here.
 */
export const translations: Record<Locale, Record<string, string>> = {
	en: {
		// ===== Nav / a11y =====
		'nav.home': 'Home',
		'nav.work': 'Work',
		'nav.about': 'About',
		'nav.templates': 'Templates',
		'nav.contact': 'Contact',
		'a11y.skip': 'Skip to main content',

		// ===== Home · Hero =====
		'hero.eyebrow': 'Open to select work · 2026',
		'hero.role': 'Senior Software Engineer',
		'hero.location': 'Rio de Janeiro, BR',
		'hero.sub':
			'I build web platforms, developer tooling and digital products — from high-performance frontends to scalable cloud backends.',
		'hero.cta.work': 'See my work',
		'hero.cta.hire': 'Get in touch',

		// ===== Home · Device showcase =====
		'device.label': 'Featured work',
		'featured.pulsar.badge': 'SaaS · Observability',
		'featured.pulsar.desc':
			'Observability npm for Node — plugs into pino or console.log. C# version coming next.',
		'featured.quasar.badge': 'SaaS · WhatsApp marketing',
		'featured.quasar.desc':
			'Mass campaigns, flow-based automations and native integrations with Calendar, CRMs and more.',
		'featured.nexus.badge': 'Tech Lead · Full stack',
		'featured.nexus.desc':
			'Multi-channel communication platform built end-to-end as Tech Lead — one of the biggest systems I have shipped.',
		'featured.mirante.badge': 'Template · Real estate',
		'featured.mirante.desc':
			'Brazilian-style real-estate launch landing — built to convert visits into scheduled tours.',
		'featured.filadelfo.badge': 'Frontend · Real estate',
		'featured.filadelfo.desc':
			'Residential building with view to Ibirapuera Park. Astro + Tailwind.',
		'featured.vila-olimpia.badge': 'Frontend · Real estate',
		'featured.vila-olimpia.desc':
			'Institutional site for a residential development in Vila Olímpia, São Paulo.',

		// ===== Works (home list + work page) =====
		'works.eyebrow': 'Work',
		'works.head1': 'What shipped to',
		'works.head2': 'production.',
		'works.lead': 'Each row is a product real people used (or use).',
		'works.all': 'See all work',
		'works.viewProject': 'View project',
		'works.status.live': 'Live',
		'works.status.archived': 'Archived',
		'works.filter.personal': 'personal',
		'works.filter.professional': 'professional',
		'works.filter.all': 'all',
		'works.modal.view': 'View project',
		'works.modal.archived': 'Archived',
		// per-work bilingual descriptions
		'works.pulsar.desc':
			'Observability npm for Node — plugs into pino or console.log. C# version coming next.',
		'works.quasar.desc':
			'Mass campaigns, flow-based automations and native integrations with Calendar, CRMs and more.',
		'works.nexus.desc':
			'Multi-channel communication platform built end-to-end as Tech Lead — one of the biggest systems I have shipped.',
		'works.mirage.desc':
			'Institutional site for a real-estate development a few meters from Ibirapuera Park, São Paulo.',
		'works.filadelfo.desc':
			'Residential building in Vila Nova Conceição, São Paulo — close to Ibirapuera Park. Astro + Tailwind.',
		'works.viewPinheiros.desc':
			"Residential project a few meters from Pinheiros Station, in one of São Paulo's most complete neighborhoods.",
		'works.vilaOlimpia.desc':
			'Institutional site for a residential development in Vila Olímpia, São Paulo.',
		'works.vuedex.desc':
			'Vue 3 + Vite Pokédex — search, filters, infinite scroll, tests and multi-language.',
		'works.restCountries.desc':
			'Frontend Mentor challenge — REST Countries API consumer with light/dark theme switcher.',
		'works.leadster.desc':
			'Code challenge for Leadster — YouTube videos with tag filtering. Next + Styled Components.',
		'works.philosophy.desc':
			'Random Modern Family quotes with Twitter share and audio playback. API in C#.',
		'works.rpsls.desc':
			'Frontend Mentor challenge — the classic game with two extra moves. Vue 3.',
		'works.chatApp.desc': 'A ChatApp UI illustration built entirely with HTML and CSS.',
		'works.theXp.desc':
			'Landing page for a metaverse music festival. React + TailwindCSS + Framer Motion.',

		// ===== Clients =====
		'clients.eyebrow': 'Clients',
		'clients.head1': "Brands I've",
		'clients.head2': 'built for.',

		// ===== Home · About short =====
		'aboutShort.quote':
			'Code is half the job. The other half is understanding the problem before writing the first line.',
		'aboutShort.p1':
			"I'm Fabrício Bahiense, a Senior Software Engineer based in Rio de Janeiro, Brazil.",
		'aboutShort.p2':
			'Father, husband, problem-solver — multiple layers, like an onion. I love football, music, games, beer, science, astronomy (I love watching the sky) and, of course, technology.',
		'aboutShort.p3':
			'I care about digital experiences that actually make a difference: a fast web app, a scalable cloud architecture, a mobile flow that feels right, your landing page that converts.',
		'aboutShort.more': 'Get to know me',

		// ===== Templates (home section, gallery, offering) =====
		'templates.eyebrow': 'Extras · ready-made templates',
		'templates.head1': 'Need something',
		'templates.head2': 'yesterday?',
		'templates.lead':
			'Four templates I wrote myself. You pick one, I customize and ship it in 3 to 5 business days — with your domain and brand.',
		'templates.pick': 'Choose',
		'templates.gallery.eyebrow': 'Templates',
		'templates.gallery.head1': 'Pick a',
		'templates.gallery.head2': 'starting point.',
		'templates.gallery.lead':
			'Four directions, four audiences. Compare them side by side and pick what fits what you are building.',
		'templates.back': 'Back to templates',
		'templates.related': 'Other templates',
		'templates.want': 'I want this template',
		'templates.viewFull': 'View full version',
		// per-template card copy
		'tpl.stratus.cat': 'SaaS · B2B',
		'tpl.stratus.desc': 'Conversion-focused trial landing. Inline pricing + FAQ.',
		'tpl.atelier.cat': 'Agency',
		'tpl.atelier.desc': 'Editorial portfolio. Case grid and numbered process.',
		'tpl.brava.cat': 'E-commerce',
		'tpl.brava.desc': 'Limited drop. Countdown + lookbook + checkout.',
		'tpl.layer.cat': 'Event',
		'tpl.layer.desc': 'Conference or event. Speakers, agenda, signup.',
		'tpl.mirante.cat': 'Real estate · Conversion',
		'tpl.mirante.desc': 'High-intent real-estate launch landing: lead form in the hero, floor plans, location and the proper Brazilian sales feel.',
		'tpl.pulse.cat': 'Mobile',
		'tpl.pulse.desc': 'Consumer app landing. Mobile-first, store CTAs.',
		'tpl.forge.cat': 'Longform',
		'tpl.forge.desc': 'For case studies and long essays. Side footnotes.',
		// template detail page (shared + per-template lead)
		'templates.meta.label': 'Template',
		'templates.delivery': 'delivery in',
		'templates.days.word': 'days',
		'templates.included.title': "What's included",
		'templates.included.1': 'Domain + SSL included',
		'templates.included.2': 'Technical SEO (Lighthouse > 95)',
		'templates.included.3': 'Customization: logo, colors, copy',
		'templates.included.4': '3 months of free adjustments',
		'templates.included.5': "Open code — it's yours",
		'templates.steps.title': 'How it works',
		'templates.steps.1.t': 'Pick a template',
		'templates.steps.1.d': 'Browse the seven and tell me which one fits.',
		'templates.steps.2.t': 'I customize',
		'templates.steps.2.d': 'Your brand, colors and copy — in a few business days.',
		'templates.steps.3.t': 'It ships',
		'templates.steps.3.d': 'Deployed on your domain, with SSL and SEO.',
		'tpl.stratus.lead':
			'Conversion-focused landing for B2B SaaS: strong hero, dense social proof, pricing and inline FAQ.',
		'tpl.atelier.lead':
			'Editorial portfolio for studios and agencies: case grid, numbered process, lots of whitespace.',
		'tpl.brava.lead':
			'Limited drop for e-commerce: countdown, lookbook and a checkout that converts.',
		'tpl.layer.lead':
			'Conference or event site: speakers, agenda, ticket tiers and signup.',
		'tpl.mirante.lead':
			'Brazilian-style real-estate launch landing — numbers band, gallery, floor plans, location map and a high-intent lead form. Built to convert visits into scheduled tours.',
		'tpl.pulse.lead':
			'Consumer app landing: mobile-first, app mockups and store CTAs.',
		'tpl.forge.lead':
			'Longform editorial: narrow column, comfortable reading and side footnotes.',
		'templates.cta.head1': 'Is this',
		'templates.cta.head2': 'the one?',
		'templates.cta.sub':
			'Send me your domain, logo and what needs to change. In a few business days the site is live.',

		// ===== Contact (home) =====
		'contact.head1': "Let's",
		'contact.head2': 'talk?',
		'contact.sub':
			'I reply within 24 business hours. No CRM, no auto-reply — every email lands straight in my inbox.',
		'contact.form.name': 'Name',
		'contact.form.email': 'Email',
		'contact.form.subject': 'Subject',
		'contact.form.subject.hi': 'Just saying hi',
		'contact.form.subject.project': 'New project',
		'contact.form.subject.template': 'About a template',
		'contact.form.subject.other': 'Other',
		'contact.form.message': 'Message',
		'contact.form.placeholder': 'Tell me what you have in mind…',
		'contact.form.send': 'Send message',
		'contact.form.or': 'or email me directly at',

		// ===== Footer =====
		'footer.location': 'Rio de Janeiro, BR',

		// ===== Work page =====
		'work.eyebrow': '2018 → 2026 · years in production',
		'work.head1': 'Real',
		'work.head2': 'work.',
		'work.lead':
			'These are the projects I can show openly. There is more — some under NDA, some I chose not to publish. Want to hear about them? Write me.',
		'work.cta.head1': 'Something like',
		'work.cta.head2': 'yours?',
		'work.cta.sub': "If so, let's talk. I reply within 24 business hours.",

		// ===== About page =====
		'about.hero.eyebrow': 'About',
		'about.hero.head1': 'About',
		'about.hero.head2': 'me.',
		'about.hero.role': 'Senior Software Engineer',
		'about.hero.since': 'since 2018',
		'about.hero.sub':
			"My name is Fabrício Bahiense, from Rio de Janeiro. I started in tech as a student at CEFET/RJ, interned in 2018, and haven't stopped writing code since. Take a look at the journey.",

		'about.stats.years': 'years in the game',
		'about.stats.products': 'products in prod',
		'about.stats.clients': 'companies / clients',
		'about.stats.focus': 'core stacks',

		'about.story.quote':
			'Code is half the job. The other half is understanding the problem before writing the first line.',
		'about.story.by': '— Fab',
		'about.story.p1':
			'I started studying development in school, then took my first internship as a full-stack dev — the standard PHP, jQuery, MySQL combo of the time.',
		'about.story.p2':
			'From there I moved through agencies and consultancies as a frontend and full-stack engineer, working with React, Vue, Next and Node, and growing into technical leadership.',
		'about.story.p3':
			'Today I work as a Senior Software Engineer on high-impact web platforms, and I take on as many side clients as come my way.',

		'about.career.eyebrow': 'Path',
		'about.career.head1': 'From intern',
		'about.career.head2': 'to senior.',
		'about.career.lead':
			'A few roles, a handful of stacks, one principle: software that ships and stays standing.',
		'about.career.r1.role': 'Tech degree · CEFET/RJ',
		'about.career.r1.desc': 'High school + computer-science technical degree. Started programming out of curiosity.',
		'about.career.r2.role': 'Full-stack intern',
		'about.career.r2.desc': 'First job — institutional sites, forms, simple integrations.',
		'about.career.r3.role': 'Frontend · MKT4Edu',
		'about.career.r3.desc': 'Landing pages and marketing campaigns at volume. HubSpot + React.',
		'about.career.r4.role': 'Frontend / Full stack · BJ Consulting',
		'about.career.r4.desc': 'Diverse clients. Astro-heavy. Reached for Qwik when it mattered.',
		'about.career.r5.role': 'Product Lead · LocalApp / Lumina Lab',
		'about.career.r5.desc':
			"AI-product startup. Led Eleodora — a chatbot / agent designed to feel like the client who'd hire it.",
		'about.career.r6.role': 'Tech Lead · Nexus Comunicação',
		'about.career.r6.desc':
			'Full-stack communication platform. AWS, Redis, Lightsail. Vue + Nuxt + Astro + Next.',
		'about.career.r7.role': 'Senior Specialist · NTT Data',
		'about.career.r7.desc': 'Full-stack senior at the largest bank in Latin America.',

		'about.stack.eyebrow': 'Services',
		'about.stack.head1': 'What I can do',
		'about.stack.head2': 'for you.',
		'about.stack.lead':
			'Common asks. Tell me the context — we sort the rest out together.',
		'about.stack.col1': 'Build',
		'about.stack.col2': 'Modernize',
		'about.stack.col3': 'Integrate AI',
		// service bullets
		'about.stack.c1.b1': 'High-converting landing pages',
		'about.stack.c1.b2': 'Institutional sites and portals',
		'about.stack.c1.b3': 'Web systems — SaaS, dashboards, internal tools',
		'about.stack.c1.b4': 'Cloud-native, ready to scale from day one',
		'about.stack.c2.b1': 'Refactor legacy code into a modern stack',
		'about.stack.c2.b2': 'Move things to AWS or GCP — architecture, migration, scale',
		'about.stack.c2.b3': 'Performance and cost optimization',
		'about.stack.c2.b4': 'Tech-debt audit + reduction plan',
		'about.stack.c3.b1': 'AI applied to your product — any integration, anywhere',
		'about.stack.c3.b2': 'Text, voice, image, video — any modality',
		'about.stack.c3.b3': 'Autonomous agents with memory, tools and reasoning',
		'about.stack.c3.b4': 'OpenAI, Anthropic, Gemini or self-hosted — your choice',

		'about.cta.head1': 'Like what you see?',
		'about.cta.head2': "Let's talk.",
		'about.cta.sub': 'I reply within 24 business hours. No CRM, no auto-reply.',
	},

	pt: {
		// ===== Nav / a11y =====
		'nav.home': 'Início',
		'nav.work': 'Trabalhos',
		'nav.about': 'Sobre',
		'nav.templates': 'Templates',
		'nav.contact': 'Contato',
		'a11y.skip': 'Pular para o conteúdo principal',

		// ===== Home · Hero =====
		'hero.eyebrow': 'Aberto a projetos selecionados · 2026',
		'hero.role': 'Engenheiro de Software Sênior',
		'hero.location': 'Rio de Janeiro, BR',
		'hero.sub':
			'Construo plataformas web, ferramentas para devs e produtos digitais — de frontends de alta performance a backends escaláveis na nuvem.',
		'hero.cta.work': 'Ver trabalhos',
		'hero.cta.hire': 'Entrar em contato',

		// ===== Home · Device showcase =====
		'device.label': 'Em destaque',
		'featured.pulsar.badge': 'SaaS · Observabilidade',
		'featured.pulsar.desc':
			'npm de observabilidade para Node — encaixa com pino ou console.log. Versão C# vem aí.',
		'featured.quasar.badge': 'SaaS · Marketing por WhatsApp',
		'featured.quasar.desc':
			'Campanhas em massa, automações baseadas em fluxo e integrações nativas com Calendar, CRMs e mais.',
		'featured.nexus.badge': 'Tech Lead · Full stack',
		'featured.nexus.desc':
			'Plataforma de comunicação multicanal construída ponta a ponta como Tech Lead — um dos maiores sistemas que entreguei.',
		'featured.mirante.badge': 'Template · Imobiliário',
		'featured.mirante.desc':
			'Landing de lançamento imobiliário no padrão BR — feita pra converter visita em call com corretor.',
		'featured.filadelfo.badge': 'Frontend · Imobiliário',
		'featured.filadelfo.desc':
			'Edifício residencial com vista para o Parque Ibirapuera. Astro + Tailwind.',
		'featured.vila-olimpia.badge': 'Frontend · Imobiliário',
		'featured.vila-olimpia.desc':
			'Site institucional para um empreendimento residencial em Vila Olímpia, São Paulo.',

		// ===== Works (home list + work page) =====
		'works.eyebrow': 'Trabalhos',
		'works.head1': 'O que entrou em',
		'works.head2': 'produção.',
		'works.lead': 'Cada linha é um produto que gente real usou (ou usa).',
		'works.all': 'Ver todos os trabalhos',
		'works.viewProject': 'Ver projeto',
		'works.status.live': 'No ar',
		'works.status.archived': 'Arquivado',
		'works.filter.personal': 'pessoal',
		'works.filter.professional': 'profissional',
		'works.filter.all': 'todos',
		'works.modal.view': 'Ver projeto',
		'works.modal.archived': 'Arquivado',
		// per-work bilingual descriptions
		'works.pulsar.desc':
			'npm de observabilidade para Node — encaixa com pino ou console.log. Versão C# vem aí.',
		'works.quasar.desc':
			'Campanhas em massa, automações baseadas em fluxo e integrações nativas com Calendar, CRMs e mais.',
		'works.nexus.desc':
			'Plataforma de comunicação multicanal construída ponta a ponta como Tech Lead — um dos maiores sistemas que entreguei.',
		'works.mirage.desc':
			'Site institucional para um empreendimento imobiliário a poucos metros do Parque Ibirapuera, São Paulo.',
		'works.filadelfo.desc':
			'Edifício residencial em Vila Nova Conceição, São Paulo — perto do Parque Ibirapuera. Astro + Tailwind.',
		'works.viewPinheiros.desc':
			'Projeto residencial a poucos metros da Estação Pinheiros, em um dos bairros mais completos de São Paulo.',
		'works.vilaOlimpia.desc':
			'Site institucional para um empreendimento residencial em Vila Olímpia, São Paulo.',
		'works.vuedex.desc':
			'Pokédex em Vue 3 + Vite — busca, filtros, scroll infinito, testes e suporte a múltiplos idiomas.',
		'works.restCountries.desc':
			'Desafio Frontend Mentor — consumidor da REST Countries API com toggle de tema claro/escuro.',
		'works.leadster.desc':
			'Desafio de código pra Leadster — vídeos do YouTube com filtro por tag. Next + Styled Components.',
		'works.philosophy.desc':
			'Frases aleatórias de Modern Family com share no Twitter e playback de áudio. API em C#.',
		'works.rpsls.desc':
			'Desafio Frontend Mentor — o jogo clássico com duas jogadas extras. Vue 3.',
		'works.chatApp.desc': 'Ilustração de UI de um ChatApp construída inteiramente em HTML e CSS.',
		'works.theXp.desc':
			'Landing page pra um festival de música no metaverso. React + TailwindCSS + Framer Motion.',

		// ===== Clients =====
		'clients.eyebrow': 'Clientes',
		'clients.head1': 'Marcas para quem',
		'clients.head2': 'já construí.',

		// ===== Home · About short =====
		'aboutShort.quote':
			'Código é só metade do trabalho. A outra metade é entender o problema antes de escrever a primeira linha.',
		'aboutShort.p1':
			'Sou Fabrício Bahiense, Engenheiro de Software Sênior baseado no Rio de Janeiro, Brasil.',
		'aboutShort.p2':
			'Pai, marido, resolvedor de problemas — várias camadas, como uma cebola. Amo futebol, música, games, cerveja, ciência, astronomia (amo ver o céu) e, claro, tecnologia.',
		'aboutShort.p3':
			'Me importo com experiências digitais que realmente fazem diferença: um app web rápido, uma arquitetura escalável na nuvem, um fluxo mobile que funciona como deveria, sua landing page que converte.',
		'aboutShort.more': 'Conhecer melhor',

		// ===== Templates (home section, gallery, offering) =====
		'templates.eyebrow': 'Extras · templates prontos',
		'templates.head1': 'Precisa de algo',
		'templates.head2': 'pra ontem?',
		'templates.lead':
			'Quatro templates que eu mesmo escrevi. Você escolhe, eu personalizo e publico em 3 a 5 dias úteis — com seu domínio e marca.',
		'templates.pick': 'Escolher',
		'templates.gallery.eyebrow': 'Templates',
		'templates.gallery.head1': 'Escolha um',
		'templates.gallery.head2': 'ponto de partida.',
		'templates.gallery.lead':
			'Sete direções para sete públicos. Compare lado a lado e escolha o que combina com o que você está construindo.',
		'templates.back': 'Voltar para templates',
		'templates.related': 'Outros templates',
		'templates.want': 'Quero esse template',
		'templates.viewFull': 'Ver versão completa',
		// per-template card copy
		'tpl.stratus.cat': 'SaaS · B2B',
		'tpl.stratus.desc': 'Landing focada em conversão de trial. Pricing + FAQ inline.',
		'tpl.atelier.cat': 'Agência',
		'tpl.atelier.desc': 'Portfolio editorial. Grid de cases e processo numerado.',
		'tpl.brava.cat': 'E-commerce',
		'tpl.brava.desc': 'Lançamento limitado. Countdown + lookbook + checkout.',
		'tpl.layer.cat': 'Evento',
		'tpl.layer.desc': 'Conferência ou evento. Speakers, agenda, inscrição.',
		'tpl.mirante.cat': 'Imobiliário · Conversão',
		'tpl.mirante.desc': 'Landing de lançamento imobiliário com alta intenção: lead form no hero, plantas, localização e cara de venda de verdade.',
		'tpl.pulse.cat': 'Mobile',
		'tpl.pulse.desc': 'Landing de app consumer. Mobile-first, CTAs pras stores.',
		'tpl.forge.cat': 'Longform',
		'tpl.forge.desc': 'Para case studies e ensaios longos. Footnotes laterais.',
		// template detail page (shared + per-template lead)
		'templates.meta.label': 'Template',
		'templates.delivery': 'entrega em',
		'templates.days.word': 'dias',
		'templates.included.title': 'O que vem junto',
		'templates.included.1': 'Domínio + SSL inclusos',
		'templates.included.2': 'SEO técnico (Lighthouse > 95)',
		'templates.included.3': 'Personalização: logo, cores, copy',
		'templates.included.4': '3 meses de ajustes grátis',
		'templates.included.5': 'Código aberto — é seu',
		'templates.steps.title': 'Como funciona',
		'templates.steps.1.t': 'Escolha um template',
		'templates.steps.1.d': 'Veja os sete e me diga qual combina.',
		'templates.steps.2.t': 'Eu personalizo',
		'templates.steps.2.d': 'Sua marca, cores e copy — em poucos dias úteis.',
		'templates.steps.3.t': 'Vai pro ar',
		'templates.steps.3.d': 'Publicado no seu domínio, com SSL e SEO.',
		'tpl.stratus.lead':
			'Landing focada em conversão para SaaS B2B: hero forte, prova social densa, pricing e FAQ inline.',
		'tpl.atelier.lead':
			'Portfolio editorial para estúdios e agências: grid de cases, processo numerado, muito respiro.',
		'tpl.brava.lead':
			'Lançamento limitado para e-commerce: countdown, lookbook e um checkout que converte.',
		'tpl.layer.lead':
			'Site de conferência ou evento: speakers, agenda, lotes de ingresso e inscrição.',
		'tpl.mirante.lead':
			'Landing de lançamento imobiliário no padrão BR — faixa de números, galeria, plantas, mapa de localização e formulário de alta intenção. Feita pra converter visita em call com corretor.',
		'tpl.pulse.lead':
			'Landing de app consumer: mobile-first, mockups do app e CTAs pras stores.',
		'tpl.forge.lead':
			'Editorial longform: coluna estreita, leitura confortável e footnotes laterais.',
		'templates.cta.head1': 'Esse é',
		'templates.cta.head2': 'o seu?',
		'templates.cta.sub':
			'Manda seu domínio, logo e o que precisa mudar. Em poucos dias úteis o site sobe.',

		// ===== Contact (home) =====
		'contact.head1': 'Vamos',
		'contact.head2': 'conversar?',
		'contact.sub':
			'Respondo em até 24h úteis. Sem CRM, sem auto-resposta — todo email cai direto na minha caixa.',
		'contact.form.name': 'Nome',
		'contact.form.email': 'Email',
		'contact.form.subject': 'Assunto',
		'contact.form.subject.hi': 'Só dando oi',
		'contact.form.subject.project': 'Novo projeto',
		'contact.form.subject.template': 'Sobre um template',
		'contact.form.subject.other': 'Outro',
		'contact.form.message': 'Mensagem',
		'contact.form.placeholder': 'Me conta o que você tem em mente…',
		'contact.form.send': 'Enviar mensagem',
		'contact.form.or': 'ou me escreva direto em',

		// ===== Footer =====
		'footer.location': 'Rio de Janeiro, BR',

		// ===== Work page =====
		'work.eyebrow': '2018 → 2026 · anos em produção',
		'work.head1': 'Trabalho',
		'work.head2': 'de verdade.',
		'work.lead':
			'Estes são os projetos que posso mostrar abertamente. Há mais — alguns sob NDA, outros que preferi não publicar. Quer saber sobre eles? Me escreve.',
		'work.cta.head1': 'Parecido com o',
		'work.cta.head2': 'seu?',
		'work.cta.sub': 'Se sim, vamos conversar. Respondo em até 24h úteis.',

		// ===== About page =====
		'about.hero.eyebrow': 'Sobre',
		'about.hero.head1': 'Sobre',
		'about.hero.head2': 'mim.',
		'about.hero.role': 'Engenheiro de Software Sênior',
		'about.hero.since': 'desde 2018',
		'about.hero.sub':
			'Meu nome é Fabrício Bahiense, do Rio de Janeiro. Comecei na área como técnico no CEFET/RJ, estagiei em 2018 e desde então não parei de escrever código. Se liga na minha trajetória.',

		'about.stats.years': 'anos no jogo',
		'about.stats.products': 'produtos em prod',
		'about.stats.clients': 'empresas / clientes',
		'about.stats.focus': 'stacks principais',

		'about.story.quote':
			'Código é só metade do trabalho. A outra metade é entender o problema antes de escrever a primeira linha.',
		'about.story.by': '— Fab',
		'about.story.p1':
			'Comecei a estudar desenvolvimento ainda na escola e peguei o primeiro estágio como full stack — o combo padrão da época: PHP, jQuery, MySQL.',
		'about.story.p2':
			'De lá passei por agências e consultorias como engenheiro frontend e full stack, trabalhando com React, Vue, Next e Node, até crescer para liderança técnica.',
		'about.story.p3':
			'Hoje atuo como Engenheiro de Software Sênior em plataformas web de alto impacto, e aceito quantos clientes vierem.',

		'about.career.eyebrow': 'Trajetória',
		'about.career.head1': 'Do estágio',
		'about.career.head2': 'ao sênior.',
		'about.career.lead':
			'Algumas posições, algumas stacks, um princípio: software que entra em produção e fica de pé.',
		'about.career.r1.role': 'Médio técnico · CEFET/RJ',
		'about.career.r1.desc': 'Ensino médio + técnico em informática. Comecei a programar por curiosidade.',
		'about.career.r2.role': 'Estágio full stack',
		'about.career.r2.desc': 'Primeiro emprego — sites institucionais, formulários, integrações simples.',
		'about.career.r3.role': 'Frontend · MKT4Edu',
		'about.career.r3.desc': 'Landing pages e campanhas de marketing em volume. HubSpot + React.',
		'about.career.r4.role': 'Frontend / Full stack · BJ Consulting',
		'about.career.r4.desc': 'Clientes diversos. Astro principalmente, comecei a brincar com Qwik.',
		'about.career.r5.role': 'Líder de produto · LocalApp / Lumina Lab',
		'about.career.r5.desc':
			'Startup de produtos com IA. Liderei a Eleodora — chatbot/agente com personalidade, feita pra parecer o cliente que ia contratá-la.',
		'about.career.r6.role': 'Tech Lead · Nexus Comunicação',
		'about.career.r6.desc':
			'Plataforma full-stack de comunicação. AWS, Redis, Lightsail. Vue + Nuxt + Astro + Next.',
		'about.career.r7.role': 'Especialista Sênior · NTT Data',
		'about.career.r7.desc': 'Full-stack sênior no maior banco da América Latina.',

		'about.stack.eyebrow': 'Serviços',
		'about.stack.head1': 'O que posso fazer',
		'about.stack.head2': 'por você.',
		'about.stack.lead':
			'Pedidos comuns. Me conta o contexto — a gente desenrola o resto junto.',
		'about.stack.col1': 'Construir',
		'about.stack.col2': 'Modernizar',
		'about.stack.col3': 'Integrar IA',
		// service bullets
		'about.stack.c1.b1': 'Landing pages que convertem',
		'about.stack.c1.b2': 'Sites institucionais e portais',
		'about.stack.c1.b3': 'Sistemas web — SaaS, dashboards, ferramentas internas',
		'about.stack.c1.b4': 'Tudo na nuvem, escalável desde o dia 1',
		'about.stack.c2.b1': 'Refatoração de legado pra stack moderna',
		'about.stack.c2.b2': 'Migração pra AWS ou GCP — arquitetura, mudança, escala',
		'about.stack.c2.b3': 'Otimização de performance e custo',
		'about.stack.c2.b4': 'Auditoria de dívida técnica + plano de redução',
		'about.stack.c3.b1': 'IA aplicada ao seu produto — qualquer integração, em qualquer ponto',
		'about.stack.c3.b2': 'Texto, voz, imagem, vídeo — qualquer modalidade',
		'about.stack.c3.b3': 'Agentes autônomos com memória, ferramentas e raciocínio',
		'about.stack.c3.b4': 'OpenAI, Anthropic, Gemini ou self-hosted — sua escolha',

		'about.cta.head1': 'Curtiu?',
		'about.cta.head2': 'Vamos conversar.',
		'about.cta.sub': 'Respondo em até 24h úteis. Sem CRM, sem auto-resposta.',
	},
};
