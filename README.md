# fabbahiense.dev

Source do meu site. Portfolio + alguns templates que vendo pra clientes.

**Stack**: Astro no Vercel · backend mínimo em Deno servindo o JSON dos works.

## Onde fica o quê (lembrete pra eu mesmo)

- `frontend/src/pages/` — rotas (home, /about, /work, /templates e cada template).
- `frontend/src/data/featured.ts` — rotator do hero. Mexer aqui pra trocar destaque.
- `frontend/src/api/works.ts` — loader. Tem `FALLBACK` curado, `PRIORITY_IDS` (pin no topo) e `OVERRIDES` (sobrescreve API stale).
- `frontend/src/i18n/translations.ts` — todas as strings EN+PT.
- `frontend/public/featured/` — screenshots do rotator.
- `frontend/src/pages/templates/<slug>.astro` — cada template é standalone. Pra cliente vier, é `cp` + trocar copy/cor/logo.
- `backend/models/work.json` — fonte de verdade dos works.

## Deploy

Push no `main`. Vercel pega.

---

[fabbahiense.dev](https://fabbahiense.dev) · [GitHub](https://github.com/FabbSantos) · [LinkedIn](https://www.linkedin.com/in/fabricio-b-santos/) · [Instagram](https://www.instagram.com/fabbahiense_)
