/** /privacidade — plain-language LGPD notice for the contact form. */
export const privacy = {
	eyebrow: 'LGPD',
	title: 'Política de privacidade',
	lead: 'Este site tem um formulário de contato e nada mais. Aqui está, sem juridiquês, o que acontece com o que você manda.',
	updated: 'Atualizado em setembro de 2026',
	contactLabel: 'Dúvidas ou pedidos:',
	/** Appended to "Quem processa" only when Umami is configured (PUBLIC_UMAMI_WEBSITE_ID). */
	umami: 'Umami: contagem agregada de visitas e de cliques nos botões de contato, sem cookies e sem identificar pessoas.',
	sections: [
		{
			id: 'collect',
			h: 'Quais dados eu coleto',
			p: [
				'Só o que você preenche no formulário: nome, e-mail, mensagem e, se você informar, WhatsApp, empresa e prazo.',
				'Junto com a mensagem, o e-mail de notificação que chega pra mim inclui a página de origem, o referrer e os parâmetros UTM (se existirem), além do endereço IP e do navegador usados no envio. Isso serve pra entender de onde o contato veio e pra barrar spam.',
			],
		},
		{
			id: 'purpose',
			h: 'Pra quê',
			p: [
				'Pra responder ao seu contato. Só isso.',
				'Nunca uso o seu e-mail pra marketing sem você pedir, e não vendo, alugo nem compartilho a lista com ninguém.',
			],
		},
		{
			id: 'processors',
			h: 'Quem processa',
			p: [
				'Resend: envio do e-mail de notificação (servidores nos EUA).',
				'Google: caixa de entrada onde a mensagem chega.',
				'Vercel: hospedagem do site e analytics agregados, sem cookies e sem identificar pessoas.',
			],
		},
		{
			id: 'retention',
			h: 'Por quanto tempo',
			p: [
				'Enquanto durar a conversa. Depois disso, a mensagem fica só na minha caixa de entrada, como qualquer e-mail.',
				'Você pode pedir a exclusão a qualquer momento. Respondo confirmando.',
			],
		},
		{
			id: 'rights',
			h: 'Seus direitos',
			p: [
				'A LGPD garante a você acesso, correção e exclusão dos seus dados, além de saber com quem eles foram compartilhados.',
				'Pra exercer qualquer um deles, é só escrever pra contato@fabbahiense.dev.',
			],
		},
		{
			id: 'cookies',
			h: 'Cookies',
			p: [
				'O site não usa cookies de rastreamento nem pixels de anúncio.',
				'O Vercel Web Analytics é agregado e não usa cookies. O único dado que fica no seu navegador é a origem da visita (UTM) durante a sessão, pra preencher o formulário, e some quando você fecha a aba.',
			],
		},
	],
} as const;
