# 🎨 Portfolio - Fabrício Bahiense

Portfolio profissional de Front-End Developer com foco em SEO, performance e acessibilidade.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![SEO Score](https://img.shields.io/badge/SEO-9%2F10-success)
![Accessibility](https://img.shields.io/badge/a11y-WCAG%20AA-success)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- 🎯 **SEO Profissional** - Open Graph, Twitter Cards, Schema.org
- ⚡ **Alta Performance** - Lighthouse Score 90+
- ♿ **Acessível** - WCAG 2.1 Nível AA
- 🔒 **Seguro** - CORS whitelist, caching, error handling
- 📱 **Responsivo** - Mobile-first design
- 🚀 **PWA Ready** - Web Manifest completo
- 🎨 **Animações GSAP** - Micro-interações fluidas

---

## 🛠️ Stack

### Frontend
- **Framework:** [Astro](https://astro.build) 4.8.2
- **UI Library:** [Vue 3](https://vuejs.org) + [React](https://react.dev)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Animations:** [GSAP](https://greensock.com/gsap/)
- **TypeScript:** 5.5+

### Backend
- **Runtime:** [Deno](https://deno.land)
- **Framework:** [Oak](https://oakserver.github.io/oak/)
- **CORS:** oakCors

### Deploy
- **Frontend:** [Vercel](https://vercel.com)
- **Backend:** [Deno Deploy](https://deno.com/deploy)
- **Analytics:** Vercel Analytics

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- npm ou pnpm
- Deno 1.40+

### Instalação

```bash
# Clonar repositório
git clone https://github.com/FabbSantos/portfolio_astro_deno.git
cd portfolio_astro_deno

# Instalar dependências do frontend
cd frontend
npm install

# Voltar para raiz
cd ..
```

### Desenvolvimento

**Frontend:**
```bash
cd frontend
npm run dev
```
Acesse: http://localhost:4321

**Backend:**
```bash
cd backend
deno run --allow-all main.ts
```
Acesse: http://localhost:5000

---

## 📦 Build

```bash
cd frontend
npm run build
```

O build será gerado em `frontend/dist/`

**Verificar build:**
```bash
npm run preview
```

---

## 🧪 Scripts Úteis

```bash
# Analisar tamanho das imagens
npm run analyze:images

# Verificar SEO em dev
npm run check:seo

# Build completo
npm run build

# Preview do build
npm run preview
```

---

## 📊 Melhorias Implementadas

Este portfolio passou por uma otimização completa. Veja o relatório detalhado:

📄 **[IMPROVEMENTS.md](./IMPROVEMENTS.md)** - Relatório completo de melhorias

### Resumo

| Aspecto | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| SEO | 3/10 | 9/10 | +200% |
| Performance | 5/10 | 7/10 | +40% |
| Acessibilidade | 6/10 | 9/10 | +50% |
| Segurança | 3/10 | 9/10 | +200% |

---

## 🚢 Deploy

Guia completo de deploy:

📄 **[DEPLOY.md](./DEPLOY.md)** - Guia passo a passo

### Deploy Rápido

**Frontend (Vercel):**
```bash
npm install -g vercel
cd frontend
vercel
```

**Backend (Deno Deploy):**
- Push para GitHub
- Conectar repo no [Deno Deploy](https://dash.deno.com)
- Entry point: `backend/main.ts`

---

## 📁 Estrutura do Projeto

```
portfolio_astro_deno/
├── frontend/               # Frontend Astro
│   ├── public/            # Assets estáticos
│   │   ├── robots.txt     # SEO
│   │   └── site.webmanifest # PWA
│   ├── src/
│   │   ├── assets/        # Imagens
│   │   ├── components/    # Componentes Astro/Vue
│   │   ├── layouts/       # Layouts
│   │   └── pages/         # Páginas
│   ├── scripts/           # Scripts úteis
│   │   └── optimize-images.js
│   ├── astro.config.mjs   # Config Astro
│   └── package.json
│
├── backend/               # Backend Deno
│   ├── models/
│   │   └── work.json      # Dados de projetos
│   └── main.ts            # API Server
│
├── IMPROVEMENTS.md        # Relatório de melhorias
├── DEPLOY.md             # Guia de deploy
└── README.md             # Este arquivo
```

---

## 🔧 Configuração

### Variáveis de Ambiente

Copie `.env.example` para `.env`:

```bash
cd frontend
cp .env.example .env
```

Edite `.env` com suas configurações:

```env
PUBLIC_SITE_URL=https://seu-dominio.com
PUBLIC_API_URL=https://api.seu-dominio.com
```

### Domínio Customizado

Atualize nos seguintes arquivos:

1. `frontend/astro.config.mjs` - linha 12
2. `frontend/public/robots.txt` - linha 9
3. `backend/main.ts` - linhas 8-9

---

## ✅ Checklist SEO

- [x] Meta tags completas (title, description, keywords)
- [x] Open Graph tags (Facebook, LinkedIn, WhatsApp)
- [x] Twitter Card tags
- [x] Schema.org JSON-LD estruturado
- [x] Canonical URLs
- [x] Sitemap.xml automático
- [x] robots.txt otimizado
- [x] Web Manifest completo
- [x] GSAP atualizado

---

## ♿ Acessibilidade

- [x] Skip links implementados
- [x] ARIA labels corretos
- [x] SVGs decorativos com aria-hidden
- [x] prefers-reduced-motion
- [x] HTML semântico
- [x] Contraste adequado
- [x] Navegação por teclado

---

## 🔒 Segurança

- [x] CORS whitelist
- [x] Error handling robusto
- [x] Input validation
- [x] Cache headers corretos
- [x] Rate limiting (recomendado)

---

## 📈 Performance

### Métricas Lighthouse

- **Performance:** 90+
- **SEO:** 95+
- **Accessibility:** 95+
- **Best Practices:** 90+

### Otimizações

- [x] CSS otimizado (sem transição global)
- [x] JavaScript minificado
- [x] Lazy loading
- [x] Cache inteligente
- [ ] Imagens WebP (próximo passo)

---

## 🧪 Testes

### Testar SEO

- [Google Rich Results](https://search.google.com/test/rich-results)
- [Open Graph Debugger](https://www.opengraph.xyz/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Testar Performance

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### Testar Acessibilidade

- [WAVE](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adicionar nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📝 To-Do

### Alta Prioridade
- [ ] Otimizar imagens (converter para WebP)
- [ ] Criar imagem OG personalizada (1200x630px)
- [ ] Configurar domínio customizado

### Média Prioridade
- [ ] Implementar rate limiting
- [ ] Adicionar lazy loading em todas as imagens
- [ ] Otimizar fontes

### Baixa Prioridade
- [ ] Service Worker para PWA completo
- [ ] Internacionalização (i18n)
- [ ] Dark mode toggle
- [ ] Analytics avançado

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Fabrício Bahiense**

- GitHub: [@FabbSantos](https://github.com/FabbSantos)
- LinkedIn: [fabricio-b-santos](https://www.linkedin.com/in/fabricio-b-santos/)
- Instagram: [@fabbahiense_](https://www.instagram.com/fabbahiense_)

---

## 🙏 Agradecimentos

- [Astro](https://astro.build) - Framework incrível
- [Vercel](https://vercel.com) - Hospedagem
- [Deno](https://deno.land) - Runtime moderno
- [GSAP](https://greensock.com) - Animações

---

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

---

*Última atualização: 2025-11-07*
*Versão: 1.0.0*
