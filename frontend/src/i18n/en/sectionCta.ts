import type { Shape } from '../types';
import type { sectionCta as ptShape } from '../pt/sectionCta';

export const sectionCta: Shape<typeof ptShape> = {
	services: "Don't see your case here? Tell me what you need.",
	works: 'Want something at this level for your business?',
	templates: "None of these fits? I'll adapt one or build it from scratch.",
	whatsapp: 'or message me on WhatsApp',
};
