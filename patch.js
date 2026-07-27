const fs = require('fs');
const file = 'src/hooks/text/useTextParticles.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/canvas\.width = width;/g, 'const w = Math.floor(width);\n  const h = Math.floor(height);\n  canvas.width = w;');
code = code.replace(/canvas\.height = height;/g, 'canvas.height = h;');
code = code.replace(/ctx\.clearRect\(0, 0, width, height\);/g, 'ctx.clearRect(0, 0, w, h);');
code = code.replace(/let fontSize = Math\.min\(width, height\) \* 0\.65;/g, 'let fontSize = Math.min(w, h) * 0.65;');
code = code.replace(/if \(textMetrics\.width > width \* 0\.9\) {/g, 'if (textMetrics.width > w * 0.9) {');
code = code.replace(/fontSize = fontSize \* \(width \* 0\.9\) \/ textMetrics\.width;/g, 'fontSize = fontSize * (w * 0.9) / textMetrics.width;');
code = code.replace(/ctx\.fillText\(text, width \/ 2, height \/ 2\.05\);/g, 'ctx.fillText(text, w / 2, h / 2.05);');
code = code.replace(/const imageData = ctx\.getImageData\(0, 0, width, height\);/g, 'const imageData = ctx.getImageData(0, 0, w, h);');
code = code.replace(/for \(let y = 0; y < height; y \+= gap\) {/g, 'for (let y = 0; y < h; y += gap) {');
code = code.replace(/for \(let x = 0; x < width; x \+= gap\) {/g, 'for (let x = 0; x < w; x += gap) {');
code = code.replace(/const index = \(y \* width \+ x\) \* 4;/g, 'const index = (y * w + x) * 4;');

fs.writeFileSync(file, code);
