/* ============================================================
   app.js — Renders the entire portfolio from SITE_CONFIG
   ============================================================ */

const C = window.SITE_CONFIG;
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

/* ── THEME ─────────────────────────────────────────────────── */
const themeBtn = $('themeBtn');
const html = document.documentElement;

function applyTheme(t) {
  html.dataset.theme = t;
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', t);
}
applyTheme(localStorage.getItem('theme') || 'dark');
themeBtn.addEventListener('click', () =>
  applyTheme(html.dataset.theme === 'dark' ? 'light' : 'dark'));

/* ── NAV ────────────────────────────────────────────────────── */
const nav = $('nav');
const hamburger = $('hamburger');
const navLinks = $('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 30);
  // Active link
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
    const sec = document.querySelector(a.getAttribute('href'));
    if (sec) {
      const r = sec.getBoundingClientRect();
      a.classList.toggle('active', r.top <= 100 && r.bottom > 100);
    }
  });
});
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ── SEO ────────────────────────────────────────────────────── */
function initSEO() {
  const s = C.seo;
  document.title = `${C.name} — ${C.role}`;
  $('meta-desc').content    = s.description;
  $('meta-keys').content    = s.keywords;
  $('canonical').href       = s.siteUrl + '/';
  $('og-title').content     = `${C.name} — ${C.role}`;
  $('og-desc').content      = s.description;
  $('og-url').content       = s.siteUrl;
  $('og-img').content       = s.ogImage;
  $('tw-title').content     = `${C.name} — ${C.role}`;
  $('tw-desc').content      = s.description;
  $('schema-json').textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: C.name,
    jobTitle: C.role,
    email: C.email,
    telephone: C.phone,
    address: { "@type": "PostalAddress", addressLocality: C.location, addressCountry: "IN" },
    url: s.siteUrl,
    sameAs: [C.github, C.linkedin].filter(Boolean)
  });
}

/* ── TYPING EFFECT ──────────────────────────────────────────── */
function initTyping() {
  const el = $('typingText');
  if (!el) return;
  const roles = C.typingRoles;
  let ri = 0, ci = 0, deleting = false;
  const SPEED_TYPE = 65, SPEED_DEL = 35, PAUSE = 1800;

  function tick() {
    const word = roles[ri];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; return setTimeout(tick, PAUSE); }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
  }
  tick();
}

/* ── HERO ───────────────────────────────────────────────────── */
function initHero() {
  const parts = C.name.split(' ');
  const last = parts.pop();
  $('heroLine1').textContent = parts.join(' ');
  $('heroLine2').textContent = last;
  $('heroTagline').textContent = C.tagline;
  $('cardLocation').textContent = C.location;
  $('cardEmail').textContent = C.email;
  // Initials
  const initials = C.name.split(' ').map(w=>w[0]).join('').slice(0,3);
  $('cardAvatar').textContent = initials;
}

/* ── ABOUT ──────────────────────────────────────────────────── */
function initAbout() {
  const wrap = $('aboutText');
  if (wrap) wrap.innerHTML = C.about.map(p => `<p>${esc(p)}</p>`).join('');

  const edu = $('eduList');
  if (edu) edu.innerHTML = C.education.map(e => `
    <div class="edu-row reveal">
      <span class="edu-year">${esc(e.year)}</span>
      <span class="edu-deg">${esc(e.degree)} — ${esc(e.institution)}</span>
      <span class="edu-grade">${esc(e.grade)}</span>
    </div>`).join('');

  const right = $('aboutRight');
  if (right) right.innerHTML = `
    <div class="hero-card" style="position:sticky;top:100px;">
      <div class="card-avatar">${C.name.split(' ').map(w=>w[0]).join('').slice(0,3)}</div>
      <div class="card-rows">
        <div class="card-row"><span class="card-label">Status</span><span class="open-badge"><span class="open-badge-dot"></span>Open to Work</span></div>
        <div class="card-row"><span class="card-label">Location</span><span class="card-val">${esc(C.location)}</span></div>
        <div class="card-row"><span class="card-label">Email</span><span class="card-val">${esc(C.email)}</span></div>
        <div class="card-row"><span class="card-label">Phone</span><span class="card-val">${esc(C.phone)}</span></div>
      </div>
    </div>`;
}

/* ── SKILLS ─────────────────────────────────────────────────── */
function initSkills() {
  const grid = $('skillsGrid');
  if (!grid) return;
  grid.innerHTML = C.skills.map(cat => `
    <div class="skill-cat reveal">
      <h3>${esc(cat.category)}</h3>
      <div class="skill-tags">${cat.items.map(i=>`<span class="stag">${esc(i)}</span>`).join('')}</div>
    </div>`).join('');
}

