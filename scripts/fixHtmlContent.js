const fs = require('fs');
const path = require('path');

// 读取原始 HTML
const originalHtml = fs.readFileSync('connectionssolver_home.html', 'utf8');

// 提取 body 内容，但移除所有 Next.js 特定的脚本和样式引用
const bodyMatch = originalHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
if (!bodyMatch) {
  console.log('✗ 无法找到 body 标签');
  process.exit(1);
}

let bodyContent = bodyMatch[1];

// 移除 Next.js 的脚本标签
bodyContent = bodyContent.replace(/<script[^>]*src="\/_next\/[^"]*"[^>]*><\/script>/g, '');
bodyContent = bodyContent.replace(/<script[^>]*>[\s\S]*?<\/script>/g, (match) => {
  // 保留主题切换脚本
  if (match.includes('localStorage.getItem')) {
    return match;
  }
  return '';
});

// 移除 Next.js 特定的元素
bodyContent = bodyContent.replace(/<next-route-announcer[^>]*>[\s\S]*?<\/next-route-announcer>/gi, '');

// 保存清理后的 body
fs.writeFileSync(path.join('data', 'home-body-clean.html'), bodyContent, 'utf8');
console.log('✓ 已保存清理后的 body 内容到 data/home-body-clean.html');

// 创建简化的 head 内容
const headContent = `<meta charSet="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Connections Solver: Best Tool for NYT Connections Game Solutions</title>
<meta name="description" content="Free online Connections Solver helps you master the NYT Connections answers puzzle game."/>
<link rel="icon" href="/favicon-180x180.png" type="image/png"/>`;

fs.writeFileSync(path.join('data', 'home-head-clean.html'), headContent, 'utf8');
console.log('✓ 已保存清理后的 head 内容到 data/home-head-clean.html');

console.log('\n现在请更新 app/layout.tsx 和 app/page.tsx 使用 *-clean.html 文件');
