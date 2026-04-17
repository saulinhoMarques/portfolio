// ===== MAIN JAVASCRIPT FILE - PROFESSIONAL PORTFOLIO =====
'use strict';

// Cache de elementos do DOM
const DOMCache = {
    navbar: null,
    navLinks: null,
    sections: null,
    backToTopBtn: null,
    filterBtns: null,
    projectItems: null,
    skillBars: null,
    counters: null
};

// Inicializar cache do DOM
function initDOMCache() {
    DOMCache.navbar = document.getElementById('mainNav');
    DOMCache.navLinks = document.querySelectorAll('.nav-link');
    DOMCache.sections = document.querySelectorAll('section[id]');
    DOMCache.backToTopBtn = document.getElementById('back-to-top');
    DOMCache.filterBtns = document.querySelectorAll('.filter-btn');
    DOMCache.projectItems = document.querySelectorAll('.project-item');
    DOMCache.skillBars = document.querySelectorAll('.skill-progress');
    DOMCache.counters = document.querySelectorAll('.stat-number');
}

// Variáveis de controle para otimização
let ticking = false;
let lastScrollY = 0;
const scrollThrottle = 16; // ~60fps

document.addEventListener('DOMContentLoaded', function() {
    initDOMCache();
    
    // Inicializar AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            disable: 'mobile'
        });
    }

    // Inicializar todas as funcionalidades
    initNavbar();
    initSmoothScroll();
    initBackToTop();
    initProjectFilters();
    initSkillBars();
    initCounters();
    initAccessibility();
    
    // Remover funções desnecessárias para performance
    // initTypingEffect();
    // initParticles();
    // initScrollReveal();
    // initParallax();
});

// ===== NAVEGAÇÃO OTIMIZADA =====
function initNavbar() {
    if (!DOMCache.navbar) return;
    
    const handleScroll = () => {
        const scrollY = window.scrollY;
        
        // Navbar scroll effect
        if (scrollY > 100) {
            DOMCache.navbar.classList.add('scrolled');
        } else {
            DOMCache.navbar.classList.remove('scrolled');
        }
        
        // Scroll spy
        const scrollPos = scrollY + 100;
        
        DOMCache.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                DOMCache.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', throttle(handleScroll, scrollThrottle));
    handleScroll(); // Executar uma vez no carregamento
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== BOTÃO VOLTAR AO TOPO =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== FILTROS DE PROJETOS OTIMIZADOS =====
function initProjectFilters() {
    if (!DOMCache.filterBtns.length) return;
    
    DOMCache.filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            
            // Atualizar botão ativo
            DOMCache.filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar projetos com CSS classes em vez de inline styles
            DOMCache.projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                item.classList.toggle('hidden', !shouldShow);
                if (shouldShow) {
                    item.style.display = '';
                    item.offsetHeight; // Trigger reflow
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===== BARRAS DE HABILIDADES OTIMIZADAS =====
function initSkillBars() {
    if (!DOMCache.skillBars.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    DOMCache.skillBars.forEach(bar => observer.observe(bar));
}

// ===== CONTADORES ANIMADOS OTIMIZADOS =====
function initCounters() {
    if (!DOMCache.counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    DOMCache.counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    const increment = target / 50;
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// ===== EFEITO DE DIGITAÇÃO =====
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--secondary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Piscar cursor
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' 
                        ? '2px solid var(--secondary-color)' 
                        : 'none';
                }, 500);
            }
        };
        
        // Iniciar quando o elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ===== PARTÍCULAS FLUTUANTES =====
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);
    
    // Criar partículas
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// ===== EFEITO PARALLAX =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ===== UTILITÁRIOS =====

// Debounce function para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Função para detectar dispositivo móvel (com cache)
const isMobile = (() => {
    let cached = null;
    return () => {
        if (cached === null) {
            cached = window.innerWidth <= 768;
        }
        return cached;
    };
})();

// Função para adicionar classe quando elemento está visível
function onElementVisible(element, callback, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px',
        ...options
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, defaultOptions);
    
    observer.observe(element);
}

// ===== EVENTOS DE RESIZE OTIMIZADOS =====
window.addEventListener('resize', debounce(() => {
    // Reajustar cache de mobile
    const wasMobile = document.body.classList.contains('mobile');
    const isNowMobile = window.innerWidth <= 768;
    
    if (isNowMobile !== wasMobile) {
        document.body.classList.toggle('mobile', isNowMobile);
    }
}, 250));

// ===== PRELOADER OTIMIZADO =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Usar RequestAnimationFrame para scroll events
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            lastScrollY = window.scrollY;
            ticking = false;
        });
        ticking = true;
    }
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initAccessibility() {
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Melhorar contraste em modo de alto contraste do SO
    if (window.matchMedia('(prefers-contrast: more)').matches) {
        document.documentElement.style.setProperty('--shadow-glow', '0 0 30px rgba(111, 66, 193, 0.6)');
    }
    
    // Respeitar preferência de movimento reduzido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-normal', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('❌ Erro capturado:', e.error);
    // Implementar logging de erros em produção
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Promise rejection:', e.reason);
});

// ===== PERFORMANCE MONITORING =====
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Tempo de carregamento: ${pageLoadTime}ms`);
    });
}

// ===== CONSOLE MESSAGE =====
if (process.env.NODE_ENV !== 'production') {
    console.log(`
🚀 Portfólio Mr.IT - Modo Desenvolvimento
📧 Contato: saulomqs975@gmail.com
🌐 Desenvolvido com ❤️ e muito ☕
`);
}

// Exportar funções para uso global se necessário
window.PortfolioUtils = {
    debounce,
    throttle,
    isMobile,
    onElementVisible,
    initDOMCache
};

