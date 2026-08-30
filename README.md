# LabX 独立 AI 实验室

LabX 是一个独立 AI 实验室，研究并构建 AI 在游戏、声音、叙事、视觉、影像与数字人格中的应用。`Game`、`Music`、`Book`、`Art`、`Movie` 与 `Life` 是实验室的应用领域；项目使用 GitHub 保存版本和跨领域关系，并以“探索和重构一切”为品牌口号。

## 技术栈

- Next.js App Router、React、TypeScript
- Tailwind CSS 与 CSS 变量设计令牌
- MDX、gray-matter 与 Zod 内容校验
- Vitest、Testing Library 与 Playwright
- Vercel Analytics 与 Vercel 部署

## 开始开发

```bash
pnpm install
pnpm dev
```

浏览器访问 `http://localhost:3000`。

## 质量检查

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

## 内容管理

作品保存在 `content/`，详细字段、关联关系和发布流程参见 [内容编写指南](docs/content-authoring.md)。生产环境仅展示 `published` 内容，Vercel 预览环境和本地开发可以查看草稿。

## 环境与部署

公开仓库：[github.com/LeP-Ton/LabX](https://github.com/LeP-Ton/LabX)。复制 `.env.example` 并将 `NEXT_PUBLIC_SITE_URL` 设置为可信的正式域名。Vercel 项目连接 GitHub 仓库后，将 `main` 配置为生产分支，其他分支用于预览。

当前项目不包含后台 CMS、数据库、用户账户、站内支付、评论或媒体上传。
