# Mirante — página de captação (lançamento imobiliário)

Página de captação no padrão brasileiro, feita para converter visita em contato: formulário curto já no hero, faixa de números, o produto com foto fixa que troca com a rolagem, plantas que abrem em tamanho grande, localização, condições de pagamento, formulário completo e rodapé com CRECI / memorial de incorporação. A demo é um lançamento imobiliário (`/templates/mirante/demo`, `demo.config.ts`), mas a estrutura serve para curso, evento ou qualquer pré-venda.

Visual: a foto manda. Hero de tela inteira com filme de miniaturas, títulos em **Cormorant** num estilo só (o nome da seção, sem palavra em destaque e sem linha acima do título), texto, rótulos e números em **Instrument Sans** (rótulos pequenos, em caixa normal). O template não usa a JetBrains Mono do core. Filetes no lugar de cards, cantos retos, um bloco escuro (localização) e um bloco na cor de destaque (condição em evidência).

Tudo que é do cliente fica no `site.config.ts` (`defineMirante({...})`); as seções só renderizam o que o config diz. Nenhum texto fica no código.

```
mirante/
  schema.ts          miranteSchema = core baseSiteSchema + seções · defineMirante() · MiranteConfig
  demo.config.ts     config do demo (dados fictícios) — mesma forma do site.config.ts do cliente
  MiranteBody.astro  <div class='tpl tpl-mirante'> com as seções em ordem (demo e cliente); importa as fontes
  MirantePage.astro  core Page (head, tokens, WhatsApp, LGPD) + MiranteBody — página do cliente
  fonts.ts           arquivo da Cormorant (só a reta) para <link rel=preload>
  styles.css         regras compartilhadas (wrapper, display, título de seção, botões, skin do LeadForm, MobileNav)
  sections/          Topbar · Hero · Numbers · Project · Plans · Location · Conditions · Lead · Footer · _md.ts
  assets/demo/       imagens do demo (não copiar para o cliente)
```

Fontes: `@fontsource-variable/cormorant` e `@fontsource-variable/instrument-sans` (o scaffold adiciona as duas ao `package.json` do cliente).

## Config

Base (core, obrigatória): `brand` (`name`, `tagline` = bairro exibido ao lado da marca, `logo?`, `locale`), `theme` (`accent`, `bg`, `bg2?`, `ink`, `radius`), `seo`, `contact`, `analytics`, `legal`, `nav`. Veja `core/README.md`. Na demo: `accent #2f5d50`, `bg #ece9e2`, `ink #1a1f1c`, `radius 0`.

Títulos (`hero.title`, o `title` de cada seção e `conditions.items[].headline`) são texto puro, num estilo só: sem `**`, sem `\n`, nenhuma palavra em itálico, negrito ou outra cor. O título de cada seção é o nome dela (`'Plantas'`, `'Localização'`). Strings marcadas **rich** (só texto corrido) aceitam `**negrito**` (negrito simples) e `\n` (quebra de linha).

### `topbar` (opcional — tem padrão)

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `brandHref` | string | padrão `'#'` |
| `cta` | `{ label, href }` | padrão `'Falar com consultor →'` → `#lead` |

No desktop a barra fica transparente sobre a foto do hero e ganha fundo ao rolar. Abaixo de 900px entra o `MobileNav` do core (hambúrguer), sempre com fundo.

### `hero`

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `title` | string | o h1: o nome do empreendimento (`'Mirante Pinheiros'`) |
| `sub` | rich | |
| `status?` | string | linha pequena sob o `sub`, depois do ponto pulsante (`'Lançamento · Pinheiros, SP · Pré-vendas abertas'`) |
| `gallery` | `[{ image, label, alt }]` × **2 a 6** | fotos **paisagem 2400×1500**. #1 abre a página em tela inteira (é o LCP); todas viram o filme de miniaturas que troca o fundo (avança sozinho a cada 7 s, para com o mouse ou foco em cima). #2 em diante revezam ao lado do texto de "Projeto"; #2 é o fundo do bloco do formulário |
| `miniForm.title` | string | |
| `miniForm.cta` | string | |
| `miniForm.foot?` | string | texto abaixo do botão |
| `miniForm.whatsappLabel` | string | padrão `'ou WhatsApp direto ↗'` — só aparece com `contact.whatsapp` |
| `miniForm.labels` | `{ nome, telefone }` | padrões `'Nome'`, `'Telefone'` |

O mini-formulário é o `LeadForm` do core (`variant='mini'`, campos `nome` + `telefone`, `source='hero'`), num painel translúcido sobre a foto.

### `stats`

`[{ v, l }]` (mín. 1). Uma linha com filetes no desktop; 3 / 2 colunas no mobile. Valores curtos ("76", "84 a 132m²") cabem melhor.

### `project`

| Campo | Tipo |
| --- | --- |
| `title` | string: nome da seção (`'Projeto'`) |
| `paragraphs` | rich[] (mín. 1) — cada parágrafo, ao chegar no meio da tela, troca a foto fixa ao lado (fotos 2… da galeria, em ciclo) |
| `amenitiesTitle?` | string: título pequeno sobre a lista (`'Lazer e serviços'`) |
| `amenities` | string[] (mín. 1) — lista em duas colunas com filetes |

### `plans`

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `title` | string | nome da seção (`'Plantas'`) |
| `items[]` | `{ tag, m2, desc, image?, alt?, featured?, badge? }` | uma linha por opção, sem numeração; passar o mouse, focar ou clicar mostra a planta grande à direita (fixa enquanto a lista rola). No celular cada linha abre como acordeão com a planta dentro. `image: null` → wireframe CSS (3 layouts, em ciclo). `alt` padrão `'<tag> · <m2>'` |
| `link` | `{ label, href }` | padrão `'Ver disponibilidade →'` → `#lead` |
| `rooms` | string[] × 6 | rótulos do wireframe: sala, varanda, dorm, suíte, cozinha, banho |

