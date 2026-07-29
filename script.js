/* ==========================================================================
   Saulo Marques — interações da página
   Módulos: tema, menu mobile, navbar, animações de entrada, voltar ao topo
   ========================================================================== */

(() => {
  "use strict";

  const THEME_KEY = "theme";
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* Tema claro/escuro ----------------------------------------------------- */

  function setupTheme() {
    const toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    const icon = toggle.querySelector("i");

    const render = (isDark) => {
      if (icon) icon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-fill";
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute(
        "title",
        isDark ? "Ativar tema claro" : "Ativar tema escuro"
      );
    };

    render(document.body.classList.contains("dark-theme"));

    toggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-theme");
      render(isDark);
      try {
        localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
      } catch (error) {
        /* localStorage indisponível (modo privado): ignora */
      }
    });
  }

  /* Menu mobile ----------------------------------------------------------- */

  function setupMobileMenu() {
    const collapse = document.querySelector(".navbar-collapse");
    if (!collapse || typeof bootstrap === "undefined") return;

    collapse.querySelectorAll(".nav-link, .btn-whatsapp").forEach((link) => {
      link.addEventListener("click", () => {
        if (collapse.classList.contains("show")) {
          bootstrap.Collapse.getOrCreateInstance(collapse).hide();
        }
      });
    });
  }

  /* Navbar compacta ao rolar ---------------------------------------------- */

  function setupNavbarScroll() {
    const navbar = document.querySelector(".custom-navbar");
    if (!navbar) return;

    let ticking = false;

    const update = () => {
      navbar.classList.toggle("navbar-scrolled", window.scrollY > 80);
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    update();
  }

  /* Animações de entrada --------------------------------------------------- */

  function setupRevealAnimations() {
    const elements = document.querySelectorAll(
      ".service-card, .model-card, .price-card, .benefit-card, .process-card, .project-card, .section-title, .about-list li"
    );
    if (!elements.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("fade-in", "show"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });
  }

  /* Voltar ao topo --------------------------------------------------------- */

  function setupBackToTop() {
    const backToTop = document.querySelector("#backToTop");
    if (!backToTop) return;

    backToTop.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* Inicialização ---------------------------------------------------------- */

  setupTheme();
  setupMobileMenu();
  setupNavbarScroll();
  setupRevealAnimations();
  setupBackToTop();
})();
