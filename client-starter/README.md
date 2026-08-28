# __CLIENT__ — site em __DOMAIN__

Site estático em Astro 5 gerado a partir do template **__SLUG__** (`frontend/src/templates/__SLUG__` no portfólio). Tudo que é do cliente — textos, cores, contato, imagens — fica em **um único arquivo**: `src/site.config.ts`. O resto é código do template vendorado em `src/templates/` e não precisa ser tocado.

## O dia do cliente (checklist)

1. **Scaffold** (no repo do portfólio):
   ```
   node scripts/new-client.mjs --template __SLUG__ --name __CLIENT__ --domain __DOMAIN__ --form <none|whatsapp|formspree|web3forms|resend|webhook> --install
   ```
   Isso já roda `npm install`, `astro check` e mostra a lista de campos `TODO_` pendentes.

2. **Preencher `src/site.config.ts`.** Cada valor que começa com `TODO_` precisa ser trocado — o build recusa qualquer `TODO_` que sobrar, então não há como esquecer. `TODO.md` lista tudo. Depois disso, revise os textos das seções (vêm com o conteúdo da demo como ponto de partida) e as cores em `theme`.

3. **Imagens.** Coloque os arquivos em `src/assets/` com **exatamente** os nomes listados em `src/assets/README.md` (tamanhos recomendados lá). Para trocar um nome, mude o `import` no topo do `site.config.ts`. Logo → `brand.logo` (SVG de preferência); imagem de compartilhamento → `seo.ogImage` (1200×630).

4. **Formulário** (`contact.form.provider`):
   - `whatsapp` — só precisa de `contact.whatsapp.number` (dígitos com DDI, ex.: `5511999998888`).
   - `formspree` — crie o form em formspree.io e cole a URL em `contact.form.endpoint`.
   - `web3forms` — cole a *access key* em `contact.form.endpoint`.
   - `resend` | `webhook` — o scaffold já ativou o adapter Vercel e `src/pages/api/lead.ts`. Cadastre as variáveis de `.env.example` no Vercel (Settings → Environment Variables).

5. **Build local**: `npm run build` (= `astro check && astro build`). Tem que passar limpo. `npm run preview` para conferir em `http://localhost:4321`.

6. **Deploy**: `vercel link` (projeto novo, root = esta pasta) e `vercel --prod`. Ou suba o repo e importe no painel do Vercel — o `vercel.json` já traz os headers de segurança.

7. **DNS**: no registrador do cliente, `A` do apex → `76.76.21.21` e `CNAME www` → `cname.vercel-dns.com` (ou o que o painel do Vercel indicar). Adicione o domínio no projeto Vercel e espere o certificado.

8. **Testar o lead** no domínio final: envie o formulário de verdade e confirme que chegou (WhatsApp / e-mail / webhook). Confira também `/privacidade`, `/obrigado` e uma URL inexistente (404).

9. **Handover**: entregue ao cliente o acesso ao projeto Vercel (ou transfira), o repositório, e explique que qualquer texto se muda em `src/site.config.ts` seguido de `git push`.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor local em `http://localhost:4321` |
| `npm run check` | Só o type-check (`astro check`) |
| `npm run build` | `astro check` + `astro build` → `dist/` |
| `npm run preview` | Serve o `dist/` gerado |

## Estrutura

```
src/
  site.config.ts        ← TUDO do cliente
  assets/               ← imagens importadas pelo site.config.ts
  pages/                ← index, privacidade, obrigado, 404 (+ api/lead.ts para resend/webhook)
  templates/core/       ← base compartilhada (schema, Head, Page, LeadForm, LGPD, …)
  templates/__SLUG__/   ← o template (seções, estilos, schema)
public/                 ← favicon.svg, robots.txt
```

Para trocar de template depois, o caminho é refazer o scaffold: os `site.config.ts` têm a mesma base (`brand`, `theme`, `seo`, `contact`, `legal`, `nav`) mas as seções mudam.

## Atualizar o template

O template está vendorado (copiado), não linkado. Se o portfólio ganhar uma correção em `frontend/src/templates/core` ou `frontend/src/templates/__SLUG__`, copie os arquivos de novo para `src/templates/` (nunca copie `demo.config.ts` nem `assets/demo`).
