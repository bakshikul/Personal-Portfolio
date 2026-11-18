document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initTyping();
  initReveal();
  initContactForm();
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});

function initNavigation() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!nav || !toggle || !links) return;
  const icon = toggle.querySelector("i");

  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (icon) {
      icon.classList.toggle("fa-bars", !open);
      icon.classList.toggle("fa-xmark", open);
    }
  };

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  links.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) {
      setOpen(false);
      links.querySelectorAll("a").forEach((item) => item.classList.toggle("active", item === link));
    }
  });
  document.addEventListener("click", (event) => {
    if (nav.classList.contains("open") && !nav.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) setOpen(false);
  });
}

function initTyping() {
  const element = document.getElementById("typing-text");
  if (!element) return;
  const phrases = ["AI & machine learning", "data-driven solutions", "thoughtful web experiences"];
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.textContent = phrases[0];
    return;
  }
  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let deleting = true;
  const tick = () => {
    const phrase = phrases[phraseIndex];
    if (deleting) {
      charIndex--;
      element.textContent = phrase.slice(0, Math.max(0, charIndex));
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        window.setTimeout(tick, 350);
        return;
      }
      window.setTimeout(tick, 35);
    } else {
      const next = phrases[phraseIndex];
      charIndex++;
      element.textContent = next.slice(0, charIndex);
      if (charIndex >= next.length) {
        deleting = true;
        window.setTimeout(tick, 1600);
        return;
      }
      window.setTimeout(tick, 65);
    }
  };
  window.setTimeout(tick, 1600);
}

function initReveal() {
  const targets = document.querySelectorAll(
    ".about-copy, .education-card, .skill-card, .stat-card, .timeline-card, .project-card, .cert-card, .contact-panel"
  );
  if (!targets.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }
  targets.forEach((target) => target.classList.add("reveal"));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((target) => observer.observe(target));
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Hi Kul,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
    if (status) status.textContent = "Opening your email app…";
    window.location.href = `mailto:kulbakshi01@gmail.com?subject=${subject}&body=${body}`;
  });
}
