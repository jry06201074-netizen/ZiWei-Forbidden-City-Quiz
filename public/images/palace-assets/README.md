# 素材目录说明

答题页题图统一放在 `public/images/palace-assets/`，并通过 Vite 的 `/images/palace-assets/<文件名>` 路径引用。

当前内置的主题插图（可直接使用，也可按同名替换）：

- `history.svg`：历史与紫禁城营建主题
- `architecture.svg`：中轴建筑与三大殿主题
- `culture.svg`：宫廷纹饰、脊兽与色彩主题
- `garden.svg`：御花园与内廷园林主题
- `preservation.svg`：文物保护与世界遗产主题

## 替换为真实照片

如果要用真实照片，建议放入同目录并保留文件名，例如：

- `history.jpg`
- `architecture.jpg`
- `culture.jpg`
- `garden.jpg`
- `preservation.jpg`

只需同步修改 `src/data/questions.js` 中 `image` 字段的扩展名即可，例如：

```js
image: '/images/palace-assets/history.jpg'
```

推荐尺寸与处理方式：

- 宽高比约 16:9 或 3:1，宽边至少 1600px，避免拉伸模糊。
- 画面主体尽量居中，答题页会以 `object-cover` 裁切上下边缘。
- 文件体积建议压缩到 300KB 以内，优先使用 `.jpg` 或 `.webp`。
- 使用有明确授权或可商用来源的图片，例如故宫博物院官网/官方公众号公开素材、Unsplash、Wikimedia Commons 等，并在来源允许的范围内使用。

## 图片来源建议

如果需要我改用真实照片，请提供你希望使用的图片来源（本地文件、图库链接或指定的授权素材站点），我会按上面的命名和尺寸规范接入。
