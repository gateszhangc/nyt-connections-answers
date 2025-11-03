const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  console.log('正在分析两个网站...\n');

  // 原网站
  const page1 = await context.newPage();
  await page1.goto('https://connectionssolver.com', { waitUntil: 'networkidle' });
  
  const original = {
    title: await page1.title(),
    h1: await page1.textContent('h1').catch(() => null),
    bodyHeight: await page1.evaluate(() => document.body.scrollHeight),
    headerExists: await page1.$('header') !== null,
    mainExists: await page1.$('main') !== null,
    images: await page1.$$eval('img', imgs => imgs.length),
    links: await page1.$$eval('a', links => links.length)
  };

  // 本地网站
  const page2 = await context.newPage();
  await page2.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const local = {
    title: await page2.title(),
    h1: await page2.textContent('h1').catch(() => null),
    bodyHeight: await page2.evaluate(() => document.body.scrollHeight),
    headerExists: await page2.$('header') !== null,
    mainExists: await page2.$('main') !== null,
    images: await page2.$$eval('img', imgs => imgs.length),
    links: await page2.$$eval('a', links => links.length)
  };

  console.log('=== 对比结果 ===\n');
  
  console.log('页面标题:');
  console.log(`  原网站: ${original.title}`);
  console.log(`  本地站: ${local.title}`);
  console.log(`  ${original.title === local.title ? '✓ 一致' : '✗ 不一致'}\n`);
  
  console.log('主标题 (H1):');
  console.log(`  原网站: ${original.h1}`);
  console.log(`  本地站: ${local.h1}`);
  console.log(`  ${original.h1 === local.h1 ? '✓ 一致' : '✗ 不一致'}\n`);
  
  console.log('页面高度:');
  console.log(`  原网站: ${original.bodyHeight}px`);
  console.log(`  本地站: ${local.bodyHeight}px`);
  console.log(`  差异: ${Math.abs(original.bodyHeight - local.bodyHeight)}px\n`);
  
  console.log('结构元素:');
  console.log(`  Header: 原=${original.headerExists ? '✓' : '✗'} 本地=${local.headerExists ? '✓' : '✗'}`);
  console.log(`  Main: 原=${original.mainExists ? '✓' : '✗'} 本地=${local.mainExists ? '✓' : '✗'}\n`);
  
  console.log('内容统计:');
  console.log(`  图片数量: 原=${original.images} 本地=${local.images}`);
  console.log(`  链接数量: 原=${original.links} 本地=${local.links}\n`);
  
  // 截图对比
  await page1.screenshot({ path: path.join(__dirname, '..', 'screenshots', 'original-full.png'), fullPage: true });
  await page2.screenshot({ path: path.join(__dirname, '..', 'screenshots', 'local-full.png'), fullPage: true });
  
  console.log('完整截图已保存到 screenshots/ 目录');
  
  await browser.close();
})();
