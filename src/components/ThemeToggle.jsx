import { motion } from 'framer-motion'

export default function ThemeToggle({ theme, onToggle }) {
  return <motion.button aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'} title="切换主题" onClick={onToggle} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/45 text-lg shadow-lg backdrop-blur-xl transition dark:border-white/10 dark:bg-white/[0.07]" whileHover={{ scale: 1.08 }} whileTap={{ scale: .94 }}>
    {theme === 'dark' ? '☀️' : '🌙'}
  </motion.button>
}
