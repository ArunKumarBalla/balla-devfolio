/**
 * ============================================================
 *  SITE CONFIG — Edit this file to update your entire portfolio
 *  No other JS file needs to be touched!
 * ============================================================
 */

window.SITE_CONFIG = {

  /* ── PERSONAL INFO ────────────────────────────────────────── */
  name: "Balla Arun Kumar",
  role: "Full Stack Developer",

  // Auto-typing roles shown in hero (add/remove as you like)
  typingRoles: [
    "Full Stack Developer",
    "Magento Developer",
    "Shopify Developer",
    "PHP Developer",
    "REST API Engineer",
  ],

  tagline: "Building scalable, clean web applications with 4+ years of hands-on experience.",
  email: "ballaarunkumar05@gmail.com",
  phone: "+91 77023 72506",
  location: "Visakhapatnam, India",
  github: "https://github.com/ballaarunkumar",
  linkedin: "https://linkedin.com/in/ballaarunkumar",
  resumeUrl: "#", // link to your resume PDF

  /* ── SEO ──────────────────────────────────────────────────── */
  seo: {
    siteUrl: "https://ballaarunkumar.dev",
    description: "Balla Arun Kumar — Full Stack Developer specializing in Magento, Shopify, PHP & JavaScript with 4+ years of experience in Visakhapatnam, India.",
    keywords: "Balla Arun Kumar, Full Stack Developer, Magento Developer, Shopify Developer, PHP Developer, JavaScript, Visakhapatnam",
    ogImage: "https://ballaarunkumar.dev/assets/og.jpg",
  },

  /* ── ABOUT ────────────────────────────────────────────────── */
  about: [
    "I'm a full-stack software developer with 4+ years of experience building scalable web applications. Proficient in creating user interfaces, testing code, troubleshooting problems, and implementing new features.",
    "Currently working as a Shopify Developer at Kankatala Textiles Pvt Ltd, where I previously led the full Magento development of their dev and live sites — from CMS and REST APIs to HR systems and inventory tools.",
  ],

  education: [
    { year: "2025", degree: "M.Tech", institution: "JNTUVG", grade: "7.8 CGPA" },
    { year: "2020", degree: "B.Tech", institution: "JNTU Kakinada", grade: "6.8 CGPA" },
    { year: "2016", degree: "Intermediate (AP)", institution: "Board of Intermediate", grade: "5.4" },
    { year: "2013", degree: "SSC (AP)", institution: "Tenth Board of AP", grade: "5.8" },
  ],

  /* ── SKILLS ───────────────────────────────────────────────── */
  skills: [
    { category: "Frontend",       items: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap", "Figma", "Photoshop"] },
    { category: "Backend & CMS",  items: ["PHP", "C#", "ASP.Net", "Magento", "Shopify", "WordPress"] },
    { category: "Database & APIs",items: ["MySQL", "REST API", "Google Sheets API", "GST Portal API", "cURL", "JSON"] },
    { category: "Tools & DevOps", items: ["Git", "GitHub", "DomPDF", "TCPDF", "Linux", "Windows"] },
  ],

  /* ── EXPERIENCE ───────────────────────────────────────────── */
  experience: [
    {
      company: "Kankatala Textiles Pvt Ltd",
      role: "Shopify Developer",
      period: "Feb 2025 – Present",
      desc: "Building and customizing Shopify storefronts with Liquid templating, JavaScript, and Bootstrap. Integrating third-party apps, barcode tracking, and Google Sheets webhooks.",
    },
    {
      company: "Kankatala Textiles Pvt Ltd",
      role: "Magento Developer (Full Stack)",
      period: "Sep 2021 – Feb 2025",
      desc: "Led full Magento development of dev and live sites. Built PHP web apps, integrated REST APIs, developed CMS pages, and created HR & inventory management systems.",
    },
  ],

  /* ── PROJECTS ─────────────────────────────────────────────── */
  // To add a project: copy one block, paste it, fill in details. That's it!
  projects: [
    {
      title: "Kankatala Dev & Live Sites",
      tags: ["Magento", "PHP", "REST API"],
      period: "Dec 2021 – Feb 2025",
      role: "Frontend Developer",
      desc: "Full-stack Magento development for a leading textiles brand — REST API integrations, CMS pages, staging/production deployment, and marketing system support.",
      highlights: [
        "CMS content updates & marketing system integration",
        "REST API implementation on PHP backend",
        "Salary payslip management system",
      ],
      featured: false,
    },
    {
      title: "Kankatala Shopify Store",
      tags: ["Shopify", "Liquid", "JavaScript"],
      period: "Feb 2025 – Present",
      role: "Shopify Developer",
      desc: "Custom Shopify frontend with Liquid templating, dynamic sections, announcement bars, barcode tracking, and automated Google Sheets sync via webhooks.",
      highlights: [
        "Custom themes with Liquid, SCSS & JS",
        "Third-party Shopify app integrations",
        "Barcode tracking & order status via API",
      ],
      featured: true,
    },
    {
      title: "Salary Payslip Generation (HR)",
      tags: ["PHP", "MySQL", "DomPDF"],
      period: "Jun – Aug 2022",
      role: "Full-Stack Developer",
      desc: "Complete HR software with employee onboarding, dynamic payslip generation, PF/ESI/PT/TDS compliance, and PDF & Excel export.",
      highlights: [
        "Dynamic payslip with earnings & deductions",
        "Statutory compliance (PF, ESI, PT, TDS)",
        "Monthly register & yearly earnings reports",
      ],
      featured: false,
    },
    {
      title: "E-Commerce Inventory Management",
      tags: ["PHP", "MySQL", "Google Sheets API"],
      period: "Dec 2021 – Present",
      role: "Full-Stack Developer",
      desc: "Inventory system with barcode scanning, live order tracking (Pending/Shipped/Delivered), CRON jobs, and automated Google Sheets export.",
      highlights: [
        "Barcode scanner for mobile & desktop",
        "Webhook & CRON for periodic sync",
        "Google Sheets automated export",
      ],
      featured: false,
    },
    {
      title: "Product Sorting for E-Commerce",
      tags: ["PHP", "MySQL", "JavaScript"],
      period: "Dec 2022 – Apr 2023",
      role: "Full-Stack Developer",
      desc: "Custom condition-based sorting algorithm — ranks products by stock availability, last updated date, and live inventory using a weighted scoring system.",
      highlights: [
        "Multi-condition sorting algorithm",
        "Real-time inventory & pricing data",
        "Custom weighted scoring logic",
      ],
      featured: false,
    },
    {
      title: "GST & Postal Validation API",
      tags: ["PHP", "REST API", "GST Portal API"],
      period: "Jun – Aug 2024",
      role: "Full-Stack Developer",
      desc: "GSTIN verification integrated with India's GST Portal and India Post PIN Code API. Auto-fills location fields and logs audit history with timestamps.",
      highlights: [
        "GSTIN structure & registration validation",
        "Postal PIN → city/state/district auto-fill",
        "Audit history log with user actions",
      ],
      featured: false,
    },
  ],

  /* ── BLOG POSTS ───────────────────────────────────────────── */
  // To add a blog post:
  // 1. Create the .md file in blog/posts/your-slug.md
  // 2. Add an entry here (copy one block, paste, fill in)
  // NO other changes needed anywhere!
  blogPosts: [
    {
      slug: "magento-rest-api-guide",
      title: "Working with Magento 2 REST APIs: A Practical Guide",
      excerpt: "How to authenticate and consume Magento 2 REST APIs in real-world projects — from token auth to custom endpoints.",
      date: "2025-05-15",
      tags: ["Magento", "REST API", "PHP"],
      readTime: "7 min read",
    },
    {
      slug: "shopify-liquid-custom-sections",
      title: "Building Dynamic Shopify Sections with Liquid & JS",
      excerpt: "Create fully customizable Shopify theme sections with Liquid templating, schema settings, and vanilla JavaScript.",
      date: "2025-04-10",
      tags: ["Shopify", "Liquid", "JavaScript"],
      readTime: "6 min read",
    },
    {
      slug: "google-sheets-api-php",
      title: "Automate Google Sheets with PHP — Inventory Sync",
      excerpt: "A step-by-step walkthrough of building a PHP + Google Sheets API integration for real-time inventory tracking.",
      date: "2025-03-22",
      tags: ["PHP", "Google Sheets API", "Automation"],
      readTime: "8 min read",
    },
  ],
};
