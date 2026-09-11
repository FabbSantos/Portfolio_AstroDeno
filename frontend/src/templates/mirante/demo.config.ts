/**
 * Mirante — portfolio demo config. Fictional launch, placeholder data
 * (fake CRECI/CNPJ). A client's site.config.ts has exactly this shape
 * (see README.md).
 */
import { defineMirante } from './schema';

import fachada from './assets/demo/fachada.jpg';
import vista from './assets/demo/vista.jpg';
import decorado from './assets/demo/decorado.jpg';
import lazer from './assets/demo/lazer.jpg';
import plantaA from './assets/demo/planta-a.png';
import plantaB from './assets/demo/planta-b.png';
import plantaC from './assets/demo/planta-c.png';
import mapa from './assets/demo/mapa.png';

export default defineMirante({
	brand: { name: 'Mirante', tagline: 'Pinheiros', locale: 'pt-BR' },
	theme: { accent: '#a77b43', bg: '#faf6ee', bg2: '#f3ecdc', ink: '#1f2937', radius: 8 },
	seo: {
		title: 'Mirante Lançamento — demo do template',
		description: 'Demo do template Mirante: landing de lançamento imobiliário por Fab Bahiense. Dados fictícios.',
		canonical: 'https://www.fabbahiense.dev/templates/mirante/demo',
	},
	contact: {
		form: { provider: 'none' },
	},
	analytics: {},
	legal: {
		company: 'Helios + Coastal Empreendimentos',
		cnpj: '00.000.000/0001-00',
		lines: ['CRECI/SP J-12345', 'Memorial de incorporação 4ª RI de São Paulo', 'Imagens meramente ilustrativas'],
	},
	nav: [
		{ label: 'O empreendimento', href: '#projeto' },
		{ label: 'Plantas', href: '#plantas' },
		{ label: 'Localização', href: '#local' },
		{ label: 'Condições', href: '#valores' },
	],

	topbar: {
		brandHref: '#',
		cta: { label: 'Falar com consultor →', href: '#lead' },
	},

	hero: {
		eyebrow: 'Lançamento · Pinheiros, SP · Pré-vendas abertas',
		title: 'Pinheiros,',
		titleAccent: 'em outro nível.',
		sub: 'Lançamento residencial com **76 unidades**, 2 a 3 dormitórios e 84 a 132m². A **320m da estação Faria Lima**.',
		gallery: [
			{ image: fachada, label: 'Fachada', alt: 'Fachada do edifício' },
			{ image: vista, label: 'Vista', alt: 'Vista da cobertura' },
			{ image: decorado, label: 'Decorado', alt: 'Apartamento decorado' },
			{ image: lazer, label: 'Lazer', alt: 'Área de lazer' },
		],
		miniForm: {
			title: 'Quero conhecer · pré-venda',
			cta: 'Quero ser contatado',
			foot: 'Sem spam. Resposta em até 1 dia útil.',
		},
	},

	stats: [
		{ v: '76', l: 'unidades' },
		{ v: '2–3', l: 'dormitórios' },
		{ v: '84–132m²', l: 'área privativa' },
		{ v: '1–2', l: 'vagas' },
		{ v: '18', l: 'itens de lazer' },
		{ v: '320m', l: 'do metrô' },
	],

	project: {
		eyebrow: '// O empreendimento',
		title: 'Pensado para **Pinheiros**,\npor quem mora aqui.',
		paragraphs: [
			'O Mirante é um lançamento residencial assinado pela Helios + Coastal, na esquina da Cardeal Arcoverde com a Sumidouro — coração de Pinheiros, com toda a movimentação do bairro a pé.',
			'Apartamentos de 84m² a 132m², com 2 ou 3 dormitórios — sendo 1 ou 2 suítes —, vaga coberta na garagem e área privativa pensada para receber em casa. Lazer completo no térreo e na cobertura.',
			'Pré-vendas abertas com condições de lançamento. Decorado disponível para visita com hora marcada.',
		],
		amenitiesTitle: '// Lazer + serviços',
		amenities: [
			'Piscina coberta · aquecida',
			'Academia · 24h',
			'Salão de festas',
			'Espaço gourmet',
			'Espaço pet',
			'Coworking',
			'Brinquedoteca',
			'Bicicletário · 80 vagas',
			'Lavanderia compartilhada',
			'Portaria 24h · com facial',
		],
	},

	plans: {
		eyebrow: '// Plantas',
		title: 'Três tipologias.\n**Escolha a sua.**',
		items: [
			{ tag: 'Tipologia A', m2: '84m²', desc: '2 dorms · 1 suíte · 1 vaga', image: plantaA },
			{ tag: 'Tipologia B', m2: '102m²', desc: '3 dorms · 1 suíte · 1 vaga', image: plantaB, featured: true, badge: 'Mais procurado' },
			{ tag: 'Tipologia C', m2: '132m²', desc: '3 dorms · 2 suítes · 2 vagas', image: plantaC },
		],
	},

	location: {
		eyebrow: '// Localização · Pinheiros, São Paulo',
		title: 'Tudo a **menos de 1km.**',
		map: { kind: 'image', image: mapa, alt: 'Mapa da região com os pontos de interesse numerados' },
		poi: [
			{ name: 'Metrô Faria Lima', d: '320m' },
			{ name: 'Av. Faria Lima', d: '500m' },
			{ name: 'Shopping Eldorado', d: '900m' },
			{ name: 'Praça Pôr-do-Sol', d: '700m' },
			{ name: 'Hospital Albert Einstein', d: '2.4km' },
			{ name: 'Parque Villa-Lobos', d: '1.8km' },
		],
	},

	conditions: {
		eyebrow: '// Condições · pré-venda',
		title: 'Três formas **de fechar.**',
		items: [
			{
				tag: 'À vista',
				headline: 'Desconto de até **12%**',
				desc: 'Pagamento integral em até 30 dias com escritura imediata.',
				bullets: ['Sem juros, sem correção', 'Negociação direta', 'Escritura em até 60 dias'],
			},
			{
				tag: 'Financiamento direto',
				headline: 'Entrada de **10%** + 60×',
				desc: 'Financiamento direto com a construtora, sem juros até as chaves.',
				bullets: ['Sem análise bancária', 'Aprovação em 48h', 'Reajuste pelo INCC'],
				featured: true,
				badge: 'Mais procurado',
			},
			{
				tag: 'Financiamento bancário',
				headline: 'Entrada de **20%**',
				desc: 'Saldo financiado em até 35 anos com bancos parceiros.',
				bullets: ['Itaú, Bradesco e Santander', 'Pré-aprovação no plantão', 'Usa FGTS'],
			},
		],
		foot: '* Tabela de valores e condições sujeitas a alteração. Consulte um consultor.',
	},

	lead: {
		eyebrow: '// Quero conhecer',
		title: 'Vamos marcar **sua visita?**',
		sub: 'Preencha aqui e um consultor entra em contato em até 24h úteis. Sem compromisso — visita ao decorado dura cerca de 45 minutos.',
		bullets: ['Tour completo pelo decorado', 'Tabela de unidades disponíveis', 'Simulação de financiamento', 'Sem cobrança · sem compromisso'],
		times: ['Manhã', 'Tarde', 'Noite', 'Sábado'],
		cta: 'Quero ser contatado →',
		foot: 'Ao enviar, você concorda com nossa Política de Privacidade. Seus dados não são compartilhados.',
		messagePlaceholder: 'Algo que possamos preparar antes da visita?',
	},

	footer: {
		address: 'R. Cardeal Arcoverde, 1450 · Pinheiros · São Paulo, SP',
		columns: [
			{ h: 'Construtora', p: 'Helios + Coastal Empreendimentos' },
			{ h: 'Atendimento', p: '0800 800 1450\nvendas@mirantepinheiros.com.br' },
			{ h: 'Decorado', p: 'Visita com hora marcada\nSeg–Sáb · 10h às 19h' },
		],
	},
});
