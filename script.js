// Navbar: compacta ao rolar
const navbar = document.getElementById('navbar');
const onScroll = () => {
  if (!navbar) return;
  const compact = window.scrollY > 40;
  navbar.classList.toggle('py-2', compact);
  navbar.classList.toggle('shadow-[var(--shadow-soft)]', compact);
  navbar.classList.toggle('py-4', !compact);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => { menu.hidden = !menu.hidden; });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { menu.hidden = true; }));
}

// FAQ acordeão
document.querySelectorAll('[data-faq]').forEach((item) => {
  const btn = item.querySelector('button');
  const answer = item.querySelector('[data-faq-answer]');
  const icon = item.querySelector('svg');
  if (!btn || !answer) return;
  btn.addEventListener('click', () => {
    const willOpen = answer.hidden;
    document.querySelectorAll('[data-faq]').forEach((other) => {
      const a = other.querySelector('[data-faq-answer]');
      const b = other.querySelector('button');
      const i = other.querySelector('svg');
      if (a) a.hidden = true;
      if (b) b.setAttribute('aria-expanded', 'false');
      if (i) i.classList.remove('rotate-180');
    });
    if (willOpen) {
      answer.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      if (icon) icon.classList.add('rotate-180');
    }
  });
});

// Rolagem suave nas âncoras
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
