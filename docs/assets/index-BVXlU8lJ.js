(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`rsi`,name:`双周期 RSI 模拟器`,subtitle:`快线 / 慢线交叉验证`,description:`6日与24日双周期 RSI 实战模拟，支持金叉死叉识别与三种市场体制切换`,icon:`📊`,color:`#00d4aa`,href:`/simulators/双周期RSI模拟器.html`,tags:[`动量指标`,`超买超卖`,`金叉死叉`]},{id:`bollinger`,name:`布林通道模拟器`,subtitle:`波动率通道动力学`,description:`SMA 中轨 ± 标准差通道，均值回归 / 极度挤压 / 趋势爆发三种市场体制`,icon:`📐`,color:`#3b82f6`,href:`/simulators/布林通道模拟器.html`,tags:[`布林带`,`波动率`,`趋势识别`]},{id:`macro-credit`,name:`宏观货币信用传导模拟器`,subtitle:`货币 - 信用 - 宏观链条`,description:`模拟央行货币政策向实体经济传导的全链路，含降准、降息、扩表等工具`,icon:`🏦`,color:`#f59e0b`,href:`/simulators/宏观货币信用传导模拟器.html`,tags:[`货币政策`,`信用扩张`,`宏观传导`]},{id:`macro-cycle`,name:`宏观经济周期全息沙盘`,subtitle:`库存 / 产能 / 货币三角`,description:`库存周期、产能周期、货币周期的叠加模拟，识别宏观定位与资产配置信号`,icon:`🌊`,color:`#8b5cf6`,href:`/simulators/宏观经济周期全息沙盘.html`,tags:[`经济周期`,`库存周期`,`产能周期`]}],t=document.querySelector(`#app`);t.innerHTML=`
  <div class="min-h-screen">
    <!-- Header -->
    <header class="border-b border-[var(--border)]">
      <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
            <span class="text-sm">📈</span>
          </div>
          <span class="font-display font-semibold text-lg">TechSimulators</span>
        </div>
        <a href="https://github.com" target="_blank" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm flex items-center gap-2">
          <span>GitHub</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
      </div>
    </header>

    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-6 pt-20 pb-16">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)] text-[var(--accent)] text-xs mb-6" style="animation-delay: 0ms">
          Interactive Market Simulators
        </div>
        <h1 class="font-display text-5xl font-bold leading-tight mb-6" style="animation: fadeUp 0.6s ease forwards; animation-delay: 100ms; opacity: 0;">
          技术分析<br>
          <span style="color: var(--accent)">交互式沙盘</span>
        </h1>
        <p class="text-[var(--text-secondary)] text-lg leading-relaxed mb-8" style="animation: fadeUp 0.6s ease forwards; animation-delay: 200ms; opacity: 0;">
          用代码理解市场。通过可交互的模拟器，深入理解 RSI、布林通道、货币政策传导与经济周期的核心逻辑。
        </p>
        <div class="flex gap-4 flex-wrap" style="animation: fadeUp 0.6s ease forwards; animation-delay: 300ms; opacity: 0;">
          <a href="#simulators" class="px-6 py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90" style="background: var(--accent); color: var(--bg-primary);">
            浏览模拟器
          </a>
          <a href="https://github.com" target="_blank" class="px-6 py-3 rounded-lg font-medium text-sm border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
            源码地址
          </a>
        </div>
      </div>

      <!-- Mini chart decoration -->
      <div class="mt-12 h-32 flex items-end gap-1 opacity-20">
        ${Array.from({length:40},(e,t)=>`<div class="flex-1 rounded-t" style="height: ${20+Math.sin(t*.3)*15+Math.random()*10}%; background: var(--accent); opacity: ${.3+Math.random()*.7}"></div>`).join(``)}
      </div>
    </section>

    <!-- Simulators Grid -->
    <section id="simulators" class="max-w-6xl mx-auto px-6 pb-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${e.map((e,t)=>`
          <a href="${e.href}" target="_blank" class="block group" style="animation: fadeUp 0.6s ease forwards; animation-delay: ${t*100+400}ms; opacity: 0;">
            <div class="card-hover rounded-2xl p-6 border border-[var(--border)] bg-[var(--bg-card)] h-full">
              <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style="background: ${e.color}22; border: 1px solid ${e.color}44">
                  ${e.icon}
                </div>
                <svg class="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </div>
              <h3 class="font-display font-semibold text-lg mb-1 group-hover:text-[var(--accent)] transition-colors">${e.name}</h3>
              <p class="text-xs mb-3" style="color: ${e.color}">${e.subtitle}</p>
              <p class="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">${e.description}</p>
              <div class="flex flex-wrap gap-2">
                ${e.tags.map(e=>`
                  <span class="px-2 py-0.5 rounded text-xs border border-[var(--border)] text-[var(--text-secondary)]">${e}</span>
                `).join(``)}
              </div>
            </div>
          </a>
        `).join(``)}
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-[var(--border)]">
      <div class="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <p class="text-[var(--text-secondary)] text-sm">Built with Vite + Tailwind CSS</p>
        <p class="text-[var(--text-secondary)] text-xs">OpenClaw AI Assistant</p>
      </div>
    </footer>
  </div>
`,requestAnimationFrame(()=>{document.querySelectorAll(`[style*="opacity: 0"]`).forEach(e=>{e.style.opacity=``})});