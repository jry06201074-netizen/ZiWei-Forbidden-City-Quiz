import { useEffect, useState } from 'react'
import { readStorage, writeStorage, STORAGE_KEYS } from '../utils/storage'

export function useTheme() {
  const [theme, setTheme] = useState(() => readStorage(STORAGE_KEYS.settings, { theme: 'light' }).theme || 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    const settings = readStorage(STORAGE_KEYS.settings, {})
    writeStorage(STORAGE_KEYS.settings, { ...settings, theme })
  }, [theme])

  return [theme, setTheme]
}
