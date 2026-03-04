// Shared navigation injected on all pages
function getActivePage() {
  const path = window.location.pathname;
  if (path.includes('decouverte')) return 'decouverte';
  if (path.includes('recrutement')) return 'recrutement';
  if (path.includes('formation')) return 'formation';
  if (path.includes('demonstration')) return 'demonstration';
  return 'accueil';
}

function activeClass(page, link) {
  if (page === link) {
    const map = { decouverte: 'active', recrutement: 'active-red', formation: 'active-green', demonstration: 'active-blue', accueil: 'active' };
    return map[page] || 'active';
  }
  return '';
}

document.addEventListener('DOMContentLoaded', () => {
  const page = getActivePage();
  const navEl = document.getElementById('main-nav');
  if (navEl) {
    navEl.querySelectorAll('[data-page]').forEach(a => {
      const p = a.getAttribute('data-page');
      if (p === page) {
        const cls = activeClass(page, p);
        a.classList.add(cls);
      }
    });
  }

  // Mobile menu toggle
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }
});

// ===== PARALLAX EFFECT =====
function initParallax() {
  const heroes = document.querySelectorAll('.page-hero');
  if (!heroes.length) return;

  heroes.forEach(hero => {
    const bg = hero.querySelector('.parallax-bg');
    if (!bg) return;

    let ticking = false;

    const updateParallax = () => {
      const rect = hero.getBoundingClientRect();
      const heroH = hero.offsetHeight;
      // How far the hero center is from the viewport center
      const viewportCenter = window.innerHeight / 2;
      const heroCenter = rect.top + heroH / 2;
      const offset = (heroCenter - viewportCenter) * 0.22;
      bg.style.transform = `translateY(${offset}px)`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    // Initial position
    updateParallax();
  });
}

// Also handle the main hero (index.html)
function initHeroParallax() {
  const hero = document.querySelector('.hero-parallax-bg');
  if (!hero) return;
  let ticking = false;
  const update = () => {
    const offset = window.scrollY * 0.28;
    hero.style.transform = `translateY(${offset}px)`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initHeroParallax();
});
