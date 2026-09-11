# Atelier — portfólio de estúdio / agência

Portfólio editorial, com muito respiro: hero com meta, grade de cases (5:4), processo numerado, texto do estúdio com números, contato "e-mail first" (com formulário opcional) e rodapé de uma linha. Demo em `/templates/atelier/demo` (`demo.config.ts`, em inglês).

```
atelier/
  schema.ts           atelierSchema = core baseSiteSchema + seções · defineAtelier() · AtelierConfig
  demo.config.ts      config do demo
  AtelierBody.astro   <div class='tpl tpl-atelier'> com as seções em ordem
  AtelierPage.astro   core Page + AtelierBody — página do cliente
  styles.css          regras compartilhadas (eyebrow, sec-h, link, hl/em)
  sections/           Topbar · Hero · Work · Process · Studio · Contact · Footer · _md.ts
```

## Config

Base (core): `brand`, `theme`, `seo`, `contact` (estendido abaixo), `analytics`, `legal`, `nav`. Strings **md** aceitam `**texto**` (cor de destaque), `==texto==` (marca-texto) e `\n`.

| Seção | Campos |
| --- | --- |
| `topbar` | `mark` (glifo após a marca, padrão `'◆'`, `''` esconde), `brandHref` (padrão `'/'`), `cta: { label, href }` |
| `hero` | `eyebrow`, `title` (md), `meta: [{ label, value }]` |
| `work` | `eyebrow`, `title` (md), `cases: [{ n, client, tag, year, href?, image?, alt?, tint? }]` (mín. 1; `image: null` → gradiente com `tint`), `archive?: { label, href }` |
| `process` | `eyebrow`, `title` (md), `lead?`, `steps: [{ n, t, d }]` |
| `studio` | `eyebrow`, `title` (md), `paragraphs: string[]`, `link?: { label, href }`, `stats: [{ v, l }]` |
| `contact` | core `contact` + `email` (**obrigatório**), `eyebrow`, `title` (md), `sub?`, `socialsLead?`, `socials: [{ label, href }]`, `inquiry?: { fields: LeadField[], cta, foot? }` |
| `footer` | `line` (`'© 2026 · Studio · City'`); `legal.lines` e o link de privacidade são impressos embaixo |

## Imagens do cliente

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `case-1.jpg` … `case-6.jpg` | 1200×900 (5:4) | `work.cases[].image` — um por case; sem imagem o card usa o gradiente `tint` |
| `og.jpg` | 1200×630 | `seo.ogImage` |

A marca do topbar é texto (`brand.name` + `topbar.mark`); `brand.logo` não é usado neste template.

## Formulário (`contact.form.provider`)

Só o `contact.inquiry` (opcional) usa o `LeadForm` do core (`variant='full'`): `none` (demo) · `whatsapp` · `formspree` (`endpoint` = URL) · `web3forms` (`endpoint` = access key) · `resend` | `webhook` (`POST /api/lead`, env `RESEND_API_KEY` + `LEAD_TO` + `LEAD_FROM` ou `LEAD_WEBHOOK_URL`). Sem `inquiry` o contato é o link `mailto:contact.email`.

## O que o scaffold gera

`node scripts/new-client.mjs --template atelier …` → `client-starter/` com `src/templates/core/` + `src/templates/atelier/` vendorados (sem `demo.config.ts`/`assets/demo`), `src/site.config.ts` nesta forma com o conteúdo do demo e campos `TODO_`, `src/assets/README.md`, páginas `index` (`AtelierPage`), `privacidade`, `obrigado`, `404` e, para `resend`/`webhook`, `src/pages/api/lead.ts` + `.env.example`.
