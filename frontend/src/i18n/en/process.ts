import type { Shape } from '../types';
import type { process as ptShape } from '../pt/process';

export const process: Shape<typeof ptShape> = {
	eyebrow: 'How I work',
	head1: 'From quote',
	head2: 'to deploy.',
	lead: 'Four steps, no hidden stage. You know what happens, when, and what it costs before I write the first line.',
	steps: [
		{
			title: 'Conversation',
			desc: 'You tell me the problem (or send a link to what exists). Within 24 business hours I come back with questions or a proposal.',
		},
		{
			title: 'Fixed proposal',
			desc: 'Scope, deadline and price in writing within 3 business days. No surprises on the invoice.',
		},
		{
			title: 'Build with preview',
			desc: 'You follow along on a preview URL. Adjustments happen during the build, not after.',
		},
		{
			title: 'Deploy + 3 months',
			desc: 'Live on your domain, code in your GitHub, invoice issued, and 3 months of adjustments included.',
		},
	],
	deliverTitle: 'You get',
	deliverables: ['fixed scope', 'a deadline', 'code in your repository', 'contract and invoice', '3 months of adjustments'],
};
