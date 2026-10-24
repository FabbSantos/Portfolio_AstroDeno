import type { Shape } from '../types';
import type { templates as ptShape } from '../pt/templates';

export const templates: Shape<typeof ptShape> = {
	numberWords: ['cero', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'],

	price: {
		onRequest: 'A consultar',
		was: 'antes',
		now: 'ahora',
		until: 'promoción hasta el {date}',
		bandPromo: 'En promoción: desde {price} hasta el {date}.',
		bandFull: 'Desde {price}.',
	},

	band: {
		eyebrow: 'Plantillas · sitios listos en días',
		head: '¿Necesitas algo',
		headAccent: 'en línea esta semana?',
		lead: '{N} plantillas que escribí yo mismo. Tú eliges una, yo cambio marca, colores y textos y la publico en tu dominio en {days} días hábiles.',
		viewAll: 'Ver todas las plantillas',
		scoreLine: 'Puntuación mínima de {min} en Lighthouse en celular, medida en cada demo',
		listLabel: 'Plantillas disponibles',
		scrollPrev: 'Plantilla anterior',
		scrollNext: 'Siguiente plantilla',
	},

	gallery: {
		eyebrow: 'Plantillas',
		head: 'Elige un',
		headAccent: 'punto de partida.',
		lead: '{N} estructuras listas, cada una mostrada con un ejemplo de contenido. Tu negocio ocupa el lugar del ejemplo, y el precio incluye personalización, dominio configurado, SEO y {months} meses de ajustes.',
		listLabel: 'Todas las plantillas',
	},

	card: {
		open: 'Ver plantilla',
		includes: 'Incluye configuración del dominio, SSL, SEO y {months} meses de ajustes',
		previewAlt: 'Vista previa de la plantilla {name}',
		hoverHint: 'pasa el mouse para desplazar',
		demo: 'Ver demo',
		fits: 'Sirve para:',
		demoAs: 'En la demo: {what}',
		isNew: 'Nueva',
		scoreLabel: 'Lighthouse',
		scoreDevice: 'celular',
		scoreSr: 'Puntuación {score} de 100 en Lighthouse, celular',
		scoreShort: {
			mobile: 'Celular',
			desktop: 'Computadora',
			accessibility: 'Accesibilidad',
			bestPractices: 'Buenas prácticas',
		},
	},

	compare: {
		eyebrow: '¿Cuál es la mía?',
		title: 'Compara en diez segundos',
		sub: 'Para qué sirve, plazo y precio lado a lado. Toca la tarjeta para seleccionarla.',
		criterion: 'Criterio',
		rows: {
			who: 'sirve para',
			days: 'plazo',
			price: 'desde',
			sections: 'secciones',
		},
		toggle: {
			label: 'Plazo de entrega',
			standard: 'Entrega estándar · {days} días hábiles',
			express: 'Entrega exprés · {hours}h',
		},
		plansLabel: 'Elige una plantilla',
		selectedLabel: 'Seleccionada',
		deliveryExpress: '{hours}h',
		matrixCaption: 'Qué incluye cada plantilla',
		included: 'Incluido',
		notIncluded: 'No incluido',
		features: {
			lead: 'Formulario de leads + WhatsApp',
			menu: 'Menú con precios',
			reservation: 'Reserva de mesa por WhatsApp',
			booking: 'Citas por WhatsApp',
			hours: 'Horario con "abierto ahora"',
			gallery: 'Galería de fotos',
			plans: 'Opciones con imagen y mapa',
			pricing: 'Tabla de planes y preguntas frecuentes',
			countdown: 'Cuenta regresiva y vitrina',
			cases: 'Cuadrícula de trabajos',
			newsletter: 'Newsletter',
			legal: 'Página de privacidad y 404',
			seo: 'SEO técnico y analítica',
			adjustments: '{months} meses de ajustes',
		},
		cta: 'Quiero {name}',
	},

	detail: {
		back: 'Todas las plantillas',
		meta: 'Plantilla {n}/{total} · {cat} · entrega en {days} días hábiles',
		want: 'Quiero esta plantilla',
		fullDemo: 'Abrir demo en pantalla completa',
		demoTitle: 'Demo de la plantilla {name}',
		demoNote: 'Demo en vivo: desplázate y haz clic con total libertad. Marca, textos e imágenes son ficticios; en la tuya van los tuyos.',
		sectionsTitle: 'Qué incluye la plantilla',
		related: 'Otras plantillas',
		fitsTitle: 'Sirve para',
		exampleLabel: 'Ejemplo',
		exampleNote: 'Misma estructura, otro negocio. Cambia el ejemplo para verlo.',
		scores: {
			title: 'Puntuación en Google Lighthouse',
			mobile: 'Rendimiento en celular',
			desktop: 'Rendimiento en computadora',
			accessibility: 'Accesibilidad',
			bestPractices: 'Buenas prácticas',
			outOf: 'de 100',
			note: 'Medido en esta demo con Lighthouse {version}, el mismo análisis de PageSpeed Insights. Mediana de {runs} mediciones, el {date}.',
		},
		device: {
			label: 'Ver como',
			desktop: 'Escritorio',
			mobile: 'Celular',
		},
	},

	included: {
		title: 'Qué viene incluido',
		items: [
			'Publicado en tu dominio (el dominio corre por tu cuenta; yo configuro DNS y SSL)',
			'SEO técnico y Lighthouse por encima de 90 en celular',
			'Personalización de logo, colores, textos e imágenes',
			'{months} meses de ajustes',
			'Código entregado en tu repositorio después del pago',
		],
	},

	steps: {
		title: 'Cómo funciona',
		items: [
			{
				title: 'Elige una plantilla',
				desc: 'Abre las demos, mira cuál conecta con tu público y mándame el enlace.',
			},
			{
				title: 'Yo la personalizo',
				desc: 'Marca, colores, textos e imágenes. Tú mandas el material, yo lo adapto.',
			},
			{
				title: 'Queda en línea',
				desc: 'En tu dominio, con SSL y SEO configurados. Ajustes incluidos por {months} meses.',
			},
		],
	},

	cta: {
		head: '¿Es esta',
		headAccent: 'la tuya?',
		sub: 'Mándame tu dominio, tu logo y lo que hay que cambiar. En pocos días hábiles el sitio sale al aire.',
		button: 'Quiero una plantilla',
		whatsappGallery: '¡Hola, Fabrício! Quiero saber más sobre las plantillas.',
		whatsappDetail: '¡Hola, Fabrício! Quiero saber más sobre la plantilla {name}.',
	},

	demoFormNote: 'Demo: el formulario real se conecta en tu deploy',
};
