---
title: "Building Dynamic Shopify Sections with Liquid and JS"
date: "2025-04-10"
tags: "Shopify, Liquid, JavaScript"
readTime: "6 min read"
excerpt: "Create fully customizable Shopify theme sections using Liquid templating, schema settings, and vanilla JavaScript."
---

# Building Dynamic Shopify Sections with Liquid & JS

Sections let merchants configure content from the Theme Editor — no code needed from them.

## Announcement Bar Section

```
{% raw %}
<div class="bar" style="background:{{ section.settings.bg }}">
  <p>{{ section.settings.message }}</p>
</div>

{% schema %}
{
  "name": "Announcement Bar",
  "settings": [
    { "type": "text", "id": "message", "label": "Message", "default": "Free shipping!" },
    { "type": "color", "id": "bg", "label": "Background", "default": "#21ecf7" }
  ],
  "presets": [{ "name": "Announcement Bar" }]
}
{% endschema %}
{% endraw %}
```

## FAQ Accordion with Blocks

```
{% raw %}
{% for block in section.blocks %}
  <details {{ block.shopify_attributes }}>
    <summary>{{ block.settings.question }}</summary>
    <p>{{ block.settings.answer }}</p>
  </details>
{% endfor %}
{% endraw %}
```

Every element is configurable from the Theme Editor — clients never need to touch code again.
