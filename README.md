# 故宫知识答题

独立的故宫知识答题前端项目，采用 React、Vite、Tailwind CSS 和 Framer Motion 构建。项目不依赖原数字人项目的后端、WebSocket 或实时语音服务。

## 启动

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 功能

- 首页选择全部、简单、中等或困难题目
- 单选、多选、判断三种题型
- 默认 10 分钟整套答题倒计时，可关闭限时
- 刷新页面后可继续上次答题进度
- 答案确认、即时解析、得分统计和答题结果
- 错题自动保存和错题回顾
- 历史答题记录
- 浅色/深色主题切换
- 本地 SVG 视觉资源，无外部图片依赖

## 修改题库

题库位于 `src/data/questions.js`。每道题包含以下字段：

- `id`：唯一标识
- `difficulty`：`easy`、`medium` 或 `hard`
- `type`：`single`、`multiple` 或 `boolean`
- `question`：题干
- `options`：选项数组
- `answer`：正确答案数组
- `explanation`：答题解析
- `knowledgePoint`：知识点标签

## 本地数据

答题设置、答题进度、历史记录、错题记录和最近结果保存在浏览器 `localStorage` 中，使用以下命名空间：

- `ziwei-quiz-settings`
- `ziwei-quiz-session`
- `ziwei-quiz-history`
- `ziwei-quiz-wrong-answers`
- `ziwei-quiz-last-result`

如果本地 JSON 损坏，应用会自动清理对应数据并使用默认值启动。

## 目录

- `src/App.jsx`：应用状态流和页面切换
- `src/components/`：首页、答题、结果、错题和主题组件
- `src/data/questions.js`：题库
- `src/hooks/`：主题、计时和本地存储 hooks
- `src/utils/`：存储和答题计算工具
- `public/images/`：本地 SVG 视觉资源
