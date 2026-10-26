import type { Shape } from '../types';
import type { privacy as ptShape } from '../pt/privacy';

export const privacy: Shape<typeof ptShape> = {
	eyebrow: 'Privacidad',
	title: 'Política de privacidad',
	lead: 'Este sitio tiene un formulario de contacto y nada más. Aquí está, sin jerga legal, lo que pasa con lo que envías.',
	updated: 'Actualizado en septiembre de 2026',
	contactLabel: 'Dudas o solicitudes:',
	umami: 'Umami: conteo agregado de visitas, de hasta dónde se desplazó la página y de clics en los botones de contacto, sin cookies y sin identificar personas.',
	sections: [
		{
			id: 'collect',
			h: 'Qué datos recopilo',
			p: [
				'Solo lo que completas en el formulario: nombre, correo electrónico, mensaje y, si los indicas, WhatsApp, empresa y plazo.',
				'Junto con el mensaje, el correo de notificación que me llega incluye la página de origen, el referrer y los parámetros UTM (si existen), además de la dirección IP y el navegador usados en el envío. Eso sirve para entender de dónde vino el contacto y para frenar el spam.',
			],
		},
		{
			id: 'purpose',
			h: 'Para qué',
			p: [
				'Para responder a tu mensaje. Nada más.',
				'Nunca uso tu correo para marketing sin que lo pidas, y no vendo, alquilo ni comparto la lista con nadie.',
			],
		},
		{
			id: 'processors',
			h: 'Quién los procesa',
			p: [
				'Resend: envío del correo de notificación (servidores en EE. UU.).',
				'Google: bandeja de entrada donde llega el mensaje.',
				'Vercel: alojamiento del sitio y analítica agregada, sin cookies y sin identificar personas.',
				'Google Ads: mide las visitas que llegan por los anuncios, con cookies de Google.',
			],
		},
		{
			id: 'retention',
			h: 'Por cuánto tiempo',
			p: [
				'Mientras dure la conversación. Después, el mensaje queda solo en mi bandeja de entrada, como cualquier correo.',
				'Puedes pedir la eliminación en cualquier momento. Te respondo para confirmarla.',
			],
		},
		{
			id: 'rights',
			h: 'Tus derechos',
			p: [
				'La LGPD (ley brasileña de protección de datos) te garantiza el acceso, la corrección y la eliminación de tus datos, además de saber con quién se compartieron.',
				'Para ejercer cualquiera de ellos, solo escribe a contato@fabbahiense.dev.',
			],
		},
		{
			id: 'cookies',
			h: 'Cookies',
			p: [
				'El sitio usa la etiqueta de Google Ads, que guarda cookies de Google para medir los anuncios. Puedes bloquearlo en la configuración del navegador o en adssettings.google.com.',
				'Vercel Web Analytics es agregado y no usa cookies. El único dato que queda en tu navegador es el origen de la visita (UTM) durante la sesión, para completar el formulario, y desaparece cuando cierras la pestaña.',
			],
		},
	],
};
