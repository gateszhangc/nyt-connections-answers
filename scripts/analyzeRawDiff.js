const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;

const screenshotsDir = path.join(__dirname, '..', 'screenshots');
const diff = PNG.sync.read(fs.readFileSync(path.join(screenshotsDir, 'diff.png')));

let minX = diff.width, minY = diff.height, maxX = 0, maxY = 0;

for (let y = 0; y < diff.height; y++) {
  for (let x = 0; x < diff.width; x++) {
    const idx = (diff.width * y + x) << 2;
    const r = diff.data[idx];
    if (r > 0) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log(`Bounding box of differences:`);
console.log(`  Top-left: (${minX}, ${minY})`);
console.log(`  Bottom-right: (${maxX}, ${maxY})`);
console.log(`  Width: ${maxX - minX + 1}px`);
console.log(`  Height: ${maxY - minY + 1}px`);
