/**
 * 🎨 Portfolio Animations - GSAP + Lenis Setup
 * Inspirado em: landonorris.com + rockstargames.com/VI
 *
 * Este arquivo contém todas as funções de animação reutilizáveis
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Registrar plugins do GSAP
gsap.registerPlugin(ScrollTrigger);

// ============================================
// 🌊 SMOOTH SCROLL (LENIS)
// ============================================

let lenisInstance: Lenis | null = null;

/**
 * Inicializa o smooth scroll com Lenis
 * Cria uma experiência de scroll suave e elegante
 */
export function initSmoothScroll(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing exponencial
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  });

  // Integrar Lenis com GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Sincronizar com o ticker do GSAP para performance
  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  // Desabilitar lag smoothing do GSAP para melhor sincronia
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

/**
 * Obtém a instância atual do Lenis
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Para o smooth scroll temporariamente (útil para modais)
 */
export function stopSmoothScroll(): void {
  lenisInstance?.stop();
}

/**
 * Retoma o smooth scroll
 */
export function startSmoothScroll(): void {
  lenisInstance?.start();
}

// ============================================
// 🎬 ANIMAÇÕES DE ENTRADA (REVEAL)
// ============================================

/**
 * Anima palavras individualmente com reveal
 * Usado para títulos impactantes
 */
export function animateWords(selector: string, options: gsap.TweenVars = {}): gsap.core.Tween {
  const defaults: gsap.TweenVars = {
    y: '100%',
    opacity: 0,
    duration: 1,
    ease: 'expo.out',
    stagger: 0.1,
  };

  return gsap.from(selector, { ...defaults, ...options });
}

/**
 * Anima elementos com fade in + slide up
 * Perfeito para seções que aparecem no scroll
 */
export function animateFadeUp(
  elements: string | Element | Element[],
  options: gsap.TweenVars = {}
): gsap.core.Tween {
  const defaults: gsap.TweenVars = {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'expo.out',
    stagger: 0.15,
  };

  return gsap.from(elements, { ...defaults, ...options });
}

/**
 * Cria animação com ScrollTrigger
 * Para elementos que animam quando entram na viewport
 */
export function animateOnScroll(
  elements: string | Element | Element[],
  triggerElement: string | Element,
  options: gsap.TweenVars = {},
  triggerOptions: ScrollTrigger.Vars = {}
): gsap.core.Tween {
  const defaults: gsap.TweenVars = {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'expo.out',
    stagger: 0.15,
  };

  const triggerDefaults: ScrollTrigger.Vars = {
    trigger: triggerElement,
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  };

  return gsap.from(elements, {
    ...defaults,
    ...options,
    scrollTrigger: { ...triggerDefaults, ...triggerOptions },
  });
}

/**
 * Anima cards em grid com stagger effect
 * Os cards aparecem um após o outro
 */
