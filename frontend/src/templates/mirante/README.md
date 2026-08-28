# Mirante — landing de lançamento imobiliário

Landing de **lançamento imobiliário no padrão brasileiro**, feita para converter visita em contato com corretor: formulário curto no hero, faixa de números, o empreendimento + lazer, plantas, localização, condições de pagamento, formulário completo e rodapé com CRECI / memorial de incorporação. Demo em `/templates/mirante/demo` (`demo.config.ts`).

Tudo que é do cliente fica no `site.config.ts` (`defineMirante({...})`); as seções só renderizam o que o config diz. Nenhum texto fica no código.

```
mirante/
  schema.ts          miranteSchema = core baseSiteSchema + seções · defineMirante() · MiranteConfig
  demo.config.ts     config do demo (dados fictícios) — mesma forma do site.config.ts do cliente
  MiranteBody.astro  <div class='tpl tpl-mirante'> com as seções em ordem (demo e cliente)
  MirantePage.astro  core Page (head, tokens, WhatsApp, LGPD) + MiranteBody — página do cliente
  styles.css         só regras compartilhadas (wrapper, eyebrow, brand, sec-h, skin do LeadForm)
  sections/          Topbar · Hero · Numbers · Project · Plans · Location · Conditions · Lead · Footer · _md.ts
  assets/demo/       imagens do demo (não copiar para o cliente)
```

## Config

Base (core, obrigatória): `brand` (`name`, `tagline` = bairro exibido ao lado da marca, `logo?`, `locale`), `theme` (`accent`, `bg`, `bg2?`, `ink`, `radius`), `seo`, `contact`, `analytics`, `legal`, `nav`. Veja `core/README.md`.

Strings marcadas **rich** aceitam `**negrito**` (vira cor de destaque dentro de títulos, negrito no texto) e `\n` (quebra de linha).

### `topbar` (opcional — tem padrão)

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `brandHref` | string | padrão `'#'` |
| `cta` | `{ label, href }` | padrão `'Falar com consultor →'` → `#lead` |

Links do menu vêm de `nav` (core). Abaixo de 900px entra o `MobileNav` do core (hambúrguer).

### `hero`

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `eyebrow` | string | depois do ponto pulsante ("Lançamento · Pinheiros, SP · Pré-vendas abertas") |
| `title` | string | primeira parte do h1 |
| `titleAccent` | string | segunda parte, na cor de destaque |
| `sub` | rich | |
| `gallery` | `[{ image, label, alt }]` × **4** | #1 coluna alta (retrato), #2/#3 quadradas, #4 faixa larga embaixo |
| `miniForm.title` | string | |
| `miniForm.cta` | string | |
| `miniForm.foot?` | string | texto abaixo do botão |
| `miniForm.whatsappLabel` | string | padrão `'ou WhatsApp direto ↗'` — só aparece com `contact.whatsapp` |
| `miniForm.labels` | `{ nome, telefone }` | padrões `'Nome'`, `'Telefone'` |

O mini-formulário é o `LeadForm` do core (`variant='mini'`, campos `nome` + `telefone`, `source='hero'`).

### `stats`

`[{ v, l }]` (mín. 1). Seis cabem numa linha no desktop; 3 / 2 colunas no mobile.

### `project`

| Campo | Tipo |
| --- | --- |
| `eyebrow?` | string |
| `title` | rich |
| `paragraphs` | rich[] (mín. 1) |
| `amenitiesTitle?` | string |
| `amenities` | string[] (mín. 1) |

### `plans`

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `eyebrow?` | string | |
| `title` | rich | |
| `items[]` | `{ tag, m2, desc, image?, alt?, featured?, badge? }` | `image: null` → wireframe CSS (3 layouts, em ciclo). `alt` padrão `'<tag> · <m2>'` |
| `link` | `{ label, href }` | padrão `'Ver disponibilidade →'` → `#lead` |
| `rooms` | string[] × 6 | rótulos do wireframe: sala, varanda, dorm, suíte, cozinha, banho |

### `location`

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `eyebrow?` | string | |
| `title` | rich | |
| `map` | `{ kind: 'image', image, alt? }` | mapa do cliente (13:10) — já com os pins desenhados |
| | `{ kind: 'gmaps', embedUrl }` | Google Maps → Compartilhar → Incorporar → o `src` do iframe |
| | `{ kind: 'wireframe' }` | mapa CSS com marcador da marca e pins dos 6 primeiros POIs |
| `poi[]` | `{ name, d }` | numerados 01… na ordem; `d` = distância (`'320m'`) |

### `conditions`

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `eyebrow?` | string | |
| `title` | rich | |
| `items[]` | `{ tag, headline, desc, bullets?, featured?, badge? }` | `headline` é rich (`'Entrada de **10%** + 60×'`) |
| `foot?` | string | letras miúdas sob os cards |

### `lead`

| Campo | Tipo | Obs. |
| --- | --- | --- |
| `eyebrow?` | string | |
| `title` | rich | |
| `sub` | string | |
| `bullets` | string[] | padrão `[]` |
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
| `fachada.jpg` | 1000×1500 (retrato, 2:3) | `hero.gallery[0]` — coluna alta da galeria; é o LCP (`eager` + `fetchpriority=high`) |
| `vista.jpg` | 1200×1200 | `hero.gallery[1]` |
| `decorado.jpg` | 1200×1200 | `hero.gallery[2]` |
| `lazer.jpg` | 1600×800 (faixa larga) | `hero.gallery[3]` |
| `planta-a.png`, `planta-b.png`, `planta-c.png` | 1200×1000 (6:5, fundo branco, ≥1200 de largura) | `plans.items[].image` — `object-fit: contain` |
| `mapa.png` | 1300×1000 (13:10) | `location.map` (`kind: 'image'`) — **ou** um `embedUrl` do Google Maps (`kind: 'gmaps'`) |
| `og.jpg` | 1200×630 | `seo.ogImage` |
| `logo.svg` | altura 28px (opcional) | `brand.logo` — sem ele a marca é texto |

A galeria recorta com `object-fit: cover`, então outras proporções funcionam, mas as acima batem com o formato de cada tile. Todas viram WebP com `srcset` no build.

## Formulário (`contact.form.provider`)

Os dois formulários usam o `LeadForm` do core e o mesmo provider:

- `none` — demo: mostra um aviso ao enviar.
- `whatsapp` — abre `wa.me/<contact.whatsapp.number>` com os campos como texto.
- `formspree` — `endpoint` = URL do form.
- `web3forms` — `endpoint` = access key.
- `resend` | `webhook` — `POST /api/lead` (`src/pages/api/lead.ts` do starter); env `RESEND_API_KEY` + `LEAD_TO` + `LEAD_FROM` **ou** `LEAD_WEBHOOK_URL`.

`contact.whatsapp` também liga o botão flutuante (core `WhatsAppFab`) e o link "ou WhatsApp direto" no hero.

## O que o scaffold gera

`node scripts/new-client.mjs --template mirante --name <Cliente> --domain <dominio> --form <provider>` copia o `client-starter/` com `src/templates/core/` + `src/templates/mirante/` vendorados (sem `demo.config.ts` nem `assets/demo/`), um `src/site.config.ts` com esta forma e o conteúdo do demo como ponto de partida (campos do cliente marcados `TODO_` — o build recusa qualquer `TODO_` que sobrar), `src/assets/README.md` com a lista de imagens acima, páginas `index` (`MirantePage`), `privacidade`, `obrigado`, `404` e, para `resend`/`webhook`, `src/pages/api/lead.ts` + `.env.example`.
