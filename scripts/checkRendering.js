const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // 检查是否有重复的元素
  const headerCount = await page.$$eval('header', els => els.length);
  const mainCount = await page.$$eval('main', els => els.length);
  const h1Count = await page.$$eval('h1', els => els.length);
  
  console.log('元素统计:');
  console.log('  Header 数量:', headerCount);
  console.log('  Main 数量:', mainCount);
  console.log('  H1 数量:', h1Count);
  
  // 检查 body 的直接子元素
  const bodyChildren = await page.evaluate(() => {
    return Array.from(document.body.children).map(el => ({
      tag: el.tagName,
      classes: el.className,
      height: el.scrollHeight
    }));
  });
  
  console.log('\nBody 直接子元素:');
  bodyChildren.forEach((child, i) => {
    console.log(`  ${i + 1}. <${child.tag}> class="${child.classes}" height=${child.height}px`);
  });
  
  // 获取页面 HTML 的前 1000 个字符
  const html = await page.content();
  console.log('\n页面 HTML 长度:', html.length, '字符');
  
  await browser.close();
})();
