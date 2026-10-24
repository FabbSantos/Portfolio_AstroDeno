# Atelier: portfólio de estúdio / agência

Portfólio com cara de revista: foto larga abrindo a página, o nome em serifa com uma linha simples embaixo, grade de trabalhos com vãos alternados, bloco do estúdio na cor de destaque com os números, contato "e-mail first" (com formulário opcional) e rodapé num filete. Demo em `/templates/atelier/demo` (`demo.config.ts`, em inglês).

Visual: **Fraunces** nos títulos e números, sempre em pé e num estilo só, **Figtree** no texto e nos rótulos. Papel quente, uma cor profunda usada como bloco inteiro (`theme.accent`), uma segunda cor quieta pra sublinhados (`theme.accent2`). Filetes, cantos retos, sem cards nem sombras. Nenhum JavaScript além do menu do core.

Regras da casa: o título de cada seção é o nome dela ("Work", "Studio", "Contact") e sai num estilo só, sem palavra em itálico, sublinhada ou em outra cor. Nada em caixa alta, nenhum rótulo (eyebrow) em cima dos títulos, nenhum processo numerado, nenhuma numeração decorativa nos trabalhos e nenhum nome gigante no rodapé.

```
atelier/
  schema.ts           atelierSchema = core baseSiteSchema + seções · defineAtelier() · AtelierConfig
  demo.config.ts      config do demo
  AtelierBody.astro   <div class='tpl tpl-atelier'> com as seções em ordem; importa as fontes
  AtelierPage.astro   core Page + AtelierBody: página do cliente
  fonts.ts            arquivo da Fraunces (só o normal, sem itálico) para <link rel=preload>
  styles.css          regras compartilhadas (wrapper, display, link, botão, skin do LeadForm, MobileNav)
  sections/           Topbar · Hero · Work · Studio · Contact · Footer
  assets/demo/        fotos do demo (não copiar para o cliente)
```

O `styles.css` também é carregado pelas prévias de cliente (`src/previas/`), que usam o `.tpl-atelier`, o `.display`, o `.wrap`, o `.sec`, o `.btn` e o MobileNav. Antes de apagar uma regra, procure a classe em `src/previas/`.

Fontes: `@fontsource-variable/fraunces` (só o eixo de peso e só o normal; o build de tamanho ótico pesa o dobro) e `@fontsource-variable/figtree`. As duas precisam estar no `package.json` do cliente (confira o `TEMPLATE_DEPS` em `scripts/new-client.mjs`). Na demo: `accent #8a2a2f`, `accent2 #b7c2b0`, `bg #f2efe9`, `ink #22201d`, `radius 0`.

## Config

Base (core): `brand`, `theme` (use `accent2` pra segunda cor), `seo`, `contact` (estendido abaixo), `analytics`, `legal`, `nav`. Todos os textos são texto puro, sem marcação.

| Seção | Campos |
| --- | --- |
| `topbar` | `mark` (glifo após a marca, padrão `'◆'`, `''` esconde), `brandHref` (padrão `'/'`), `cta: { label, href }` (link sublinhado) |
| `hero` | `title` (o h1: o nome do estúdio), `sub?` (linha simples embaixo do título), `image?` (foto larga 2400×1200 que abre a página; é o LCP), `imageAlt?`, `meta: [{ label, value }]` (lista com filetes à esquerda do título) |
| `work` | `title` (nome da seção), `cases: [{ client, tag, year, href?, image?, alt?, tint? }]` (mín. 1; grade de vãos alternados, largo + estreito; `image: null` → bloco na cor `tint`; com `href` o tile inteiro é link e ganha a seta), `archive?: { label, href }` |
| `studio` | `title` (nome da seção), `paragraphs: string[]`, `link?: { label, href }`, `stats: [{ v, l }]` (grade 2×2 de filetes) |
| `contact` | core `contact` + `email` (**obrigatório**, vira o link grande do contato, em pé e na cor do texto), `title` (nome da seção), `sub?`, `socialsLead?`, `socials: [{ label, href }]`, `inquiry?: { fields: LeadField[], cta, foot? }` |
| `footer` | `line` (`'© 2026 · Studio · City'`); a marca (`brand.name` + `topbar.mark`) fica à esquerda, e `line`, `legal.lines` e o link de privacidade à direita |

## Imagens do cliente

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `estudio.jpg` | 2400×1200 (paisagem, 2:1) | `hero.image`: a foto que abre a página (o estúdio, ou o trabalho principal). No celular recorta em 4:3 |
| `case-1.jpg` … `case-6.jpg` | 1600×1200 (4:3) | `work.cases[].image`: um por case; a grade recorta em `cover`, então o assunto deve ficar no centro. Sem imagem o tile usa a cor `tint` |
| `og.jpg` | 1200×630 | `seo.ogImage` |

A marca do topbar é texto (`brand.name` + `topbar.mark`); `brand.logo` não é usado neste template.

## Formulário (`contact.form.provider`)

Só o `contact.inquiry` (opcional) usa o `LeadForm` do core (`variant='full'`): `none` (demo) · `whatsapp` · `formspree` (`endpoint` = URL) · `web3forms` (`endpoint` = access key) · `resend` | `webhook` (`POST /api/lead`, env `RESEND_API_KEY` + `LEAD_TO` + `LEAD_FROM` ou `LEAD_WEBHOOK_URL`). Sem `inquiry` o contato é o link `mailto:contact.email`.

## O que o scaffold gera

`node scripts/new-client.mjs --template atelier …` → `client-starter/` com `src/templates/core/` + `src/templates/atelier/` vendorados (sem `demo.config.ts`/`assets/demo`), `src/site.config.ts` nesta forma com o conteúdo do demo e campos `TODO_`, `src/assets/README.md`, páginas `index` (`AtelierPage`), `privacidade`, `obrigado`, `404` e, para `resend`/`webhook`, `src/pages/api/lead.ts` + `.env.example`.
