/* ===========================
   main.js — Portfolio Core JS
   =========================== */

// ===== NAVIGATION =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${(i % 4) * 0.1}s`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.project-card, .skill-category, .timeline-item, .blog-card, .edu-item').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== CONTACT FORM =====
function handleFormSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  const btn = e.target.querySelector('button[type="submit"]');
  const name = document.getElementById('name')?.value;
  const email = document.getElementById('email')?.value;
  const message = document.getElementById('message')?.value;

  // Build mailto link as fallback (no backend needed)
  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailtoLink = `mailto:ballaarunkumar05@gmail.com?subject=${subject}&body=${body}`;

  btn.disabled = true;
  btn.textContent = 'Sending...';

  setTimeout(() => {
    window.open(mailtoLink);
    status.className = 'form-status success';
    status.textContent = '✓ Message composed! Your email client should open.';
    btn.disabled = false;
    btn.textContent = 'Send Message';
    e.target.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  }, 600);
}

// ===== BLOG PREVIEW LOADER (Homepage) =====
async function loadBlogPreview() {
  const container = document.getElementById('blogPreview');
  if (!container) return;

  try {
    const index = await fetchBlogIndex();
    const recent = index.slice(0, 3);

    if (recent.length === 0) {
      container.innerHTML = '<p class="blog-loading">No posts yet. Check back soon!</p>';
      return;
    }

    container.innerHTML = recent.map(post => `
      <article class="blog-card reveal" onclick="window.location='post.html?slug=${post.slug}'">
        <div class="blog-card-tags">
          ${(post.tags || []).slice(0,2).map(t => `<span class="blog-tag">${t}</span>`).join('')}
        </div>
        <h3>${post.title}</h3>
        <p>${post.excerpt || ''}</p>
        <div class="blog-card-meta">${formatDate(post.date)} · ${post.readTime || '5 min read'}</div>
      </article>
    `).join('');

    // Re-observe new elements
    container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  } catch (err) {
    container.innerHTML = '<p class="blog-loading">Could not load posts.</p>';
  }
}

// ===== BLOG INDEX FETCHER =====
async function fetchBlogIndex() {
  try {
    const res = await fetch('blog/index.json');
    if (!res.ok) return DEMO_POSTS;
    return await res.json();
  } catch {
    return DEMO_POSTS;
  }
}

// ===== DEMO POSTS (fallback if no blog/index.json yet) =====
const DEMO_POSTS = [
  {
    slug: 'magento-rest-api-guide',
    title: 'Working with Magento 2 REST APIs: A Practical Guide',
    excerpt: 'How to build, authenticate and consume Magento 2 REST APIs in real-world projects — from token auth to custom endpoints.',
    date: '2025-05-15',
    tags: ['Magento', 'REST API', 'PHP'],
    readTime: '7 min read'
  },
  {
    slug: 'shopify-liquid-custom-sections',
    title: 'Building Dynamic Shopify Sections with Liquid & JavaScript',
    excerpt: 'Learn how to create fully customizable Shopify theme sections using Liquid templating, schema settings, and vanilla JavaScript.',
    date: '2025-04-10',
    tags: ['Shopify', 'Liquid', 'JavaScript'],
    readTime: '6 min read'
  },
  {
    slug: 'google-sheets-api-php',
    title: 'Automate Google Sheets with PHP — Inventory Sync Deep Dive',
    excerpt: 'A step-by-step walkthrough of building a PHP + Google Sheets API integration for real-time inventory and order tracking.',
    date: '2025-03-22',
    tags: ['PHP', 'Google Sheets API', 'Automation'],
    readTime: '8 min read'
  }
];

// ===== DATE FORMATTER =====
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ===== COPY LINK =====
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('Link copied!');
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadBlogPreview();
});
