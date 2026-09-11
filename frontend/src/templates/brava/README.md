# Brava — landing de drop / e-commerce limitado

Landing de coleção limitada: ticker de avisos, topbar com carrinho, hero com contagem regressiva até o fim do drop, vitrine de produtos, lookbook, história da marca, newsletter e rodapé. Demo em `/templates/brava/demo` (`demo.config.ts`, em inglês).

```
brava/
  schema.ts          bravaSchema = core baseSiteSchema + seções · defineBrava() · BravaConfig
  demo.config.ts     config do demo
  BravaBody.astro    <div class='tpl tpl-brava' id='top'> com as seções em ordem
  BravaPage.astro    core Page + BravaBody — página do cliente
  styles.css         regras compartilhadas (eyebrow, brand, hl/strong, sr-only)
  sections/          Ticker · Topbar · Hero · Shop · Lookbook · Story · Newsletter · Footer · _md.ts
```

## Config

Base (core): `brand`, `theme` (`accent2` = tom claro do accent usado no bloco escuro da newsletter), `seo`, `contact`, `analytics`, `legal`, `nav`. Strings **md** aceitam `**texto**` (sublinhado grosso) e `==texto==` (cor de destaque).

| Seção | Campos |
| --- | --- |
| `ticker` | `messages: string[]` (mín. 1) — unidas com ` ★ ` e em loop |
| `topbar` | `brandHref` (padrão `'/'`), `links: [{ label, href }]`, `cart: { show, label, href, count? }` (padrões `false`, `'Carrinho'`, `'/cart'`) |
| `drop` | `endsAt` (ISO 8601 com fuso, ex. `'2026-09-30T23:59:59-03:00'`), `countdownLabel`, `units: { days, hours, minutes, seconds }`, `ended` (texto quando o prazo passou) — todos com padrão em pt-BR |
| `hero` | `eyebrow`, `lines: string[]` (1–4 linhas do h1, md), `sub`, `cta: { label, href }`, `tiles: [{ image, alt, tint? }]` × **3** |
| `shop` | `eyebrow`, `title` (md), `soldLabel` (padrão `'ESGOTADO'`), `products: [{ n, name, price, tag?, sold?, href?, image?, alt?, tint? }]` |
| `lookbook` | `title` (só para leitores de tela), `eyebrow`, `caption`, `tiles: [{ image, alt, caption? }]` × **4** |
| `story` | `eyebrow`, `title` (md), `paragraphs: string[]`, `link?: { label, href }` |
| `newsletter` | `title` (md), `sub`, `email: { label, placeholder? }`, `name?: { label, placeholder? }` (campo extra — obrigatório para `resend`/`webhook`), `cta`, `foot?` |
| `footer` | `columns: [{ h, links }]`, `socials: [{ label, href }]`, `privacyLabel` (padrão `'Privacidade'`); `legal.lines` são impressas na base |

## Imagens do cliente

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `hero-1.jpg` | 800×1600 (retrato 1:2) | `hero.tiles[0]` — ocupa as duas linhas da grade, `eager` |
| `hero-2.jpg`, `hero-3.jpg` | 800×800 | `hero.tiles[1..2]` |
| `product-1.jpg` … `product-6.jpg` | 800×1000 (4:5) | `shop.products[].image` — sem imagem o card usa o gradiente `tint` |
| `lookbook-1.jpg` | 1000×1400 (retrato) | `lookbook.tiles[0]` — duas linhas à esquerda |
| `lookbook-2.jpg`, `lookbook-3.jpg` | 1000×1000 | `lookbook.tiles[1..2]` |
| `lookbook-4.jpg` | 2000×900 (faixa larga) | `lookbook.tiles[3]` — largura total embaixo |
| `og.jpg` | 1200×630 | `seo.ogImage` |
| `logo.svg` | altura 28px (opcional) | `brand.logo` |

Tudo é recortado com `object-fit: cover`; os tamanhos acima batem com o formato de cada tile.

## Formulário (`contact.form.provider`)

A newsletter usa o `LeadForm` do core (`variant='mini'`): `none` (demo) · `whatsapp` · `formspree` (`endpoint` = URL) · `web3forms` (`endpoint` = access key) · `resend` | `webhook` (`POST /api/lead`, env `RESEND_API_KEY` + `LEAD_TO` + `LEAD_FROM` ou `LEAD_WEBHOOK_URL` — ative `newsletter.name`).

## O que o scaffold gera

`node scripts/new-client.mjs --template brava …` → `client-starter/` com `src/templates/core/` + `src/templates/brava/` vendorados (sem `demo.config.ts`/`assets/demo`), `src/site.config.ts` nesta forma com o conteúdo do demo e campos `TODO_`, `src/assets/README.md`, páginas `index` (`BravaPage`), `privacidade`, `obrigado`, `404` e, para `resend`/`webhook`, `src/pages/api/lead.ts` + `.env.example`.