export function animateGridCards(
  gridSelector: string,
  cardSelector: string,
  options: gsap.TweenVars = {}
): gsap.core.Tween {
  const defaults: gsap.TweenVars = {
    y: 80,
    opacity: 0,
    scale: 0.95,
    duration: 0.6,
    ease: 'back.out(1.7)',
    stagger: {
      amount: 0.8,
      grid: 'auto',
      from: 'start',
    },
  };

  return gsap.from(cardSelector, {
    ...defaults,
    ...options,
    scrollTrigger: {
      trigger: gridSelector,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });
}

// ============================================
// 🎯 PARALLAX
// ============================================

/**
 * Cria efeito parallax baseado no movimento do mouse
 * Usado no Hero para dar profundidade
 */
export function initMouseParallax(
  element: HTMLElement,
  intensity: number = 20
): () => void {
  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * intensity;
    const y = (e.clientY / window.innerHeight - 0.5) * intensity;

    gsap.to(element, {
      x,
      y,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  document.addEventListener('mousemove', handleMouseMove);

  // Retorna função para remover o listener
  return () => document.removeEventListener('mousemove', handleMouseMove);
}

/**
 * Cria efeito parallax no scroll
 * Elementos se movem em velocidades diferentes
 */
export function initScrollParallax(
  element: string | Element,
  speed: number = 0.5
): gsap.core.Tween {
  return gsap.to(element, {
    yPercent: -100 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// ============================================
// 🎪 SEÇÃO STICKY (ESTILO GTA VI)
// ============================================

/**
 * Cria seção sticky com scroll horizontal
 * Os painéis deslizam horizontalmente conforme o scroll vertical
 */
export function initStickySection(
  sectionSelector: string,
  panelsSelector: string,
  options: { scrub?: number; pin?: boolean } = {}
): gsap.core.Tween {
  const panels = document.querySelectorAll(panelsSelector);
  const numPanels = panels.length;

  if (numPanels === 0) return gsap.to({}, {});

  const defaults = {
    scrub: 1,
    pin: true,
  };

  const config = { ...defaults, ...options };

  return gsap.to(panelsSelector, {
    xPercent: -100 * (numPanels - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: sectionSelector,
      start: 'top top',
      end: `+=${numPanels * 100}%`,
      scrub: config.scrub,
      pin: config.pin,
      anticipatePin: 1,
    },
  });
}

// ============================================
// ✨ EFEITOS ESPECIAIS
// ============================================

/**
 * Animação de reveal com clip-path
 * Cria efeito de "cortina" revelando o conteúdo
 */
export function animateClipReveal(
  element: string | Element,
  direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
  options: gsap.TweenVars = {}
): gsap.core.Tween {
  const clipPaths: Record<string, { from: string; to: string }> = {
    left: {
      from: 'inset(0 100% 0 0)',
      to: 'inset(0 0% 0 0)',
    },
    right: {
      from: 'inset(0 0 0 100%)',
      to: 'inset(0 0 0 0%)',
    },
    top: {
      from: 'inset(0 0 100% 0)',
      to: 'inset(0 0 0% 0)',
    },
    bottom: {
      from: 'inset(100% 0 0 0)',
      to: 'inset(0% 0 0 0)',
    },
  };

  const defaults: gsap.TweenVars = {
    clipPath: clipPaths[direction].to,
    duration: 1.2,
    ease: 'expo.out',
  };

  // Definir estado inicial
  gsap.set(element, { clipPath: clipPaths[direction].from });

  return gsap.to(element, { ...defaults, ...options });
}

/**
 * Animação de texto gradiente
 * O gradiente se move horizontalmente
 */
export function animateGradientText(element: HTMLElement): gsap.core.Tween {
  return gsap.to(element, {
    backgroundPosition: '200% center',
    duration: 8,
    ease: 'none',
    repeat: -1,
  });
}

/**
 * Animação de contagem de números
 * Perfeito para stats e métricas
 */
export function animateCounter(
  element: HTMLElement,
  endValue: number,
  duration: number = 2
): gsap.core.Tween {
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString();
    },
  });
}

/**
 * Efeito de brilho/shine que passa pelo elemento
 */
export function animateShine(element: HTMLElement): gsap.core.Tween {
  return gsap.fromTo(
    element,
    { backgroundPosition: '-200% 0' },
    {
      backgroundPosition: '200% 0',
      duration: 1.5,
      ease: 'power2.inOut',
    }
  );
}

// ============================================
// 🛠️ UTILIDADES
// ============================================

/**
 * Verifica se o usuário prefere movimento reduzido
 * Respeita acessibilidade
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Wrapper que respeita prefers-reduced-motion
 * Use isso para envolver animações opcionais
 */
export function safeAnimate(
  animationFn: () => gsap.core.Tween | void
): gsap.core.Tween | void {
  if (prefersReducedMotion()) {
    return;
  }
  return animationFn();
}

/**
 * Limpa todas as animações e ScrollTriggers
 * Útil para cleanup em SPAs
 */
export function cleanupAnimations(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf('*');
}

/**
 * Atualiza ScrollTrigger após mudanças no DOM
 * Chamar após adicionar/remover elementos
 */
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

// ============================================
// 🎨 PRESETS DE ANIMAÇÃO
// ============================================

/**
 * Preset para animação de entrada de seção
 * Use em qualquer seção para entrada elegante
 */
export const presets = {
  // Fade in suave vindo de baixo
  fadeUp: {
    from: { y: 60, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
  },

  // Slide da esquerda
  slideLeft: {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
  },

  // Slide da direita
  slideRight: {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' },
  },

  // Scale com bounce
  popIn: {
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
  },

  // Reveal de texto palavra por palavra
  wordReveal: {
    from: { y: '100%', opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.08 },
  },
};

// Export default para facilitar import
export default {
  initSmoothScroll,
  getLenis,
  stopSmoothScroll,
  startSmoothScroll,
  animateWords,
  animateFadeUp,
  animateOnScroll,
  animateGridCards,
  initMouseParallax,
  initScrollParallax,
  initStickySection,
  animateClipReveal,
  animateGradientText,
  animateCounter,
  animateShine,
  prefersReducedMotion,
  safeAnimate,
  cleanupAnimations,
  refreshScrollTrigger,
  presets,
};
