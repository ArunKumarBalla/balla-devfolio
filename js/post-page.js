/* post-page.js — Renders a .md blog post from config.js + file */

(function () {
  const C = window.SITE_CONFIG;
  const $ = id => document.getElementById(id);

  const fc = $('footerCopy');
  if (fc) fc.textContent = `© ${new Date().getFullYear()} ${C.name}.`;

  const params = new URLSearchParams(location.search);
  const slug = params.get('slug') || '';

  const allPosts = C.blogPosts || [];
  const postIdx  = allPosts.findIndex(p => p.slug === slug);
  const meta     = allPosts[postIdx] || {};

  function formatDate(d) {
    return d ? new Date(d).toLocaleDateString('en-IN', { year:'numeric', month:'short', day:'numeric' }) : '';
  }

  async function loadPost() {
    let markdown = '';

    // Try to load the .md file
    try {
      const res = await fetch(`blog/posts/${encodeURIComponent(slug)}.md`);
      if (res.ok) {
        markdown = await res.text();
      } else {
        markdown = getDemoMD(slug);
      }
    } catch {
      markdown = getDemoMD(slug);
    }

    // Strip frontmatter
    let fm = {}, body = markdown;
    if (markdown.startsWith('---')) {
      const end = markdown.indexOf('---', 3);
      if (end !== -1) {
        markdown.slice(3, end).trim().split('\n').forEach(line => {
          const idx = line.indexOf(':');
          if (idx > -1) fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
        });
        body = markdown.slice(end + 3).trim();
      }
    }

    const title   = fm.title    || meta.title    || 'Blog Post';
    const date    = fm.date     || meta.date     || '';
    const rt      = fm.readTime || meta.readTime || '5 min read';
    const excerpt = fm.excerpt  || meta.excerpt  || '';
    const tags    = fm.tags
      ? fm.tags.split(',').map(t => t.trim())
      : (meta.tags || []);

    // SEO
    document.title = `${title} — ${C.name}`;
    if ($('meta-desc')) $('meta-desc').content = excerpt;
    if ($('og-title')) $('og-title').content   = title;
    if ($('og-desc')) $('og-desc').content     = excerpt;

    // Render
    const html = typeof window.mdParse === 'function'
      ? window.mdParse(body)
      : `<p>${body.replace(/\n/g, '<br>')}</p>`;

    $('postArticle').innerHTML = `
      <div class="post-hdr">
        <div class="post-htags">${tags.map(t => `<span class="btag">${t}</span>`).join('')}</div>
        <h1>${title}</h1>
        <div class="post-info">
          <span>${formatDate(date)}</span>
          <span>${rt}</span>
        </div>
      </div>
      <div class="post-body">${html}</div>`;

    // Share
    const shareDiv = $('postShare');
    if (shareDiv) {
      shareDiv.style.display = 'block';
      const url = encodeURIComponent(location.href);
      const t   = encodeURIComponent(title);
      $('shareTwitter').href  = `https://twitter.com/intent/tweet?text=${t}&url=${url}`;
      $('shareLinkedIn').href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }

    // Prev / Next
    const prev = allPosts[postIdx + 1];
    const next = allPosts[postIdx - 1];
    const pn   = $('postNav');
    if (pn) {
      pn.innerHTML = `
        ${prev ? `<a class="pnav-a" href="post.html?slug=${encodeURIComponent(prev.slug)}">
          <span class="pnav-label">← Older</span>
          <span class="pnav-title">${prev.title}</span>
        </a>` : '<span></span>'}
        ${next ? `<a class="pnav-a right" href="post.html?slug=${encodeURIComponent(next.slug)}">
          <span class="pnav-label">Newer →</span>
          <span class="pnav-title">${next.title}</span>
        </a>` : '<span></span>'}`;
    }
  }

  function getDemoMD(slug) {
    const demos = {
      'magento-rest-api-guide': `---
title: Working with Magento 2 REST APIs: A Practical Guide
date: 2025-05-15
tags: Magento, REST API, PHP
readTime: 7 min read
excerpt: How to authenticate and consume Magento 2 REST APIs in real-world projects.
---

# Working with Magento 2 REST APIs: A Practical Guide

Magento 2 ships with a powerful REST API that lets you interact with virtually every part of your store — products, orders, customers, and more.

## Getting an Auth Token

\`\`\`bash
curl -X POST "https://yourstore.com/rest/V1/integration/admin/token" \\
  -H "Content-Type: application/json" \\
  -d '{"username":"admin","password":"yourpassword"}'
\`\`\`

## Fetching Products

\`\`\`php
<?php
$ch = curl_init("https://store.com/rest/V1/products?searchCriteria[pageSize]=10");
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer YOUR_TOKEN"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = json_decode(curl_exec($ch), true);
foreach ($result['items'] as $p) echo $p['name'] . PHP_EOL;
\`\`\`

## Production Tips

> Always cache tokens — generating a new one per request is slow and hits rate limits.

- Use **searchCriteria filters** for efficient queries
- Log all API errors with full request context
- Enable HTTP caching for read-only endpoints
`,
      'shopify-liquid-custom-sections': `---
title: Building Dynamic Shopify Sections with Liquid & JS
date: 2025-04-10
tags: Shopify, Liquid, JavaScript
readTime: 6 min read
excerpt: Create fully customizable Shopify theme sections with Liquid and JavaScript.
---

# Building Dynamic Shopify Sections with Liquid & JS

Shopify Sections let merchants drag, drop, and configure content without touching code.

## Basic Section

\`\`\`liquid
<div class="announcement" style="background: {{ section.settings.bg_color }}">
  <p>{{ section.settings.message }}</p>
</div>

{% schema %}
{
  "name": "Announcement Bar",
  "settings": [
    { "type": "text", "id": "message", "label": "Message", "default": "Free shipping!" },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#21ecf7" }
  ],
  "presets": [{"name": "Announcement Bar"}]
}
{% endschema %}
\`\`\`

## FAQ Accordion with Blocks

\`\`\`liquid
{% for block in section.blocks %}
  <details {{ block.shopify_attributes }}>
    <summary>{{ block.settings.question }}</summary>
    <p>{{ block.settings.answer }}</p>
  </details>
{% endfor %}
\`\`\`

This is the pattern I use at Kankatala — every element configurable from the Theme Editor.
`,
      'google-sheets-api-php': `---
title: Automate Google Sheets with PHP — Inventory Sync
date: 2025-03-22
tags: PHP, Google Sheets API, Automation
readTime: 8 min read
excerpt: Build a PHP + Google Sheets API integration for real-time inventory tracking.
---

# Automate Google Sheets with PHP

At Kankatala Textiles, we synced our inventory and orders to Google Sheets so non-technical staff could monitor everything in real time.

## Setup

\`\`\`bash
composer require google/apiclient
\`\`\`

## Write Data to Sheet

\`\`\`php
<?php
$client = new Google\\Client();
$client->setAuthConfig('service-account-key.json');
$client->addScope(Google\\Service\\Sheets::SPREADSHEETS);
$service = new Google\\Service\\Sheets($client);

$values = [['Product', 'Stock', 'Updated']];
foreach ($inventory as $item) {
  $values[] = [$item['name'], $item['qty'], date('d/m/Y H:i')];
}

$body = new Google\\Service\\Sheets\\ValueRange(['values' => $values]);
$service->spreadsheets_values->update($spreadsheetId, 'Sheet1!A1', $body, ['valueInputOption' => 'RAW']);
\`\`\`

## CRON Schedule

\`\`\`bash
*/15 * * * * /usr/bin/php /var/www/sync-sheets.php >> /var/log/sync.log 2>&1
\`\`\`

> Use batch updates for large datasets — 10x faster than row-by-row writes.
`
    };
    return demos[slug] || `# Post Not Found\n\nThis post could not be loaded. Please check the slug in config.js.`;
  }

  loadPost();
})();
