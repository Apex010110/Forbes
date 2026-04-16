/**
 * three-hero.js — Three.js hero scene for index.html
 * Gold wireframe torus + particle cloud
 */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // ── Scene Setup ───────────────────────────────────────────────────────────
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  camera.position.z = 7;

  // ── Primary Torus ─────────────────────────────────────────────────────────
  const torusGeo = new THREE.TorusGeometry(2.8, 0.012, 16, 160);
  const torusMat = new THREE.MeshBasicMaterial({ color: 0xC9A04A, transparent: true, opacity: 0.65 });
  const torus    = new THREE.Mesh(torusGeo, torusMat);
  torus.rotation.x = Math.PI / 5;
  scene.add(torus);

  // ── Secondary Inner Ring ──────────────────────────────────────────────────
  const ring2Geo = new THREE.TorusGeometry(1.9, 0.006, 16, 120);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xC9A04A, transparent: true, opacity: 0.3 });
  const ring2    = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = -Math.PI / 3;
  ring2.rotation.z = Math.PI / 6;
  scene.add(ring2);

  // ── Particle Cloud ────────────────────────────────────────────────────────
  const PARTICLE_COUNT = 2200;
  const positions      = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    // Distribute in a flattened sphere
    const r     = 8 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    positions[i3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
    positions[i3 + 2] = r * Math.cos(phi);
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color:       0xC9A04A,
    size:        0.022,
    transparent: true,
    opacity:     0.55,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ── Mouse Parallax ────────────────────────────────────────────────────────
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── Animation Loop ────────────────────────────────────────────────────────
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    // Torus rotation
    torus.rotation.y  = elapsed * 0.22 + targetX * 0.3;
    torus.rotation.x  = Math.PI / 5 + targetY * 0.15;

    ring2.rotation.y  = -elapsed * 0.18 + targetX * 0.2;
    ring2.rotation.z  = Math.PI / 6 + targetY * 0.1;

    // Particles drift
    particles.rotation.y = elapsed * 0.05;
    particles.rotation.x = elapsed * 0.02;

    renderer.render(scene, camera);
  }

  animate();

  // ── Resize ────────────────────────────────────────────────────────────────
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
