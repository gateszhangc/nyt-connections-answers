const https = require('https');
const fs = require('fs');
const path = require('path');

const cssFiles = [
  '80cf67a7af72320f.css',
  'b4e3309dc7d52d68.css'
];

const publicDir = path.join(__dirname, '..', 'public', '_next', 'static', 'css');
fs.mkdirSync(publicDir, { recursive: true });

const downloadFile = (filename) => {
  return new Promise((resolve, reject) => {
    const url = `https://connectionssolver.com/_next/static/css/${filename}`;
    const filepath = path.join(publicDir, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ 下载: ${filename}`);
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`状态码: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

(async () => {
  console.log('开始下载 CSS 文件...\n');
  
  for (const file of cssFiles) {
    try {
      await downloadFile(file);
    } catch (err) {
      console.log(`✗ 失败: ${file} - ${err.message}`);
    }
  }
  
  console.log('\n✓ CSS 文件下载完成！');
})();
