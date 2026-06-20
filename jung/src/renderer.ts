import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

// Article slug to hash mapping for internal links
export const slugToHash: Record<string, string> = {};

export function registerSlugs(slugs: string[]) {
  for (const slug of slugs) {
    slugToHash[slug] = `#/${slug}`;
  }
}

// Initialize markdown-it with highlight.js
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch (_) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

// Process [[wikilinks]] to hash links
const wikilinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
md.core.ruler.after('normalize', 'wikilinks', (state) => {
  for (const token of state.tokens) {
    if (token.type === 'inline') {
      for (const child of token.children!) {
        if (child.type === 'text') {
          child.content = child.content.replace(wikilinkRegex, (_match, target: string, alias?: string) => {
            const display = alias || target;
            const href = slugToHash[target] || `#/${encodeURIComponent(target)}`;
            return `<a class="internal-link" href="${href}">${display}</a>`;
          });
        }
      }
    }
  }
});

// Process callouts: > [!type]
const originalFence = md.renderer.rules.fence?.bind(md.renderer);
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const info = token.info.trim().toLowerCase();

  // Mermaid code blocks
  if (info === 'mermaid') {
    const code = token.content.trim();
    const id = `mermaid-${idx}-${Date.now()}`;
    // Return a placeholder that will be processed later
    return `<div class="mermaid-placeholder" data-code="${btoa(unescape(encodeURIComponent(code)))}" id="${id}"></div>`;
  }

  return originalFence?.(tokens, idx, options, env, self) || '';
};

// Process blockquote callouts: > [!info]
const defaultBlockquote = md.renderer.rules.blockquote_open || function() { return '<blockquote>\n'; };
md.renderer.rules.blockquote_open = (tokens, idx, options, env, self) => {
  // Check if next token is a paragraph starting with [!type]
  const contentToken = tokens[idx + 2]; // open > paragraph
  if (contentToken && contentToken.type === 'inline') {
    const text = contentToken.content.trim();
    const calloutMatch = text.match(/^\[!(\w+)\]\s*(.*)/);
    if (calloutMatch) {
      const type = calloutMatch[1].toLowerCase();
      const rest = calloutMatch[2];
      const typeMap: Record<string, string> = {
        info: 'info', tip: 'tip', warning: 'warn', warn: 'warn',
        note: 'info', important: 'warn', caution: 'warn', success: 'tip'
      };
      const cls = typeMap[type] || 'info';
      contentToken.content = rest;
      return `<div class="callout callout-${cls}"><div class="callout-title">${type.toUpperCase()}</div><div class="callout-body">\n`;
    }
  }
  return defaultBlockquote(tokens, idx, options, env, self);
};

const defaultBlockquoteClose = md.renderer.rules.blockquote_close || function() { return '</blockquote>\n'; };
const originalBlockquoteClose = md.renderer.rules.blockquote_close?.bind(md.renderer);
md.renderer.rules.blockquote_close = (tokens, idx, options, env, self) => {
  // Check if this blockquote was converted to a callout
  // Simple heuristic: if the open tag was a callout
  if (tokens[idx].attrGet('class') === 'callout-processed') {
    return '</div></div>\n';
  }
  return defaultBlockquoteClose(tokens, idx, options, env, self);
};

export function renderMarkdown(content: string): string {
  return md.render(content);
}

// Render all mermaid placeholders on the page
export async function renderMermaidBlocks() {
  const { default: mermaid } = await import('mermaid');
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      primaryColor: '#1a1a2e',
      primaryBorderColor: '#f59e0b',
      primaryTextColor: '#e5e7eb',
      lineColor: '#666',
      secondaryColor: '#12121a',
      tertiaryColor: '#1e1e2e',
    },
    fontFamily: 'Noto Serif SC, Georgia, serif',
    fontSize: '14px' as any,
  });

  const placeholders = document.querySelectorAll('.mermaid-placeholder');
  for (const el of placeholders) {
    const code = decodeURIComponent(escape(atob(el.getAttribute('data-code') || '')));
    try {
      const { svg } = await mermaid.render(`mermaid-${Date.now()}-${Math.random().toString(36).slice(2)}`, code);
      const container = document.createElement('div');
      container.className = 'mermaid-container';
      container.innerHTML = svg;
      el.replaceWith(container);
    } catch (e) {
      el.outerHTML = `<pre class="hljs"><code>${code}</code></pre>`;
    }
  }
}
