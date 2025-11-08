# 🚀 Guia de Deploy - Portfolio Fabrício Bahiense

Este guia explica como fazer o deploy do seu portfolio em produção.

---

## 📋 PRÉ-REQUISITOS

### 1. Preparar o Ambiente

```bash
# Instalar dependências
cd frontend
npm install

cd ../backend
# Deno já instalado
```

### 2. Configurar Variáveis de Ambiente

**Frontend** (`frontend/.env`):
```env
PUBLIC_SITE_URL=https://seu-dominio.com
PUBLIC_API_URL=https://api.seu-dominio.com
```

**Backend**:
Atualizar `ALLOWED_ORIGINS` em `backend/main.ts`:
```typescript
const ALLOWED_ORIGINS = [
  'https://seu-dominio.com',
  'https://www.seu-dominio.com',
];
```

---

## 🎨 FRONTEND - VERCEL

### Opção 1: Deploy via GitHub (Recomendado)

1. **Fazer commit das mudanças**
```bash
cd frontend
git add .
git commit -m "feat: melhorias de SEO, performance e acessibilidade"
git push origin main
```

2. **Conectar ao Vercel**
- Acessar [vercel.com](https://vercel.com)
- Import Git Repository
- Selecionar seu repositório
- Framework: **Astro**
- Root Directory: **frontend**

3. **Configurar Build Settings**
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

4. **Adicionar Variáveis de Ambiente**
```
PUBLIC_SITE_URL=https://seu-dominio.vercel.app
PUBLIC_API_URL=https://seu-backend.deno.dev
```

5. **Deploy**
- Clicar em "Deploy"
- Aguardar ~2 minutos
- ✅ Site no ar!

### Opção 2: Deploy via CLI

```bash
npm install -g vercel
cd frontend
vercel

# Seguir instruções no terminal
# Configurar domínio customizado depois
```

### Após o Deploy

1. **Verificar sitemap**
   - Acessar: `https://seu-dominio.com/sitemap-index.xml`

2. **Testar meta tags**
   - View Source e verificar Open Graph
   - Usar [opengraph.xyz](https://www.opengraph.xyz/)

3. **Configurar domínio customizado**
   - Settings → Domains → Add Domain

---

## 🦕 BACKEND - DENO DEPLOY

### 1. Criar Projeto no Deno Deploy

- Acessar [dash.deno.com](https://dash.deno.com)
- New Project → From GitHub
- Selecionar repositório

### 2. Configurar Deploy

**Entry Point:** `backend/main.ts`

**Variáveis de Ambiente:** (nenhuma necessária)

### 3. Atualizar CORS

Após deploy, atualizar `backend/main.ts` com URL de produção:

```typescript
const ALLOWED_ORIGINS = [
  'https://seu-dominio.vercel.app', // URL do Vercel
  'https://seu-dominio.com', // Domínio customizado
  'http://localhost:4321',
];
```

### 4. Fazer commit e push

```bash
git add backend/main.ts
git commit -m "chore: atualizar CORS para produção"
git push
```

Deno Deploy fará redeploy automático.

---

## 🔧 CONFIGURAÇÕES PÓS-DEPLOY

### 1. Atualizar CORS no Backend

No `backend/main.ts`, adicionar domínio do Vercel:

```typescript
const ALLOWED_ORIGINS = [
  'https://portfolio-fabricio.vercel.app', // Seu domínio Vercel
  'https://fabsantos.dev', // Domínio customizado (se tiver)
  'http://localhost:4321', // Dev local
];
```

### 2. Atualizar Site URL no Frontend

No `frontend/astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://seu-dominio.vercel.app', // Seu domínio real
  // ...
});
```

No `frontend/public/robots.txt`:

```txt
Sitemap: https://seu-dominio.vercel.app/sitemap-index.xml
```

### 3. Rebuild do Frontend

```bash
cd frontend
npm run build
git add .
git commit -m "chore: atualizar URLs de produção"
git push
```

---

## 🔍 VERIFICAÇÕES PÓS-DEPLOY

### SEO

- [ ] Sitemap acessível em `/sitemap-index.xml`
- [ ] robots.txt acessível em `/robots.txt`
- [ ] Meta tags Open Graph corretas (view-source)
- [ ] Schema.org JSON-LD válido
- [ ] Canonical URLs corretas

**Ferramentas:**
```bash
# Testar Open Graph
https://www.opengraph.xyz/

# Testar Schema.org
https://search.google.com/test/rich-results

# Testar Twitter Card
https://cards-dev.twitter.com/validator
```

### Performance

- [ ] Lighthouse Score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

**Ferramenta:**
```bash
https://pagespeed.web.dev/
```

### Funcionalidade

- [ ] API respondendo em `/works`
- [ ] CORS permitindo apenas origens autorizadas
- [ ] Imagens carregando
- [ ] Animações funcionando
- [ ] Links sociais funcionando
- [ ] Skip link funciona (Tab)

### Acessibilidade

- [ ] WAVE sem erros críticos
- [ ] Lighthouse Accessibility > 95
- [ ] prefers-reduced-motion funcionando

**Ferramentas:**
```bash
https://wave.webaim.org/
```

---

## 📊 MONITORAMENTO

### Google Search Console

1. Acessar [search.google.com/search-console](https://search.google.com/search-console)
2. Adicionar propriedade (seu domínio)
3. Verificar propriedade (método HTML tag ou DNS)
4. Submeter sitemap: `https://seu-dominio.com/sitemap-index.xml`

### Vercel Analytics

Já está habilitado em `astro.config.mjs`:
```javascript
adapter: vercel({
  webAnalytics: {
    enabled: true
  }
})
```

Ver métricas em: Vercel Dashboard → Analytics

### Deno Deploy Logs

- Acessar Deno Deploy Dashboard
- Ver logs em tempo real
- Monitorar requests, erros, latência

---

## 🐛 TROUBLESHOOTING

### Erro: CORS bloqueando requests

**Solução:**
1. Verificar `ALLOWED_ORIGINS` em `backend/main.ts`
2. Adicionar URL exata do frontend
3. Fazer commit e push

### Erro: Sitemap não encontrado

**Solução:**
1. Verificar `site` em `astro.config.mjs`
2. Rebuild: `npm run build`
3. Verificar `dist/sitemap-index.xml` existe

### Erro: Meta tags não aparecem

**Solução:**
1. Limpar cache do navegador
2. View Source (não inspecionar)
3. Verificar build em produção, não dev

### Erro: Imagens quebradas

**Solução:**
1. Verificar paths relativos vs absolutos
2. Usar `/assets/` para public assets
3. Verificar case-sensitive em Linux/Vercel

### Performance baixa

**Solução:**
1. Otimizar imagens (WebP)
2. Adicionar `loading="lazy"`
3. Verificar bundle size no Vercel

---

## 🔄 ATUALIZAÇÃO CONTÍNUA

### Workflow de Deploy

```bash
# 1. Desenvolver localmente
npm run dev

# 2. Testar build
npm run build
npm run preview

# 3. Commit
git add .
git commit -m "feat: nova feature"

# 4. Push
git push origin main

# 5. Deploy automático!
# Vercel e Deno Deploy fazem deploy automaticamente
```

### Boas Práticas

- ✅ Sempre testar `npm run build` antes de push
- ✅ Usar commits semânticos (feat, fix, chore)
- ✅ Revisar Lighthouse após cada deploy
- ✅ Monitorar analytics semanalmente
- ✅ Atualizar dependências mensalmente

---

## 📞 SUPORTE

### Links Úteis

- **Astro Docs:** https://docs.astro.build
- **Vercel Docs:** https://vercel.com/docs
- **Deno Deploy:** https://deno.com/deploy/docs
- **Lighthouse:** https://web.dev/lighthouse

### Checklist Final

Antes de considerar deploy completo:

- [ ] Frontend no ar e acessível
- [ ] Backend respondendo corretamente
- [ ] CORS configurado corretamente
- [ ] Sitemap submetido ao Google
- [ ] Meta tags validadas
- [ ] Lighthouse Score > 90
- [ ] WAVE sem erros críticos
- [ ] Domínio customizado (opcional)
- [ ] Analytics configurado
- [ ] Monitoramento ativo

---

**🎉 Parabéns! Seu portfolio está no ar!**

Agora é hora de compartilhar:
- LinkedIn
- GitHub
- Twitter
- Instagram

Boa sorte! 🚀
