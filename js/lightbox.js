/**
 * lightbox.js — Keyboard & click-driven image lightbox for forbes.html
 */
(function () {
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightbox-img');
  const lbClose    = document.getElementById('lightbox-close');
  const lbCaption  = document.getElementById('lightbox-caption-text');
  const lbPrev     = document.getElementById('lb-prev');
  const lbNext     = document.getElementById('lb-next');

  if (!lightbox || !lbImg) return;

  let images  = [];
  let current = 0;

  // ── Collect all cover cards ───────────────────────────────────────────────
  function collectImages() {
    images = Array.from(document.querySelectorAll('.cover-card')).map(function (card) {
      return {
        src:      card.querySelector('img').src,
        headline: card.querySelector('.cover-headline')  ? card.querySelector('.cover-headline').textContent  : '',
        edition:  card.querySelector('.cover-edition')   ? card.querySelector('.cover-edition').textContent   : ''
      };
    });
  }

  // ── Open lightbox ─────────────────────────────────────────────────────────
  function openLightbox(index) {
    current = ((index % images.length) + images.length) % images.length;
    const img = images[current];
    lbImg.src = img.src;
    lbImg.alt = img.headline;
    if (lbCaption) {
      lbCaption.innerHTML =
        '<strong>' + img.headline + '</strong>' +
        (img.edition ? ' &mdash; ' + img.edition : '');
    }
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbImg.focus();
  }

  // ── Close lightbox ────────────────────────────────────────────────────────
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── Navigate ──────────────────────────────────────────────────────────────
  function prev() { openLightbox(current - 1); }
  function next() { openLightbox(current + 1); }

  // ── Event listeners ───────────────────────────────────────────────────────
  // Open on card click
  document.querySelectorAll('.cover-card').forEach(function (card, i) {
    card.addEventListener('click', function () { openLightbox(i); });
  });

  if (lbClose)   lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)    lbPrev.addEventListener('click',  prev);
  if (lbNext)    lbNext.addEventListener('click',  next);

  // Close on backdrop
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });

  // ── Init ──────────────────────────────────────────────────────────────────
  collectImages();
})();
