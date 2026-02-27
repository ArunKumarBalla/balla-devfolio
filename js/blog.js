/* ===========================
   blog.js — Blog Listing Page
   =========================== */

let allPosts = [];

async function initBlog() {
  const listContainer = document.getElementById('blogList');
  const searchInput = document.getElementById('searchInput');
  const tagFilter = document.getElementById('tagFilter');

  try {
    allPosts = await fetchBlogIndex();
  } catch {
    allPosts = DEMO_POSTS;
  }

  // Build tag filters
  const allTags = [...new Set(allPosts.flatMap(p => p.tags || []))];
  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.tag = tag;
    btn.textContent = tag;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPosts(searchInput.value, tag);
    });
    tagFilter.appendChild(btn);
  });

  // Search
  searchInput.addEventListener('input', () => {
    const activeTag = document.querySelector('.filter-btn.active')?.dataset.tag || 'all';
    renderPosts(searchInput.value, activeTag);
  });

  // All filter
  document.querySelector('.filter-btn[data-tag="all"]').addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-btn[data-tag="all"]').classList.add('active');
    renderPosts(searchInput.value, 'all');
  });

  renderPosts('', 'all');
}

function renderPosts(query, tag) {
  const listContainer = document.getElementById('blogList');
  let filtered = allPosts;

  if (tag && tag !== 'all') {
    filtered = filtered.filter(p => (p.tags || []).includes(tag));
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.excerpt || '').toLowerCase().includes(q) ||
      (p.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    listContainer.innerHTML = '<p class="blog-loading">No articles found.</p>';
    return;
  }

  listContainer.innerHTML = filtered.map(post => `
    <a href="post.html?slug=${post.slug}" class="blog-list-item">
      <div>
        <div class="item-tags">
          ${(post.tags || []).map(t => `<span class="blog-tag">${t}</span>`).join('')}
        </div>
        <h2>${post.title}</h2>
        <p>${post.excerpt || ''}</p>
      </div>
      <div class="item-meta">
        <span class="item-date">${formatDate(post.date)}</span>
        <span class="item-read">${post.readTime || '5 min read'}</span>
      </div>
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', initBlog);
