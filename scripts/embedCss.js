const https = require('https');
const fs = require('fs');
const path = require('path');

const cssFiles = [
  '80cf67a7af72320f.css',
  'b4e3309dc7d52d68.css'
];

const downloadCss = (filename) => {
  return new Promise((resolve, reject) => {
    const url = `https://connectionssolver.com/_next/static/css/${filename}`;
    let data = '';
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.on('data', chunk => data += chunk);
        response.on('end', () => {
          console.log(`✓ 下载: ${filename} (${(data.length / 1024).toFixed(2)} KB)`);
          resolve(data);
        });
      } else {
        reject(new Error(`状态码: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

(async () => {
  console.log('开始下载并嵌入 CSS...\n');
  
  let allCss = '';
  for (const file of cssFiles) {
    try {
      const css = await downloadCss(file);
      allCss += css + '\n';
    } catch (err) {
      console.log(`✗ 失败: ${file} - ${err.message}`);
    }
  }
  
  // 读取现有的 head 内容
  const headPath = path.join(__dirname, '..', 'data', 'home-head.html');
  let headContent = fs.readFileSync(headPath, 'utf8');
  
  // 移除原有的 CSS link 标签
  headContent = headContent.replace(/<link rel="stylesheet"[^>]*href="\/_next\/static\/css\/[^"]*"[^>]*>/g, '');
  
  // 在 head 末尾添加内联 CSS
  const styleTag = `<style>${allCss}</style>`;
  headContent = headContent + styleTag;
  
  // 保存
  fs.writeFileSync(headPath, headContent, 'utf8');
  
  console.log(`\n✓ CSS 已嵌入到 data/home-head.html`);
  console.log(`总大小: ${(allCss.length / 1024).toFixed(2)} KB`);
})();
