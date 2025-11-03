const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default || require('pixelmatch');

const screenshotsDir = path.join(__dirname, '..', 'screenshots');
const img1 = PNG.sync.read(fs.readFileSync(path.join(screenshotsDir, 'original.png')));
const img2 = PNG.sync.read(fs.readFileSync(path.join(screenshotsDir, 'clone.png')));

const { width, height } = img1;
const diff = new PNG({ width, height });

const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
  threshold: 0.1
});

fs.writeFileSync(path.join(screenshotsDir, 'diff.png'), PNG.sync.write(diff));

const totalPixels = width * height;
const diffPercentage = ((numDiffPixels / totalPixels) * 100).toFixed(2);

console.log(`Differing pixels: ${numDiffPixels} (${diffPercentage}%)`);
console.log(`Total pixels: ${totalPixels}`);
console.log(`Diff image saved to screenshots/diff.png`);
