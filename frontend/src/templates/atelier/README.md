# Atelier — portfólio de estúdio / agência

Portfólio com cara de revista: foto larga abrindo a página, título em serifa, grade de trabalhos com vãos alternados, processo só de tipografia, bloco do estúdio na cor de destaque com os números, contato "e-mail first" (com formulário opcional) e rodapé com o nome gigante. Demo em `/templates/atelier/demo` (`demo.config.ts`, em inglês).

Visual: **Fraunces** nos títulos e números (o `**assim**` de um título vira itálico; `==assim==` vira itálico sublinhado na segunda cor), **Figtree** no texto e nos rótulos em versalete. Papel quente, uma cor profunda usada como bloco inteiro (`theme.accent`), uma segunda cor quieta pra sublinhados (`theme.accent2`). Filetes, cantos retos, sem cards nem sombras. Nenhum JavaScript além do menu do core.

```
atelier/
  schema.ts           atelierSchema = core baseSiteSchema + seções · defineAtelier() · AtelierConfig
  demo.config.ts      config do demo
  AtelierBody.astro   <div class='tpl tpl-atelier'> com as seções em ordem; importa as fontes
  AtelierPage.astro   core Page + AtelierBody — página do cliente
  fonts.ts            arquivos da Fraunces (normal e itálico) para <link rel=preload>
  styles.css          regras compartilhadas (wrapper, display, eyebrow, sec-head, link, botão, skin do LeadForm, MobileNav)
  sections/           Topbar · Hero · Work · Process · Studio · Contact · Footer · _md.ts
  assets/demo/        fotos do demo (não copiar para o cliente)
```

Fontes: `@fontsource-variable/fraunces` (só o eixo de peso; o build de tamanho ótico pesa o dobro) e `@fontsource-variable/figtree` (o scaffold adiciona as duas ao `package.json` do cliente). Na demo: `accent #8a2a2f`, `accent2 #b7c2b0`, `bg #f2efe9`, `ink #22201d`, `radius 0`.

## Config

Base (core): `brand`, `theme` (use `accent2` pra segunda cor), `seo`, `contact` (estendido abaixo), `analytics`, `legal`, `nav`. Strings **md** aceitam `**texto**` (itálico), `==texto==` (itálico sublinhado na segunda cor) e `\n`.

| Seção | Campos |
| --- | --- |
| `topbar` | `mark` (glifo após a marca, padrão `'◆'`, `''` esconde), `brandHref` (padrão `'/'`), `cta: { label, href }` (link sublinhado) |
| `hero` | `eyebrow`, `title` (md), `image?` (foto larga 2400×1200 que abre a página; é o LCP), `imageAlt?`, `meta: [{ label, value }]` (lista com filetes à esquerda do título) |
| `work` | `eyebrow`, `title` (md), `cases: [{ n, client, tag, year, href?, image?, alt?, tint? }]` (mín. 1; grade de vãos alternados, largo + estreito; `image: null` → bloco na cor `tint`; com `href` o tile inteiro é link e ganha a seta), `archive?: { label, href }` |
| `process` | `eyebrow`, `title` (md), `lead?`, `steps: [{ n, t, d }]` (lado a lado num filete, número em serifa) |
| `studio` | `eyebrow`, `title` (md), `paragraphs: string[]`, `link?: { label, href }`, `stats: [{ v, l }]` (grade 2×2 de filetes) |
| `contact` | core `contact` + `email` (**obrigatório**, vira o link gigante em itálico), `eyebrow`, `title` (md), `sub?`, `socialsLead?`, `socials: [{ label, href }]`, `inquiry?: { fields: LeadField[], cta, foot? }` |
| `footer` | `line` (`'© 2026 · Studio · City'`); `legal.lines` e o link de privacidade são impressos ao lado; `brand.name` em tamanho gigante embaixo |

## Imagens do cliente

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `estudio.jpg` | 2400×1200 (paisagem, 2:1) | `hero.image` — a foto que abre a página (o estúdio, ou o trabalho principal). No celular recorta em 4:3 |
| `case-1.jpg` … `case-6.jpg` | 1600×1200 (4:3) | `work.cases[].image` — um por case; a grade recorta em `cover`, então o assunto deve ficar no centro. Sem imagem o tile usa a cor `tint` |
| `og.jpg` | 1200×630 | `seo.ogImage` |

A marca do topbar é texto (`brand.name` + `topbar.mark`); `brand.logo` não é usado neste template.

## Formulário (`contact.form.provider`)

Só o `contact.inquiry` (opcional) usa o `LeadForm` do core (`variant='full'`): `none` (demo) · `whatsapp` · `formspree` (`endpoint` = URL) · `web3forms` (`endpoint` = access key) · `resend` | `webhook` (`POST /api/lead`, env `RESEND_API_KEY` + `LEAD_TO` + `LEAD_FROM` ou `LEAD_WEBHOOK_URL`). Sem `inquiry` o contato é o link `mailto:contact.email`.

## O que o scaffold gera

`node scripts/new-client.mjs --template atelier …` → `client-starter/` com `src/templates/core/` + `src/templates/atelier/` vendorados (sem `demo.config.ts`/`assets/demo`), as duas fontes no `package.json`, `src/site.config.ts` nesta forma com o conteúdo do demo e campos `TODO_`, `src/assets/README.md`, páginas `index` (`AtelierPage`), `privacidade`, `obrigado`, `404` e, para `resend`/`webhook`, `src/pages/api/lead.ts` + `.env.example`.
