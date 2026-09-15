/**
 * Second example for the Sálvia template: /templates/salvia/demo/salao.
 * Same structure as the clinic demo with a salon's content, to show the
 * template is not tied to one kind of business. Fictional salon and people.
 * Photos: Unsplash License (interiors and objects only, no people). No phone,
 * e-mail or WhatsApp number; booking runs in demo mode.
 */
import { defineSalvia } from './schema';
import salaoLarga from './assets/demo/salao-larga.jpg';
import salaoCorte from './assets/demo/salao-servico-corte.jpg';
import salaoEscova from './assets/demo/salao-servico-escova.jpg';
import salaoTratamento from './assets/demo/salao-servico-tratamento.jpg';
import salaoUnhas from './assets/demo/salao-servico-unhas.jpg';
import salaoBarba from './assets/demo/salao-servico-barba.jpg';
import salaoBancada from './assets/demo/salao-espaco-bancada.jpg';
import salaoCadeira from './assets/demo/salao-espaco-cadeira.jpg';

export default defineSalvia({
	businessType: 'BeautySalon',
	brand: { name: 'Alecrim Salão', tagline: 'Cabelo, unhas e barba na Vila Madalena', locale: 'pt-BR' },
	theme: { accent: '#7b4f63', bg: '#f6f4f2', bg2: '#ece8e5', ink: '#241e21', radius: 2 },
	seo: {
		title: 'Alecrim Salão: demo do template Sálvia',
		description: 'Demo do template Sálvia com um salão de beleza de exemplo, por Fab Bahiense. Dados fictícios.',
		canonical: 'https://www.fabbahiense.dev/templates/salvia/demo/salao',
	},
	contact: {
		form: { provider: 'none' },
	},
	analytics: {},
	legal: { company: 'Alecrim Beleza Ltda.', cnpj: '00.000.000/0001-00', lines: [] },
	nav: [
		{ label: 'Serviços', href: '#servicos' },
		{ label: 'Equipe', href: '#equipe' },
		{ label: 'Pagamento', href: '#pagamento' },
		{ label: 'Como chegar', href: '#onde' },
	],

	topbar: { cta: 'Agendar' },

	hero: {
		tagline: 'Salão de bairro na Vila Madalena, São Paulo. Cabelo, unhas e barba no mesmo lugar.',
		title: 'Hora marcada, sem fila.',
		sub: 'Você escolhe o serviço e o período pelo WhatsApp e chega na hora certa. Tem café passado enquanto a cor pega.',
		photo: salaoLarga,
		photoAlt: 'Bancada do salão com cadeiras, espelhos e secadores perto das janelas',
		highlights: ['Sem fila de espera', 'Pix e cartão', 'Aberto até as 20h'],
		cta: 'Agendar pelo WhatsApp',
		secondaryCta: 'Ver serviços',
	},

	services: {
		lead: 'Escolha um e ele já fica marcado no agendamento.',
		items: [
			{ name: 'Corte', photo: salaoCorte, desc: 'Feminino, masculino e infantil, com lavagem e finalização.' },
			{ name: 'Escova e penteado', photo: salaoEscova, desc: 'Escova lisa ou modelada, penteado pra festa e babyliss.' },
			{ name: 'Tratamentos', photo: salaoTratamento, desc: 'Hidratação, reconstrução e cronograma capilar.' },
			{ name: 'Manicure e pedicure', photo: salaoUnhas, desc: 'Esmaltação comum ou em gel, cutilagem e spa dos pés.' },
			{ name: 'Barba', photo: salaoBarba, desc: 'Barba desenhada na navalha, com toalha quente.' },
		],
	},

	booking: {
		periods: ['Manhã', 'Tarde', 'Noite'],
		foot: 'Respondemos em até 30 minutos no horário de funcionamento.',
	},

	team: {
		lead: 'Cada um com a sua especialidade. Se preferir alguém, é só dizer na mensagem.',
		people: [
			{ name: 'Marina Costa', role: 'Corte e coloração', bio: 'Loiros, mechas e cabelos cacheados.' },
			{ name: 'Diego Ramos', role: 'Barba e corte masculino', bio: 'Navalha, degradê e barba desenhada.' },
			{ name: 'Júlia Ferraz', role: 'Manicure e pedicure', bio: 'Esmaltação em gel e unhas curtas bem feitas.' },
			{ name: 'Renata Lima', role: 'Tratamentos', bio: 'Cronograma e recuperação de fios danificados.' },
		],
	},

	insurance: {
		title: 'Formas de pagamento',
		anchor: 'pagamento',
		plans: ['Pix', 'cartão de crédito em até 3x', 'débito', 'vale-presente'],
		note: 'Pacotes de manicure e de tratamento saem com 10% de desconto no pagamento à vista.',
	},

	space: {
		lead: 'Luz natural, bancadas largas e uma poltrona pra quem veio acompanhar.',
		photos: [
			{ image: salaoBancada, alt: 'Salão com cadeiras pretas, espelho redondo e produtos na bancada', caption: 'Bancada de corte' },
			{ image: salaoCadeira, alt: 'Cadeira de atendimento ao lado de uma janela clara', caption: 'Sala de tratamento' },
		],
	},

	faq: {
		items: [
			{ q: 'Preciso marcar ou posso chegar direto?', a: 'Pode chegar, mas com hora marcada você não espera. Pelo WhatsApp a confirmação sai em minutos.' },
			{ q: 'Quanto tempo leva uma coloração?', a: 'De 2 a 3 horas, conforme o comprimento e a técnica. A gente avisa o tempo certo na confirmação.' },
			{ q: 'Posso remarcar?', a: 'Pode, pelo mesmo WhatsApp, com até 3 horas de antecedência.' },
			{ q: 'Vocês atendem crianças?', a: 'Sim, corte infantil de terça a sábado, até as 18h.' },
		],
	},

	location: {
		address: { street: 'Rua do Alecrim, 45', district: 'Vila Madalena', city: 'São Paulo', state: 'SP', zip: '05433-000' },
		mapsUrl: 'https://maps.google.com/?q=Vila+Madalena,+São+Paulo',
		directions: ['6 minutos a pé do metrô Vila Madalena', 'Bicicletário na calçada', 'Térreo, sem degraus'],
		hoursTitle: 'Horário de funcionamento',
		hours: [
			{ days: ['tue', 'wed', 'thu', 'fri'], opens: '10:00', closes: '20:00' },
			{ days: ['sat'], opens: '09:00', closes: '18:00' },
		],
		hoursNote: 'Às segundas o salão fica fechado. Em feriados, confirme pelo WhatsApp.',
	},

	footer: {
		line: '© 2026 Alecrim Salão',
		wordmark: 'Alecrim',
	},
});
