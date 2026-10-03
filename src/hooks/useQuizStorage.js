import { useCallback, useState } from 'react'
import { readStorage, writeStorage, STORAGE_KEYS } from '../utils/storage'

const defaultSettings = { difficulty: 'all', timed: true, theme: 'light', questionCount: 16 }

export function useQuizStorage() {
  const [settings, setSettingsState] = useState(() => ({ ...defaultSettings, ...readStorage(STORAGE_KEYS.settings, {}) }))
  const [history, setHistory] = useState(() => readStorage(STORAGE_KEYS.history, []))
  const [wrongIds, setWrongIds] = useState(() => readStorage(STORAGE_KEYS.wrong, []))
  const [session, setSessionState] = useState(() => readStorage(STORAGE_KEYS.session, null))

  const updateSettings = useCallback((patch) => {
    setSettingsState((current) => {
      const next = { ...current, ...patch }
      writeStorage(STORAGE_KEYS.settings, next)
      return next
    })
  }, [])

  const saveSession = useCallback((next) => {
    setSessionState(next)
    if (next) writeStorage(STORAGE_KEYS.session, next)
    else { try { localStorage.removeItem(STORAGE_KEYS.session) } catch {} }
  }, [])

  const saveResult = useCallback((result) => {
    writeStorage(STORAGE_KEYS.lastResult, result)
    setHistory((current) => {
      const next = [result, ...current].slice(0, 20)
      writeStorage(STORAGE_KEYS.history, next)
      return next
    })
    setWrongIds((current) => {
      const next = [...new Set([...current, ...result.wrongIds])]
      writeStorage(STORAGE_KEYS.wrong, next)
      return next
    })
  }, [])

  const clearWrong = useCallback(() => {
    setWrongIds([])
    writeStorage(STORAGE_KEYS.wrong, [])
  }, [])

  return { settings, updateSettings, history, wrongIds, session, saveSession, saveResult, clearWrong }
}
