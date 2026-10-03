export const palaceImages = Array.from({ length: 40 }, (_, index) =>
  `/images/forbidden-city-40/forbidden-city-${String(index + 1).padStart(2, '0')}.svg`,
)

export function assignRandomImages(items) {
  const shuffled = [...palaceImages].sort(() => Math.random() - 0.5)
  return items.map((item, index) => ({
    ...item,
    image: shuffled[index % shuffled.length],
  }))
}
