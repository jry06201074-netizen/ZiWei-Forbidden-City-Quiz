export function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

export function normalizeAnswers(answer) {
  return Array.isArray(answer) ? [...answer].sort() : [answer]
}

export function answersMatch(selected, answer) {
  const left = normalizeAnswers(selected)
  const right = normalizeAnswers(answer)
  return left.length === right.length && left.every((value, index) => value === right[index])
}

export function calculateScore(questions, answers) {
  return questions.reduce((score, question) => score + (answersMatch(answers[question.id]?.selected || [], question.answer) ? 1 : 0), 0)
}

export function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds || 0))
  const minutes = Math.floor(safe / 60).toString().padStart(2, '0')
  const rest = (safe % 60).toString().padStart(2, '0')
  return `${minutes}:${rest}`
}

export function formatAnswer(answer) {
  return Array.isArray(answer) ? answer.join('、') : answer || '未作答'
}
