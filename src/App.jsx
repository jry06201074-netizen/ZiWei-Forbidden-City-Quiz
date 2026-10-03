import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { questions as allQuestions } from './data/questions'
import { assignRandomImages } from './data/palaceImages'
import { calculateScore, answersMatch } from './utils/quizUtils'
import { useQuizStorage } from './hooks/useQuizStorage'
import { useQuizTimer } from './hooks/useQuizTimer'
import { useTheme } from './hooks/useTheme'
import ThemeToggle from './components/ThemeToggle'
import QuizHome from './components/QuizHome'
import QuizQuestion from './components/QuizQuestion'
import QuizResult from './components/QuizResult'
import WrongAnswerReview from './components/WrongAnswerReview'

const TOTAL_SECONDS = 600

export default function App() {
  const [theme, setTheme] = useTheme()
  const storage = useQuizStorage()
  const [page, setPage] = useState('home')
  const [quizQuestions, setQuizQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [startedAt, setStartedAt] = useState(null)
  const [result, setResult] = useState(null)
  const [remaining, setRemaining] = useState(TOTAL_SECONDS)
  const [showHistory, setShowHistory] = useState(false)

  const filteredQuestions = useMemo(() => storage.settings.difficulty === 'all' ? allQuestions : allQuestions.filter((q) => q.difficulty === storage.settings.difficulty), [storage.settings.difficulty])
  const currentQuestion = quizQuestions[current]
  const score = calculateScore(quizQuestions, answers)
  const finishQuiz = useCallback(() => {
    if (!quizQuestions.length) return
    const finalResult = { id: Date.now(), createdAt: new Date().toISOString(), score: calculateScore(quizQuestions, answers), total: quizQuestions.length, elapsed: Math.max(0, Math.round((Date.now() - (startedAt || Date.now())) / 1000)), answers, wrongIds: quizQuestions.filter((q) => !answers[q.id]?.correct).map((q) => q.id) }
    setResult(finalResult)
    storage.saveResult(finalResult)
    storage.saveSession(null)
    setPage('result')
  }, [answers, quizQuestions, startedAt, storage])
  const [timer, setTimer] = useQuizTimer({ enabled: page === 'quiz' && storage.settings.timed, initialSeconds: remaining, paused: false, onExpire: finishQuiz })

  const startQuiz = (resume = false) => {
    if (resume && storage.session?.questions?.length) {
      const saved = storage.session
      setQuizQuestions(saved.questions); setAnswers(saved.answers || {}); setCurrent(saved.current || 0); setStartedAt(saved.startedAt || Date.now()); setRemaining(saved.remaining || TOTAL_SECONDS); setTimer(saved.remaining || TOTAL_SECONDS); setPage('quiz'); return
    }
    const questionCount = Math.max(1, Math.min(Number(storage.settings.questionCount) || 16, filteredQuestions.length))
    const shuffledQuestions = [...filteredQuestions].sort(() => Math.random() - 0.5)
    const typeOrder = ['boolean', 'single', 'multiple']
    const selectedQuestions = typeOrder.map((type) => shuffledQuestions.find((question) => question.type === type)).filter(Boolean)
    const selectedIds = new Set(selectedQuestions.map((question) => question.id))
    const remainingQuestions = shuffledQuestions.filter((question) => !selectedIds.has(question.id))
    const nextQuestions = assignRandomImages([...selectedQuestions, ...remainingQuestions].slice(0, questionCount))
    const start = Date.now()
    setQuizQuestions(nextQuestions); setAnswers({}); setCurrent(0); setStartedAt(start); setRemaining(TOTAL_SECONDS); setTimer(TOTAL_SECONDS); setResult(null); setPage('quiz')
    storage.saveSession({ questions: nextQuestions, answers: {}, current: 0, startedAt: start, remaining: TOTAL_SECONDS })
  }
  const updateAnswer = (option) => { if (!currentQuestion || answers[currentQuestion.id]?.submitted) return; setAnswers((old) => { const currentSelected = old[currentQuestion.id]?.selected || []; const selected = currentQuestion.type === 'multiple' ? (currentSelected.includes(option) ? currentSelected.filter((item) => item !== option) : [...currentSelected, option]) : [option]; return { ...old, [currentQuestion.id]: { selected } } }) }
  const submitAnswer = () => { if (!currentQuestion) return; setAnswers((old) => { const selected = old[currentQuestion.id]?.selected || []; return { ...old, [currentQuestion.id]: { selected, submitted: true, correct: answersMatch(selected, currentQuestion.answer) } } }) }
  const nextQuestion = () => { if (current >= quizQuestions.length - 1) finishQuiz(); else { const next = current + 1; setCurrent(next); storage.saveSession({ questions: quizQuestions, answers, current: next, startedAt, remaining: timer }) } }
  const skipQuestion = () => { if (!currentQuestion) return; setAnswers((old) => ({ ...old, [currentQuestion.id]: { selected: [], submitted: true, correct: false } })); if (current >= quizQuestions.length - 1) finishQuiz(); else setCurrent((value) => value + 1) }
  const previousQuestion = () => setCurrent((value) => Math.max(0, value - 1))
  const updateSettings = (patch) => storage.updateSettings(patch)
  const home = () => { setPage('home'); setShowHistory(false) }

  return <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,#fff8ed_0%,transparent_38%),radial-gradient(circle_at_bottom_right,#ded6ed_0%,transparent_36%)] transition-colors dark:bg-[radial-gradient(circle_at_top_left,#352126_0%,transparent_36%),#171316]">
    <div className="axis-backdrop" />
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8"><button onClick={home} className="flex items-center gap-3 text-left"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#9b2028] text-xl text-white shadow-lg shadow-red-900/20">紫</span><span><strong className="block text-sm tracking-wide text-stone-800 dark:text-white">故宫知识答题</strong><small className="text-xs text-stone-500 dark:text-stone-400">The Forbidden City</small></span></button><div className="flex items-center gap-2"><button className="quiet-button hidden sm:block" onClick={() => { setShowHistory(false); setPage('wrong') }}>错题本</button><ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} /></div></header>
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-12 sm:px-6 lg:px-8"><AnimatePresence mode="wait">
      {page === 'home' && !showHistory && <QuizHome key="home" settings={storage.settings} onSettings={updateSettings} onStart={() => startQuiz(false)} onResume={() => startQuiz(true)} hasSession={Boolean(storage.session)} onHistory={() => setShowHistory(true)} historyCount={storage.history.length} />}
      {page === 'home' && showHistory && <History key="history" history={storage.history} onBack={() => setShowHistory(false)} />}
      {page === 'quiz' && currentQuestion && <QuizQuestion key={currentQuestion.id} question={currentQuestion} nextImage={quizQuestions[current + 1]?.image} index={current} total={quizQuestions.length} answerState={answers[currentQuestion.id]} onSelect={updateAnswer} onConfirm={submitAnswer} onPrevious={previousQuestion} onNext={nextQuestion} onSkip={skipQuestion} onQuit={home} timed={storage.settings.timed} remaining={timer} score={score} />}
      {page === 'result' && result && <QuizResult key="result" result={result} questions={quizQuestions} onRestart={() => startQuiz(false)} onHome={home} onWrong={() => setPage('wrong')} />}
      {page === 'wrong' && <WrongAnswerReview key="wrong" questions={allQuestions} wrongIds={storage.wrongIds} onBack={home} onClear={storage.clearWrong} />}
    </AnimatePresence></div>
    <footer className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-2 px-4 pb-8 text-center text-xs text-stone-500 dark:text-stone-500 sm:flex-row sm:justify-between sm:px-6 lg:px-8"><span>故宫知识答题 · 本地学习工具 · 答题记录仅保存在当前浏览器</span><span className="tracking-[.16em] text-stone-400 dark:text-stone-600">ZIWEI · 1420</span></footer>
  </div>
}

function History({ history, onBack }) { return <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel rounded-3xl p-6 sm:p-8"><div className="mb-6 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-500">Your Journey</p><h1 className="mt-2 text-2xl font-bold text-stone-800 dark:text-white">历史答题</h1></div><button className="quiet-button" onClick={onBack}>返回</button></div>{history.length === 0 ? <p className="rounded-2xl border border-dashed border-black/10 p-10 text-center text-stone-500 dark:border-white/10">完成第一次答题后，这里会出现你的记录。</p> : <div className="space-y-3">{history.map((item) => <div key={item.id} className="soft-card flex items-center justify-between gap-4 p-4"><div><p className="font-semibold text-stone-800 dark:text-white">{new Date(item.createdAt).toLocaleString('zh-CN')}</p><p className="mt-1 text-xs text-stone-500">答对 {item.score} / {item.total} · 用时 {Math.floor(item.elapsed / 60)} 分钟 {item.elapsed % 60} 秒</p></div><strong className="text-xl text-[#9b2028] dark:text-amber-300">{Math.round(item.score / item.total * 100)}%</strong></div>)}</div>}</motion.main> }
