# 🚀 Prompt para Claude Code - Animações Estilo Lando Norris + GTA VI

## ⚠️ INSTRUÇÕES INICIAIS (LEIA PRIMEIRO)

Esse prompt é pra transformar meu site pessoal de portfólio em algo visualmente impactante, com animações inspiradas em:

1. **https://landonorris.com/** - Animações de scroll suaves, reveals, parallax
2. **https://www.rockstargames.com/VI** - Parallax por camadas, seções sticky, transições cinematográficas

**IMPORTANTE:** Não sai fazendo tudo de uma vez. Vamos por etapas.

---

## 📋 FASE 1: Análise do Projeto

Antes de qualquer coisa, analisa meu projeto:

```
1. Lista a estrutura de pastas e arquivos principais
2. Identifica o framework (Astro, Next, etc)
3. Mostra os componentes/páginas existentes
4. Identifica o CSS atual (Tailwind? CSS puro? SCSS?)
5. Verifica o package.json pra ver as deps atuais
```

Depois me apresenta um **resumo** do que encontrou e um **plano de implementação** dividido em fases.

**Espera minha confirmação antes de continuar.**

---

## 📋 FASE 2: Setup das Dependências

Só depois que eu confirmar a Fase 1:

```bash
# Instala as libs necessárias
npm install gsap lenis
```

Cria um arquivo de setup/utils pras animações (tipo `src/scripts/animations.js` ou similar, adapta pro meu projeto).

**Espera minha confirmação antes de continuar.**

---

## 📋 FASE 3: Hero Section

Implementa as animações do Hero:

### O que precisa ter:
- Background com parallax sutil (move no mouse ou no scroll)
- Grid/pattern decorativo com fade
- Badge animado (fade in + slide up)
- Título com reveal por palavra/linha
- Texto gradiente animado
- Subtítulo com delay
- Botão CTA com hover elaborado
- Scroll indicator animado

### Código de referência:
```javascript
// Parallax no mouse
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  heroBg.style.transform = `translate(${x}px, ${y}px)`;
});

// Reveal de palavras com GSAP
gsap.from('.hero-title .word', {
  y: '100%',
  opacity: 0,
  duration: 1,
  ease: 'expo.out',
  stagger: 0.1
});
```

### CSS base:
```css
@keyframes wordReveal {
  to { opacity: 1; transform: translateY(0); }
}

.gradient-text {
  background: linear-gradient(90deg, #00ff88, #00d4ff, #ff00ff, #00ff88);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**Implementa, testa com `npm run dev`, e espera minha confirmação.**

---

## 📋 FASE 4: Clients/Logos Section

Implementa o marquee infinito de clientes:

### O que precisa ter:
- Scroll horizontal infinito e suave
- Pausa no hover
- Logos com hover effect sutil

### Código de referência:
```css
.clients-track {
  display: flex;
  gap: 4rem;
  animation: marquee 20s linear infinite;
}

.clients-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

**Nota:** Duplica os itens no HTML pra criar o loop infinito sem pulo.

**Espera minha confirmação antes de continuar.**

---

## 📋 FASE 5: Works/Portfolio Section

Implementa os cards de projetos com animações:

### O que precisa ter:
- Cards aparecem com scroll trigger (fade + slide up)
- Stagger effect (um após o outro, não todos juntos)
- Hover: card sobe, sombra aumenta, imagem dá zoom
- Seta/ícone que aparece no hover
- Filtros com transição suave

### Código de referência:
```javascript
// Com Intersection Observer (sem GSAP)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.work-card').forEach(el => observer.observe(el));

// OU com GSAP ScrollTrigger
gsap.from('.work-card', {
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'expo.out',
  scrollTrigger: {
    trigger: '.works-grid',
    start: 'top 80%'
  }
});
```

