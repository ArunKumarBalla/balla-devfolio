/* ===========================
   post.js — Blog Post Renderer
   Loads .md files, parses with
   marked.js, injects into DOM
   =========================== */

async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const postContent = document.getElementById('postContent');
  const postShare = document.getElementById('postShare');
  const postNav = document.getElementById('postNav');

  if (!slug) {
    postContent.innerHTML = '<p class="post-loading">No post specified.</p>';
    return;
  }

  let allPosts = [];
  try {
    allPosts = await fetchBlogIndex();
  } catch {
    allPosts = DEMO_POSTS;
  }

  const postMeta = allPosts.find(p => p.slug === slug);
  const postIndex = allPosts.findIndex(p => p.slug === slug);

  // Try to fetch the .md file
  let markdown = '';
  try {
    const res = await fetch(`blog/posts/${slug}.md`);
    if (res.ok) {
      markdown = await res.text();
    } else {
      markdown = getDemoContent(slug);
    }
  } catch {
    markdown = getDemoContent(slug);
  }

  // Parse frontmatter (--- key: value --- at top)
  let frontmatter = {};
  let bodyMarkdown = markdown;
  if (markdown.startsWith('---')) {
    const end = markdown.indexOf('---', 3);
    if (end !== -1) {
      const fm = markdown.slice(3, end).trim();
      fm.split('\n').forEach(line => {
        const [k, ...v] = line.split(':');
        if (k && v.length) frontmatter[k.trim()] = v.join(':').trim();
      });
      bodyMarkdown = markdown.slice(end + 3).trim();
    }
  }

  const title = frontmatter.title || postMeta?.title || 'Blog Post';
  const date = frontmatter.date || postMeta?.date || '';
  const tags = frontmatter.tags
    ? frontmatter.tags.split(',').map(t => t.trim())
    : (postMeta?.tags || []);
  const readTime = frontmatter.readTime || postMeta?.readTime || '5 min read';

  // Update page SEO
  document.title = `${title} — Balla Arun Kumar`;
  document.getElementById('metaDesc').content = frontmatter.excerpt || postMeta?.excerpt || '';
  document.getElementById('ogTitle').content = title;
  document.getElementById('ogDesc').content = frontmatter.excerpt || postMeta?.excerpt || '';

  // Render HTML
  const bodyHtml = typeof marked !== 'undefined'
    ? marked.parse(bodyMarkdown)
    : bodyMarkdown.replace(/\n/g, '<br>');

  postContent.innerHTML = `
    <div class="post-meta-header">
      <div class="post-tags">
        ${tags.map(t => `<span class="blog-tag">${t}</span>`).join('')}
      </div>
      <h1>${title}</h1>
      <div class="post-info">
        <span>${formatDate(date)}</span>
        <span>${readTime}</span>
      </div>
    </div>
    <div class="post-body">${bodyHtml}</div>
  `;

  // Share buttons
  postShare.style.display = 'block';
  const url = encodeURIComponent(window.location.href);
  const titleEnc = encodeURIComponent(title);
  document.getElementById('shareTwitter').href =
    `https://twitter.com/intent/tweet?text=${titleEnc}&url=${url}&via=ballaarunkumar`;
  document.getElementById('shareLinkedIn').href =
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

  // Previous / Next navigation
  const prev = allPosts[postIndex + 1];
  const next = allPosts[postIndex - 1];
  postNav.innerHTML = `
    ${prev ? `<a href="post.html?slug=${prev.slug}">
      <span class="nav-label">← Previous</span>
      <span class="nav-title">${prev.title}</span>
    </a>` : '<span></span>'}
    ${next ? `<a href="post.html?slug=${next.slug}">
      <span class="nav-label">Next →</span>
      <span class="nav-title">${next.title}</span>
    </a>` : '<span></span>'}
  `;
}

