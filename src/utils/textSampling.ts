export function getPixelsForText(text: string | string[], width: number, height: number): { x: number; y: number }[] {
  if (width <= 0 || height <= 0) return [];

  const w = Math.floor(width);
  const h = Math.floor(height);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];

  ctx.clearRect(0, 0, w, h);

  const isMultiLine = Array.isArray(text);
  const lines = isMultiLine ? text : [text as string];

  if (lines.length === 0 || lines.every(l => !l)) return [];

  let fontSize = Math.min(w, h) * (isMultiLine ? 0.4 : 0.65);
  ctx.font = `bold ${fontSize}px "Georgia", serif`;

  let maxWidth = 0;
  lines.forEach(line => {
    const metrics = ctx.measureText(line);
    if (metrics.width > maxWidth) maxWidth = metrics.width;
  });

  if (maxWidth > w * 0.9) {
    fontSize = fontSize * (w * 0.9) / maxWidth;
  }

  const lineHeight = fontSize * 1.2;
  const totalHeight = lineHeight * lines.length;
  if (totalHeight > h * 0.8) {
    fontSize = fontSize * (h * 0.8) / totalHeight;
  }

  ctx.font = `bold ${fontSize}px "Georgia", serif`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const startY = (h - (fontSize * 1.2 * (lines.length - 1))) / (isMultiLine ? 2 : 2.05);

  lines.forEach((line, i) => {
    ctx.fillText(line, w / 2, startY + (i * fontSize * 1.2));
  });

  const imageData = ctx.getImageData(0, 0, w, h);
  const pixels = imageData.data;
  const points: { x: number; y: number }[] = [];

  const gap = Math.max(2, Math.floor(fontSize / (isMultiLine ? 30 : 40)));

  for (let y = 0; y < h; y += gap) {
    for (let x = 0; x < w; x += gap) {
      const index = (y * w + x) * 4;
      const alpha = pixels[index + 3];

      if (Math.random() * 255 < alpha) {
        points.push({
          x: x + (Math.random() - 0.5) * gap,
          y: y + (Math.random() - 0.5) * gap,
        });
      }
    }
  }

  return points;
}
