const fs = require('fs');
const path = require('path');

// 读取 body HTML
const bodyPath = path.join(__dirname, '..', 'data', 'home-body.html');
let bodyContent = fs.readFileSync(bodyPath, 'utf8');

// 替换图片路径 - 需要替换 URL 编码的版本
const replacements = [
  {
    from: '%2F_next%2Fstatic%2Fmedia%2Flogo3.00bee603.png',
    to: '%2Flogo3.png'
  },
  {
    from: '%2F_next%2Fstatic%2Fmedia%2Flogo2.583292ec.png',
    to: '%2Flogo2.png'
  },
  {
    from: '/_next/static/media/logo3.00bee603.png',
    to: '/logo3.png'
  },
  {
    from: '/_next/static/media/logo2.583292ec.png',
    to: '/logo2.png'
  }
];

let changeCount = 0;
replacements.forEach(({ from, to }) => {
  const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matches = bodyContent.match(regex);
  if (matches) {
    bodyContent = bodyContent.replace(regex, to);
    changeCount += matches.length;
    console.log(`✓ 替换 ${from} → ${to} (${matches.length} 处)`);
  }
});

// 保存
fs.writeFileSync(bodyPath, bodyContent, 'utf8');

console.log(`\n✓ 完成！共替换 ${changeCount} 处图片路径`);
