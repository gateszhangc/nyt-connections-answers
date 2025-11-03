const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  // 打开两个页面
  const page1 = await context.newPage();
  const page2 = await context.newPage();
  
  await page1.goto('https://connectionssolver.com/');
  await page2.goto('http://localhost:3000');
  
  console.log('✓ 两个网站已在浏览器中打开');
  console.log('\n=== 对比结果 ===\n');
  
  // 获取原网站信息
  const original = await page1.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.textContent,
    bodyHeight: document.body.scrollHeight,
    sections: Array.from(document.querySelectorAll('section')).map(s => ({
      id: s.id,
      height: s.scrollHeight
    }))
  }));
  
  // 获取本地网站信息
  const local = await page2.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.textContent,
    bodyHeight: document.body.scrollHeight,
    sections: Array.from(document.querySelectorAll('section')).map(s => ({
      id: s.id,
      height: s.scrollHeight
    }))
  }));
  
  console.log('页面标题:');
  console.log(`  原网站: ${original.title}`);
  console.log(`  本地站: ${local.title}`);
  console.log(`  ${original.title === local.title ? '✓ 一致' : '✗ 不一致'}\n`);
  
  console.log('主标题 (H1):');
  console.log(`  ${original.h1 === local.h1 ? '✓' : '✗'} ${original.h1}\n`);
  
  console.log('页面高度:');
  console.log(`  原网站: ${original.bodyHeight}px`);
  console.log(`  本地站: ${local.bodyHeight}px`);
  console.log(`  差异: ${Math.abs(original.bodyHeight - local.bodyHeight)}px (${((local.bodyHeight / original.bodyHeight - 1) * 100).toFixed(1)}%)\n`);
  
  console.log('Section 高度对比:');
  original.sections.forEach((origSec, i) => {
    const localSec = local.sections[i];
    if (localSec) {
      const diff = localSec.height - origSec.height;
      const pct = ((localSec.height / origSec.height - 1) * 100).toFixed(0);
      const status = Math.abs(diff) < 100 ? '✓' : '✗';
      console.log(`  ${status} ${origSec.id || `section-${i}`}: ${origSec.height}px → ${localSec.height}px (${pct > 0 ? '+' : ''}${pct}%)`);
    }
  });
  
  console.log('\n浏览器窗口保持打开，请手动对比视觉效果...');
  console.log('按 Ctrl+C 退出');
  
  // 保持打开
  await new Promise(() => {});
})();
