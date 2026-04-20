'use strict';

/**
 * Parallax Effect Handler
 * Cria um efeito de profundidade ao rolar a página
 */

class ParallaxEffect {
  constructor() {
    this.parallaxSection = document.querySelector('.parallax-section');
    this.parallaxLayers = document.querySelectorAll('.parallax-bg');
    this.heroImage = document.querySelector('.hero-image');
    this.scrollY = 0;
    this.ticking = false;
    this.isMobile = window.innerWidth <= 768;
    
    this.init();
  }

  init() {
    // Adiciona listener de scroll
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    
    // Atualiza flag de mobile ao redimensionar
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }

  onScroll() {
    this.scrollY = window.scrollY;

    // Usa requestAnimationFrame para melhor performance
    if (!this.ticking) {
      window.requestAnimationFrame(() => this.updateParallax());
      this.ticking = true;
    }
  }

  updateParallax() {
    // Desativa parallax em dispositivos móveis para economizar performance
    if (this.isMobile) {
      this.ticking = false;
      return;
    }

    // Atualiza cada camada de parallax com velocidades diferentes
    this.parallaxLayers.forEach((layer, index) => {
      const speed = 0.3 + (index * 0.15); // Velocidades progressivas: 0.3, 0.45, 0.6
      const offset = this.scrollY * speed;
      layer.style.transform = `translateY(${offset}px)`;
    });

    // Atualiza a imagem de perfil com um efeito mais suave
    if (this.heroImage) {
      const profileOffset = this.scrollY * 0.2;
      this.heroImage.style.transform = `translateY(${profileOffset}px)`;
    }

    this.ticking = false;
  }
}

// Inicializa o parallax quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
  new ParallaxEffect();
});
