/* blog-page.js — Blog listing powered entirely by config.js */

(function () {
  const C = window.SITE_CONFIG;

  // Footer
  const fc = document.getElementById('footerCopy');
  if (fc) fc.textContent = `© ${new Date().getFullYear()} ${C.name}.`;

  const subtitle = document.getElementById('blogSubtitle');
  if (subtitle) subtitle.textContent = `Articles on web development, Magento, Shopify, PHP, and more by ${C.name}.`;

  let allPosts = C.blogPosts || [];
  let activeTag = 'all';
  let query = '';

  // Build tag filters
  const tagFilters = document.getElementById('tagFilters');
  const allTags = [...new Set(allPosts.flatMap(p => p.tags || []))];
  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'ftag';
    btn.dataset.tag = tag;
    btn.textContent = tag;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ftag').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTag = tag;
      render();
    });
    tagFilters.appendChild(btn);
  });

  // All button
  tagFilters.querySelector('[data-tag="all"]').addEventListener('click', () => {
    document.querySelectorAll('.ftag').forEach(b => b.classList.remove('active'));
    tagFilters.querySelector('[data-tag="all"]').classList.add('active');
    activeTag = 'all';
    render();
  });

  // Search
  const searchEl = document.getElementById('blogSearch');
  searchEl.addEventListener('input', () => { query = searchEl.value; render(); });

  function formatDate(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function render() {
    const listEl = document.getElementById('blogList');
    let posts = allPosts;

    if (activeTag !== 'all') {
      posts = posts.filter(p => (p.tags || []).includes(activeTag));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || '').toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    if (!posts.length) {
      listEl.innerHTML = '<p class="loading">No articles found.</p>';
      return;
    }

    listEl.innerHTML = posts.map(p => `
      <a class="blist-item" href="post.html?slug=${encodeURIComponent(p.slug)}">
        <div>
          <div class="blist-tags">
            ${(p.tags || []).map(t => `<span class="btag">${t}</span>`).join('')}
          </div>
          <h2>${p.title}</h2>
          <p>${p.excerpt || ''}</p>
        </div>
        <div class="blist-meta">
          <span>${formatDate(p.date)}</span>
          <span class="blist-rt">${p.readTime || '5 min'}</span>
        </div>
      </a>
    `).join('');
  }

  render();
})();
