// ===== THEME TOGGLE FUNCTIONALITY =====

// Detecta o tema preferido do usuário
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Obtém o tema salvo no localStorage ou usa o padrão do sistema
function getTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  return prefersDarkScheme.matches ? 'dark' : 'light';
}

// Define o tema na página
function setTheme(theme) {
  const root = document.documentElement;
  
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    root.removeAttribute('data-theme');
    document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-moon"></i>';
  }
  
  localStorage.setItem('theme', theme);
}

// Alterna entre os temas
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Inicializa o tema ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const initialTheme = getTheme();
  setTheme(initialTheme);
  
  // Adiciona o event listener ao botão
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});

// Monitora mudanças nas preferências do sistema
prefersDarkScheme.addEventListener('change', (e) => {
  const newTheme = e.matches ? 'dark' : 'light';
  setTheme(newTheme);
});