### `location`

Bloco escuro (cor `ink`).

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `title` | string | nome da seção (`'Localização'`) |
| `map` | `{ kind: 'image', image, alt? }` | mapa do cliente (13:10) — já com os pins desenhados e numerados na ordem do `poi` |
| | `{ kind: 'gmaps', embedUrl }` | Google Maps → Compartilhar → Incorporar → o `src` do iframe |
| | `{ kind: 'wireframe' }` | mapa CSS com grade, marcador da marca e pins dos 6 primeiros POIs |
| `poi[]` | `{ name, d }` | numerados 01… na ordem, em número pequeno e simples, para bater com os pins do mapa; `d` = distância (`'320m'`), alinhada à direita |

### `conditions`

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `title` | string | nome da seção (`'Condições'`) |
| `items[]` | `{ tag, headline, desc, bullets?, featured?, badge? }` | colunas separadas por filetes. `headline` é o h3 da coluna, texto puro num estilo só (`'Entrada de 10% + 60×'`). `featured` pinta a coluna na cor de destaque |
| `foot?` | string | letras miúdas sob as colunas |

### `lead`

Bloco sobre a foto #2 da galeria, escurecida; formulário num painel claro.

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `title` | string | nome da seção (`'Visita'`) |
| `sub` | string | |
| `bullets` | string[] | padrão `[]` — lista com filetes |
| `times` | string[] (mín. 1) | opções do select "melhor horário" |
| `cta` | string | |
| `foot?` | string | sob o botão; `privacyLabel` dentro dele vira link quando `legal.privacyUrl` existe |
| `privacyLabel` | string | padrão `'Política de Privacidade'` |
| `messagePlaceholder?` | string | |
| `labels` | `{ nome, email, telefone, tipologia, horario, mensagem, qualquer }` | padrões em pt-BR |

Formulário completo = `LeadForm` do core (`variant='full'`, `source='lead'`): `nome`, `email`, `telefone`, `tipologia` (select: `labels.qualquer` + `plans.items[].tag · m2`), `horario` (select: `lead.times`), `mensagem` (textarea).

### `footer`

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `address` | string | sob a marca |
| `hours?` | string | segunda linha sob o endereço |
| `columns` | `[{ h, p }]` | `p` aceita `\n` |
| `copyright?` | string | padrão `'© <ano>'` |

Faixa legal: `legal.lines` (CRECI, memorial de incorporação, "imagens meramente ilustrativas"…) com `CNPJ <legal.cnpj>` inserido depois da primeira linha; à direita o copyright e o link de privacidade (`legal.privacyUrl`).

## Imagens do cliente

Em `src/assets/`, com estes nomes (troque o `import` no `site.config.ts` se precisar de outro):

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `fachada.jpg` | 2400×1500 (paisagem, 16:10) | `hero.gallery[0]` — abre a página em tela inteira; é o LCP (`eager` + `fetchpriority=high`). Pede uma foto forte, sem texto |
| `vista.jpg` | 2400×1500 | `hero.gallery[1]` — também o fundo do bloco do formulário |
| `decorado.jpg` | 2400×1500 | `hero.gallery[2]` |
| `lazer.jpg` | 2400×1500 | `hero.gallery[3]` |
| `planta-a.png`, `planta-b.png`, `planta-c.png` | 1200×1000 (6:5, fundo branco, ≥1200 de largura) | `plans.items[].image` — `object-fit: contain` |
| `mapa.png` | 1300×1000 (13:10) | `location.map` (`kind: 'image'`) — **ou** um `embedUrl` do Google Maps (`kind: 'gmaps'`) |
| `og.jpg` | 1200×630 | `seo.ogImage` |
| `logo.svg` | altura 28px (opcional) | `brand.logo` — sem ele a marca é texto. Sobre a foto do hero o logo é invertido para branco (`filter`), então prefira um logo de uma cor |

O hero e o bloco do texto recortam com `object-fit: cover` (o texto do empreendimento mostra as fotos em 4:5), então outras proporções funcionam, mas as acima batem com cada uso. Todas viram WebP com `srcset` no build.

## Formulário (`contact.form.provider`)

Os dois formulários usam o `LeadForm` do core e o mesmo provider:

- `none` — demo: mostra um aviso ao enviar.
- `whatsapp` — abre `wa.me/<contact.whatsapp.number>` com os campos como texto.
- `formspree` — `endpoint` = URL do form.
- `web3forms` — `endpoint` = access key.
- `resend` | `webhook` — `POST /api/lead` (`src/pages/api/lead.ts` do starter); env `RESEND_API_KEY` + `LEAD_TO` + `LEAD_FROM` **ou** `LEAD_WEBHOOK_URL`.

`contact.whatsapp` também liga o botão flutuante (core `WhatsAppFab`) e o link "ou WhatsApp direto" no hero.

## O que o scaffold gera

`node scripts/new-client.mjs --template mirante --name <Cliente> --domain <dominio> --form <provider>` copia o `client-starter/` com `src/templates/core/` + `src/templates/mirante/` vendorados (sem `demo.config.ts` nem `assets/demo/`), as duas fontes no `package.json`, um `src/site.config.ts` com esta forma e o conteúdo do demo como ponto de partida (campos do cliente marcados `TODO_` — o build recusa qualquer `TODO_` que sobrar), `src/assets/README.md` com a lista de imagens acima, páginas `index` (`MirantePage`), `privacidade`, `obrigado`, `404` e, para `resend`/`webhook`, `src/pages/api/lead.ts` + `.env.example`.
