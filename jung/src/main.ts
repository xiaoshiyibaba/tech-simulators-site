import { articles, navStructure, type ArticleMeta } from './articles';
import { renderMarkdown, renderMermaidBlocks, registerSlugs } from './renderer';
import './style.css';

// Register all slugs for wikilink resolution
registerSlugs(articles.map(a => a.slug));

interface Route {
  type: 'home' | 'article';
  slug?: string;
}

function parseRoute(): Route {
  const hash = window.location.hash.slice(1) || '/';
  if (hash === '/' || hash === '') return { type: 'home' };
  const slug = decodeURIComponent(hash.slice(2));
  if (slug) return { type: 'article', slug };
  return { type: 'home' };
}

function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find(a => a.slug === slug);
}

// Render navigation
function renderNav(activeSlug?: string): string {
  let html = `
    <div class="p-4 border-b border-[#f59e0b22]">
      <h1 class="text-lg font-bold" style="background: linear-gradient(135deg, #f59e0b, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        荣格心理学
      </h1>
      <p class="text-xs text-gray-500 mt-1">Jungian Psychology</p>
    </div>
    <nav class="flex-1 overflow-y-auto p-2">
  `;

  // Home link
  const homeActive = !activeSlug ? 'active' : '';
  html += `<a href="#/" class="nav-item ${homeActive} block px-3 py-2 text-sm rounded-md text-gray-400 hover:text-gray-200 hover:bg-[#ffffff08] transition-colors">
    🏠 知识图谱
  </a>`;

  for (const section of navStructure) {
    html += `<div class="mt-3 mb-1 px-3 text-xs text-gray-500 uppercase tracking-wider">${section.category}</div>`;
    for (const slug of section.items) {
      const article = getArticleBySlug(slug);
      const active = activeSlug === slug ? 'active' : '';
      const label = article ? article.title : slug;
      // Truncate if too long
      const shortLabel = label.length > 18 ? label.slice(0, 17) + '…' : label;
      html += `<a href="#/${slug}" class="nav-item ${active} block px-3 py-1.5 text-sm rounded-md text-gray-400 hover:text-gray-200 hover:bg-[#ffffff08] transition-colors" title="${label}">
        ${shortLabel}
      </a>`;
    }
  }

  html += '</nav>';
  return html;
}

