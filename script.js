/* ═══════════════════════════════════════
   PRACHETAS SINGH PORTFOLIO – script.js
   ═══════════════════════════════════════ */

/* ── CURSOR GLOW ── */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

/* ── PARTICLE CANVAS ── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }

    reset() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.r     = Math.random() * 1.5 + 0.3;
      this.vx    = (Math.random() - 0.5) * 0.25;
      this.vy    = (Math.random() - 0.5) * 0.25;
      this.alpha = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79,158,255,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  // draw connections
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(79,158,255,${0.06 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }

  animate();
})();

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled state
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Active link highlight
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open');
});

navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* ── TYPEWRITER ── */
const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'Full-Stack Apps',
  'REST APIs',
  'React UIs',
  'Spring Boot Systems',
  'Scalable Backends',
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typewriterEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; type(); }, 1600);
      return;
    }
  } else {
    typewriterEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 45 : 75);
}
setTimeout(type, 1200);

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(
  '.about-text, .about-edu, .skill-category, .project-card, .timeline-item, ' +
  '.achievement-card, .contact-info, .contact-form, .edu-item, .stat-card, ' +
  '.pro-skill-item, .tech-bubble, .contact-item'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── SKILL BAR ANIMATION ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.pill-fill').forEach(fill => {
        fill.classList.add('animated');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const isFloat = target % 1 !== 0;
  const step = isFloat ? 0.5 : Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = isFloat
      ? Math.min(parseFloat((current + 0.5).toFixed(1)), target)
      : Math.min(current + step, target);
    el.textContent = isFloat ? current.toFixed(1) + suffix : current + suffix;
    if (current >= target) clearInterval(timer);
  }, 25);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const raw = num.textContent.trim();
        const hasPercent = raw.includes('%');
        const val = parseFloat(raw.replace('%', ''));
        animateCounter(num, val, hasPercent ? '%' : '');
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.about-stats').forEach(el => statObserver.observe(el));

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('formName').value.trim();
  const email   = document.getElementById('formEmail').value.trim();
  const message = document.getElementById('formMessage').value.trim();

  if (!name || !email || !message) {
    // shake the button
    const btn = document.getElementById('formSubmit');
    btn.style.animation = 'shakeBtn .4s ease';
    setTimeout(() => btn.style.animation = '', 400);
    return;
  }

  // Simulate send
  const btn = document.getElementById('formSubmit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    formSuccess.style.display = 'block';
    btn.innerHTML = '<span>Send Message</span>';
    btn.disabled = false;
    setTimeout(() => formSuccess.style.display = 'none', 4000);
  }, 1200);
});

/* ── SMOOTH SCROLL FOR NAV LINKS ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── SCROLL HINT HIDE ── */
const scrollHint = document.getElementById('scrollHint');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) scrollHint.style.opacity = '0';
  else scrollHint.style.opacity = '1';
}, { passive: true });

/* ── CSS: shake animation ── */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shakeBtn {
    0%,100% { transform: translateX(0); }
    20%,60%  { transform: translateX(-6px); }
    40%,80%  { transform: translateX(6px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ── FLOATING BADGE TILT ── */
document.querySelectorAll('.floating-badge').forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.transform = 'scale(1.1) translateY(-4px)';
    badge.style.transition = 'transform .25s ease';
  });
  badge.addEventListener('mouseleave', () => {
    badge.style.transform = '';
  });
});

/* ── TECH BUBBLE RANDOM STAGGER ── */
document.querySelectorAll('.tech-bubble').forEach((bubble, i) => {
  bubble.style.transitionDelay = `${i * 40}ms`;
});

console.log(
  '%c🚀 Prachetas Singh — Portfolio',
  'font-size:18px;font-weight:bold;color:#4f9eff;font-family:JetBrains Mono,monospace'
);
console.log('%cBuilt with ❤️ and lots of ☕', 'color:#7c3aed;font-size:13px');
