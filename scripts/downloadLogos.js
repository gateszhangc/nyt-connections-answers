const https = require('https');
const fs = require('fs');
const path = require('path');

const logos = [
  { url: 'https://connectionssolver.com/_next/static/media/logo3.00bee603.png', name: 'logo3.png' },
  { url: 'https://connectionssolver.com/_next/static/media/logo2.583292ec.png', name: 'logo2.png' }
];

const publicDir = path.join(__dirname, '..', 'public');

const downloadFile = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ 下载: ${path.basename(filepath)}`);
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
  console.log('开始下载 Logo 图片...\n');
  
  for (const logo of logos) {
    try {
      await downloadFile(logo.url, path.join(publicDir, logo.name));
    } catch (err) {
      console.log(`✗ 失败: ${logo.name} - ${err.message}`);
    }
  }
  
  console.log('\n✓ Logo 下载完成！');
})();
