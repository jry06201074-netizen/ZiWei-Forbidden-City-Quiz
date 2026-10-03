import { motion } from 'framer-motion'
import { DIFFICULTIES, questions } from '../data/questions'

const PARTICLES = [
  { left: '8%', top: '18%', delay: '0s', size: 'h-1 w-1' },
  { left: '18%', top: '68%', delay: '1.4s', size: 'h-1.5 w-1.5' },
  { left: '42%', top: '12%', delay: '.7s', size: 'h-1 w-1' },
  { left: '62%', top: '34%', delay: '2.1s', size: 'h-1.5 w-1.5' },
  { left: '76%', top: '72%', delay: '1.1s', size: 'h-1 w-1' },
  { left: '91%', top: '22%', delay: '2.8s', size: 'h-1.5 w-1.5' },
]

export default function QuizHome({ settings, onSettings, onStart, onResume, hasSession, onHistory, historyCount }) {
  const typeCount = new Set(questions.map((question) => question.type)).size
  const topics = [...new Set(questions.map((question) => question.knowledgePoint))]
  return <motion.main initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <div className="grid gap-6 lg:grid-cols-[1.18fr_.82fr]">
    <section className="relative min-h-[470px] overflow-hidden rounded-3xl border border-white/60 bg-[#7e171f] shadow-2xl shadow-red-950/20 sm:min-h-[530px]">
      <img src="/images/quiz-cover.svg" alt="故宫红墙与宫殿插画" className="hall-float absolute inset-0 h-full w-full object-cover opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3e0e18]/95 via-[#741b24]/20 to-[#741b24]/5" />
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true"><div className="palace-aura absolute -left-24 top-12 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />{PARTICLES.map((particle, index) => <span key={index} className={`palace-particle absolute rounded-full bg-amber-200 shadow-[0_0_12px_rgba(255,218,140,.9)] ${particle.size}`} style={{ left: particle.left, top: particle.top, animationDelay: particle.delay }} />)}</div>
      <div className="absolute right-8 top-0 hidden h-24 w-12 border-x border-amber-200/30 bg-amber-100/10 sm:block"><span className="lantern-sway absolute -bottom-8 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full border border-amber-200/50 bg-amber-300/70 shadow-[0_0_35px_rgba(255,199,92,.55)]" /></div>
      <div className="relative flex min-h-[470px] flex-col justify-between p-6 text-white sm:min-h-[530px] sm:p-10">
        <div className="flex items-center justify-between"><span className="seal-badge border-white/20 bg-black/15 text-amber-100">故宫 · 紫禁城</span><span className="hidden text-xs tracking-[.18em] text-white/65 sm:block">PALACE · BEIJING</span></div>
        <div className="max-w-xl"><p className="mb-3 text-xs font-semibold uppercase tracking-[.28em] text-amber-200">ZIWEI · PALACE KNOWLEDGE</p><h2 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">沿中轴线<br /><span className="text-amber-200">开启宫廷探索</span></h2><p className="mt-4 max-w-lg text-sm leading-7 text-red-50/85">从宫殿营造到皇家礼制，在一场轻松的答题旅程里，重新发现紫禁城的细节与故事。</p>
          <div className="mt-7 flex flex-wrap gap-2"><motion.span whileHover={{ y: -3 }} className="topic-chip border-white/20 bg-white/10 text-white">朱墙金瓦</motion.span><motion.span whileHover={{ y: -3 }} className="topic-chip border-white/20 bg-white/10 text-white">中轴建筑</motion.span><motion.span whileHover={{ y: -3 }} className="topic-chip border-white/20 bg-white/10 text-white">宫廷文化</motion.span></div>
        </div>
      </div>
    </section>
    <section className="glass-panel rounded-3xl p-6 sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-500">Explore & Learn</p><h1 className="mt-2 text-2xl font-bold text-stone-800 dark:text-white">准备好开始了吗？</h1><p className="mt-2 text-sm text-stone-500 dark:text-stone-400">选好难度，开启你的紫禁城漫游。</p></div><div className="text-4xl" aria-hidden="true">🏯</div></div>
      <div className="space-y-5">
        <div><label className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-200">选择难度</label><div className="grid grid-cols-3 gap-2">{[['all','全部'], ...Object.entries(DIFFICULTIES)].map(([key, label]) => <button key={key} onClick={() => onSettings({ difficulty: key })} aria-pressed={settings.difficulty === key} className={`rounded-xl border px-2 py-3 text-sm transition ${settings.difficulty === key ? 'border-violet-400 bg-violet-100 text-violet-800 shadow-sm dark:border-violet-400/60 dark:bg-violet-500/15 dark:text-violet-100' : 'border-black/10 bg-white/40 text-stone-600 hover:bg-white/80 dark:border-white/10 dark:bg-white/[.04] dark:text-stone-300'}`}>{label}</button>)}</div></div>
        <div><label htmlFor="question-count" className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-200">选择答题数量</label><div className="flex flex-wrap gap-2">{[5, 10, 16, 20, 30, 50].map((count) => <button key={count} onClick={() => onSettings({ questionCount: count })} aria-pressed={settings.questionCount === count} className={`rounded-xl border px-3 py-2 text-sm transition ${settings.questionCount === count ? 'border-violet-400 bg-violet-100 text-violet-800 shadow-sm dark:border-violet-400/60 dark:bg-violet-500/15 dark:text-violet-100' : 'border-black/10 bg-white/40 text-stone-600 hover:bg-white/80 dark:border-white/10 dark:bg-white/[.04] dark:text-stone-300'}`}>{count} 题</button>)}</div><div className="mt-2 flex items-center gap-2"><input id="question-count" type="number" min="1" max={questions.length} value={settings.questionCount} onChange={(e) => onSettings({ questionCount: Math.max(1, Math.min(questions.length, Number(e.target.value) || 1)) })} className="w-24 rounded-xl border border-black/10 bg-white/60 px-3 py-2 text-sm text-stone-700 outline-none focus:border-violet-400 dark:border-white/10 dark:bg-white/[.06] dark:text-stone-200" /><span className="text-xs text-stone-500 dark:text-stone-400">可输入 1－{questions.length} 题</span></div></div>
        <label className="flex items-center justify-between rounded-xl border border-black/[.07] bg-white/40 px-4 py-3 dark:border-white/10 dark:bg-white/[.04]"><span><span className="block text-sm font-semibold">开启限时答题</span><span className="text-xs text-stone-500 dark:text-stone-400">整套答题限时 10 分钟</span></span><input type="checkbox" checked={settings.timed} onChange={(e) => onSettings({ timed: e.target.checked })} className="h-5 w-5 accent-violet-600" /></label>
        <div className="grid gap-3"><motion.button whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: .98 }} className="gold-button w-full" onClick={onStart}>开始新的答题 <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span></motion.button>{hasSession && <motion.button whileHover={{ y: -2 }} whileTap={{ scale: .98 }} className="quiet-button w-full" onClick={onResume}>继续上次进度</motion.button>}</div>
        <button className="w-full text-sm font-medium text-violet-600 hover:text-violet-800 dark:text-violet-300" onClick={onHistory}>查看历史答题记录（{historyCount}）</button>
      </div>
      <div className="mt-7 grid grid-cols-3 gap-2 text-center text-xs text-stone-500 dark:text-stone-400"><motion.div whileHover={{ y: -3 }} className="soft-card p-3"><b className="block text-lg text-stone-800 dark:text-white">{questions.length}</b>道题库题</motion.div><motion.div whileHover={{ y: -3 }} className="soft-card p-3"><b className="block text-lg text-stone-800 dark:text-white">{typeCount}</b>种题型</motion.div><motion.div whileHover={{ y: -3 }} className="soft-card p-3"><b className="block text-lg text-stone-800 dark:text-white">10</b>分钟挑战</motion.div></div>
    </section>
    </div>
    <section className="grid gap-4 rounded-3xl border border-white/60 bg-white/40 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[.03] sm:grid-cols-[180px_1fr] sm:items-center sm:px-7">
      <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-violet-500">Route · 01—05</p><h2 className="mt-1 text-lg font-bold text-stone-800 dark:text-white">本次探索路线</h2></div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">{['午门', '太和殿', '乾清宫', '御花园'].map((stop, index) => <div key={stop} className="flex items-center gap-3"><span className="flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-200"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#9b2028]/20 bg-[#9b2028]/[.07] text-[11px] font-bold text-[#9b2028] dark:border-amber-200/20 dark:bg-amber-200/10 dark:text-amber-200">0{index + 1}</span>{stop}</span>{index < 3 && <span className="hidden h-px w-8 bg-amber-700/25 sm:block" />}</div>)}</div>
      <p className="text-xs leading-5 text-stone-500 dark:text-stone-400 sm:col-start-2">覆盖主题：{topics.slice(0, 5).join(' · ')}等</p>
    </section>
  </motion.main>
}
