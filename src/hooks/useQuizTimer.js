import { useEffect, useRef, useState } from 'react'

export function useQuizTimer({ enabled, initialSeconds, onExpire, paused = false }) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const expiredRef = useRef(false)

  useEffect(() => {
    setSeconds(initialSeconds)
    expiredRef.current = false
  }, [initialSeconds])

  useEffect(() => {
    if (!enabled || paused || expiredRef.current) return undefined
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          expiredRef.current = true
          window.clearInterval(timer)
          onExpire?.()
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [enabled, onExpire, paused])

  return [seconds, setSeconds]
}
