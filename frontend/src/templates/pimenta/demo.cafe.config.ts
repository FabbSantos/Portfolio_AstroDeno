/**
 * Second example for the Pimenta template: /templates/pimenta/demo/cafe.
 * Same structure as the restaurant demo with a café and bakery's content, to
 * show the template is not tied to one kind of place. Fictional café and
 * people. Photos: Unsplash License (coffee, pastries and hands). No phone,
 * e-mail or WhatsApp number; the reservation runs in demo mode.
 */
import { definePimenta } from './schema';
import cafeHero from './assets/demo/cafe-hero.jpg';
import croissant from './assets/demo/cafe-destaque-croissant.jpg';
import canela from './assets/demo/cafe-destaque-canela.jpg';
import torta from './assets/demo/cafe-destaque-torta.jpg';
import cappuccino from './assets/demo/cafe-destaque-cappuccino.jpg';
import balcaoXicara from './assets/demo/cafe-balcao-xicara.jpg';
import balcaoTamper from './assets/demo/cafe-balcao-tamper.jpg';
import balcaoMaquina from './assets/demo/cafe-balcao-maquina.jpg';

export default definePimenta({
	businessType: 'CafeOrCoffeeShop',
	cuisine: ['Café', 'Padaria'],
	priceRange: '$',
	brand: { name: 'Miga Café e Padaria', tagline: 'Café de torra própria e pão de fermentação natural no Batel', locale: 'pt-BR' },
	theme: { accent: '#2447d6', bg: '#f4f5f7', bg2: '#e8eaf0', ink: '#0f1222', radius: 0 },
	seo: {
		title: 'Miga Café e Padaria: demo do template Pimenta',
		description: 'Demo do template Pimenta com uma padaria e café de exemplo, por Fab Bahiense. Dados fictícios.',
		canonical: 'https://www.fabbahiense.dev/templates/pimenta/demo/cafe',
	},
	contact: {
		form: { provider: 'none' },
	},
	analytics: {},
	legal: { company: 'Miga Panificação Ltda.', cnpj: '00.000.000/0001-00', lines: [] },
	nav: [
		{ label: 'Cardápio', href: '#cardapio' },
		{ label: 'Fornadas', href: '#da-casa' },
		{ label: 'Reservas', href: '#reservas' },
		{ label: 'Onde', href: '#onde' },
	],

	topbar: { cta: 'Reservar' },

	hero: {
		tagline: 'Padaria de fermentação natural e café de torra própria no Batel, em Curitiba. Pão saindo do forno às 7h e às 16h.',
		title: 'Pão\nquente,\ncafé\nforte.',
		photo: cafeHero,
		photoAlt: 'Cappuccino com desenho de folha na espuma, visto de cima sobre uma mesa de madeira',
		cta: 'Reservar mesa',
		secondaryCta: 'Ver cardápio',
		instagram: 'https://www.instagram.com/',
	},

	menu: {
		lead: 'Tudo feito aqui, da massa-mãe ao doce de leite.',
		categories: [
			{
				name: 'Cafés',
				items: [
					{ name: 'Espresso', desc: 'Grão da semana, torra média.', price: 8 },
					{ name: 'Cappuccino', desc: 'Com leite vaporizado e cacau.', price: 14 },
					{ name: 'Coado do dia', desc: 'Pergunte a origem no balcão.', price: 12 },
					{ name: 'Mocha', desc: 'Espresso, leite e chocolate 70%.', price: 17 },
				],
			},
			{
				name: 'Fornadas',
				items: [
					{ name: 'Pão de fermentação natural', desc: 'Inteiro, 800 g.', price: 32, tags: ['vegano'] },
					{ name: 'Croissant de manteiga', price: 14 },
					{ name: 'Rolinho de canela', desc: 'Com cobertura de cream cheese.', price: 13 },
					{ name: 'Pão de queijo', desc: 'Seis unidades.', price: 16, tags: ['sem glúten'] },
				],
			},
			{
				name: 'Café da manhã',
				items: [
					{ name: 'Tostada com ovos mexidos', desc: 'No pão da casa, com manteiga de ervas.', price: 29, tags: ['vegetariano'] },
					{ name: 'Iogurte com granola', desc: 'Granola da casa e mel.', price: 24, tags: ['vegetariano'] },
					{ name: 'Misto quente', desc: 'Presunto cozido e queijo prato no pão de fermentação.', price: 22 },
				],
			},
			{
				name: 'Doces',
				items: [
					{ name: 'Torta de frutas vermelhas', desc: 'Fatia.', price: 21 },
					{ name: 'Bolo de laranja', desc: 'Fatia, com calda.', price: 12 },
					{ name: 'Cookie de chocolate', desc: 'Com flor de sal.', price: 11 },
				],
			},
		],
		note: 'Leite vegetal sem custo extra. Avise a gente sobre alergias antes de pedir.',
	},

	signature: {
		title: 'Fornadas',
		lead: 'O que acaba primeiro. Chegue cedo ou reserve.',
		items: [
			{ name: 'Croissant', desc: 'Manteiga francesa, 27 camadas.', price: 14, photo: croissant, alt: 'Croissants e pães de chocolate sobre uma tábua com rolo de massa' },
			{ name: 'Rolinho de canela', desc: 'Com cobertura de cream cheese.', price: 13, photo: canela, alt: 'Bandeja de rolinhos de canela dourados' },
			{ name: 'Torta de frutas', desc: 'Frutas vermelhas e creme de baunilha.', price: 21, photo: torta, alt: 'Vitrine com tortas de frutas vermelhas e bolos de chocolate' },
			{ name: 'Cappuccino', desc: 'Grão da semana e leite vaporizado.', price: 14, photo: cappuccino, alt: 'Cappuccino com coração na espuma sobre grãos de café' },
		],
	},

	crew: {
		title: 'No balcão',
		lead: 'Quem acorda às quatro pra fornada das sete.',
		people: [
			{ name: 'Rafa Moreira', role: 'Padeira e fundadora', photo: balcaoMaquina, alt: 'Mão compactando café no porta-filtro da máquina' },
			{ name: 'Caio Nunes', role: 'Barista', photo: balcaoXicara, alt: 'Mãos segurando uma xícara de cappuccino com desenho na espuma' },
			{ name: 'Bia Tanaka', role: 'Confeitaria', photo: balcaoTamper, alt: 'Mão pressionando o café moído com um compactador' },
		],
	},

	reservation: {
		title: 'Reserve pro brunch',
		lead: 'No fim de semana as mesas acabam cedo. Escolha o dia, o horário e quantas pessoas.',
		times: ['08:00', '09:00', '10:00', '11:00', '15:00', '16:00'],
		maxPeople: 8,
		foot: 'Mesas pra até 8 pessoas. Encomenda de bolo, chama no WhatsApp.',
		delivery: {
			title: 'Pão em casa',
			links: [
				{ label: 'iFood', href: 'https://www.ifood.com.br/' },
				{ label: 'Rappi', href: 'https://www.rappi.com.br/' },
			],
		},
	},

	location: {
		address: { street: 'Rua dos Fermentos, 88', district: 'Batel', city: 'Curitiba', state: 'PR', zip: '80420-000' },
		mapsUrl: 'https://maps.google.com/?q=Batel,+Curitiba',
		directions: ['Bicicletário na frente', 'Mesas na calçada com espaço pro seu pet', 'Wi-Fi e tomadas no balcão'],
		hours: [
			{ days: ['mon', 'tue', 'wed', 'thu', 'fri'], opens: '07:00', closes: '19:00' },
			{ days: ['sat', 'sun'], opens: '08:00', closes: '17:00' },
		],
		hoursNote: 'Fornadas às 7h e às 16h.',
	},

	footer: {
		line: '© 2026 Miga Café e Padaria',
		wordmark: 'Miga',
	},
});
