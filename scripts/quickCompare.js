const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  // 打开原网站
  const page1 = await context.newPage();
  await page1.goto('https://connectionssolver.com');
  console.log('✓ 原网站已打开');
  
  // 打开本地网站
  const page2 = await context.newPage();
  await page2.goto('http://localhost:3000');
  console.log('✓ 本地网站已打开');
  
  // 获取页面标题
  const title1 = await page1.title();
  const title2 = await page2.title();
  console.log('\n页面标题对比:');
  console.log('原网站:', title1);
  console.log('本地网站:', title2);
  console.log('标题匹配:', title1 === title2 ? '✓' : '✗');
  
  // 获取主要元素
  const checkElement = async (page, selector, name) => {
    try {
      const element = await page.$(selector);
      return element !== null;
    } catch {
      return false;
    }
  };
  
  console.log('\n关键元素检查:');
  const selectors = [
    ['header', '页头'],
    ['h1', '主标题'],
    ['.custom-container', '主容器'],
    ['img[alt*="logo"]', 'Logo'],
    ['a[href="/connections-answers-today"]', '答案链接']
  ];
  
  for (const [selector, name] of selectors) {
    const exists1 = await checkElement(page1, selector, name);
    const exists2 = await checkElement(page2, selector, name);
    console.log(`${name}: 原网站=${exists1 ? '✓' : '✗'} 本地=${exists2 ? '✓' : '✗'}`);
  }
  
  console.log('\n浏览器窗口保持打开，请手动对比...');
  console.log('按 Ctrl+C 关闭');
  
  // 保持打开
  await new Promise(() => {});
})();
