import './style.css'

const simulators = [
  {
    id: 'rsi',
    name: '双周期 RSI 模拟器',
    subtitle: '快线 / 慢线交叉验证',
    description: '6日与24日双周期 RSI 实战模拟，支持金叉死叉识别与三种市场体制切换',
    icon: '📊',
    color: '#00d4aa',
    href: '/simulators/双周期RSI模拟器.html',
    tags: ['动量指标', '超买超卖', '金叉死叉'],
  },
  {
    id: 'bollinger',
    name: '布林通道模拟器',
    subtitle: '波动率通道动力学',
    description: 'SMA 中轨 ± 标准差通道，均值回归 / 极度挤压 / 趋势爆发三种市场体制',
    icon: '📐',
    color: '#3b82f6',
    href: '/simulators/布林通道模拟器.html',
    tags: ['布林带', '波动率', '趋势识别'],
  },
  {
    id: 'macro-credit',
    name: '宏观货币信用传导模拟器',
    subtitle: '货币 - 信用 - 宏观链条',
    description: '模拟央行货币政策向实体经济传导的全链路，含降准、降息、扩表等工具',
    icon: '🏦',
    color: '#f59e0b',
    href: '/simulators/宏观货币信用传导模拟器.html',
    tags: ['货币政策', '信用扩张', '宏观传导'],
  },
  {
    id: 'macro-cycle',
    name: '宏观经济周期全息沙盘',
    subtitle: '库存 / 产能 / 货币三角',
    description: '库存周期、产能周期、货币周期的叠加模拟，识别宏观定位与资产配置信号',
    icon: '🌊',
    color: '#8b5cf6',
    href: '/simulators/宏观经济周期全息沙盘.html',
    tags: ['经济周期', '库存周期', '产能周期'],
  },
  {
    id: 'macro-deep',
    name: '宏观经济周期与货币机制深度解析',
    subtitle: '三层嵌套 + 索洛模型',
    description: '库兹涅茨/朱格拉/基钦三层周期嵌套、中美错位与铜的双引擎、潜在GDP与新质生产力的必然性',
    icon: '🔬',
    color: '#0ea5e9',
    href: '/simulators/宏观经济周期与货币机制深度解析.html',
    tags: ['经济周期', '索洛模型', '新质生产力'],
  },
  {
    id: 'money-multiplier',
    name: '货币乘数效应模拟器',
    subtitle: '部分准备金制度的信用扩张',
    description: '可视化展示法定准备金率如何通过货币乘数将基础货币成倍放大为广义信用，含10轮派生过程',
    icon: '💳',
    color: '#6366f1',
    href: '/simulators/货币乘数效应模拟器.html',
    tags: ['货币乘数', '准备金率', '信用扩张'],
  },
  {
    id: 'liquidity-clock',
    name: '宏观流动性传导时钟沙盘',
    subtitle: 'M2/社融/GDP 三维传导',
    description: 'D3.js 可视化：滑块驱动衰退初期→深度衰退→复苏初期三阶段，观察银行体系→债市/股市/实体经济的资金流向与力度变化',
    icon: '⏰',
    color: '#4fc3f7',
    href: '/simulators/宏观流动性传导时钟沙盘.html',
    tags: ['流动性时钟', 'M2-社融剪刀差', '股债轮动'],
  },
  {
    id: 'deviation',
    name: '偏离度度量比较',
    subtitle: '静态阈值 vs 动态置信区间',
    description: '对比 Bollinger Bands（动态2σ置信区间）与 BIAS（±10%静态阈值）在平稳与结构性突变环境下的表现差异',
    icon: '📏',
    color: '#ef4444',
    href: '/simulators/偏离度度量比较.html',
    tags: ['偏离度', '布林带', '均值回归'],
  },
]

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
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
        ${Array.from({length: 40}, (_, i) => {
          const h = 20 + Math.sin(i * 0.3) * 15 + Math.random() * 10
          return `<div class="flex-1 rounded-t" style="height: ${h}%; background: var(--accent); opacity: ${0.3 + Math.random() * 0.7}"></div>`
        }).join('')}
      </div>
    </section>

    <!-- Simulators Grid -->
    <section id="simulators" class="max-w-6xl mx-auto px-6 pb-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${simulators.map((sim, i) => `
          <a href="${sim.href}" target="_blank" class="block group" style="animation: fadeUp 0.6s ease forwards; animation-delay: ${i * 100 + 400}ms; opacity: 0;">
            <div class="card-hover rounded-2xl p-6 border border-[var(--border)] bg-[var(--bg-card)] h-full">
              <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style="background: ${sim.color}22; border: 1px solid ${sim.color}44">
                  ${sim.icon}
                </div>
                <svg class="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </div>
              <h3 class="font-display font-semibold text-lg mb-1 group-hover:text-[var(--accent)] transition-colors">${sim.name}</h3>
              <p class="text-xs mb-3" style="color: ${sim.color}">${sim.subtitle}</p>
              <p class="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">${sim.description}</p>
              <div class="flex flex-wrap gap-2">
                ${sim.tags.map(tag => `
                  <span class="px-2 py-0.5 rounded text-xs border border-[var(--border)] text-[var(--text-secondary)]">${tag}</span>
                `).join('')}
              </div>
            </div>
          </a>
        `).join('')}
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
`

// Trigger animations after mount
requestAnimationFrame(() => {
  document.querySelectorAll('[style*="opacity: 0"]').forEach(el => {
    (el as HTMLElement).style.opacity = ''
  })
})
