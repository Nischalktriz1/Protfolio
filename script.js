/* =============================================
   PORTFOLIO — script.js
   ============================================= */

'use strict';

/* ---------- PROJECT THUMB EMOJIS ---------- */
const EMOJIS = ['🛒', '🎨', '🤖', '📊', '📱', '🚀'];

/* ---------- HARD-CODED DATA ---------- */
const portfolioData = {
  personal: {
    name: "Nischal Khatri",
    title: "AI Student at Softwarica College",
    tagline: "19 years old · Building innovative AI solutions and digital experiences.",
    email: "nishcal@example.com",
    phone: "+977 98xxxxxxxx",
    location: "Kathmandu, Nepal",
    avatar: "",
    resume: "#",
    social: {
      github: "https://github.com/Nischalktriz1",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      dribbble: "https://dribbble.com"
    }
  },
  about: {
    bio: "I'm a passionate AI student with a strong interest in machine learning, web development, and creating innovative digital solutions. Currently studying at Softwarica College and eager to apply my skills to real-world projects.",
    highlights: [
      "AI/ML Enthusiast",
      "Web Development",
      "Problem Solver",
      "Quick Learner"
    ],
    skills: [
      { "name": "Python", "level": 85 },
      { "name": "JavaScript", "level": 80 },
      { "name": "HTML/CSS", "level": 90 },
      { "name": "Machine Learning", "level": 75 },
      { "name": "React", "level": 70 },
      { "name": "Data Analysis", "level": 78 }
    ]
  },
  projects: [
    {
      id: 1,
      title: "AI Chatbot",
      description: "An intelligent chatbot powered by natural language processing for customer service automation.",
      category: "fullstack",
      tags: ["Python", "NLP", "TensorFlow", "Flask"],
      image: "",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with HTML, CSS, and JavaScript.",
      category: "frontend",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      image: "",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "Data Analysis Dashboard",
      description: "Interactive dashboard for visualizing and analyzing complex datasets with real-time updates.",
      category: "fullstack",
      tags: ["Python", "Pandas", "Plotly", "Streamlit"],
      image: "",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    }
  ],
  experience: [
    {
      company: "Softwarica College",
      role: "AI Student",
      period: "2023 – Present",
      description: "Currently pursuing AI studies with focus on machine learning, deep learning, and practical applications of AI technology."
    }
  ],
  categories: [
    { "id": "all", "label": "All Work" },
    { "id": "fullstack", "label": "Full-Stack" },
    { "id": "frontend", "label": "Frontend" },
    { "id": "backend", "label": "Backend" },
    { "id": "design", "label": "Design" }
  ]
};

/* ---------- LOAD DATA & INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  populateHero(portfolioData.personal);
  populateAbout(portfolioData.about);
  populateProjects(portfolioData.projects, portfolioData.categories);
  populateExperience(portfolioData.experience);
  populateContact(portfolioData.personal);
  populateFooter(portfolioData.personal);
  initScrollReveal();
  initNavHighlight();
  initSkillBars();

  initNavbar();
  initThemeToggle();
  initHamburger();
  initContactForm();
  document.getElementById('footer-year').textContent = new Date().getFullYear();
});

/* ============================================
   POPULATE FUNCTIONS
   ============================================ */

function populateHero(p) {
  setText('hero-name', p.name);
  setText('hero-title-text', p.title);
  setText('hero-tagline', p.tagline);
  setText('footer-name', p.name);
  document.querySelector('.logo').textContent = initials(p.name) + '.';
  document.getElementById('footer-logo').innerHTML = initials(p.name) + '<span class="logo-dot">.</span>';
  document.title = p.name + ' — Portfolio';
  const resumeLink = document.getElementById('resume-link');
  if (resumeLink) resumeLink.href = p.resume || '#';
}

function populateAbout(about) {
  setText('about-bio', about.bio);

  // Highlights
  const grid = document.getElementById('highlights-grid');
  grid.innerHTML = about.highlights.map(h => {
    const parts = h.split(' ');
    const value = parts.slice(0, 2).join(' ');
    const label = parts.slice(2).join(' ');
    return `<div class="highlight-card">
      <div class="highlight-value">${value}</div>
      <div class="highlight-label">${label}</div>
    </div>`;
  }).join('');

  // Skills
  const list = document.getElementById('skills-list');
  list.innerHTML = about.skills.map(s => `
    <div class="skill-item">
      <div class="skill-meta">
        <span class="skill-name">${s.name}</span>
        <span class="skill-pct">${s.level}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-fill" data-level="${s.level}"></div>
      </div>
    </div>`).join('');
}

