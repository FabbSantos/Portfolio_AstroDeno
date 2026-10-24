import type { Shape } from '../types';
import type { contact as ptShape } from '../pt/contact';

export const contact: Shape<typeof ptShape> = {
	eyebrow: 'Contacto',
	head1: 'Cuéntame el problema.',
	head2: 'En 24 horas hábiles te digo si se puede, cuánto cuesta y cuándo queda listo.',
	sub: 'Hablas directo conmigo, no con un vendedor. Mándame un resumen (o solo el link de lo que existe hoy) y vuelvo con preguntas o con una propuesta.',

	form: {
		name: 'Nombre',
		email: 'Correo electrónico',
		whatsapp: 'WhatsApp',
		company: 'Empresa',
		optional: 'opcional',
		need: 'Qué necesitas',
		needGroupServices: 'Servicios',
		needGroupTemplates: 'Plantillas',
		needGroupOther: 'Otros',
		needTemplate: 'Plantilla: {name}',
		needTemplateAny: 'Una plantilla (aún no decido cuál)',
		needPulsar: 'Acceso a Pulsar',
		needQuasar: 'Acceso a Quasar',
		needOther: 'Otro tema',
		deadline: 'Plazo',
		deadlineAny: 'Aún no lo sé',
		deadlineWeek: 'Esta semana',
		deadlineMonth: 'En los próximos 30 días',
		deadlineQuarter: '1 a 3 meses',
		deadlineFlexible: 'Sin prisa',
		message: 'Mensaje',
		messagePlaceholder: 'Qué necesitas, qué existe hoy y un link, si lo tienes.',
		templatePrefill: '¡Hola! Quiero hablar sobre la plantilla {name}.',
		sending: 'Enviando…',
	},

	lgpd: {
		before: 'Al enviar, aceptas la ',
		link: 'Política de privacidad',
		after: '. Uso tus datos solo para responderte.',
	},
	or: 'o escríbeme directo a',

	sentPage: {
		title: 'Solicitud recibida · Fabrício Bahiense',
		description: 'Solicitud de presupuesto recibida.',
		heading: 'Solicitud recibida',
		body: 'Recibí tu solicitud de presupuesto y te respondo en un máximo de {time}.',
		home: 'Volver al inicio',
	},

	errors: {
		BOT: 'Falló la verificación antispam. Recarga la página e inténtalo de nuevo.',
		RATE_LIMITED: 'Demasiados intentos en poco tiempo. Espera unos minutos o envíalo por correo.',
		SEND_FAILED: 'El servicio de correo no respondió. Inténtalo de nuevo en un momento o escríbeme directo por correo.',
		NOT_CONFIGURED: 'El formulario está fuera de servicio por ahora. Escríbeme por correo y te respondo igual.',
		generic: 'No pude enviarlo. Revisa los campos e inténtalo de nuevo, o escríbeme por correo.',
		mailto: 'Enviar por correo',
		mailSubject: 'Contacto desde el sitio: {need}',
	},

	faq: {
		title: 'Preguntas rápidas',
		items: [
			{
				q: '¿Cuánto tarda?',
				a: 'Plantilla: 3 a 5 días hábiles después del briefing. A medida: desde 2 semanas, con vista previa cada semana.',
			},
			{
				q: '¿Cómo funciona el pago?',
				a: 'Una parte al aceptar, otra en la entrega. Pix o boleto bancario, siempre con factura.',
			},
			{
				q: '¿Quién hace el trabajo?',
				a: 'Yo. Sin subcontratar, sin un junior escondido: quien habla contigo es quien escribe el código.',
			},
			{
				q: '¿Y después del deploy?',
				a: '3 meses de ajustes incluidos. Después, mantenimiento mensual opcional, o el repositorio es tuyo y sigues con quien quieras.',
			},
		],
	},

	social: {
		title: 'Redes',
		github: 'GitHub',
		linkedin: 'LinkedIn',
		instagram: 'Instagram',
	},
};