function getDemoContent(slug) {
  const demos = {
    'magento-rest-api-guide': `---
title: Working with Magento 2 REST APIs: A Practical Guide
date: 2025-05-15
tags: Magento, REST API, PHP
readTime: 7 min read
excerpt: How to build, authenticate and consume Magento 2 REST APIs in real-world projects — from token auth to custom endpoints.
---

# Working with Magento 2 REST APIs: A Practical Guide

Magento 2 ships with a powerful REST API that lets you interact with virtually every part of your store — products, orders, customers, and more. In this guide, I'll walk through the patterns I've used in production at Kankatala Textiles.

## Authentication

Magento 2 REST APIs use **Token-based authentication**. Here's how to get your token:

\`\`\`bash
curl -X POST "https://yourstore.com/rest/V1/integration/admin/token" \\
  -H "Content-Type: application/json" \\
  -d '{"username":"admin","password":"yourpassword"}'
\`\`\`

The response is a token string. Pass it in all subsequent requests:

\`\`\`
Authorization: Bearer YOUR_TOKEN_HERE
\`\`\`

## Fetching Products

\`\`\`php
<?php
$token = 'YOUR_ADMIN_TOKEN';
$baseUrl = 'https://yourstore.com/rest/V1';

$ch = curl_init("$baseUrl/products?searchCriteria[pageSize]=10");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $token",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = json_decode(curl_exec($ch), true);
foreach ($response['items'] as $product) {
    echo $product['name'] . PHP_EOL;
}
\`\`\`

## Creating Custom Endpoints

Sometimes the built-in endpoints aren't enough. You can register a custom REST route in your module:

\`\`\`xml
<!-- etc/webapi.xml -->
<route url="/V1/mymodule/customdata" method="GET">
  <service class="Vendor\\Module\\Api\\CustomDataInterface" method="getAll"/>
  <resources>
    <resource ref="Magento_Catalog::catalog"/>
  </resources>
</route>
\`\`\`

## Tips From Production

> Always cache authentication tokens — generating a new token per request is slow and unnecessary.

- Use **searchCriteria filters** for efficient querying instead of pulling all records
- Enable **HTTP caching** headers for read-only endpoints
- Log all API errors with request context for easier debugging

Happy coding!
`,
    'shopify-liquid-custom-sections': `---
title: Building Dynamic Shopify Sections with Liquid & JavaScript
date: 2025-04-10
tags: Shopify, Liquid, JavaScript
readTime: 6 min read
excerpt: Learn how to create fully customizable Shopify theme sections using Liquid templating, schema settings, and vanilla JavaScript.
---

# Building Dynamic Shopify Sections with Liquid & JavaScript

One of the most powerful features of Shopify themes is the **Section** system. Sections let merchants drag, drop, and configure blocks without touching code.

## Basic Section Structure

\`\`\`liquid
<!-- sections/my-announcement.liquid -->
<div class="announcement" style="background: {{ section.settings.bg_color }}">
  <p>{{ section.settings.message }}</p>
</div>

{% schema %}
{
  "name": "Announcement Bar",
  "settings": [
    {
      "type": "text",
      "id": "message",
      "label": "Message",
      "default": "Free shipping on orders above ₹999!"
    },
    {
      "type": "color",
      "id": "bg_color",
      "label": "Background Color",
      "default": "#4fffb0"
    }
  ],
  "presets": [{"name": "Announcement Bar"}]
}
{% endschema %}
\`\`\`

## Adding JavaScript Interactions

For interactive sections, use Shopify's **Section Rendering API** combined with vanilla JS:

\`\`\`javascript
class AnnouncementBar extends HTMLElement {
  connectedCallback() {
    this.querySelector('.close-btn')?.addEventListener('click', () => {
      this.style.display = 'none';
      sessionStorage.setItem('announcement-closed', '1');
    });

    if (sessionStorage.getItem('announcement-closed')) {
      this.style.display = 'none';
    }
  }
}

customElements.define('announcement-bar', AnnouncementBar);
\`\`\`

## FAQ Accordion Block

Sections can have **blocks** — repeatable sub-elements:

\`\`\`liquid
{% for block in section.blocks %}
  <details {{ block.shopify_attributes }}>
    <summary>{{ block.settings.question }}</summary>
    <p>{{ block.settings.answer }}</p>
  </details>
{% endfor %}
\`\`\`

This pattern is what I used extensively for the Kankatala Shopify store — keeping everything editable from the Theme Editor with zero code changes needed by the client.
`,
    'google-sheets-api-php': `---
title: Automate Google Sheets with PHP — Inventory Sync Deep Dive
date: 2025-03-22
tags: PHP, Google Sheets API, Automation
readTime: 8 min read
excerpt: A step-by-step walkthrough of building a PHP + Google Sheets API integration for real-time inventory and order tracking.
---

# Automate Google Sheets with PHP — Inventory Sync Deep Dive

At Kankatala Textiles, we needed a way for non-technical staff to monitor inventory and orders in real-time — and Google Sheets was the perfect answer. Here's how I built the PHP integration.

## Setup: Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → Enable **Google Sheets API**
3. Create a **Service Account** and download the JSON key
4. Share your target Google Sheet with the service account email

## PHP Client Setup

Install the Google API PHP client:

\`\`\`bash
composer require google/apiclient
\`\`\`

Initialize the client:

\`\`\`php
<?php
require 'vendor/autoload.php';

$client = new Google\\Client();
$client->setAuthConfig('service-account-key.json');
$client->addScope(Google\\Service\\Sheets::SPREADSHEETS);

$service = new Google\\Service\\Sheets($client);
$spreadsheetId = 'YOUR_SPREADSHEET_ID';
\`\`\`

## Writing Data

\`\`\`php
function syncOrdersToSheet($service, $spreadsheetId, $orders) {
    $values = [['Order ID', 'Customer', 'Status', 'Amount', 'Updated At']];
    
    foreach ($orders as $order) {
        $values[] = [
            $order['id'],
            $order['customer_name'],
            $order['status'],
            '₹' . number_format($order['total'], 2),
            date('d/m/Y H:i', strtotime($order['updated_at']))
        ];
    }

    $body = new Google\\Service\\Sheets\\ValueRange(['values' => $values]);
    $service->spreadsheets_values->update(
        $spreadsheetId, 'Orders!A1',
        $body, ['valueInputOption' => 'RAW']
    );
}
\`\`\`

## Running as a CRON Job

Add to your server's crontab to sync every 15 minutes:

\`\`\`bash
*/15 * * * * /usr/bin/php /var/www/html/sync-sheets.php >> /var/log/sheets-sync.log 2>&1
\`\`\`

## Pro Tips

> Use **batch updates** instead of row-by-row writes — it's 10x faster for large datasets.

- Always implement **exponential backoff** for quota exceeded errors
- Use named ranges instead of A1 notation for maintainability
- Add a **Last Synced** timestamp cell so staff know when data is fresh

This integration saved hours of manual data entry every week at Kankatala!
`
  };
  return demos[slug] || `# Post Not Found\n\nThis post could not be loaded.`;
}

document.addEventListener('DOMContentLoaded', loadPost);
