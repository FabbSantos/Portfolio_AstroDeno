# Stratus — landing de produto com planos (SaaS / B2B)

Landing de produto orientada a trial: hero à esquerda com a tela do produto numa moldura de linha, faixa de logos, recursos numa grade de filetes, preços em tabela comparativa (com opção mensal/anual), perguntas em accordion, chamada final em bloco escuro (com formulário opcional) e rodapé em colunas. Demo em `/templates/stratus/demo` (`demo.config.ts`, em inglês).

Visual: ficha técnica. Uma fonte só, **Archivo** com eixo de largura (larga nos títulos, normal no texto; cada título é o nome da seção, num estilo só, sem palavra destacada), **JetBrains Mono** do core em números e rótulos (em caixa normal, sem caixa alta), filetes e marcas de canto no lugar de cards e sombras, uma cor de destaque usada em pouquíssimos pontos. Cantos retos.

```
stratus/
  schema.ts           stratusSchema = core baseSiteSchema + seções · defineStratus() · StratusConfig
  demo.config.ts      config do demo
  StratusBody.astro   <div class='tpl tpl-stratus'> com as seções em ordem; importa a Archivo
  StratusPage.astro   core Page + StratusBody — página do cliente
  fonts.ts            arquivos da Archivo e da JetBrains Mono para <link rel=preload>
  styles.css          regras compartilhadas (wrapper, display, rótulo mono, moldura com marcas, botões, skin do LeadForm, MobileNav)
  sections/           Topbar · Hero · Product · Logos · Features · Pricing · Faq · FinalCta · Footer · _md.ts
```

Fonte: `@fontsource-variable/archivo` (o scaffold adiciona ao `package.json` do cliente). Na demo: `accent #0e7c86`, `bg #f6f6f4`, `ink #101214`, `radius 0`.

## Config

Base (core): `brand`, `theme`, `seo`, `contact`, `analytics`, `legal`, `nav` (links do topbar). Strings **rich** (só texto corrido: leads, descrições, respostas) aceitam `**negrito**` (negrito simples) e `\n`. Os `title` são texto puro, sem `**` nem `\n`: o nome da seção, num estilo só.

| Seção | Campos |
| --- | --- |
| `header` | `brandHref` (padrão `'/'`), `brandDot` (ponto na cor de destaque após a marca, padrão `true`), `signIn?: { label, href }`, `cta: { label, href }` |
| `hero` | `pill?: { tag?, text, href? }` (vira a linha de release em mono, abaixo dos botões, com a `tag` num selo), `title` (o h1: o nome do produto, ex.: `'Stratus'`), `lead` (rich), `primary: { label, href }`, `secondary?` (link sublinhado), `socialProof?` (`'★★★★★ **4.9** on G2 · …'`: a sequência de ★ vira a nota `5/5` em mono) |
| `product?` | `image` (screenshot dentro da moldura; `null` → dashboard CSS desenhado em filetes), `alt` (obrigatório com `image`), `meta?` (linha mono na barra da moldura, ex.: `'app.stratus.io · overview'`; padrão: nome da marca), `kpis: [{ value, label? }]` (máx. 4, usados no mock). Omitir esconde a seção |
| `logos` | `title?` (rótulo mono à esquerda, ex.: `'Trusted by'`), `items: [{ name, image? }]`. Sem `image` o nome vira wordmark em caixa alta (é logo); lista vazia esconde a faixa |
| `features` | `title` (ex.: `'Features'`), `lead?` (rich), `items: [{ icon?, title, desc (rich), tint? }]`: grade de filetes 3×N, sem numeração; `icon` (1–2 caracteres) aparece acima do título do card; um foco de luz segue o mouse |
| `pricing?` | `title` (ex.: `'Pricing'`), `lead?`, `toggle?: { label, monthly, annual, note? }` (seletor mensal/anual; precisa de `priceAnnual` nos planos), `plans: [{ name, price, priceAnnual?, period?, desc, cta, bullets, featured?, badge? }]`, `compare?: { rows: [{ label, values: (string \| boolean)[] }] }` (uma linha por recurso, um valor por plano; `true`/`false` vira marcação), `foot?`. Sem `compare`, cada `bullet` vira uma linha marcada nos planos que o listam. Abaixo de 900px cada plano vira um bloco com a própria lista. Omitir remove a seção |
| `faq?` | `title` (ex.: `'FAQ'`), `items: [{ q, a (rich) }]`: accordion sem numeração; o título fica fixo à esquerda no desktop. Omitir remove a seção |
| `finalCta` | `title` (o nome da seção, ex.: `'Get started'`; não repete o hero), `sub?`, `ctas: [{ label, href }]` (o primeiro em papel, os outros em contorno), `form?: { fields: LeadField[], cta, foot? }` (LeadForm `mini`, padrão: um campo de e-mail) |
| `footer` | `columns: [{ h, links: [{ label, href }] }]`, `legalLinks: [{ label, href }]`, `copyright?` (padrão `'© <ano> <legal.company ?? brand.name>'`) |

## Imagens do cliente

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `product.png` | ≥1600 de largura (ex.: 1600×1000) | `product.image` — screenshot do produto, `eager` (fica logo abaixo do hero). Sem barra de browser: a moldura já tem a própria barra |
| `logo-<nome>.svg/png` | altura 24px (48px em 2×) | `logos.items[].image` (opcional; sem imagem o nome vira wordmark) |
| `og.jpg` | 1200×630 | `seo.ogImage` |
| `logo.svg` | altura 26px (opcional) | `brand.logo` |

## Formulário (`contact.form.provider`)

Só o `finalCta.form` (opcional) usa o `LeadForm` do core: `none` (demo) · `whatsapp` · `formspree` (`endpoint` = URL) · `web3forms` (`endpoint` = access key) · `resend` | `webhook` (`POST /api/lead`, env `RESEND_API_KEY` + `LEAD_TO` + `LEAD_FROM` ou `LEAD_WEBHOOK_URL`). Para `resend`/`webhook` inclua um campo `name` ou `email` nos `fields`.

## O que o scaffold gera

`node scripts/new-client.mjs --template stratus …` → `client-starter/` com `src/templates/core/` + `src/templates/stratus/` vendorados (sem `demo.config.ts`/`assets/demo`), a Archivo no `package.json`, `src/site.config.ts` nesta forma com o conteúdo do demo e campos `TODO_`, `src/assets/README.md`, páginas `index` (`StratusPage`), `privacidade`, `obrigado`, `404` e, para `resend`/`webhook`, `src/pages/api/lead.ts` + `.env.example`.
