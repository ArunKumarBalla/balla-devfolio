# Balla Arun Kumar — Portfolio

Clean, SEO-ready developer portfolio with light/dark mode, auto-typing hero, and a zero-database blog system.

## 🚀 Quick Start

Open `index.html` in a browser. No build tools, no npm, no server needed.

---

## ✏️ HOW TO UPDATE EVERYTHING

**There is ONE file you edit: `js/config.js`**

Open it and you'll see clearly labelled sections. That's it — no touching HTML or other JS files.

### Change your name / contact / links
```js
name: "Your Name",
email: "you@email.com",
github: "https://github.com/yourhandle",
```

### Add a typing role
```js
typingRoles: [
  "Full Stack Developer",
  "Your New Role Here",   // ← just add a line
],
```

### Add a Project
```js
projects: [
  {
    title: "My New Project",
    tags: ["PHP", "MySQL"],
    period: "Jan 2025 – Present",
    role: "Full-Stack Developer",
    desc: "What the project does.",
    highlights: [
      "Key thing 1",
      "Key thing 2",
    ],
    featured: false,   // set true to highlight it
  },
  // ... existing projects
],
```

### Add a Blog Post (2 steps)

**Step 1 — Create the markdown file:**

Create `blog/posts/your-post-slug.md`:

```markdown
---
title: Your Post Title
date: 2025-06-01
tags: PHP, Tutorial
readTime: 5 min read
excerpt: One line description shown in cards and SEO.
---

# Your Post Title

Write your content here using **Markdown**.

## Subheading

Normal paragraph.

\`\`\`php
<?php echo "Hello!";
\`\`\`

> A blockquote tip

- Bullet one
- Bullet two
```

**Step 2 — Register it in config.js:**

```js
blogPosts: [
  {
    slug: "your-post-slug",       // must match the filename (without .md)
    title: "Your Post Title",
    excerpt: "One line description.",
    date: "2025-06-01",
    tags: ["PHP", "Tutorial"],
    readTime: "5 min read",
  },
  // existing posts...
],
```

Done! The post appears on the homepage preview, blog listing, and has its own page at `post.html?slug=your-post-slug`.

---

## 📁 File Structure

```
portfolio/
├── index.html          ← Main portfolio page
├── blog.html           ← Blog listing page
├── post.html           ← Blog post reader
├── css/
│   └── style.css       ← All styles + color palette
├── js/
│   ├── config.js       ← ⭐ THE ONE FILE YOU EDIT
│   ├── app.js          ← Core render engine
│   ├── blog-page.js    ← Blog listing logic
│   ├── post-page.js    ← Post reader logic
│   └── md-parser.js    ← Markdown → HTML parser
└── blog/
    └── posts/
        └── your-slug.md  ← Your blog post content
```

---

## 🎨 Colors

The color palette from colorffy.com is defined in `css/style.css` under `:root`.
To change the accent color in dark mode, find:
```css
--accent: var(--p10);   /* #21ecf7 — bright cyan */
```
And swap it for any of the palette variables like `--p20`, `--a10`, `--info10`, etc.

---

## 🌐 Deploy Free on GitHub Pages

1. Push this folder to a GitHub repo
2. Settings → Pages → Source: main branch / root
3. Done! Live at `https://yourusername.github.io/repo-name`

For a custom domain, create a `CNAME` file with your domain name.
