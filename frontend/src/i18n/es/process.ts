import type { Shape } from '../types';
import type { process as ptShape } from '../pt/process';

export const process: Shape<typeof ptShape> = {
	eyebrow: 'Cómo trabajo',
	head1: 'Del presupuesto',
	head2: 'al deploy.',
	lead: 'Cuatro pasos, sin etapas ocultas. Sabes qué pasa, cuándo y cuánto cuesta antes de que escriba la primera línea.',
	steps: [
		{
			title: 'Conversación',
			desc: 'Me cuentas el problema (o me mandas el link de lo que ya existe). En 24 horas hábiles vuelvo con preguntas o una propuesta.',
		},
		{
			title: 'Propuesta cerrada',
			desc: 'Alcance, plazo y precio por escrito en un máximo de 3 días hábiles. Sin sorpresas en la factura.',
		},
		{
			title: 'Desarrollo con vista previa',
			desc: 'Sigues el avance en una URL de vista previa. Los ajustes se hacen durante, no después.',
		},
		{
			title: 'Deploy + 3 meses',
			desc: 'Publicado en tu dominio, código en tu GitHub, factura y 3 meses de ajustes incluidos.',
		},
	],
	deliverTitle: 'Recibes',
	deliverables: ['alcance cerrado', 'plazo', 'código en tu repositorio', 'contrato y factura', '3 meses de ajustes'],
};
