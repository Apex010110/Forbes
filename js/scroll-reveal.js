/**
 * scroll-reveal.js — Lightweight GSAP-free scroll reveal
 * Triggers fade-up on elements with class "reveal"
 */
(function () {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // ── GSAP Path ──────────────────────────────────────────────────────────
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start:   'top 88%',
            once:    true
          }
        }
      );
    });

    // Stagger grids
    gsap.utils.toArray('.stagger-grid').forEach(function (grid) {
      const items = grid.querySelectorAll('.stagger-item');
      gsap.fromTo(items,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: grid,
            start:   'top 85%',
            once:    true
          }
        }
      );
    });

  } else {
    // ── IntersectionObserver Fallback ─────────────────────────────────────
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
          entry.target.style.opacity    = '1';
          entry.target.style.transform  = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }
})();
