/** EN dictionary — one file per section. Do not add keys here; add them in the section file. */
import { common } from './common';
import { nav } from './nav';
import { meta } from './meta';
import { hero } from './hero';
import { works } from './works';
import { services } from './services';
import { clients } from './clients';
import { aboutShort } from './aboutShort';
import { templates } from './templates';
import { contact } from './contact';
import { footer } from './footer';
import { about } from './about';
import { work } from './work';
import { process } from './process';
import { testimonials } from './testimonials';
import { notFound } from './notFound';
import { privacy } from './privacy';

export const en = {
	common,
	nav,
	meta,
	hero,
	works,
	services,
	clients,
	aboutShort,
	templates,
	contact,
	footer,
	about,
	work,
	process,
	testimonials,
	notFound,
	privacy,
} as const;
