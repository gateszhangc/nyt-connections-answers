const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const downloadFile = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
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

const assets = [
  { url: 'https://connectionssolver.com/favicon-180x180.png', path: 'favicon-180x180.png' },
  { url: 'https://connectionssolver.com/Connections-Hints.png', path: 'Connections-Hints.png' }
];

(async () => {
  console.log('开始下载静态资源...\n');
  
  for (const asset of assets) {
    try {
      await downloadFile(asset.url, path.join(publicDir, asset.path));
    } catch (err) {
      console.log(`✗ 失败: ${asset.path} - ${err.message}`);
    }
  }
  
  console.log('\n下载完成！');
})();
