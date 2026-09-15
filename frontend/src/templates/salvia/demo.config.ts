/**
 * Demo config for the portfolio page /templates/salvia/demo (example "Clínica";
 * the salon example is demo.salao.config.ts).
 * Fictional clinic, people, registries and insurers. Photos: Unsplash License
 * (interiors and objects only, no people). No phone, e-mail or WhatsApp number,
 * so nothing on the demo reaches a real person; booking runs in demo mode.
 */
import { defineSalvia } from './schema';
import recepcaoLarga from './assets/demo/recepcao-larga.jpg';
import salaAtendimento from './assets/demo/sala-atendimento.jpg';
import consultorioOdonto from './assets/demo/consultorio-odonto.jpg';
import servicoGeral from './assets/demo/servico-geral.jpg';
import servicoDermato from './assets/demo/servico-dermato.jpg';
import servicoOdonto from './assets/demo/servico-odonto.jpg';
import servicoNutri from './assets/demo/servico-nutri.jpg';
import servicoPsico from './assets/demo/servico-psico.jpg';

export default defineSalvia({
	businessType: 'MedicalClinic',
	brand: { name: 'Clínica Sálvia', tagline: 'Clínica integrada em Botafogo', locale: 'pt-BR' },
	theme: { accent: '#5b7563', bg: '#f7f7f4', bg2: '#eeefea', ink: '#1f2421', radius: 2 },
	seo: {
		title: 'Clínica Sálvia: demo do template',
		description: 'Demo do template Sálvia, landing de clínica por Fab Bahiense. Dados fictícios.',
		canonical: 'https://www.fabbahiense.dev/templates/salvia/demo',
	},
	contact: {
		form: { provider: 'none' },
	},
	analytics: {},
	legal: { company: 'Clínica Sálvia Serviços Médicos Ltda.', cnpj: '00.000.000/0001-00', lines: [] },
	nav: [
		{ label: 'Especialidades', href: '#servicos' },
		{ label: 'Equipe', href: '#equipe' },
		{ label: 'Convênios', href: '#convenios' },
		{ label: 'Como chegar', href: '#onde' },
	],

	topbar: { cta: 'Agendar' },

	hero: {
		tagline: 'Clínica integrada em Botafogo, Rio de Janeiro. Seis especialidades no mesmo endereço.',
		title: 'Cuidado de perto, sem pressa.',
		sub: 'Você marca pelo WhatsApp em dois toques e é atendido por quem conhece o seu histórico, do check-up ao tratamento.',
		photo: recepcaoLarga,
		photoAlt: 'Recepção da clínica com arcos brancos e mesas de madeira',
		highlights: ['Particular e convênios', 'Estacionamento conveniado', 'Acessível'],
		cta: 'Agendar pelo WhatsApp',
		secondaryCta: 'Ver especialidades',
	},

	services: {
		title: 'Especialidades',
		lead: 'Seis áreas no mesmo endereço. Escolha uma e ela já fica marcada no agendamento.',
		items: [
			{ name: 'Clínica geral', photo: servicoGeral, desc: 'Check-up, acompanhamento de rotina e encaminhamento pro especialista certo.' },
			{ name: 'Dermatologia', photo: servicoDermato, desc: 'Consulta, avaliação de pintas e tratamento de acne, manchas e queda de cabelo.' },
			{ name: 'Odontologia', photo: servicoOdonto, desc: 'Limpeza, restaurações, clareamento e ortodontia.' },
			{ name: 'Fisioterapia', photo: salaAtendimento, desc: 'Reabilitação ortopédica, dor nas costas e pós-operatório.' },
			{ name: 'Nutrição', photo: servicoNutri, desc: 'Plano alimentar pra emagrecimento, performance e saúde intestinal.' },
			{ name: 'Psicologia', photo: servicoPsico, desc: 'Terapia individual para adultos, presencial ou online.' },
		],
	},

	booking: {
		lead: 'Escolha a especialidade e o melhor período. A mensagem sai pronta no WhatsApp da clínica.',
		serviceLabel: 'Especialidade',
		foot: 'A recepção responde em até 1 hora no horário de atendimento.',
	},

	team: {
		lead: 'Todos com registro ativo no conselho da própria área.',
		people: [
			{ name: 'Dr. Rafael Menezes', role: 'Clínica geral, diretor técnico', registry: 'CRM-RJ 52.000.001', bio: 'Acompanha o paciente do check-up ao encaminhamento.' },
			{ name: 'Dra. Helena Duarte', role: 'Dermatologia', registry: 'CRM-RJ 52.000.002', bio: 'Pele, cabelo e unhas, com foco em acne e manchas.' },
			{ name: 'Dra. Camila Rocha', role: 'Odontologia', registry: 'CRO-RJ 40.001', bio: 'Clínica geral e ortodontia com alinhadores.' },
			{ name: 'Lucas Andrade', role: 'Fisioterapia', registry: 'CREFITO-2 100.001-F', bio: 'Reabilitação ortopédica e pós-operatório de joelho e ombro.' },
		],
	},

	insurance: {
		plans: ['Vida Plena', 'Unida Saúde', 'Norte Care', 'Integra', 'Bem Viver'],
		note: 'Não encontrou o seu plano? Atendemos particular, com nota fiscal e relatório pra pedir reembolso.',
	},

	space: {
		lead: 'Salas silenciosas, luz natural e uma recepção onde a espera é curta.',
		photos: [
			{ image: salaAtendimento, alt: 'Sala de atendimento com maca, pia e móveis de madeira', caption: 'Sala de fisioterapia' },
			{ image: consultorioOdonto, alt: 'Consultório odontológico claro com cadeira e equipamentos', caption: 'Consultório odontológico' },
		],
	},

	faq: {
		items: [
			{ q: 'Preciso de pedido médico pra marcar?', a: 'Não. Você marca direto com a especialidade. Se o seu convênio exigir guia, a recepção avisa na hora.' },
			{ q: 'Vocês atendem aos sábados?', a: 'Sim, das 8h ao meio-dia, com clínica geral e odontologia.' },
			{ q: 'Como funciona o reembolso?', a: 'No atendimento particular você recebe nota fiscal e relatório, que é o que os planos pedem pro reembolso.' },
			{ q: 'Posso remarcar ou cancelar?', a: 'Pode, pelo mesmo WhatsApp, com até 24 horas de antecedência.' },
		],
	},

	location: {
		address: { street: 'Rua da Sálvia, 120, sala 304', district: 'Botafogo', city: 'Rio de Janeiro', state: 'RJ', zip: '22250-000' },
		mapsUrl: 'https://maps.google.com/?q=Botafogo,+Rio+de+Janeiro',
		directions: ['5 minutos a pé do metrô Botafogo', 'Estacionamento conveniado no prédio', 'Elevador e banheiro acessíveis'],
		hours: [
			{ days: ['mon', 'tue', 'wed', 'thu', 'fri'], opens: '08:00', closes: '19:00' },
			{ days: ['sat'], opens: '08:00', closes: '12:00' },
		],
		hoursNote: 'Em feriados, confirme pelo WhatsApp antes de vir.',
	},

	footer: {
		line: '© 2026 Clínica Sálvia',
		wordmark: 'Sálvia',
		technicalLead: 'Dr. Rafael Menezes, CRM-RJ 52.000.001',
	},
});
