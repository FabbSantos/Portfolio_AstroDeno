# fabbahiense.dev

Site do Fabrício Bahiense: portfolio de engenheiro de software sênior, feito pra converter
dono de negócio / fundador / marketing em cliente (freelance, sob medida e templates).
PT-BR é o idioma principal (`/`), inglês é secundário (`/en/…`).

## Stack

- **Astro 5** estático, deploy na **Vercel** (adapter `@astrojs/vercel`, Node 22).
- Um único endpoint SSR: `frontend/src/pages/api/contact.ts` (`prerender = false`) — envia o lead via Resend.
- i18n **server-side** via roteamento do Astro: locale vem da URL (`localeOf(Astro)`), strings
  renderizam no servidor. Sem troca de texto no cliente, sem `data-i18n`.
- Imagens via `astro:assets` (`src/assets`), otimizadas na edge da Vercel (`imageService: true`).
- Fonts self-hosted (`@fontsource-variable/inter`, `jetbrains-mono`).

## Onde fica o quê (tudo em `frontend/`)

| Caminho | O que é |
| --- | --- |
| `src/data/site.ts` | Config do negócio: nome, e-mail, **WhatsApp**, localização, disponibilidade, stats, redes, promessas de prazo |
| `src/data/works.ts` | Trabalhos (`flagship` / `client` / `lab`), status, links, outcomes |
| `src/data/templates.ts` | Templates à venda: slug, preço, prazo, seções, demo |
| `src/data/services.ts` | Serviços: pra quem, resultado, preço "a partir de", prazo |
| `src/data/featured.ts` | Cenas do rotator do hero |
| `src/i18n/pt/<seção>.ts`, `src/i18n/en/<seção>.ts` | Dicionários, um arquivo por seção (EN é tipado pelo shape do PT) |
| `src/i18n/index.ts` | `localeOf`, `useT`, `localePath`, `switchPath`, `pick`, `fmt` |
| `src/views/*.astro` | As páginas de verdade (`HomeView`, `AboutView`, `WorkView`, …) |
| `src/pages/**` | Cascas finas que renderizam uma view; `src/pages/en/**` espelha em inglês |
| `src/pages/templates/<slug>/demo.astro` | Demo de cada template (noindex, usa `DemoLayout`) |
| `src/layouts/Layout.astro` | Layout do site (lang, hreflang, canonical, OG, JSON-LD) |
| `src/layouts/DemoLayout.astro` | Layout das demos (só tokens + reset + faixa de demo) |
| `src/styles/base.css`, `src/styles/site.css` | Tokens/reset e primitivas (`.btn`, `.section`, `.page-hero`, `.reveal`…) |
| `src/scripts/site.ts` | Topbar sticky, reveal, scroller, menu mobile |

## Como adicionar

- **Trabalho**: entrada em `src/data/works.ts` (campos bilíngues `{ pt, en }`); screenshot em `src/assets/works/` importada no próprio módulo.
- **Template**: entrada em `src/data/templates.ts` + `src/pages/templates/<slug>/demo.astro` usando `DemoLayout`. Detalhe e listagem são gerados a partir dos dados.
- **Tradução**: nova chave no arquivo PT da seção (`src/i18n/pt/x.ts`); o `astro check` obriga a mesma chave no EN. Use `t.common.*` pra rótulos compartilhados.
- **Página nova**: view em `src/views`, casca em `src/pages` **e** em `src/pages/en`; todo link interno via `localePath(locale, '/caminho')`.

## Variáveis de ambiente

| Nome | Uso |
| --- | --- |
| `RESEND_API_KEY` | Envio do formulário de contato (obrigatória em produção) |
| `CONTACT_TO` | Caixa que recebe os leads (default: `SITE.leadInbox`) |
| `PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile (opcional; vazio = desligado) |

Local: copie `frontend/.env.example` pra `frontend/.env`. Produção: Vercel → Project Settings → Environment Variables.

## Scripts (`cd frontend`)

```
npm run dev      # localhost:4321
npm run check    # astro check (tipos + dicionários)
npm run lint     # eslint
npm test         # vitest
npm run build    # astro check && astro build
```

## Deploy

Push no `main` → Vercel builda e publica. Projeto configurado com **Root Directory = `frontend`** e **Node 22**.
CI (`.github/workflows/ci.yml`) roda lint (não bloqueante por enquanto), testes e build em PRs e no `main`.

## Headers de segurança (`frontend/vercel.json`)

- `Content-Security-Policy`: `script-src` permite `'unsafe-inline'` porque o layout tem scripts inline
  (gate de JS pro reveal, supressão de analytics em iframe, JSON-LD); libera `va.vercel-scripts.com`
  (Analytics/Speed Insights) e `challenges.cloudflare.com` (Turnstile, também em `frame-src` e `connect-src`).
  `img-src https:` cobre imagens externas de projetos. `frame-ancestors 'self'` + `X-Frame-Options SAMEORIGIN`
  deixam as demos serem embutidas só pelo próprio site.
- `Referrer-Policy`, `X-Content-Type-Options`, `Permissions-Policy`: defaults conservadores.
- `/_astro/*` é hashado → `Cache-Control: immutable` por 1 ano.
- `robots.txt` bloqueia `/api/` e `/templates/*/demo`; o sitemap (`sitemap-index.xml`) também exclui as demos.

## TODO(fab) — decisões que só você toma

Procure por `TODO(fab)` no código. Hoje:

1. `src/data/site.ts` → `whatsapp.number` (vazio = botões de WhatsApp escondidos).
2. `src/data/works.ts` → URLs públicas do Pulsar e do Quasar.
3. `src/data/services.ts` → preços "a partir de" (0 = esconde o preço).
4. `src/data/site.ts` → frase de disponibilidade (`availability`).
5. `src/data/works.ts` → `outcome` dos cases (número/resultado real de cada projeto).

---

[fabbahiense.dev](https://www.fabbahiense.dev) · [GitHub](https://github.com/FabbSantos) · [LinkedIn](https://www.linkedin.com/in/fabricio-b-santos/) · [Instagram](https://www.instagram.com/fabbahiense_)
