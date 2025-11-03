# 快速开始指南

这是一个用于学习研究的 connectionssolver.com 网站复刻项目。

## 快速启动

### 1. 安装依赖

```bash
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 3. 生产构建

```bash
npm run build
npm run start
```

## 项目说明

这个项目使用 Next.js 框架，通过以下方式复刻原网站：

1. **数据提取**：从 connectionssolver.com 下载 HTML 并提取 head 和 body 部分
2. **渲染方式**：使用 `dangerouslySetInnerHTML` 直接渲染原始 HTML
3. **样式保留**：保留原网站的所有 CSS 和样式

## 文件结构

```
├── app/
│   ├── layout.tsx      # 注入 head 内容
│   ├── page.tsx        # 渲染 body 内容
│   └── globals.css     # 基础样式
├── data/
│   ├── home-head.html  # 提取的 head 内容
│   └── home-body.html  # 提取的 body 内容
├── scripts/
│   ├── extractHtml.js           # 提取 HTML 脚本
│   ├── updateOriginalHtml.js    # 生成完整 HTML
│   ├── captureScreenshots.js    # 截图对比
│   ├── compareScreenshots.js    # 像素对比
│   └── analyzeRawDiff.js        # 差异分析
└── public/
    └── original.html    # 原始 HTML 快照
```

## 高级功能

### 更新网站内容

如果原网站更新了，可以重新同步：

```powershell
# 下载最新内容
(Invoke-WebRequest -Uri https://connectionssolver.com -UseBasicParsing).Content | Out-File connectionssolver_home.html -Encoding utf8

# 提取并更新
node scripts/extractHtml.js
node scripts/updateOriginalHtml.js
```

### 截图对比（可选）

需要先安装额外的工具：

```bash
npm install -D playwright pixelmatch pngjs
npx playwright install chromium
```

然后运行对比：

```bash
# 启动服务器
npm run start

# 在另一个终端运行
node scripts/captureScreenshots.js
node scripts/compareScreenshots.js
```

## 注意事项

- 此项目仅用于学习研究目的
- 原网站的动态功能（如 AI 助手）需要额外的后端支持
- 某些外部资源可能无法加载（如 Google Analytics）
