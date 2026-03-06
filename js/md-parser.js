/* md-parser.js — Lightweight Markdown → HTML parser */
window.mdParse = function(src) {
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // Fenced code blocks
  src = src.replace(/```(\w*)\n([\s\S]*?)```/gm, (_, lang, code) =>
    `<pre><code class="lang-${lang}">${esc(code.trim())}</code></pre>`);

  // Inline code
  src = src.replace(/`([^`\n]+)`/g, (_, c) => `<code>${esc(c)}</code>`);

  // Headings
  src = src.replace(/^#{6}\s+(.+)$/gm, '<h6>$1</h6>');
  src = src.replace(/^#{5}\s+(.+)$/gm, '<h5>$1</h5>');
  src = src.replace(/^#{4}\s+(.+)$/gm, '<h4>$1</h4>');
  src = src.replace(/^#{3}\s+(.+)$/gm, '<h3>$1</h3>');
  src = src.replace(/^#{2}\s+(.+)$/gm, '<h2>$1</h2>');
  src = src.replace(/^#{1}\s+(.+)$/gm, '<h1>$1</h1>');

  // Bold + italic
  src = src.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  src = src.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  src = src.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

  // HR
  src = src.replace(/^-{3,}$/gm, '<hr/>');

  // Blockquotes
  src = src.replace(/(^>\s?.+\n?)+/gm, m => {
    const inner = m.replace(/^>\s?/gm, '').trim();
    return `<blockquote><p>${inner}</p></blockquote>`;
  });

  // Unordered lists
  src = src.replace(/(^[-*+]\s.+\n?)+/gm, m =>
    `<ul>${m.replace(/^[-*+]\s(.+)$/gm, '<li>$1</li>')}</ul>`);

  // Ordered lists
  src = src.replace(/(^\d+\.\s.+\n?)+/gm, m =>
    `<ol>${m.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>')}</ol>`);

  // Links + images
  src = src.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  src = src.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Paragraphs
  src = src.split(/\n{2,}/).map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[1-6]|ul|ol|pre|blockquote|hr|img)/.test(block)) return block;
    return `<p>${block.replace(/\n/g, ' ')}</p>`;
  }).join('\n');

  return src;
};