function populateProjects(projects, categories) {
  // Filter bar
  const bar = document.getElementById('filter-bar');
  bar.innerHTML = categories.map(c =>
    `<button class="filter-btn${c.id === 'all' ? ' active' : ''}" data-filter="${c.id}">${c.label}</button>`
  ).join('');

  // Project cards
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.map((p, i) => `
    <div class="project-card reveal" data-category="${p.category}" id="project-${p.id}">
      <div class="project-thumb thumb-${i % 6}">
        <span style="filter:drop-shadow(0 4px 12px rgba(0,0,0,0.3))">${EMOJIS[i % EMOJIS.length]}</span>
      </div>
      <div class="project-body">
        <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-links">
          <a href="${p.liveUrl}" class="project-link" target="_blank" rel="noopener">Live Demo →</a>
          <a href="${p.githubUrl}" class="project-link" target="_blank" rel="noopener">GitHub →</a>
        </div>
      </div>
    </div>`).join('');

  // Filter logic
  bar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    const filter = btn.dataset.filter;

    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.project-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
      // Re-trigger reveal animation
      if (match) {
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      }
    });
  });
}

function populateExperience(experience) {
  const tl = document.getElementById('timeline');
  tl.innerHTML = experience.map(e => `
    <div class="timeline-item reveal">
      <div class="timeline-period">${e.period}</div>
      <div class="timeline-role">${e.role}</div>
      <div class="timeline-company">${e.company}</div>
      <p class="timeline-desc">${e.description}</p>
    </div>`).join('');
}

function populateContact(p) {
  const info = document.getElementById('contact-info');
  info.innerHTML = `
    <div class="contact-item">
      <div class="contact-icon">📧</div>
      <div>
        <div class="contact-label">Email</div>
        <div class="contact-value"><a href="mailto:${p.email}">${p.email}</a></div>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon">📞</div>
      <div>
        <div class="contact-label">Phone</div>
        <div class="contact-value">${p.phone}</div>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon">📍</div>
      <div>
        <div class="contact-label">Location</div>
        <div class="contact-value">${p.location}</div>
      </div>
    </div>
    <div class="social-links" id="social-links"></div>`;

  const socialMap = {
    github: '🐙', linkedin: '💼', twitter: '🐦', dribbble: '🏀'
  };
  const socials = document.getElementById('social-links');
  socials.innerHTML = Object.entries(p.social || {})
    .filter(([, url]) => url)
    .map(([key, url]) =>
      `<a href="${url}" class="social-link" target="_blank" rel="noopener" aria-label="${key}" title="${key}">
        ${socialMap[key] || '🔗'}
      </a>`
    ).join('');
}

function populateFooter(p) {
  const socials = document.getElementById('footer-socials');
  const socialMap = { github: '🐙', linkedin: '💼', twitter: '🐦', dribbble: '🏀' };
  if (socials) {
    socials.innerHTML = Object.entries(p.social || {})
      .filter(([, url]) => url)
      .map(([key, url]) =>
        `<a href="${url}" class="social-link" target="_blank" rel="noopener" aria-label="${key}">
          ${socialMap[key] || '🔗'}
        </a>`
      ).join('');
  }
}

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });
  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ============================================
   THEME TOGGLE
   ============================================ */
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved, icon);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next, icon);
    localStorage.setItem('theme', next);
  });
}

function applyTheme(theme, icon) {
  document.documentElement.setAttribute('data-theme', theme);
  icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
}

/* ============================================
   SKILL BARS
   ============================================ */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.dataset.level + '%';
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showStatus(status, '⚠️ Please fill in all fields.', '#fc5c7d');
      return;
    }
    if (!isValidEmail(email)) {
      showStatus(status, '⚠️ Please enter a valid email.', '#fc5c7d');
      return;
    }

    // Simulate send (replace with real API call / EmailJS / Formspree)
    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send Message ✈';
      showStatus(status, '✅ Message sent! I\'ll get back to you soon.', '#7c5cfc');
      setTimeout(() => (status.textContent = ''), 5000);
    }, 1400);
  });
}

/* ============================================
   HELPERS
   ============================================ */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showStatus(el, msg, color) {
  el.textContent = msg;
  el.style.color = color;
}
