import sourceText from '../../docx-extracted.txt?raw'

const difficultyByChapter = ['easy', 'easy', 'medium', 'medium', 'medium', 'hard', 'medium', 'easy', 'hard']
const chapterPattern = /^第[一二三四五六七八九十]+章\s*(.+)$/

function parseFacts(text) {
  let chapterIndex = 0
  let chapterName = '故宫概况与基本知识'
  const facts = []

  text.split(/\r?\n/).forEach((line) => {
    const value = line.trim()
    if (!value) return

    const chapterMatch = value.match(chapterPattern)
    if (chapterMatch) {
      chapterName = chapterMatch[1].trim()
      chapterIndex += 1
      return
    }

    if (value === '故宫知识汇编' || value.startsWith('——考察学生') || value.startsWith('使用说明')) return
    facts.push({ chapterIndex, chapterName, fact: value })
  })

  return facts
}

export const documentFacts = parseFacts(sourceText)

export const documentQuestions = documentFacts.map(({ chapterIndex, chapterName, fact }, index) => ({
  id: `docx-${String(index + 1).padStart(3, '0')}`,
  difficulty: difficultyByChapter[chapterIndex - 1] || 'medium',
  type: 'boolean',
  question: fact,
  image: '/images/palace-assets/history.svg',
  options: ['正确', '错误'],
  answer: ['正确'],
  explanation: `本题依据《故宫知识汇编（出题题库素材）》第${chapterName}章节整理。`,
  knowledgePoint: chapterName,
  source: '故宫知识汇编（出题题库素材）',
}))