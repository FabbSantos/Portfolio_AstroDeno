# Pimenta: cardápio e reserva com cara de cartaz

Página pra qualquer lugar que serve comida ou bebida: restaurante, bar e boteco, café e padaria, hamburgueria. Títulos gigantes em condensada, blocos de cor chapada no lugar de cards, cantos retos e um círculo como forma recorrente. O centro é o cardápio com preços e a reserva que monta a mensagem no WhatsApp. Horário ao vivo ("Aberto agora · fecha às 23h") e SEO local (`Restaurant` ou o subtipo do lugar, com cardápio e reservas).

O template é a estrutura; o conteúdo é de exemplo. São duas demos, em português:

| Exemplo | URL | Config |
| --- | --- | --- |
| Restaurante | `/templates/pimenta/demo` | `demo.config.ts` (`Restaurant`, amarelo mostarda) |
| Café | `/templates/pimenta/demo/cafe` | `demo.cafe.config.ts` (`CafeOrCoffeeShop`, azul cobalto) |

Referências do 21st.dev usadas no desenho (direção B, "Retrato com personalidade"): Minimalist Hero (ravikatiyar162), Restaurant Menu Block (7ovr), Hover Expand Gallery (kedhareswer) e Team Showcase (makviesainte). Tudo reescrito em Astro e CSS, sem React nem Framer Motion.

Feito pro modelo de entrega rápida: **só hero, cardápio, reserva e localização são obrigatórios**. Pratos da casa e quem faz aparecem apenas quando o bloco existe no config. Os títulos das seções já têm texto padrão, então o config do cliente é quase só dado.

```
pimenta/
  schema.ts             pimentaSchema = core baseSiteSchema + seções · definePimenta() · PimentaConfig
  menu.ts               preço, data, mensagem de reserva (roda no navegador) e JSON-LD Restaurant
  fonts.ts              fonte condensada pré-carregada (o título do hero pinta nela)
  demo.config.ts        exemplo Restaurante (bar fictício)
  demo.cafe.config.ts   exemplo Café (padaria fictícia)
  PimentaBody.astro     fontes + seções + script do status de horário
  PimentaPage.astro     core Page + PimentaBody; falha o build sem contact.whatsapp
  styles.css            regras compartilhadas (tipos, cabeçalho de seção, botão, link, status, topbar)
  sections/             Topbar · Hero · Menu · Signature · Crew · Reservation · Location · Footer · _md.ts
```

O horário ("aberto agora", tabela da semana, JSON-LD) vem de `core/hours.ts`, compartilhado com a Sálvia.

## Fontes e cor

Big Shoulders Display (títulos) e Schibsted Grotesk (texto), via `@fontsource-variable`. O scaffold adiciona os dois pacotes ao `package.json` do cliente. A `accent` é usada como cor chapada (círculo, faixa da reserva, marcas), nunca como texto pequeno. O texto sobre ela vira preto ou branco sozinho, conforme a luminosidade da cor (amarelo dá preto, azul dá branco). Use `radius: 0`.

## Config

Base (core): `brand`, `theme`, `seo`, `contact`, `analytics`, `legal`, `nav`. Strings **md** aceitam `**texto**` (marca-texto na cor de destaque) e `==texto==` (bloco de cor).

| Seção | Campos |
| --- | --- |
| `businessType` | tipo do schema.org (padrão `'Restaurant'`): `BarOrPub`, `CafeOrCoffeeShop`, `Bakery`, `FastFoodRestaurant`… |
| `cuisine`, `priceRange?` | `['Brasileira']`, `'$$'` (vão pro JSON-LD) |
| `topbar` | `cta` (padrão `'Reservar'`, leva a `#reservas`) |
| `hero` | `tagline`, `title` (cada linha fica numa linha só: quebre com `\n` e use palavras curtas), `photo` (quadrada 1200×1200, prato ou xícara vista de cima; vira círculo), `photoAlt`, `cta`, `secondaryCta`, `instagram?` |
| `menu` | `title` (padrão `'Cardápio'`), `lead?`, `categories: [{ name, items: [{ name, desc?, price, tags? }] }]` (1 a 8 categorias; `price` em reais, 0 mostra "consulte"; `tags` até 3, tipo `'vegano'`, `'sem glúten'`, `'picante'`), `note?`, `full?: { label, href }` |
| `signature?` | `title` (padrão `'Da casa'`), `lead?`, `items: [{ name, desc?, price?, photo, alt }]` (3 a 6; retrato 900×1200) |
| `crew?` | `title` (padrão `'Quem faz'`), `lead?`, `people: [{ name, role, photo, alt }]` (2 a 4; retrato 800×1000, mãos ou costas funcionam tão bem quanto rosto) |
| `reservation` | tudo com padrão: `times` (`['12:00', …]`), `maxPeople` (12), `message` (`{pessoas}` `{data}` `{horario}`), `nameSentence` (`{nome}`), rótulos, `cta`, `foot?`, `delivery?: { title, links: [{ label, href }] }` |
| `location` | `address: { street, district?, city, state (UF), zip? }`, `mapsUrl?`, `directions: string[]`, `hoursTitle`, `hours: [{ days, opens, closes }]` (`closes: '00:00'` é meia-noite; horário que vira o dia não é suportado), `timezone`, `hoursNote?` |
| `footer` | `line`, `wordmark?` (nome gigante; padrão `brand.name`, uma palavra curta fica melhor) |

`contact.whatsapp` é **obrigatório no site do cliente**: a reserva abre o WhatsApp. As demos do portfólio rodam sem número (mostram um aviso no lugar).

`seo.jsonLd` é gerado sozinho com o `businessType`, cozinha, faixa de preço, âncora do cardápio e `acceptsReservations`.

## O que pedir ao cliente

| Item | Formato |
| --- | --- |
| Nome, bairro, cidade e uma frase sobre o lugar | texto |
| Cardápio com preços (pode ser foto do cardápio impresso) | texto ou foto |
| Horários por dia | texto |
| Endereço, link do Google Maps, como chegar | texto |
| WhatsApp de reservas | número com DDD |
| Links de delivery (iFood, Rappi) e Instagram | links |
| Razão social e CNPJ | texto |
| Foto do prato ou da bebida mais famosa, vista de cima (`prato-hero.jpg`) | JPG quadrado 1200×1200 |
| Opcional: 3 a 6 pratos da casa (`destaque-*.jpg`) | JPG retrato 900×1200 |
| Opcional: equipe, com fotos na cozinha ou no balcão (`cozinha-*.jpg`) | JPG retrato 800×1000 |

## Como adicionar outro exemplo

1. `demo.<chave>.config.ts` nesta pasta, copiando um dos exemplos e trocando textos, fotos (`assets/demo/<chave>-*.jpg`), `theme` e `businessType`.
2. `src/pages/templates/pimenta/demo/<chave>.astro`, igual a `demo/cafe.astro` com o import e `example='<chave>'` trocados.
3. Uma linha em `examples` do template em `src/data/templates.ts`.

## O que o scaffold gera

`node scripts/new-client.mjs --template pimenta --form whatsapp …` → `client-starter/` com `src/templates/core/` + `src/templates/pimenta/` vendorados (sem configs de demo nem `assets/demo`), as fontes no `package.json`, `src/site.config.ts` com o conteúdo do exemplo Restaurante e campos `TODO_` (incluindo `contact.whatsapp.number`), `src/assets/README.md`, páginas `index` (`PimentaPage`), `privacidade`, `obrigado` e `404`. Com `--example cafe`, o `site.config.ts` parte do exemplo Café.
