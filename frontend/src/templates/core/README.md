# templates/core

Base compartilhada por todos os templates. Não tem nada de um template específico — só o que todo site de cliente precisa. O scaffold (`scripts/new-client.mjs`) copia esta pasta inteira para o projeto do cliente (`src/templates/core/`) e `api/lead.ts` para `src/pages/api/lead.ts`.

Dependências: só o que já vem com o Astro (`astro/zod`, `astro:assets`) + `@fontsource-variable/inter` e `@fontsource-variable/jetbrains-mono`. Nenhum pacote a mais.

## Contrato

| Arquivo | O que é |
| --- | --- |
| `schema.ts` | `baseSiteSchema` (brand, theme, seo, contact, analytics, legal, nav), `image`, `hex`, `defineSite(schema, config)`, tipos `BaseSite`, `BaseSiteInput`, `LeadField`. |
| `base.css` | Reset + tokens estruturais (fontes, `--maxw`, escala tipográfica). **Sem cores** — vêm do `ThemeVars`. |
| `ThemeVars.astro` | `{ theme }` → `<style>:root{…}</style>` com `--accent`, `--accent-2`, `--accent-soft`, `--accent-glow`, `--accent-text` (texto e fundo de botão com texto branco, AA pra qualquer cor de marca), `--accent-display` (palavra de destaque em título de 24px ou mais), `--accent-on-dark` (destaque sobre bloco `--ink`), `--bg`, `--bg-2`, `--bg-3`, `--ink`, `--ink-2`, `--ink-3`, `--ink-4`, `--rule`, `--rule-2`, `--topbar`, `--radius`. |
| `Head.astro` | `{ site, noindex? }` → tudo que vai dentro de `<head>`: meta, canonical, OG/Twitter (og:image via `getImage` 1200px), favicon (logo 64px ou `/favicon.svg`), fontes, `base.css`, JSON-LD, `<Analytics>`. |
| `Page.astro` | `{ site, class?, noindex? }` → documento completo: `<html lang>` + `Head` + `ThemeVars` + `<slot/>` + `WhatsAppFab` + `LgpdNotice`. **Os demos do portfólio não usam** — usam `DemoLayout` + `ThemeVars` + `<Slug>Body`. |
| `LeadForm.astro` | `{ site, id, variant: 'mini'\|'full', fields: LeadField[], cta, foot?, class?, source? }` → formulário ligado ao `contact.form.provider` (`none` demo · `whatsapp` · `formspree` · `web3forms` · `resend` · `webhook`). Honeypot `hp`, campo oculto `source`, status `aria-live`. |
| `MobileNav.astro` | `{ brand, brandHref?, nav, cta?, class?, id? }` → topbar sticky com links desktop + hambúrguer 44px (painel `inert`, `aria-expanded`/`aria-controls`, Esc fecha). |
| `WhatsAppFab.astro` | `{ site, class? }` → botão flutuante `wa.me` (só quando `contact.whatsapp` existe). |
| `accordion.ts` | `enhanceAccordions(root?)` → anima todo `<details data-accordion>` (altura + fade da resposta, reversível no meio). Sem JS ou com movimento reduzido fica o toggle nativo. Ícones: `details[open]:not(.is-closing)`. |
| `Analytics.astro` | `{ analytics }` → GA4 / Meta Pixel / Plausible, cada um só quando o id está preenchido. |
| `LgpdNotice.astro` | `{ legal, locale, needsConsent }` → barra de consentimento (só com `legal.privacyUrl` e `needsConsent`). Lembra a dispensa em `localStorage`. |
| `api/lead.ts` | Endpoint `POST /api/lead` (SSR) para `provider: 'resend' \| 'webhook'`. Env: `LEAD_WEBHOOK_URL` **ou** `RESEND_API_KEY` + `LEAD_TO` + `LEAD_FROM`; `SITE_NAME` opcional. Resposta `{ ok, code? }`. |
| `pages/PrivacyPage.astro` | `{ site }` → política de privacidade (LGPD) gerada a partir do provider, analytics e `legal`. |
| `pages/ThanksPage.astro` | `{ site }` → página de obrigado (alvo de `contact.form.successUrl`). |
| `pages/NotFoundPage.astro` | `{ site }` → 404. |

## Como um template usa

```ts
// src/templates/<slug>/schema.ts
import { baseSiteSchema, image } from '../core/schema';
export const siteSchema = baseSiteSchema.extend({ hero: z.object({ title: z.string(), photo: image }) });
```

```ts
// site.config.ts (cliente)  |  demo.config.ts (portfólio)
import { defineSite } from './src/templates/core/schema';
import { siteSchema } from './src/templates/<slug>/schema';
import logo from './src/assets/logo.png';
export const site = defineSite(siteSchema, { brand: { name: 'Cliente', logo }, /* … */ });
```

`defineSite` valida no build e falha com uma lista `caminho.do.campo: problema` (um por linha). Qualquer string que ainda comece com `TODO_` também falha — é assim que o scaffold garante que nada ficou por preencher.

## Regras para componentes do core

- CSS só com tokens (`var(--…)`); literais permitidos: `#fff`, `#000`, `#25d366`.
- Tabs, aspas simples em atributos, TypeScript strict, zero dependências externas.
- Textos de interface em `brand.locale` (`pt-BR` padrão, `en`).
- Controles clicáveis com 44px mínimo; labels visíveis.
