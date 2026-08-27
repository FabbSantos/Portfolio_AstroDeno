import type { Shape } from '../types';
import type { notFound as ptShape } from '../pt/notFound';

export const notFound: Shape<typeof ptShape> = {
	eyebrow: 'Error 404',
	head1: 'This page',
	head2: "doesn't exist.",
	sub: 'The link may have moved. The most useful paths are right below.',
	work: 'See work',
	templates: 'See templates',
	contact: 'Get in touch',
};
