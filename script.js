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
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

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

  // 6. Calculadora de ROI / Retorno de Investimento
  const nicheSelect = document.getElementById("nicheSelect");
  const ticketInput = document.getElementById("ticketInput");
  const clientsNeededEl = document.getElementById("clientsNeeded");
  const roiDetailText = document.getElementById("roiDetailText");

  const PLAN_PRICE = 797; // Valor do Plano Profissional como referência

  function calculateROI() {
    let ticket = parseFloat(ticketInput.value) || 50;
    if (ticket <= 0) ticket = 50;

    const clientsCount = Math.ceil(PLAN_PRICE / ticket);
    clientsNeededEl.textContent = clientsCount;

    if (clientsCount === 1) {
      roiDetailText.textContent = `Apenas 1 único cliente ou venda paga 100% do seu investimento no site! Todo o resto é lucro puro.`;
    } else {
      roiDetailText.textContent = `Após ${clientsCount} vendas de R$ ${ticket.toFixed(2).replace('.', ',')}, todo o lucro gerado pela sua Landing Page é 100% seu!`;
    }
  }

  if (nicheSelect && ticketInput) {
    nicheSelect.addEventListener("change", (e) => {
      ticketInput.value = e.target.value;
      calculateROI();
    });

    ticketInput.addEventListener("input", () => {
      calculateROI();
    });

    // Calcular na inicialização
    calculateROI();
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
