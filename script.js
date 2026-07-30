<<<<<<< HEAD
// ==========================================================================
// Saulo Marques - Landing Page Interativa JS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Fechar menu mobile ao clicar em um link
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // 2. Animação ao rolar a página (Intersection Observer)
  const animatedElements = document.querySelectorAll(
    ".model-card, .price-card, .comparison-card, .process-step-card, .testimonial-card, .project-box, .section-title"
  );

  animatedElements.forEach((element) => {
    element.classList.add("fade-in");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // 3. Mudar navbar ao rolar
  const navbar = document.querySelector(".custom-navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  // 4. Voltar ao topo
  const backToTop = document.querySelector("#backToTop");
  if (backToTop) {
=======
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

>>>>>>> 6f1bfe0e0af8ea8f532cdc3084c8b9593e2c1288
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
<<<<<<< HEAD
        behavior: "smooth",
=======
        behavior: prefersReducedMotion ? "auto" : "smooth",
>>>>>>> 6f1bfe0e0af8ea8f532cdc3084c8b9593e2c1288
      });
    });
  }

<<<<<<< HEAD
  // 5. Gerenciar tema claro/escuro
  const themeToggle = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (themeToggle) themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  } else {
    if (themeToggle) themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      themeToggle.innerHTML = isDark
        ? '<i class="bi bi-sun-fill"></i>'
        : '<i class="bi bi-moon-fill"></i>';
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // 7. Toggle de Preço (À Vista vs Parcelado)
  const pricingToggle = document.getElementById("pricingToggle");
  const labelCash = document.getElementById("labelCash");
  const labelInstallments = document.getElementById("labelInstallments");
  const priceValues = document.querySelectorAll(".price-value");
  const priceNotes = document.querySelectorAll(".price-note");
  const planButtons = document.querySelectorAll(".btn-select-plan");

  function updatePrices() {
    const isInstallments = pricingToggle ? pricingToggle.checked : true;

    if (isInstallments) {
      labelInstallments.classList.add("active");
      labelCash.classList.remove("active");
    } else {
      labelCash.classList.add("active");
      labelInstallments.classList.remove("active");
    }

    priceValues.forEach((el) => {
      const cashVal = el.getAttribute("data-cash");
      const instVal = el.getAttribute("data-installment");
      el.textContent = isInstallments ? instVal : cashVal;
    });

    priceNotes.forEach((el) => {
      const noteVal = el.getAttribute("data-note");
      el.style.opacity = isInstallments ? "1" : "0.5";
    });

    // Atualizar links dos botões do WhatsApp com o tipo de pagamento selecionado
    planButtons.forEach((btn) => {
      const planName = btn.getAttribute("data-plan");
      const paymentType = isInstallments ? "parcelado em até 12x" : "à vista com desconto PIX";
      const message = `Olá, Saulo! Tenho interesse no plano *${planName}* (${paymentType}). Gostaria de fechar meu site!`;
      btn.href = `https://wa.me/5511997274119?text=${encodeURIComponent(message)}`;
    });
  }

  if (pricingToggle) {
    pricingToggle.addEventListener("change", updatePrices);
    // Configura inicial como checked (12x)
    pricingToggle.checked = true;
    updatePrices();
  }
});
=======
  /* Inicialização ---------------------------------------------------------- */

  setupTheme();
  setupMobileMenu();
  setupNavbarScroll();
  setupRevealAnimations();
  setupBackToTop();
})();
>>>>>>> 6f1bfe0e0af8ea8f532cdc3084c8b9593e2c1288
