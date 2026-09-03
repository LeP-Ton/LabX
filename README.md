# LabX 独立 AI 实验室

LabX 是一个独立 AI 实验室，研究并构建 AI 在游戏、声音、叙事、视觉、影像与数字人格中的应用。`Game`、`Music`、`Book`、`Art`、`Movie` 与 `Life` 是实验室的应用领域；项目使用 GitHub 保存版本和跨领域关系，并以“探索和重构一切”为品牌口号。

## 技术栈

- Next.js App Router、React、TypeScript
- Tailwind CSS 与 CSS 变量设计令牌
- MDX、gray-matter 与 Zod 内容校验
- Vitest、Testing Library 与 Playwright
- GitHub Actions 与 GitHub Pages 静态部署

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

作品保存在 `content/`，详细字段、关联关系和发布流程参见 [内容编写指南](docs/content-authoring.md)。生产环境仅展示 `published` 内容，本地开发可以查看草稿。

## 环境与部署

公开站点：[lep-ton.github.io/LabX](https://lep-ton.github.io/LabX/)。公开仓库：[github.com/LeP-Ton/LabX](https://github.com/LeP-Ton/LabX)。

推送 `main` 后，`.github/workflows/pages.yml` 会校验项目、生成 `out/` 静态站点并自动发布到 GitHub Pages。工作流从 GitHub Pages 读取正式站点地址和 `/LabX` 子路径；本地开发保持根路径，不需要手动修改链接。

自定义部署环境需要设置 `NEXT_PUBLIC_SITE_URL` 为完整公开站点地址；只有部署在子路径下时才设置 `NEXT_PUBLIC_BASE_PATH`。

当前项目不包含后台 CMS、数据库、用户账户、站内支付、评论或媒体上传。
