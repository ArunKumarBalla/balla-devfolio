# Balla Arun Kumar — Portfolio

A clean, SEO-optimized developer portfolio with a no-database blog system powered by Markdown files.

## 🗂 Project Structure

```
portfolio/
├── index.html          ← Main portfolio page
├── blog.html           ← Blog listing page
├── post.html           ← Blog post reader page
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── main.js         ← Core JS (nav, reveal, contact form)
│   ├── blog.js         ← Blog listing logic
│   ├── post.js         ← Post reader + markdown renderer
│   └── marked.min.js   ← Markdown parser
└── blog/
    ├── index.json      ← Blog post registry (EDIT THIS to add posts)
    └── posts/
        ├── my-post-slug.md   ← Actual blog post content
        └── ...
```

---

## ✍️ How to Add a Blog Post

### Step 1 — Create the Markdown file

Create a new file in `blog/posts/` named with your post's slug:

```
blog/posts/your-post-slug.md
```

At the top of the file, add frontmatter between `---` lines:

```markdown
---
title: Your Post Title Here
date: 2025-06-01
tags: PHP, Magento, Tutorial
readTime: 5 min read
excerpt: A short one-line description of the post for cards and SEO.
---

# Your Post Title Here

Write your content here using standard Markdown...

## Subheading

Normal paragraph text.

**Bold text**, *italic text*, `inline code`.

\`\`\`php
<?php
echo "Hello World!";
\`\`\`

> A blockquote tip

- List item one
- List item two
```

### Step 2 — Register the post in `blog/index.json`

Open `blog/index.json` and add an entry at the TOP of the array (newest first):

```json
[
  {
    "slug": "your-post-slug",
    "title": "Your Post Title Here",
    "excerpt": "A short one-line description of the post.",
    "date": "2025-06-01",
    "tags": ["PHP", "Magento", "Tutorial"],
    "readTime": "5 min read"
  },
  ... existing posts ...
]
```

That's it! The post will automatically appear on:
- The blog listing page (`blog.html`)
- The homepage preview section
- The post reader (`post.html?slug=your-post-slug`)

---

## 🌐 Deployment

### GitHub Pages (Free)

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Custom Domain

1. Buy a domain (e.g., `ballaarunkumar.dev`)
2. Add a `CNAME` file with your domain name
3. Point your domain's DNS to GitHub Pages

---

## 🔧 Customization

### Update Personal Info
Edit `index.html` — search for the relevant sections (about, contact, etc.)

### Change Colors
Edit `css/style.css` — the `:root` block at the top has all CSS variables:

```css
:root {
  --accent: #4fffb0;    /* Green accent — change to your color */
  --bg: #0a0a0f;        /* Main background */
  --text: #e8e8f0;      /* Main text color */
  /* ... */
}
```

### Add/Remove Projects
Edit the `#projects` section in `index.html`

### Update Skills
Edit the `#skills` section in `index.html`

---

## 📦 No Dependencies, No Build Step

This portfolio requires **zero npm, zero build tools**. Just HTML, CSS, and JS files you can open directly in a browser or host on any static host.

---

## 🔍 SEO Features

- Semantic HTML5 structure
- JSON-LD structured data (Person schema)
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URLs
- Dynamic meta title/description per blog post
- Sitemap-friendly URL structure
