# NYT Connections Solver Clone

这是一个用于学习研究目的的 connectionssolver.com 网站复刻项目。

## 项目结构

- `data/` - 存储从原网站提取的 HTML 片段
- `app/` - Next.js 应用代码
- `scripts/` - 用于同步和验证的脚本
- `public/` - 静态资源和原始 HTML 快照
- `screenshots/` - 截图对比文件

## 安装依赖

```bash
npm install
npm install -D playwright pixelmatch pngjs
npx playwright install chromium
```

## 使用步骤

### 1. 同步最新的网站内容

```powershell
# 下载最新 HTML
(Invoke-WebRequest -Uri https://connectionssolver.com -UseBasicParsing).Content | Out-File connectionssolver_home.html -Encoding utf8

# 提取 head 和 body
node scripts/extractHtml.js

# 生成静态快照
node scripts/updateOriginalHtml.js
```

### 2. 构建和运行

```bash
# 开发模式
npm run dev

# 生产构建
npm run build
npm run start
```

### 3. 截图对比（可选）

```bash
# 确保本地服务器运行在 localhost:3000
npm run start

# 在另一个终端运行截图脚本
node scripts/captureScreenshots.js

# 对比截图
node scripts/compareScreenshots.js

# 分析差异区域
node scripts/analyzeRawDiff.js
```

## 注意事项

- 此项目仅用于学习研究目的
- 原网站可能包含动态内容和第三方资源，因此会有一些差异
- 截图对比时禁用了 JavaScript 以减少动态内容的影响
