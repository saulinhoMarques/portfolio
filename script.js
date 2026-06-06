// Fechar menu mobile ao clicar em um link
const navLinks = document.querySelectorAll(".nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  });
});

// Animação ao rolar a página
const animatedElements = document.querySelectorAll(
  ".service-card, .model-card, .price-card, .benefit-card, .process-card, .project-card, .section-title, .about-list div"
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
    threshold: 0.15,
  }
);

animatedElements.forEach((element) => {
  observer.observe(element);
});

// Mudar navbar ao rolar
const navbar = document.querySelector(".custom-navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// Voltar ao topo
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


// Gerenciar tema claro/escuro
const themeToggle = document.querySelector(".theme-toggle");

// Carregar tema salvo no localStorage
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  if (themeToggle) {
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  }
} else {
  if (themeToggle) {
    themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
  }
}

// Alternar tema ao clicar no botão
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    
    // Atualizar ícone
    const isDark = document.body.classList.contains("dark-theme");
    themeToggle.innerHTML = isDark 
      ? '<i class="bi bi-sun-fill"></i>' 
      : '<i class="bi bi-moon-fill"></i>';
    
    // Salvar preferência no localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}
