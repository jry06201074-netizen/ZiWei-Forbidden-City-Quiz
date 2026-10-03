import rawLines from './officialQuestionLines.js'

const imageByType = { single: '/images/palace-assets/history.svg', multiple: '/images/palace-assets/architecture.svg', boolean: '/images/palace-assets/culture.svg' }
const questionPattern = /^(\d+)\.\s*(.+)$/
const optionPattern = /^([A-Z])\.\s*(.+)$/

function parseOfficialQuestions(lines) {
  let type = 'single'
  let current = null
  const result = []

  const pushCurrent = () => {
    if (!current) return
    const letters = current.answerText.match(/[A-Z]+/i)?.[0] || ''
    const answerLetters = letters.toUpperCase().split('')
    const answer = answerLetters.map((letter) => current.options.find((option) => option.letter === letter)?.text).filter(Boolean)
    if (current.question && current.options.length && answer.length) {
      result.push({
        id: `official-${String(result.length + 1).padStart(3, '0')}`,
        difficulty: type === 'boolean' ? 'easy' : type === 'multiple' ? 'hard' : 'medium',
        type,
        question: current.question,
        image: imageByType[type],
        options: type === 'boolean' ? ['正确', '错误'] : current.options.map((option) => option.text),
        answer,
        explanation: current.explanation,
        knowledgePoint: current.topic,
        source: '故宫知识测试题库（含答案与解析）',
      })
    }
    current = null
  }

  for (const line of lines) {
    if (line.startsWith('第一部分')) { pushCurrent(); type = 'single'; continue }
    if (line.startsWith('第二部分')) { pushCurrent(); type = 'multiple'; continue }
    if (line.startsWith('第三部分')) { pushCurrent(); type = 'boolean'; continue }
    const questionMatch = line.match(questionPattern)
    if (questionMatch) { pushCurrent(); current = { question: questionMatch[2], options: [], answerText: '', explanation: '', topic: type === 'single' ? '故宫基础知识' : type === 'multiple' ? '故宫综合知识' : '故宫判断知识' }; continue }
    const optionMatch = line.match(optionPattern)
    if (optionMatch && current) { current.options.push({ letter: optionMatch[1], text: optionMatch[2] }); continue }
    if (line.startsWith('【答案】') && current) { current.answerText = line.slice(4).trim(); if (type === 'boolean') current.answerText = current.answerText === '正确' ? 'A' : 'B'; continue }
    if (line.startsWith('【解析】') && current) { current.explanation = line.slice(4).trim(); continue }
  }
  pushCurrent()
  return result
}

export const officialQuestions = parseOfficialQuestions(rawLines)