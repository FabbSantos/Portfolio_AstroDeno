/** Home hero + the featured-projects deck (FeaturedDeck). */
export const hero = {
	/** The h1 is the headline; `headlineAccent` is the trailing phrase rendered with `.hl`. */
	headline: 'Precisa de um site, um sistema ou uma IA no seu produto?',
	headlineAccent: 'Eu faço.',
	/** Two lines max. The proof line and the credential carry the rest. */
	sub: 'Sou o Fabrício, engenheiro de software desde 2018. Já entreguei produto pra construtora, edtech e startup. Aqui você fala comigo do orçamento ao deploy: escopo fechado, prazo combinado e o código fica com você.',
	credential: '{role} · {location} · desde {since}',
	proof: '{years} anos · {products} produtos em produção · respondo em {time}',
	showcase: {
		label: 'Projetos em destaque',
		slide: 'Projeto {n} de {total}',
		goTo: 'Mostrar {title}',
		prev: 'Projeto anterior',
		next: 'Próximo projeto',
		pause: 'Pausar rotação automática',
		play: 'Retomar rotação automática',
	},
} as const;