// Render home page
function renderHome(): string {
  const graphArticle = getArticleBySlug('00.荣格知识图谱');
  
  let html = `
    <div class="prose-jung max-w-4xl mx-auto px-6 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4" style="background: linear-gradient(135deg, #f59e0b, #d97706, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          荣格心理学知识库
        </h1>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          从 Ego 到 Self，从 Persona 到 Shadow<br/>
          一套关于「完整」而非「完美」的心灵探索笔记
        </p>
      </div>
  `;

  // Stats
  html += `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <div class="bg-[#12121a] rounded-lg p-4 text-center border border-[#222]">
        <div class="text-2xl font-bold text-amber-400">${articles.length}</div>
        <div class="text-xs text-gray-500 mt-1">篇笔记</div>
      </div>
      <div class="bg-[#12121a] rounded-lg p-4 text-center border border-[#222]">
        <div class="text-2xl font-bold text-amber-400">${navStructure.length}</div>
        <div class="text-xs text-gray-500 mt-1">个分类</div>
      </div>
      <div class="bg-[#12121a] rounded-lg p-4 text-center border border-[#222]">
        <div class="text-2xl font-bold text-amber-400">7</div>
        <div class="text-xs text-gray-500 mt-1">个核心概念</div>
      </div>
      <div class="bg-[#12121a] rounded-lg p-4 text-center border border-[#222]">
        <div class="text-2xl font-bold text-amber-400">∞</div>
        <div class="text-xs text-gray-500 mt-1">自性化旅程</div>
      </div>
    </div>
  `;

  // Core concepts
  const concepts = [
    { icon: '🧠', name: 'Ego 自我', desc: '意识的中心，回答"我是谁"', slug: 'EGo 和 persona' },
    { icon: '🎭', name: 'Persona 人格面具', desc: '社会适应的面具，健康时是工具', slug: 'EGo 和 persona' },
    { icon: '🌑', name: 'Shadow 阴影', desc: '被否认与压抑的真实部分', slug: '阴影' },
    { icon: '✨', name: 'Self 自性', desc: '心灵整体的核心，不是"更完美的我"', slug: 'Self，自性 vs Individuation，自性化' },
    { icon: '🌱', name: 'Individuation 自性化', desc: '走向完整的旅程，一生持续', slug: 'Self，自性 vs Individuation，自性化' },
    { icon: '🎯', name: 'Projection 投射', desc: '内在冲突的外部化', slug: '投射' },
    { icon: '🔬', name: '脑科学解释', desc: '预测加工理论的荣格翻译', slug: 'ego-persona-shadow脑科学的解释' },
  ];

  html += `<h2 class="text-2xl mb-6" style="color: #fbbf24;">核心概念</h2>`;
  html += `<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">`;
  for (const c of concepts) {
    html += `<a href="#/${c.slug}" class="bg-[#12121a] rounded-lg p-5 border border-[#222] hover:border-[#f59e0b44] transition-all hover:-translate-y-0.5 group">
      <div class="text-2xl mb-2">${c.icon}</div>
      <div class="font-bold text-gray-200 group-hover:text-amber-400 transition-colors">${c.name}</div>
      <div class="text-sm text-gray-500 mt-1">${c.desc}</div>
    </a>`;
  }
  html += `</div>`;

  // All articles by category
  html += `<h2 class="text-2xl mb-6" style="color: #fbbf24;">全部笔记</h2>`;
  for (const section of navStructure) {
    html += `<h3 class="text-lg mb-3" style="color: #fcd34d;">${section.category}</h3>`;
    html += `<div class="grid md:grid-cols-2 gap-3 mb-8">`;
    for (const slug of section.items) {
      const article = getArticleBySlug(slug);
      if (!article) continue;
      html += `<a href="#/${slug}" class="bg-[#12121a] rounded-lg p-4 border border-[#222] hover:border-[#f59e0b44] transition-all group">
        <div class="font-bold text-gray-200 group-hover:text-amber-400 transition-colors text-sm">${article.title}</div>
        <div class="text-xs text-gray-500 mt-1 line-clamp-2">${article.description}</div>
        <div class="flex flex-wrap gap-1 mt-2">
          ${article.tags.slice(0, 3).map(t => `<span class="text-xs px-2 py-0.5 rounded-full bg-[#1e1e2e] text-gray-400">#${t}</span>`).join('')}
        </div>
      </a>`;
    }
    html += `</div>`;
  }

  // Core points from knowledge graph
  html += `
    <div class="mt-12 p-6 rounded-lg border border-[#f59e0b22]" style="background: linear-gradient(135deg, #f59e0b08, transparent);">
      <h2 class="text-xl mb-4" style="color: #fbbf24;">核心观点</h2>
      <blockquote class="border-l-3 border-amber-500/30 pl-4">
        <p class="text-gray-300 mb-3">人本来就是多面的。你不必因为自己有紧张、嫉妒、脆弱、攻击性、虚荣、笨拙、需要认可等部分而感到羞耻。它们不一定是"坏"，很多时候只是你尚未理解、尚未整合的生命能量。</p>
      </blockquote>
      <blockquote class="border-l-3 border-amber-500/30 pl-4 mt-3">
        <p class="text-gray-300 mb-3">人格面具是工具，不是本体；阴影是被遗弃的自我，不是罪证。真正的问题不是你有面具，也不是你有阴影，而是你误以为：只有面具表现完美，你才值得被喜欢。</p>
      </blockquote>
      <blockquote class="border-l-3 border-amber-500/30 pl-4 mt-3">
        <p class="text-gray-300">面具帮助你进入社会，阴影帮助你回到完整。</p>
      </blockquote>
    </div>
  `;

  html += `</div>`;
  return html;
}

// Render article page
function renderArticle(article: ArticleMeta): string {
  const html = renderMarkdown(article.content);
  
  let output = `
    <div class="prose-jung max-w-4xl mx-auto px-6 py-8">
      <div class="mb-8">
        <div class="flex flex-wrap gap-2 mb-3">
          ${article.tags.map(t => `<span class="text-xs px-2 py-1 rounded-full bg-[#1e1e2e] text-gray-400 border border-[#333]">#${t}</span>`).join('')}
        </div>
        <p class="text-sm text-gray-500">${article.description}</p>
      </div>
      ${html}
      <div class="mt-12 pt-6 border-t border-[#f59e0b22]">
        <a href="#/" class="text-amber-400/70 hover:text-amber-400 text-sm transition-colors">← 返回知识图谱</a>
      </div>
    </div>
  `;
  
  return output;
}

// Render 404
function renderNotFound(slug: string): string {
  return `
    <div class="prose-jung max-w-4xl mx-auto px-6 py-8 text-center">
      <h1 class="text-4xl mb-4" style="color: #fbbf24;">404</h1>
      <p class="text-gray-400 mb-6">未找到笔记: ${slug}</p>
      <a href="#/" class="text-amber-400 hover:text-amber-300">← 返回知识图谱</a>
    </div>
  `;
}

// Main render function
async function render() {
  const app = document.getElementById('app')!;
  const route = parseRoute();
  const sidebar = document.getElementById('sidebar-nav')!;
  const mobileMenuBtn = document.getElementById('mobile-menu-btn')!;

  // Update sidebar
  const activeSlug = route.type === 'article' ? route.slug : undefined;
  sidebar.innerHTML = renderNav(activeSlug);

  // Close mobile menu
  const sidebarEl = document.getElementById('sidebar')!;
  sidebarEl.classList.remove('open');

  // Update main content
  const main = document.getElementById('main-content')!;
  
  if (route.type === 'home') {
    main.innerHTML = renderHome();
  } else if (route.type === 'article') {
    const article = getArticleBySlug(route.slug!);
    if (article) {
      main.innerHTML = renderArticle(article);
    } else {
      main.innerHTML = renderNotFound(route.slug!);
    }
  }

  // Scroll to top
  window.scrollTo(0, 0);

  // Render mermaid blocks
  try {
    await renderMermaidBlocks();
  } catch (e) {
    console.error('Mermaid render error:', e);
  }
}

// Initialize app layout
function initLayout() {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside id="sidebar" class="sidebar w-64 min-h-screen bg-[#0e0e16] border-r border-[#222] flex flex-col flex-shrink-0">
        <div id="sidebar-nav"></div>
      </aside>

      <!-- Mobile overlay -->
      <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-40 hidden md:hidden" onclick="document.getElementById('sidebar')?.classList.remove('open'); this.classList.add('hidden');"></div>

      <!-- Main content -->
      <main class="flex-1 min-w-0">
        <!-- Mobile header -->
        <div class="md:hidden flex items-center p-3 border-b border-[#222] bg-[#0e0e16]">
          <button id="mobile-menu-btn" class="text-gray-400 hover:text-gray-200 p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <span class="ml-3 text-sm text-amber-400 font-bold">荣格心理学</span>
        </div>
        
        <div id="main-content"></div>
      </main>
    </div>
  `;

  // Mobile menu handler
  const mobileBtn = document.getElementById('mobile-menu-btn')!;
  mobileBtn.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar')!;
    const overlay = document.getElementById('sidebar-overlay')!;
    sidebar.classList.toggle('open');
    overlay.classList.toggle('hidden');
  });
}

// Boot
initLayout();
render();
window.addEventListener('hashchange', render);
