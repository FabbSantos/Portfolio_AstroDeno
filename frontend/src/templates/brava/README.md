# Brava — landing de drop / e-commerce limitado

Landing de coleção limitada: ticker de avisos, topbar com carrinho, hero com contagem regressiva até o fim do drop, vitrine de produtos, lookbook em painel, história da marca, newsletter e rodapé. Demo em `/templates/brava/demo` (`demo.config.ts`, em inglês).

Visual: editorial de moda num fundo escuro. **Bodoni Moda** na marca, nos títulos e nos números da contagem (o `**assim**` de um título vira itálico; `==assim==` vira itálico sublinhado na cor de destaque), **Manrope** no texto, preços, rótulos e botões. Filetes, cantos retos, fotos em retrato, nenhum card. A demo roda escura (`bg` quase preto, `ink` papel), mas todas as cores vêm dos tokens: com `bg` claro e `ink` escuro o template fica claro sem mexer em nada.

```
brava/
  schema.ts          bravaSchema = core baseSiteSchema + seções · defineBrava() · BravaConfig
  demo.config.ts     config do demo
  BravaBody.astro    <div class='tpl tpl-brava' id='top'> com as seções em ordem; importa as fontes
  BravaPage.astro    core Page + BravaBody — página do cliente
  fonts.ts           arquivos da Bodoni Moda (normal e itálico) para <link rel=preload>
  styles.css         regras compartilhadas (wrapper, display, eyebrow, sec-head, botões, skin do LeadForm, MobileNav)
  sections/          Ticker · Topbar · Hero · Shop · Lookbook · Story · Newsletter · Footer · _md.ts
  assets/demo/       fotos do demo (não copiar para o cliente)
```

Fontes: `@fontsource-variable/bodoni-moda` (só o eixo de peso) e `@fontsource-variable/manrope` (o scaffold adiciona as duas ao `package.json` do cliente). Na demo: `accent #d8232a`, `accent2 #f1a3a6`, `bg #121212`, `bg2 #1c1c1c`, `ink #f3f1ea`, `radius 0`.

## Config

Base (core): `brand`, `theme` (`accent2` = tom claro do accent), `seo`, `contact`, `analytics`, `legal`, `nav`. Strings **md** aceitam `**texto**` (itálico) e `==texto==` (itálico sublinhado na cor de destaque).

| Seção | Campos |
| --- | --- |
| `ticker` | `messages: string[]` (mín. 1) — em itálico, unidas com ` · `, em loop; o loop acelera com a rolagem e volta ao normal |
| `topbar` | `brandHref` (padrão `'/'`), `links: [{ label, href }]`, `cart: { show, label, href, count? }` (padrões `false`, `'Carrinho'`, `'/cart'`) |
| `drop` | `endsAt` (ISO 8601 com fuso, ex. `'2026-09-30T23:59:59-03:00'`), `countdownLabel`, `units: { days, hours, minutes, seconds }`, `ended` (texto quando o prazo passou) — todos com padrão em pt-BR |
| `hero` | `eyebrow`, `lines: string[]` (1–4 linhas do h1, md), `sub`, `cta: { label, href }`, `tiles: [{ image, alt, tint? }]` × **3** (retratos; o primeiro é o grande e o LCP, os outros dois ficam empilhados ao lado) |
| `shop` | `eyebrow`, `title` (md), `soldLabel` (padrão `'ESGOTADO'`), `products: [{ n, name, price, tag?, sold?, href?, image?, alt?, tint? }]` — grade de 3 sem card; `tag` vira um chip de papel, `sold` apaga a foto e risca o nome |
| `lookbook` | `title` (título grande ao lado do painel), `eyebrow`, `caption`, `tiles: [{ image, alt, caption? }]` × **4** — um retrato por vez no painel, com zoom lento, barra de progresso por foto, anterior/próxima e setas do teclado; a lista de `caption` à esquerda também troca a foto. Avança sozinho a cada 7 s e para com o mouse ou foco em cima |
| `story` | `eyebrow`, `title` (md), `paragraphs: string[]` (o primeiro sai maior, em serifa), `link?: { label, href }` |
| `newsletter` | `title` (md), `sub`, `email: { label, placeholder? }`, `name?: { label, placeholder? }` (campo extra — obrigatório para `resend`/`webhook`), `cta`, `foot?` |
| `footer` | `columns: [{ h, links }]`, `socials: [{ label, href }]`, `privacyLabel` (padrão `'Privacidade'`); `legal.lines` são impressas na base |

## Imagens do cliente

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `hero-1.jpg` | 1200×1500 (retrato 4:5) | `hero.tiles[0]` — o retrato grande, `eager`; é o LCP |
| `hero-2.jpg`, `hero-3.jpg` | 1200×1500 | `hero.tiles[1..2]` — empilhados ao lado |
| `product-1.jpg` … `product-6.jpg` | 1000×1250 (4:5) | `shop.products[].image` — sem imagem o bloco usa a cor `tint` |
| `lookbook-1.jpg` … `lookbook-4.jpg` | 1200×1500 (retrato 4:5) | `lookbook.tiles[]` — uma por vez no painel |

Fotos escuras ou com fundo neutro combinam melhor com o tema escuro da demo; num tema claro, o contrário.

## Formulário (`contact.form.provider`)

A newsletter usa o `LeadForm` do core (`variant='mini'`): `none` (demo) · `whatsapp` · `formspree` (`endpoint` = URL) · `web3forms` (`endpoint` = access key) · `resend` | `webhook` (`POST /api/lead`, env `RESEND_API_KEY` + `LEAD_TO` + `LEAD_FROM` ou `LEAD_WEBHOOK_URL`; inclua `newsletter.name`).

## O que o scaffold gera

`node scripts/new-client.mjs --template brava …` → `client-starter/` com `src/templates/core/` + `src/templates/brava/` vendorados (sem `demo.config.ts`/`assets/demo`), as duas fontes no `package.json`, `src/site.config.ts` nesta forma com o conteúdo do demo e campos `TODO_`, `src/assets/README.md`, páginas `index` (`BravaPage`), `privacidade`, `obrigado`, `404` e, para `resend`/`webhook`, `src/pages/api/lead.ts` + `.env.example`.
