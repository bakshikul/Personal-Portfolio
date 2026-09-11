document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initNetworkCanvas();
  initActiveNav();
  initScrollReveal();
  initContactForm();
  initCardSpotlight();
});

function initTypingEffect() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const roles = ['an AI/ML Engineer', 'a Web Developer', 'a Problem Solver'];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    el.textContent = roles[0];
    return;
  }
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const TYPE_SPEED = 65;
  const DELETE_SPEED = 35;
  const HOLD_TIME = 1400;
  const GAP_TIME = 400;
  function tick() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, GAP_TIME);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }
  tick();
}

function initNetworkCanvas() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'network-canvas';
  hero.prepend(canvas);
  const ctx = canvas.getContext('2d');
  let width, height, nodes;
  const NODE_COUNT = 50;
  const LINK_DIST = 130;
  const VIOLET = '124, 92, 252';
  const CYAN = '34, 211, 197';
  function resize() {
    width = canvas.width = hero.clientWidth;
    height = canvas.height = hero.clientHeight;
  }
  function makeNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.7 + 1,
      cyan: Math.random() < 0.35
    }));
  }
  function step() {
    ctx.clearRect(0, 0, width, height);
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.cyan ? CYAN : VIOLET}, 0.6)`;
      ctx.fill();
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const opacity = (1 - dist / LINK_DIST) * 0.2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${VIOLET}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }
  resize();
  makeNodes();
  step();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      makeNodes();
    }, 200);
  });
}

function initActiveNav() {
  const links = document.querySelectorAll('.nav-links a');
  if (!links.length) return;
  const sections = Array.from(links).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (!sections.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.about-conta, .skill-list > div, .experience1, .project1, .contact-container');
  if (!targets.length) return;
  if (prefersReducedMotion) {
    targets.forEach(t => t.classList.add('reveal', 'is-visible'));
    return;
  }
  targets.forEach(t => t.classList.add('reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(t => observer.observe(t));
}

function initContactForm() {
  const form = document.querySelector('.contact1 form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Contact form submitted:', data);
    let status = form.querySelector('.form-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'form-status';
      form.appendChild(status);
    }
    status.textContent = `Thanks, ${data.name.split(' ')[0]} — your message is on its way. I'll get back to you soon.`;
    form.reset();
  });
}

function initCardSpotlight() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;
  const cards = document.querySelectorAll('.skill-list > div, .experience1, .project1');
  cards.forEach(card => {
    card.style.setProperty('--spot-x', '50%');
    card.style.setProperty('--spot-y', '50%');
    card.addEventListener('pointermove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--spot-x', `${x}%`);
      card.style.setProperty('--spot-y', `${y}%`);
    });
  });
}