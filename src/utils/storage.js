export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    try { localStorage.removeItem(key) } catch {}
    return fallback
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export const STORAGE_KEYS = {
  settings: 'ziwei-quiz-settings',
  session: 'ziwei-quiz-session',
  history: 'ziwei-quiz-history',
  wrong: 'ziwei-quiz-wrong-answers',
  lastResult: 'ziwei-quiz-last-result',
}
