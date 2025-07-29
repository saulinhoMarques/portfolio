// ===== ANIMATIONS JAVASCRIPT =====

// Classe para gerenciar animações
class AnimationManager {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        this.initIntersectionObserver();
        this.initHoverAnimations();
        this.initClickAnimations();
        this.initLoadingAnimations();
    }

    // ===== INTERSECTION OBSERVER =====
    initIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, options);

        // Observar elementos com classes de animação
        const animatedElements = document.querySelectorAll(`
            .animate-on-scroll,
            .fade-in-up,
            .fade-in-down,
            .fade-in-left,
            .fade-in-right,
            .scale-in,
            .slide-in-left,
            .slide-in-right
        `);

        animatedElements.forEach(el => observer.observe(el));
        this.observers.set('intersection', observer);
    }

    // ===== TRIGGER ANIMATIONS =====
    triggerAnimation(element) {
        const animationType = this.getAnimationType(element);
        
        switch (animationType) {
            case 'fade-in-up':
                this.fadeInUp(element);
                break;
            case 'fade-in-down':
                this.fadeInDown(element);
                break;
            case 'fade-in-left':
                this.fadeInLeft(element);
                break;
            case 'fade-in-right':
                this.fadeInRight(element);
                break;
            case 'scale-in':
                this.scaleIn(element);
                break;
            case 'slide-in-left':
                this.slideInLeft(element);
                break;
            case 'slide-in-right':
                this.slideInRight(element);
                break;
            default:
                this.defaultAnimation(element);
        }
    }

    getAnimationType(element) {
        const classes = element.classList;
        if (classes.contains('fade-in-up')) return 'fade-in-up';
        if (classes.contains('fade-in-down')) return 'fade-in-down';
        if (classes.contains('fade-in-left')) return 'fade-in-left';
        if (classes.contains('fade-in-right')) return 'fade-in-right';
        if (classes.contains('scale-in')) return 'scale-in';
        if (classes.contains('slide-in-left')) return 'slide-in-left';
        if (classes.contains('slide-in-right')) return 'slide-in-right';
        return 'default';
    }

    // ===== ANIMATION METHODS =====
    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    fadeInDown(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-30px)';
        element.style.transition = 'all 0.6s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    fadeInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = 'all 0.6s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    fadeInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = 'all 0.6s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    scaleIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 0.5s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    slideInLeft(element) {
        element.style.transform = 'translateX(-100%)';
        element.style.transition = 'transform 0.6s ease';
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateX(0)';
        });
    }

    slideInRight(element) {
        element.style.transform = 'translateX(100%)';
        element.style.transition = 'transform 0.6s ease';
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateX(0)';
        });
    }

    defaultAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    // ===== HOVER ANIMATIONS =====
    initHoverAnimations() {
        // Animação de lift para cards
        const liftElements = document.querySelectorAll('.hover-lift');
        liftElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-10px)';
                element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
                element.style.boxShadow = '';
            });
        });

        // Animação de scale para botões
        const scaleElements = document.querySelectorAll('.hover-scale');
        scaleElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.05)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });

        // Animação de glow para elementos especiais
        const glowElements = document.querySelectorAll('.hover-glow');
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.boxShadow = '0 0 20px rgba(187, 134, 252, 0.6)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = '';
            });
        });
    }

    // ===== CLICK ANIMATIONS =====
    initClickAnimations() {
        // Ripple effect para botões
        const rippleButtons = document.querySelectorAll('.btn, .project-link, .social-link');
        rippleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Adicionar estilos do ripple
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s linear';
        ripple.style.pointerEvents = 'none';

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        // Remover ripple após animação
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // ===== LOADING ANIMATIONS =====
    initLoadingAnimations() {
        // Skeleton loading para imagens
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            this.lazyLoadImage(img);
        });

        // Progress bar animation
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            this.animateProgressBar(bar);
        });
    }

    lazyLoadImage(img) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('loading');
                    imageObserver.unobserve(image);
                }
            });
        });

        imageObserver.observe(img);
    }

    animateProgressBar(bar) {
        const targetWidth = bar.dataset.width || '0%';
        bar.style.width = '0%';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(bar);
    }

    // ===== UTILITY METHODS =====
    addAnimation(element, animationClass, duration = 1000) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    }

    pulse(element, duration = 1000) {
        this.addAnimation(element, 'animate-pulse', duration);
    }

    shake(element, duration = 500) {
        this.addAnimation(element, 'animate-shake', duration);
    }

    bounce(element, duration = 1000) {
        this.addAnimation(element, 'animate-bounce', duration);
    }

    // ===== STAGGER ANIMATIONS =====
    staggerAnimation(elements, animationType, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                this.triggerAnimation(element);
            }, index * delay);
        });
    }

    // ===== CLEANUP =====
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}

// ===== CSS ANIMATIONS =====
const animationCSS = `
@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.animate-shake {
    animation: shake 0.5s ease-in-out;
}

.animate-bounce {
    animation: bounce 1s ease-in-out;
}

.animate-pulse {
    animation: pulse 1s ease-in-out;
}

.loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading-shimmer 1.5s infinite;
}

@keyframes loading-shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}

.progress-bar {
    transition: width 2s ease-in-out;
}
`;

// Adicionar CSS ao documento
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);

// ===== INICIALIZAÇÃO =====
let animationManager;

document.addEventListener('DOMContentLoaded', () => {
    animationManager = new AnimationManager();
});

// ===== EXPORT =====
window.AnimationManager = AnimationManager;
window.animationManager = animationManager;

// ===== PERFORMANCE MONITORING =====
if (typeof performance !== 'undefined') {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`⚡ Animações carregadas em ${loadTime.toFixed(2)}ms`);
    });
}