### CSS:
```css
.work-card {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.work-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.work-card:nth-child(2) { transition-delay: 0.1s; }
.work-card:nth-child(3) { transition-delay: 0.2s; }
.work-card:nth-child(4) { transition-delay: 0.3s; }

.work-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
}

.work-card img {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.work-card:hover img {
  transform: scale(1.1);
}
```

**Espera minha confirmação antes de continuar.**

---

## 📋 FASE 6: About Section

Implementa a seção About com reveal de imagem:

### O que precisa ter:
- Imagem com reveal usando clip-path
- Elemento decorativo rotacionando (círculo, linha, etc)
- Stats com números que podem animar (opcional: contador)
- Texto aparecendo em stagger

### Código de referência:
```css
.about-image {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-image.is-visible {
  clip-path: inset(0 0% 0 0);
}

.decoration-circle {
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**Espera minha confirmação antes de continuar.**

---

## 📋 FASE 7: Seção Sticky (Estilo GTA VI) - OPCIONAL

Essa é mais complexa. Só faz se eu pedir.

### O que é:
Uma seção que "gruda" na tela enquanto o usuário scrolla, e o conteúdo interno muda (tipo slides horizontais controlados pelo scroll).

### Código de referência:
```javascript
// Com GSAP ScrollTrigger
gsap.to('.sticky-panels', {
  xPercent: -100 * (numPanels - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.sticky-section',
    start: 'top top',
    end: '+=300%',
    scrub: 1,
    pin: true
  }
});
```

### Estrutura HTML:
```html
<section class="sticky-section">
  <div class="sticky-container">
    <div class="sticky-panels">
      <div class="panel">Conteúdo 1</div>
      <div class="panel">Conteúdo 2</div>
      <div class="panel">Conteúdo 3</div>
    </div>
  </div>
</section>
```

**Essa fase é opcional. Pergunta se eu quero antes de implementar.**

---

## 📋 FASE 8: Smooth Scroll Global (Lenis)

Implementa scroll suave em toda a página:

### Setup:
```javascript
import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integração com GSAP (se estiver usando)
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### CSS necessário:
```css
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}
```

**Espera minha confirmação antes de continuar.**

---

## 📋 FASE 9: Contact Section + Footer

Finaliza com a seção de contato:

### O que precisa ter:
- Título com animação de entrada
- Email com underline animado no hover
- Botões sociais com hover effect
- Transições suaves

### CSS:
```css
.contact-email::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-email:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.social-link {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.social-link:hover {
  transform: translateY(-4px);
  background: var(--color-accent);
}
```

---

## 📋 FASE 10: Review e Polimento

No final:
1. Testa tudo junto
2. Verifica performance (Lighthouse)
3. Testa em mobile
4. Ajusta timings se necessário
5. Adiciona `will-change` onde precisar (com moderação)
6. Remove console.logs

---

## 🎨 VARIÁVEIS CSS GLOBAIS (usa como base)

```css
:root {
  /* Cores */
  --color-bg: #0a0a0a;
  --color-bg-secondary: #111111;
  --color-text: #ffffff;
  --color-text-muted: #888888;
  --color-accent: #00ff88;
  --color-accent-secondary: #00d4ff;
  --color-gradient: linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #ff00ff 100%);
  
  /* Easings */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  
  /* Durations */
  --duration-fast: 0.3s;
  --duration-medium: 0.6s;
  --duration-slow: 1s;
}
```

---

## 🚨 REGRAS IMPORTANTES

1. **Não faz tudo de uma vez** - Vai fase por fase
2. **Espera confirmação** - Depois de cada fase, espera eu dizer "ok" ou pedir ajustes
3. **Testa sempre** - Roda `npm run dev` e verifica se tá funcionando
4. **Mantém o que já existe** - Não apaga meu conteúdo, só adiciona as animações
5. **Comenta o código** - Pra eu entender o que cada parte faz
6. **Mobile first** - Garante que funciona em mobile também

---

## 🏁 VAMOS COMEÇAR!

Começa pela **FASE 1**: Analisa meu projeto e me mostra o que encontrou.