/**
 * Demo config for the portfolio page /templates/pimenta/demo (example
 * "restaurante"; the café example is demo.cafe.config.ts).
 * Fictional bar and people. Photos: Unsplash License (dishes, drinks and hands,
 * no faces tied to the fictional names). No phone, e-mail or WhatsApp number,
 * so nothing on the demo reaches a real person; the reservation runs in demo mode.
 */
import { definePimenta } from './schema';
import pratoHero from './assets/demo/prato-hero.jpg';
import destaqueBife from './assets/demo/destaque-bife.jpg';
import destaquePeixe from './assets/demo/destaque-peixe.jpg';
import destaqueCaipirinha from './assets/demo/destaque-caipirinha.jpg';
import destaqueSalada from './assets/demo/destaque-salada.jpg';
import cozinhaTempero from './assets/demo/cozinha-tempero.jpg';
import cozinhaMontagem from './assets/demo/cozinha-montagem.jpg';
import cozinhaFogao from './assets/demo/cozinha-fogao.jpg';

export default definePimenta({
	businessType: 'Restaurant',
	cuisine: ['Brasileira'],
	priceRange: '$$',
	brand: { name: 'Pimenta Bar e Cozinha', tagline: 'Cozinha brasileira de boteco em Santa Teresa', locale: 'pt-BR' },
	theme: { accent: '#f2b705', bg: '#f6f6f3', bg2: '#ecece6', ink: '#121210', radius: 0 },
	seo: {
		title: 'Pimenta Bar e Cozinha: demo do template Pimenta',
		description: 'Demo do template Pimenta, página de restaurante com cardápio e reserva, por Fab Bahiense. Dados fictícios.',
		canonical: 'https://www.fabbahiense.dev/templates/pimenta/demo',
	},
	contact: {
		form: { provider: 'none' },
	},
	analytics: {},
	legal: { company: 'Pimenta Bar e Cozinha Ltda.', cnpj: '00.000.000/0001-00', lines: [] },
	nav: [
		{ label: 'Cardápio', href: '#cardapio' },
		{ label: 'Da casa', href: '#da-casa' },
		{ label: 'Reservas', href: '#reservas' },
		{ label: 'Onde', href: '#onde' },
	],

	topbar: { cta: 'Reservar' },

	hero: {
		tagline: 'Boteco de bairro em Santa Teresa. Petisco pra dividir, prato do dia saindo do fogo e caipirinha da fruta da estação.',
		title: 'Fogo\nbaixo,\nprato\ncheio.',
		photo: pratoHero,
		photoAlt: 'Prato branco com frango assado, batatas e legumes, visto de cima',
		cta: 'Reservar mesa',
		secondaryCta: 'Ver cardápio',
		instagram: 'https://www.instagram.com/',
	},

	menu: {
		lead: 'Cozinha aberta de terça a domingo. Os pratos mudam um pouco com a feira da semana.',
		categories: [
			{
				name: 'Petiscos',
				items: [
					{ name: 'Bolinho de feijoada', desc: 'Com couve crocante e torresmo.', price: 36 },
					{ name: 'Pastel de camarão', desc: 'Quatro unidades, com molho de pimenta da casa.', price: 42, tags: ['picante'] },
					{ name: 'Dadinho de tapioca', desc: 'Com geleia de pimenta biquinho.', price: 32, tags: ['vegetariano'] },
					{ name: 'Tomate da feira com burrata', desc: 'Azeite, flor de sal e broto de rabanete.', price: 42, tags: ['vegetariano'] },
				],
			},
			{
				name: 'Pratos',
				items: [
					{ name: 'Bife ancho na brasa', desc: 'Farofa de ovo, vinagrete e arroz.', price: 89 },
					{ name: 'Peixe do dia', desc: 'Na manteiga de ervas, com purê de banana-da-terra.', price: 78 },
					{ name: 'Moqueca de palmito e banana', desc: 'Com arroz de coco.', price: 64, tags: ['vegano'] },
					{ name: 'Galinhada da casa', desc: 'Arroz, açafrão da terra e quiabo tostado.', price: 58, tags: ['sem glúten'] },
				],
			},
			{
				name: 'Sobremesas',
				items: [
					{ name: 'Pudim de leite', desc: 'A receita da vó da chef.', price: 22 },
					{ name: 'Mousse de chocolate', desc: 'Com flor de sal e azeite.', price: 24, tags: ['sem glúten'] },
					{ name: 'Goiabada com queijo minas', desc: 'Cascão, servida quente.', price: 19, tags: ['sem glúten'] },
				],
			},
			{
				name: 'Bebidas',
				items: [
					{ name: 'Caipirinha de limão', desc: 'Com cachaça mineira envelhecida.', price: 26 },
					{ name: 'Caipirinha de caju e pimenta', price: 29, tags: ['picante'] },
					{ name: 'Chope pilsen', desc: 'Copo de 330 ml.', price: 16 },
					{ name: 'Limonada suíça', price: 14, tags: ['vegano'] },
				],
			},
		],
		note: 'Couvert artístico de R$ 12 às sextas e sábados. Serviço de 10% opcional. Avise a gente sobre alergias antes de pedir.',
	},

	signature: {
		lead: 'Os quatro que mais saem da cozinha.',
		items: [
			{ name: 'Bife ancho', desc: 'Na brasa, com farofa de ovo e vinagrete.', price: 89, photo: destaqueBife, alt: 'Bife fatiado com legumes grelhados num prato de cerâmica' },
			{ name: 'Peixe do dia', desc: 'Manteiga de ervas e purê de banana-da-terra.', price: 78, photo: destaquePeixe, alt: 'Filé de peixe com aspargos e tomate assado' },
			{ name: 'Caipirinha', desc: 'Limão, cachaça mineira e amendoim de acompanhamento.', price: 26, photo: destaqueCaipirinha, alt: 'Caneca de caipirinha de limão com amendoim ao lado' },
			{ name: 'Tomate com burrata', desc: 'Tomates da feira, flor de sal e brotos.', price: 42, photo: destaqueSalada, alt: 'Salada de tomate com queijo fresco e brotos' },
		],
	},

	crew: {
		lead: 'Três pessoas, um fogão a lenha e muita panela.',
		people: [
			{ name: 'Lu Andrade', role: 'Chef e dona da casa', photo: cozinhaTempero, alt: 'Mão finalizando um prato com sal grosso' },
			{ name: 'Tiago Reis', role: 'Cozinha quente', photo: cozinhaMontagem, alt: 'Cozinheiro de braço tatuado montando um prato com pinça' },
			{ name: 'Nice Ferreira', role: 'Sobremesas e pão', photo: cozinhaFogao, alt: 'Mãos preparando um prato na bancada da cozinha' },
		],
	},

	reservation: {
		times: ['12:00', '13:00', '14:00', '19:00', '20:00', '21:00', '22:00'],
		foot: 'Mesas pra até 12 pessoas. Grupo maior, chama no WhatsApp.',
		delivery: {
			title: 'Prefere em casa?',
			links: [
				{ label: 'iFood', href: 'https://www.ifood.com.br/' },
				{ label: 'Rappi', href: 'https://www.rappi.com.br/' },
			],
		},
	},

	location: {
		address: { street: 'Rua das Pimenteiras, 212', district: 'Santa Teresa', city: 'Rio de Janeiro', state: 'RJ', zip: '20240-000' },
		mapsUrl: 'https://maps.google.com/?q=Santa+Teresa,+Rio+de+Janeiro',
		directions: ['O bonde para na esquina', 'Estacionar na rua é difícil, venha de táxi ou aplicativo', 'Cadeirão e menu infantil'],
		hours: [
			{ days: ['tue', 'wed', 'thu'], opens: '18:00', closes: '00:00' },
			{ days: ['fri', 'sat'], opens: '12:00', closes: '00:00' },
			{ days: ['sun'], opens: '12:00', closes: '18:00' },
		],
		hoursNote: 'Às segundas a cozinha descansa.',
	},

	footer: {
		line: '© 2026 Pimenta Bar e Cozinha',
		wordmark: 'Pimenta',
	},
});
