# Stratus — landing SaaS / B2B (trial)

Landing de produto SaaS orientada a trial: hero centrado, product shot em moldura de browser, faixa de logos, features, pricing, FAQ, CTA final (com formulário opcional) e rodapé em colunas. Demo em `/templates/stratus/demo` (`demo.config.ts`, em inglês).

```
stratus/
  schema.ts           stratusSchema = core baseSiteSchema + seções · defineStratus() · StratusConfig
  demo.config.ts      config do demo
  StratusBody.astro   <div class='tpl tpl-stratus'> com as seções em ordem
  StratusPage.astro   core Page + StratusBody — página do cliente
  styles.css          regras compartilhadas (brand, botões, sec-h, eyebrow)
  sections/           Topbar · Hero · Product · Logos · Features · Pricing · Faq · FinalCta · Footer · _md.ts
```

## Config

Base (core): `brand`, `theme`, `seo`, `contact`, `analytics`, `legal`, `nav` (links do topbar). Strings **rich** aceitam `**negrito**` (cor de destaque em títulos) e `\n`.

| Seção | Campos |
| --- | --- |
| `header` | `brandHref` (padrão `'/'`), `brandDot` (ponto colorido após a marca, padrão `true`), `signIn?: { label, href }`, `cta: { label, href }` |
| `hero` | `pill?: { tag?, text, href? }`, `title` (rich), `lead` (rich), `primary: { label, href }`, `secondary?`, `socialProof?` (`'★★★★★ **4.9** on G2 · …'` — a sequência de ★ inicial ganha estilo) |
| `product?` | `image` (screenshot em moldura de browser; `null` → mock CSS de dashboard), `alt` (obrigatório com `image`), `kpis: [{ value, label? }]` (máx. 4, usados no mock). Omitir esconde a seção |
| `logos` | `title?`, `items: [{ name, image? }]` — sem `image` o nome vira wordmark; lista vazia esconde a faixa |
| `features` | `eyebrow?`, `title` (rich), `items: [{ icon (emoji/1–2 chars), title, desc (rich), tint? (hex) }]` |
| `pricing?` | `eyebrow?`, `title` (rich), `lead?`, `plans: [{ name, price, period?, desc, cta: { label, href }, bullets, featured?, badge? }]`. Omitir remove a seção |
| `faq?` | `eyebrow?`, `title` (rich), `items: [{ q, a (rich) }]`. Omitir remove a seção |
| `finalCta` | `title` (rich), `sub?`, `ctas: [{ label, href }]`, `form?: { fields: LeadField[], cta, foot? }` (LeadForm `mini`, padrão: um campo de e-mail) |
| `footer` | `columns: [{ h, links: [{ label, href }] }]`, `legalLinks: [{ label, href }]`, `copyright?` (padrão `'© <ano> <legal.company ?? brand.name>'`) |

## Imagens do cliente

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `product.png` | ≥1600 de largura (ex.: 1600×1000) | `product.image` — screenshot do produto, `eager` (fica logo abaixo do hero) |
| `logo-<nome>.svg/png` | altura 28px (56px em 2×) | `logos.items[].image` (opcional; sem imagem o nome vira wordmark) |
| `og.jpg` | 1200×630 | `seo.ogImage` |
| `logo.svg` | altura 28px (opcional) | `brand.logo` |

## Formulário (`contact.form.provider`)

Só o `finalCta.form` (opcional) usa o `LeadForm` do core: `none` (demo) · `whatsapp` · `formspree` (`endpoint` = URL) · `web3forms` (`endpoint` = access key) · `resend` | `webhook` (`POST /api/lead`, env `RESEND_API_KEY` + `LEAD_TO` + `LEAD_FROM` ou `LEAD_WEBHOOK_URL`). Para `resend`/`webhook` inclua um campo `name` ou `email` nos `fields`.

## O que o scaffold gera

`node scripts/new-client.mjs --template stratus …` → `client-starter/` com `src/templates/core/` + `src/templates/stratus/` vendorados (sem `demo.config.ts`/`assets/demo`), `src/site.config.ts` nesta forma com o conteúdo do demo e campos `TODO_`, `src/assets/README.md`, páginas `index` (`StratusPage`), `privacidade`, `obrigado`, `404` e, para `resend`/`webhook`, `src/pages/api/lead.ts` + `.env.example`.