/* ── PROJECTS ───────────────────────────────────────────────── */
function initProjects() {
  const grid = $('projectsGrid');
  if (!grid) return;
  grid.innerHTML = C.projects.map(p => `
    <article class="proj-card${p.featured?' featured':''} reveal">
      <div class="proj-head">
        <div class="proj-tags">${p.tags.map(t=>`<span class="proj-tag">${esc(t)}</span>`).join('')}</div>
        <span class="proj-period">${esc(p.period)}</span>
      </div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <ul class="proj-highlights">${p.highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul>
      <div class="proj-foot"><span class="role-badge">${esc(p.role)}</span></div>
    </article>`).join('');
}

/* ── EXPERIENCE ─────────────────────────────────────────────── */
function initExperience() {
  const tl = $('timeline');
  if (!tl) return;
  tl.innerHTML = C.experience.map(e => `
    <div class="tl-item reveal">
      <div class="tl-dot"></div>
      <div class="tl-box">
        <div class="tl-meta">
          <span class="tl-company">${esc(e.company)}</span>
          <span class="tl-period">${esc(e.period)}</span>
        </div>
        <h3>${esc(e.role)}</h3>
        <p>${esc(e.desc)}</p>
      </div>
    </div>`).join('');
}

/* ── BLOG PREVIEW ───────────────────────────────────────────── */
function initBlogPreview() {
  const grid = $('blogGrid');
  if (!grid) return;
  const posts = C.blogPosts.slice(0, 3);
  if (!posts.length) { grid.innerHTML = '<p class="loading">No posts yet.</p>'; return; }
  grid.innerHTML = posts.map(p => `
    <article class="blog-card reveal" onclick="location.href='post.html?slug=${encodeURIComponent(p.slug)}'">
      <div class="blog-card-tags">${p.tags.map(t=>`<span class="btag">${esc(t)}</span>`).join('')}</div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.excerpt)}</p>
      <div class="blog-card-foot">
        <span>${formatDate(p.date)}</span>
        <span class="read-more">${esc(p.readTime)} →</span>
      </div>
    </article>`).join('');
}

/* ── CONTACT ────────────────────────────────────────────────── */
function initContact() {
  const ci = $('contactInfo');
  if (ci) ci.innerHTML = [
    { icon: '✉', val: `<a href="mailto:${esc(C.email)}">${esc(C.email)}</a>` },
    { icon: '☎', val: `<a href="tel:${esc(C.phone)}">${esc(C.phone)}</a>` },
    { icon: '📍', val: esc(C.location) },
  ].map(r=>`<div class="cinfo-item"><span class="cinfo-icon">${r.icon}</span><span>${r.val}</span></div>`).join('');

  const sr = $('socialRow');
  if (sr) {
    const links = [];
    if (C.github) links.push(`<a href="${esc(C.github)}" target="_blank" rel="noopener" class="soc-btn">GitHub</a>`);
    if (C.linkedin) links.push(`<a href="${esc(C.linkedin)}" target="_blank" rel="noopener" class="soc-btn">LinkedIn</a>`);
    if (C.resumeUrl && C.resumeUrl !== '#') links.push(`<a href="${esc(C.resumeUrl)}" target="_blank" class="soc-btn">Resume</a>`);
    sr.innerHTML = links.join('');
  }

  const ci2 = $('contactIntro');
  if (ci2) ci2.textContent = "I'm open to new opportunities — freelance projects, full-time roles, or cool collaborations. Drop me a message!";

  const fc = $('footerCopy');
  if (fc) fc.textContent = `© ${new Date().getFullYear()} ${C.name}. Built with clean code.`;
}

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = `${(i % 5) * 0.08}s`;
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── CONTACT FORM ───────────────────────────────────────────── */
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const st = $('fstatus');
  const name = $('fname').value;
  const email = $('femail').value;
  const msg = $('fmsg').value;
  const sub = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
  btn.disabled = true;
  btn.textContent = 'Sending…';
  setTimeout(() => {
    window.open(`mailto:${C.email}?subject=${sub}&body=${body}`);
    st.className = 'fstatus ok';
    st.textContent = '✓ Email client opened — send it your way!';
    btn.disabled = false;
    btn.textContent = 'Send Message';
    e.target.reset();
    setTimeout(() => st.textContent = '', 5000);
  }, 500);
}

/* ── DATE FORMAT ────────────────────────────────────────────── */
function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-IN', { year:'numeric', month:'short', day:'numeric' });
}

/* ── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initSEO();
  initHero();
  initTyping();
  initAbout();
  initSkills();
  initProjects();
  initExperience();
  initBlogPreview();
  initContact();
  setTimeout(initReveal, 100);
});
