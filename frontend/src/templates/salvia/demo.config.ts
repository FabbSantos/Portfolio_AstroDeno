/**
 * Demo config for the portfolio page /templates/salvia/demo.
 * Fictional clinic, people, registries and insurers. Photos: Unsplash License
 * (interiors only, no people). No phone, e-mail or WhatsApp number, so nothing
 * on the demo reaches a real person; the booking widget runs in demo mode.
 */
import { defineSalvia } from './schema';
import recepcao from './assets/demo/recepcao.jpg';
import salaAtendimento from './assets/demo/sala-atendimento.jpg';
import consultorioOdonto from './assets/demo/consultorio-odonto.jpg';

export default defineSalvia({
	brand: { name: 'Clínica Sálvia', tagline: 'Clínica integrada em Botafogo', locale: 'pt-BR' },
	theme: { accent: '#3b7457', bg: '#f5f6f1', ink: '#18231c', radius: 12 },
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
		{ label: 'Especialidades', href: '#especialidades' },
		{ label: 'Equipe', href: '#equipe' },
		{ label: 'Convênios', href: '#convenios' },
		{ label: 'Onde estamos', href: '#onde' },
	],

	topbar: { cta: 'Agendar' },

	hero: {
		eyebrow: 'Clínica integrada · Botafogo, Rio',
		title: 'Cuidado de perto,\n**sem pressa**.',
		sub: 'Seis especialidades no mesmo endereço. Você marca pelo WhatsApp em dois toques e é atendido por quem conhece o seu histórico.',
		photo: recepcao,
		photoAlt: 'Recepção da clínica com arcos brancos e mesas de madeira',
		highlights: ['Particular e convênios', 'Estacionamento conveniado', 'Acessível pra cadeira de rodas'],
		cta: 'Agendar pelo WhatsApp',
		secondaryCta: 'Ver especialidades',
	},

	services: {
		items: [
			{ name: 'Clínica geral', icon: 'stethoscope', desc: 'Check-up, acompanhamento de rotina e encaminhamento pro especialista certo.' },
			{ name: 'Dermatologia', icon: 'drop', desc: 'Consulta, avaliação de pintas e tratamento de acne, manchas e queda de cabelo.' },
			{ name: 'Odontologia', icon: 'tooth', desc: 'Limpeza, restaurações, clareamento e ortodontia.' },
			{ name: 'Fisioterapia', icon: 'bone', desc: 'Reabilitação ortopédica, dor nas costas e pós-operatório.' },
			{ name: 'Nutrição', icon: 'apple', desc: 'Plano alimentar pra emagrecimento, performance e saúde intestinal.' },
			{ name: 'Psicologia', icon: 'brain', desc: 'Terapia individual para adultos, presencial ou online.' },
		],
	},

	booking: {
		foot: 'A recepção responde em até 1 hora no horário de atendimento.',
	},

	team: {
		lead: 'Profissionais com registro ativo no conselho de cada área.',
		people: [
			{ name: 'Dr. Rafael Menezes', role: 'Clínica geral · diretor técnico', registry: 'CRM-RJ 52.000.001', bio: 'Acompanha o paciente do check-up ao encaminhamento.' },
			{ name: 'Dra. Helena Duarte', role: 'Dermatologia', registry: 'CRM-RJ 52.000.002', bio: 'Atende pele, cabelo e unhas, com foco em acne e manchas.' },
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
			{ image: salaAtendimento, alt: 'Sala de atendimento com maca, pia e móveis de madeira' },
			{ image: consultorioOdonto, alt: 'Consultório odontológico claro com cadeira e equipamentos' },
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
		line: '© 2026 · Clínica Sálvia · Botafogo, Rio de Janeiro',
		technicalLead: 'Dr. Rafael Menezes · CRM-RJ 52.000.001',
	},
});
