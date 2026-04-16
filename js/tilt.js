/**
 * tilt.js — Mouse-parallax 3D card tilt effect
 * Apply to any element with class "tilt-card"
 */
(function () {
  const MAX_TILT = 10; // degrees

  function initTilt(card) {
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('mouseenter', onEnter);
  }

  function onEnter(e) {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
  }

  function onMove(e) {
    const card   = e.currentTarget;
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    const rotateX = -dy * MAX_TILT;
    const rotateY =  dx * MAX_TILT;

    card.style.transition = 'transform 0.05s ease';
    card.style.transform  =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Subtle shine
    const shine = card.querySelector('.tilt-shine');
    if (shine) {
      shine.style.background =
        `radial-gradient(circle at ${(dx + 1) * 50}% ${(dy + 1) * 50}%,
          rgba(201,160,74,0.08) 0%, transparent 60%)`;
    }
  }

  function onLeave(e) {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1)';
    card.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  }

  // ── Init on DOM ready ─────────────────────────────────────────────────────
  document.querySelectorAll('.tilt-card').forEach(initTilt);
})();
