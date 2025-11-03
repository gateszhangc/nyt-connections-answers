const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const screenshotsDir = path.join(__dirname, '..', 'screenshots');
const img1 = PNG.sync.read(fs.readFileSync(path.join(screenshotsDir, 'original.png')));
const img2 = PNG.sync.read(fs.readFileSync(path.join(screenshotsDir, 'clone.png')));

console.log('原网站尺寸:', img1.width, 'x', img1.height);
console.log('本地网站尺寸:', img2.width, 'x', img2.height);

if (img1.width === img2.width && img1.height === img2.height) {
  console.log('✓ 尺寸完全一致');
  
  // 简单像素对比
  let diffPixels = 0;
  for (let i = 0; i < img1.data.length; i += 4) {
    const r1 = img1.data[i];
    const g1 = img1.data[i + 1];
    const b1 = img1.data[i + 2];
    const r2 = img2.data[i];
    const g2 = img2.data[i + 1];
    const b2 = img2.data[i + 2];
    
    const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
    if (diff > 30) {
      diffPixels++;
    }
  }
  
  const totalPixels = img1.width * img1.height;
  const similarity = ((totalPixels - diffPixels) / totalPixels * 100).toFixed(2);
  
  console.log('相似度:', similarity + '%');
  console.log('差异像素:', diffPixels, '/', totalPixels);
  
  if (similarity > 99) {
    console.log('✓ 网站几乎完全一致！');
  } else if (similarity > 95) {
    console.log('⚠ 网站非常相似，有少量差异');
  } else {
    console.log('✗ 网站存在明显差异');
  }
} else {
  console.log('✗ 尺寸不一致，页面内容可能有差异');
}
