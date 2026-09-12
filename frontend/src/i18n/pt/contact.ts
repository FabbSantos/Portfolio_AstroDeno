/** Home contact section (#contato): form, success/error states, micro-FAQ. */
export const contact = {
	eyebrow: 'Contato',
	head1: 'Me conta o problema.',
	head2: 'Em 24h úteis eu te digo se dá, quanto custa e quando fica pronto.',
	sub: 'Você fala direto comigo, não com um comercial. Manda um resumo (ou só o link do que existe hoje) e eu volto com perguntas ou com proposta.',

	form: {
		name: 'Nome',
		email: 'Email',
		whatsapp: 'WhatsApp',
		company: 'Empresa',
		optional: 'opcional',
		need: 'O que você precisa',
		needGroupServices: 'Serviços',
		needGroupTemplates: 'Templates',
		needGroupOther: 'Outros',
		needTemplate: 'Template: {name}',
		needTemplateAny: 'Um template (ainda decidindo qual)',
		needPulsar: 'Acesso ao Pulsar',
		needQuasar: 'Acesso ao Quasar',
		needOther: 'Outro assunto',
		deadline: 'Prazo',
		deadlineAny: 'Ainda não sei',
		deadlineWeek: 'Essa semana',
		deadlineMonth: 'Até 30 dias',
		deadlineQuarter: '1 a 3 meses',
		deadlineFlexible: 'Sem pressa',
		message: 'Mensagem',
		messagePlaceholder: 'O que você precisa, o que já existe hoje e um link, se tiver.',
		templatePrefill: 'Oi! Quero conversar sobre o template {name}.',
		sending: 'Enviando…',
	},

	lgpd: {
		before: 'Ao enviar, você concorda com a ',
		link: 'Política de Privacidade',
		after: '. Uso os dados só pra responder você.',
	},
	or: 'ou escreve direto em',

	success: {
		title: 'Recebi, {name}!',
		body: 'Respondo em até 24h úteis. Se for urgente, WhatsApp.',
		bodyNoWhatsapp: 'Respondo em até 24h úteis.',
		linkedin: 'Me achar no LinkedIn',
	},

	errors: {
		BOT: 'A verificação anti-spam falhou. Recarrega a página e tenta de novo.',
		RATE_LIMITED: 'Muitas tentativas em pouco tempo. Espera alguns minutos ou manda por e-mail.',
		SEND_FAILED: 'O serviço de e-mail não respondeu. Tenta de novo em instantes ou manda direto por e-mail.',
		NOT_CONFIGURED: 'O formulário está temporariamente fora do ar. Manda por e-mail que eu respondo do mesmo jeito.',
		generic: 'Não consegui enviar. Confere os campos e tenta de novo, ou manda por e-mail.',
		mailto: 'Mandar por e-mail',
		mailSubject: 'Contato pelo site: {need}',
	},

	faq: {
		title: 'Perguntas rápidas',
		items: [
			{
				q: 'Quanto tempo leva?',
				a: 'Template: 3 a 5 dias úteis depois do briefing. Sob medida: a partir de 2 semanas, com preview toda semana.',
			},
			{
				q: 'Como funciona o pagamento?',
				a: 'Parte no aceite, parte na entrega. Pix ou boleto, sempre com nota fiscal.',
			},
			{
				q: 'Quem faz o trabalho?',
				a: 'Eu. Sem repasse, sem júnior escondido: quem conversa com você é quem escreve o código.',
			},
			{
				q: 'E depois do deploy?',
				a: '3 meses de ajustes inclusos. Depois, manutenção mensal opcional, ou o repositório é seu e você segue com quem quiser.',
			},
		],
	},

	social: {
		title: 'Redes',
		github: 'GitHub',
		linkedin: 'LinkedIn',
		instagram: 'Instagram',
	},
} as const;
