const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: false
  });

  // Capture original site
  const page1 = await context.newPage();
  await page1.goto('https://connectionssolver.com', { waitUntil: 'networkidle' });
  await page1.screenshot({ path: path.join(screenshotsDir, 'original.png'), fullPage: true });
  console.log('Captured original site screenshot');

  // Capture clone
  const page2 = await context.newPage();
  await page2.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page2.screenshot({ path: path.join(screenshotsDir, 'clone.png'), fullPage: true });
  console.log('Captured clone screenshot');

  await browser.close();
})();
