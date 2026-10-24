/** /es/about: same keys as the PT dictionary (enforced by Shape). */
import type { Shape } from '../types';
import type { about as ptShape } from '../pt/about';

export const about: Shape<typeof ptShape> = {
	hero: {
		eyebrow: 'Acerca de',
		head1: 'Sobre',
		head2: 'mí.',
		since: 'desde {year}',
		lead: 'Me llamo Fabrício Bahiense y soy de Río de Janeiro. Empecé como técnico en el CEFET/RJ, hice mi pasantía en 2018 y desde entonces no he parado de poner cosas en producción. Aquí va el resumen honesto.',
	},

	stats: {
		years: 'años en producción',
		products: 'productos en línea',
		clients: 'empresas y clientes',
		response: 'tiempo de respuesta',
	},

	story: {
		quote: 'El código es solo la mitad del trabajo. La otra mitad es entender el problema antes de escribir la primera línea.',
		by: 'Fabrício',
		p1: 'Empecé a estudiar desarrollo cuando todavía estaba en la escuela y conseguí mi primera pasantía como full stack. El combo típico de la época: PHP, jQuery, MySQL.',
		p2: 'De ahí pasé por agencias y consultoras como ingeniero frontend y full stack, trabajando con React, Vue, Next y Node, hasta llegar al liderazgo técnico.',
		p3: 'Hoy trabajo como ingeniero de software sénior en plataformas web de alto impacto, y sigo tomando proyectos por mi cuenta, porque es donde más aprendo.',
		human: 'Padre, esposo, solucionador de problemas. Varias capas, como una cebolla. Amo el fútbol, la música, los videojuegos, la cerveza, la ciencia, la astronomía y, claro, la tecnología.',
	},

	career: {
		eyebrow: 'Trayectoria',
		head1: 'De pasante',
		head2: 'a sénior.',
		lead: 'Algunos puestos, algunos stacks, un principio: software que entra en producción y se mantiene en pie.',
		current: 'actual',
		rows: [
			{
				period: '2016 a 2019',
				role: 'Bachillerato técnico · CEFET/RJ',
				desc: 'Educación media + técnico en informática. Empecé a programar por curiosidad.',
				tags: ['HTML', 'JS', 'PHP'],
			},
			{
				period: '2018 a 2019',
				role: 'Pasantía full stack',
				desc: 'Primer empleo: sitios institucionales, formularios, integraciones simples.',
				tags: ['PHP', 'jQuery', 'MySQL'],
			},
			{
				period: '2020 a 2022',
				role: 'Frontend · MKT4Edu',
				desc: 'Landing pages y campañas de marketing en volumen. HubSpot + React.',
				tags: ['HubSpot', 'React', 'HTML'],
			},
			{
				period: '2022 a 2024',
				role: 'Frontend / Full stack · BJ Consulting',
				desc: 'Clientes diversos. Astro la mayor parte del tiempo; Qwik cuando tuvo sentido.',
				tags: ['Astro', 'Qwik', 'TypeScript'],
			},
			{
				period: 'ago/24 a ene/25',
				role: 'Líder de producto · LocalApp / Lumina Lab',
				desc: 'Startup de productos con IA. Lideré Eleodora, una agente con personalidad, hecha para sonar como el cliente que la iba a contratar.',
				tags: ['IA', 'LLM', 'React'],
			},
			{
				period: 'ene/25 a may/25',
				role: 'Tech Lead · Nexus Comunicação',
				desc: 'Plataforma multicanal (SMS, WhatsApp, RCS): panel del cliente, API en Node, colas con Redis, infra AWS/Lightsail. Vue + Nuxt + Astro + Next.',
				tags: ['Vue', 'Nuxt', 'Node', 'AWS'],
			},
			{
				period: 'may/25 hasta hoy',
				role: 'Especialista sénior · NTT Data',
				desc: 'Full stack sénior en el banco más grande de América Latina.',
				tags: ['C#', 'AWS', 'DevOps'],
			},
		],
	},

	how: {
		eyebrow: 'Cómo trabajo',
		head1: 'Sin sorpresas',
		head2: 'a mitad de camino.',
		lead: 'Cuatro reglas que valen para todo proyecto, desde la plantilla de una semana hasta el sistema de seis meses.',
		principles: [
			{
				title: 'Alcance cerrado por fase',
				desc: 'Sabes qué entra, qué queda fuera y cuánto cuesta antes de la primera línea. ¿Cambiaste de idea? Cerramos la fase siguiente, sin rehacer las cuentas de la anterior.',
			},
			{
				title: 'Vista previa cada semana',
				desc: 'Cada semana recibes un link para ver el proyecto tal como está. Nada de desaparecer un mes y volver con sorpresas.',
			},
			{
				title: 'El código es tuyo',
				desc: 'Repositorio en tu GitHub desde el día 1. ¿Quieres cambiar de desarrollador mañana? El proyecto se va contigo, documentado y sin ataduras.',
			},
			{
				title: 'Sin intermediarios',
				desc: 'Hablas conmigo. Quien hace el presupuesto, quien programa y quien responde tus mensajes es la misma persona.',
			},
		],
		availabilityLabel: 'Disponibilidad',
		format: 'Proyectos cerrados o paquete mensual de horas.',
	},

	stack: {
		label: 'Stack del día a día',
		line: 'TypeScript · React · Vue · Next · Nuxt · Astro · Node · C# · AWS · Redis · Postgres',
	},

	cta: {
		head1: '¿Te gustó?',
		head2: 'Hablemos.',
		sub: 'Respondo en 24 horas hábiles. Hablas directo conmigo.',
	},
};
