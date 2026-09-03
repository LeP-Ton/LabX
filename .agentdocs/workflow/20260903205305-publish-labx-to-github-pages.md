# 发布 LabX 到 GitHub Pages

## 背景与目标

- 将 LabX 当前完整 MVP 发布到 GitHub Pages，形成无需本地环境即可访问的公开站点。
- 保留 Next.js App Router 与本地开发方式，通过 GitHub Pages 专用环境变量启用静态导出。
- 让每次推送 `main` 都经过代码检查、类型检查、测试与构建后自动发布。
- 参考 Next.js 静态导出与 GitHub Pages 自定义 Actions 工作流的官方实现要求。

## 约束与原则

- GitHub Pages 项目站部署在 `/LabX` 子路径，所有 Next.js 资源、public 资源、站内链接与公开元数据都必须保留该前缀。
- 本地开发和普通 Next.js 构建继续使用根路径，避免影响现有开发与未来可选的 Vercel 部署。
- 不把 `out/` 构建产物提交到 Git；由 GitHub Actions 生成并作为 Pages artifact 发布。
- Pages 线上环境不启用 Vercel Analytics，隐私页必须如实说明当前统计状态。
- 不添加依赖、数据库、账户或动态服务器能力。

## 阶段与 TODO

- [x] 审查 App Router、动态路由与 metadata 路由的静态导出兼容性。
- [x] 增加 GitHub Pages 条件式静态导出与尾斜线目录结构。
- [x] 修复 X SVG 遮罩在 `/LabX` 子路径下的资源地址。
- [x] 统一 Canonical、Open Graph、robots 与 sitemap 的公开 URL 生成。
- [x] 新增 GitHub Pages 构建和部署工作流。
- [x] 补充 URL、静态导出、工作流与 X 图标回归测试。
- [x] 同步 README、隐私说明、项目认知与文档索引。
- [x] 完成本地普通构建和 Pages 模式静态构建。
- [x] 恢复 GitHub CLI 授权并启用 Pages。
- [x] 推送 `main`、等待部署成功并验证公开网址。

## 当前进展

- 普通开发/构建模式与 GitHub Pages 静态导出模式均已通过。
- Pages 构建输出 33 个静态页面；根页、404、About、Privacy、六领域、十八个详情、robots、sitemap、favicon、OG 图和 X SVG 均存在。
- 导出文件未发现 `localhost:3000`、丢失 `/LabX` 的公开页面 URL 或错误的 X SVG 根路径。
- Sitemap 包含 27 个公开内容 URL，robots 指向 `https://lep-ton.github.io/LabX/sitemap.xml`。
- GitHub CLI 已重新授权为 `LeP-Ton`，仓库 Pages 已创建并使用 GitHub Actions 工作流作为发布源。
- 发布提交 `9e2d1dc` 与后续 E2E 修复提交 `dfad166` 已推送到 `main`。
- GitHub Pages 工作流 `33759904311` 与质量检查工作流 `33759904364` 均已成功完成。
- `https://lep-ton.github.io/LabX/`、代表性详情页、X SVG、robots 与 sitemap 均通过公网 HTTP 200 验证。

## 关键风险

- GitHub Pages 只提供静态文件服务；未来引入 Cookie、Server Actions、请求时动态路由或默认图片优化时，需要重新评估部署平台。
- `NEXT_PUBLIC_SITE_URL` 必须是包含 `/LabX` 的完整 Pages 地址，`NEXT_PUBLIC_BASE_PATH` 必须与 Pages 返回的项目子路径一致。
- 项目站的 `robots.txt` 位于 `/LabX/robots.txt`，无法替代 GitHub 用户根域的 `/robots.txt`；搜索平台应直接提交项目 Sitemap。
- GitHub Pages 首次发布可能受 Actions 排队与 CDN（内容分发网络）缓存影响，需在工作流结束后再次请求正式网址确认。

## 代码变更

```diff
diff --git a/.agentdocs/index.md b/.agentdocs/index.md
index dec7d13..ef26d6b 100644
--- a/.agentdocs/index.md
+++ b/.agentdocs/index.md
@@ -6,6 +6,7 @@

 ## 当前变更文档

+`workflow/20260903205305-publish-labx-to-github-pages.md` - 为 Next.js 增加条件式静态导出、GitHub Pages 子路径与 SEO 适配，并通过 GitHub Actions 自动发布公开站点；维护 Pages 部署、公开 URL 或静态资源路径时优先读取。
 `workflow/20260830231331-expand-demo-content-across-fields.md` - 为六个应用领域各补充两个结构化占位项目，使首页每个领域都能展示完整的三项目布局；继续维护演示项目、跨领域关系或首页项目密度时读取。
 `workflow/20260830225038-refactor-homepage-into-anchored-ai-fields.md` - 将首页重构为六个应用领域锚点分区，把品牌口号移入 Header，并按领域展示叙事与项目预览；继续调整首页信息架构、锚点导航或移动端 Header 时读取。
 `workflow/20260830215124-publish-independent-ai-lab-first-version.md` - 将 LabX 的公开定位统一为独立 AI 实验室，把六模块表达为 AI 应用领域，并创建公开 GitHub 仓库首版；维护品牌定位、公开元数据或 GitHub 发布流程时读取。
@@ -29,12 +30,13 @@
 - `Life` 面向数字永生，通过人格、记忆和行为特征丰富虚拟世界中的 NPC 个性。
 - 内容通过哔哩哔哩、抖音、小红书等媒体传播，并引导用户消费与转化。
 - 品牌口号为“探索和重构一切”，采用可切换的黑白色极简主题。
-- 前端采用 Next.js、React、TypeScript、Tailwind CSS，内容采用 MDX + Zod，包管理器使用 pnpm，部署目标为 Vercel。
+- 前端采用 Next.js、React、TypeScript、Tailwind CSS，内容采用 MDX + Zod，包管理器使用 pnpm；当前公开环境为 GitHub Pages，Vercel 保留为后续可选平台。
 - 实验室网站 MVP 已完成：六个应用领域均有演示项目，内容详情与跨领域关联可用，黑白主题、SEO、匿名外链事件和隐私说明已经接入。
 - 依赖与锁文件已经生成；格式、Lint、类型、单元/组件测试、生产构建、端到端测试及 Lighthouse 审计均已通过。
 - 中英文展示排版已经拆分：中文使用独立 CJK 字体栈与安全字距/行高，英文仅保留轻微紧凑效果。
 - X-icon 已成为全站核心视觉符号，通过 CSS 遮罩应用于页头、Hero、模块、作品、编辑页与页脚，并同步更新 favicon 和社交分享图。
 - X-icon 的白黑透明 WebP/GIF 刀划开动画已同步到 `public/x-x-x20/outputs/`，当前仅作为品牌资产入库，尚未接入页面组件。
-- GitHub 公开仓库为 `https://github.com/LeP-Ton/LabX`，`main` 已发布并跟踪 `origin/main`，GitHub Actions 质量检查已通过；Vercel 尚未绑定。
+- GitHub 公开仓库为 `https://github.com/LeP-Ton/LabX`，公开站点为 `https://lep-ton.github.io/LabX/`；`main` 推送后由 GitHub Actions 完成质量检查与 Pages 静态发布。
+- GitHub Pages 构建通过 `NEXT_PUBLIC_SITE_URL` 和 `NEXT_PUBLIC_BASE_PATH` 适配 `/LabX` 项目子路径；本地开发和普通构建继续使用根路径。
 - Header 在 `LABX` 下方显示“探索和重构一切”，六领域菜单统一跳转首页 `#game` 至 `#life` 锚点；首页六段均采用左侧研究叙事、右侧最多三个项目预览的结构。
 - 六个应用领域现各有三个已发布演示项目，共十八项；新增条目使用占位入口并通过稳定 ID 建立跨领域关联，`Life` 条目均为明确标注的虚构人格。
diff --git a/.env.example b/.env.example
index eea403e..4d19c86 100644
--- a/.env.example
+++ b/.env.example
@@ -1,2 +1,5 @@
-# 生产环境请设置为实验室网站的可信公开域名，例如 https://labx.example.com
+# 完整公开站点地址；GitHub Pages 工作流会自动注入 https://lep-ton.github.io/LabX
 NEXT_PUBLIC_SITE_URL=http://localhost:3000
+
+# 部署到项目子路径时使用；本地开发与独立域名保持为空
+NEXT_PUBLIC_BASE_PATH=
diff --git a/AGENTS.md b/AGENTS.md
index c0b000d..86c1c88 100644
--- a/AGENTS.md
+++ b/AGENTS.md
@@ -6,7 +6,7 @@
 - 产品形态：独立 AI 实验室及其公开项目入口。
 - 核心目标：研究并构建 AI 在游戏、声音、叙事、视觉、影像与数字人格中的应用，通过 GitHub 保存、组织、关联和持续管理实验项目。
 - 传播路径：通过哔哩哔哩（B站）、抖音、小红书等媒体发布和传播实验内容，将受众引导至 LabX，并形成项目关注与内容转化。
-- 当前阶段：实验室网站 MVP 已完成，实现内容发布、跨模块关联、主题切换、SEO、匿名转化分析与自动化测试。
+- 当前阶段：实验室网站 MVP 已完成并通过 GitHub Pages 公开发布，实现内容发布、跨模块关联、主题切换、SEO、匿名转化事件适配与自动化测试。

 ## 品牌与视觉

@@ -36,11 +36,12 @@
 - 内容管理：GitHub 仓库中的 MDX 与结构化元数据，使用 Zod 在构建期校验。
 - 包管理器：pnpm。
 - 测试体系：Vitest、Testing Library 与 Playwright。
-- 部署平台：Vercel；`main` 分支用于生产发布，其他分支用于预览。
+- 部署平台：GitHub Pages 为当前公开环境，`main` 分支通过 GitHub Actions 自动发布；Vercel 保留为后续可选部署平台。
 - 逻辑架构：以 LabX 独立 AI 实验室网站为统一入口，以 `Game`、`Music`、`Book`、`Art`、`Movie`、`Life` 为应用领域，以 GitHub 仓库作为实验项目的工程化保存和管理载体。
 - 数据与内容模型应显式表达内容来源、版本、作者、所属应用领域、跨领域依赖和复用关系。
 - 音乐、视频、模型等大文件不直接进入 Git 仓库，仓库仅保存元数据、轻量资源与 HTTPS 外链。
 - 生产环境仅发布 `published` 内容；草稿允许在本地开发和 Vercel 预览环境中验证。
+- GitHub Pages 构建使用 Next.js 静态导出，并通过部署环境注入正式站点地址与 `/LabX` 子路径；本地开发仍运行在根路径。
 - `Life` 内容必须使用虚构人格或获得明确授权的数据，不得提交真实个人的敏感信息。

 ## 运行方式
@@ -52,7 +53,7 @@
 - 生产构建：`pnpm build`。
 - 本地生产预览：`pnpm start`（需先执行 `pnpm build`）。
 - 全量验收：`pnpm format:check`、`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm build` 与 `pnpm test:e2e`。
-- GitHub 公开仓库为 `https://github.com/LeP-Ton/LabX`，当前工作区已配置 `origin`；Vercel 尚未绑定，发布时需连接该仓库并将 `main` 配置为生产分支。
+- GitHub 公开仓库为 `https://github.com/LeP-Ton/LabX`，公开站点为 `https://lep-ton.github.io/LabX/`；当前工作区已配置 `origin`，推送 `main` 会触发质量检查和 GitHub Pages 发布。

 ## 协作与文档约定

diff --git a/README.md b/README.md
index 20b4940..6b93aa2 100644
--- a/README.md
+++ b/README.md
@@ -8,7 +8,7 @@ LabX 是一个独立 AI 实验室，研究并构建 AI 在游戏、声音、叙
 - Tailwind CSS 与 CSS 变量设计令牌
 - MDX、gray-matter 与 Zod 内容校验
 - Vitest、Testing Library 与 Playwright
-- Vercel Analytics 与 Vercel 部署
+- GitHub Actions 与 GitHub Pages 静态部署

 ## 开始开发

@@ -31,10 +31,14 @@ pnpm test:e2e

 ## 内容管理

-作品保存在 `content/`，详细字段、关联关系和发布流程参见 [内容编写指南](docs/content-authoring.md)。生产环境仅展示 `published` 内容，Vercel 预览环境和本地开发可以查看草稿。
+作品保存在 `content/`，详细字段、关联关系和发布流程参见 [内容编写指南](docs/content-authoring.md)。生产环境仅展示 `published` 内容，本地开发可以查看草稿。

 ## 环境与部署

-公开仓库：[github.com/LeP-Ton/LabX](https://github.com/LeP-Ton/LabX)。复制 `.env.example` 并将 `NEXT_PUBLIC_SITE_URL` 设置为可信的正式域名。Vercel 项目连接 GitHub 仓库后，将 `main` 配置为生产分支，其他分支用于预览。
+公开站点：[lep-ton.github.io/LabX](https://lep-ton.github.io/LabX/)。公开仓库：[github.com/LeP-Ton/LabX](https://github.com/LeP-Ton/LabX)。
+
+推送 `main` 后，`.github/workflows/pages.yml` 会校验项目、生成 `out/` 静态站点并自动发布到 GitHub Pages。工作流从 GitHub Pages 读取正式站点地址和 `/LabX` 子路径；本地开发保持根路径，不需要手动修改链接。
+
+自定义部署环境需要设置 `NEXT_PUBLIC_SITE_URL` 为完整公开站点地址；只有部署在子路径下时才设置 `NEXT_PUBLIC_BASE_PATH`。

 当前项目不包含后台 CMS、数据库、用户账户、站内支付、评论或媒体上传。
diff --git a/app/[module]/[slug]/page.tsx b/app/[module]/[slug]/page.tsx
index 0c8a71d..a9361a5 100644
--- a/app/[module]/[slug]/page.tsx
+++ b/app/[module]/[slug]/page.tsx
@@ -14,6 +14,7 @@ import {
   loadWorks,
 } from "@/lib/content/repository";
 import {
+  absoluteUrl,
   contentTypes,
   modules,
   siteConfig,
@@ -43,7 +44,7 @@ export async function generateMetadata({
   const work = getWorkByRoute(module, slug);
   if (!work) return { title: "作品不存在" };

-  const url = `/${work.type}/${work.slug}`;
+  const url = absoluteUrl(`/${work.type}/${work.slug}/`);
   return {
     title: work.title,
     description: work.summary,
diff --git a/app/[module]/page.tsx b/app/[module]/page.tsx
index e33b7ab..504c786 100644
--- a/app/[module]/page.tsx
+++ b/app/[module]/page.tsx
@@ -6,9 +6,11 @@ import { WorkCard } from "@/components/work-card";
 import { XMark } from "@/components/x-mark";
 import { getWorksByType } from "@/lib/content/repository";
 import {
+  absoluteUrl,
   contentTypes,
   modules,
   siteConfig,
+  socialPreviewImage,
   type ContentType,
 } from "@/lib/site";

@@ -37,11 +39,18 @@ export async function generateMetadata({
   return {
     title,
     description: definition.description,
-    alternates: { canonical: `/${definition.type}` },
+    alternates: { canonical: absoluteUrl(`/${definition.type}/`) },
     openGraph: {
       title: `${title} — ${siteConfig.name}`,
       description: definition.description,
-      url: `/${definition.type}`,
+      url: absoluteUrl(`/${definition.type}/`),
+      images: [socialPreviewImage],
+    },
+    twitter: {
+      card: "summary_large_image",
+      title: `${title} — ${siteConfig.name}`,
+      description: definition.description,
+      images: [socialPreviewImage.url],
     },
   };
 }
diff --git a/app/about/page.tsx b/app/about/page.tsx
index c7de15f..39a8ba5 100644
--- a/app/about/page.tsx
+++ b/app/about/page.tsx
@@ -2,12 +2,29 @@ import type { Metadata } from "next";

 import { SiteFooter } from "@/components/site-footer";
 import { XMark } from "@/components/x-mark";
-import { modules } from "@/lib/site";
+import {
+  absoluteUrl,
+  modules,
+  siteConfig,
+  socialPreviewImage,
+} from "@/lib/site";

 export const metadata: Metadata = {
   title: "关于 LabX",
   description: "了解 LabX 作为独立 AI 实验室的研究方向、项目方法与数据边界。",
-  alternates: { canonical: "/about" },
+  alternates: { canonical: absoluteUrl("/about/") },
+  openGraph: {
+    title: `关于 LabX — ${siteConfig.name}`,
+    description: "了解 LabX 作为独立 AI 实验室的研究方向、项目方法与数据边界。",
+    url: absoluteUrl("/about/"),
+    images: [socialPreviewImage],
+  },
+  twitter: {
+    card: "summary_large_image",
+    title: `关于 LabX — ${siteConfig.name}`,
+    description: "了解 LabX 作为独立 AI 实验室的研究方向、项目方法与数据边界。",
+    images: [socialPreviewImage.url],
+  },
 };

 export default function AboutPage() {
diff --git a/app/favicon.ico/route.ts b/app/favicon.ico/route.ts
index 934f08c..1ea7fc1 100644
--- a/app/favicon.ico/route.ts
+++ b/app/favicon.ico/route.ts
@@ -3,6 +3,8 @@ const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254"
   <polygon points="310,310 627,525 1052,202 729,627 944,944 627,729 202,1052 525,627" fill="#f4f3ef"/>
 </svg>`;

+export const dynamic = "force-static";
+
 /** 为仍会请求传统 favicon.ico 地址的浏览器返回同一品牌图标。 */
 export function GET() {
   return new Response(favicon, {
diff --git a/app/globals.css b/app/globals.css
index 978e179..73e9442 100644
--- a/app/globals.css
+++ b/app/globals.css
@@ -8,7 +8,6 @@
   --soft: #e7e6e1;
   --line: #b9b8b2;
   --site-header-height: 5rem;
-  --x-icon: url("/x-x-x20/outputs/x-icon-transparent.svg");
   --display: "Arial Narrow", "Helvetica Neue", Arial, sans-serif;
   /* 中文不使用窄体拉伸，避免字体回退后仍继承拉丁字母的压缩参数。 */
   --display-cjk:
diff --git a/app/layout.tsx b/app/layout.tsx
index 690fdcf..67993c2 100644
--- a/app/layout.tsx
+++ b/app/layout.tsx
@@ -3,7 +3,7 @@ import { Analytics } from "@vercel/analytics/next";
 import Script from "next/script";

 import { SiteHeader } from "@/components/site-header";
-import { siteConfig } from "@/lib/site";
+import { absoluteUrl, siteConfig, socialPreviewImage } from "@/lib/site";

 import "./globals.css";

@@ -19,35 +19,28 @@ const themeBootScript = `
 })();`;

 export const metadata: Metadata = {
-  metadataBase: new URL(siteConfig.url),
+  metadataBase: new URL(absoluteUrl()),
   title: {
     default: `${siteConfig.name} — ${siteConfig.slogan}`,
     template: `%s — ${siteConfig.name}`,
   },
   description: siteConfig.description,
   applicationName: siteConfig.name,
-  alternates: { canonical: "/" },
+  alternates: { canonical: absoluteUrl() },
   openGraph: {
     type: "website",
     locale: "zh_CN",
     siteName: siteConfig.name,
     title: `${siteConfig.name} — ${siteConfig.slogan}`,
     description: siteConfig.description,
-    url: "/",
-    images: [
-      {
-        url: "/og.png",
-        width: 1731,
-        height: 909,
-        alt: "LabX — 探索和重构一切",
-      },
-    ],
+    url: absoluteUrl(),
+    images: [socialPreviewImage],
   },
   twitter: {
     card: "summary_large_image",
     title: `${siteConfig.name} — ${siteConfig.slogan}`,
     description: siteConfig.description,
-    images: ["/og.png"],
+    images: [socialPreviewImage.url],
   },
 };

diff --git a/app/privacy/page.tsx b/app/privacy/page.tsx
index 8f22f87..e7c722b 100644
--- a/app/privacy/page.tsx
+++ b/app/privacy/page.tsx
@@ -2,11 +2,24 @@ import type { Metadata } from "next";

 import { SiteFooter } from "@/components/site-footer";
 import { XMark } from "@/components/x-mark";
+import { absoluteUrl, siteConfig, socialPreviewImage } from "@/lib/site";

 export const metadata: Metadata = {
   title: "隐私说明",
   description: "LabX 独立 AI 实验室网站的基础访问分析与隐私边界。",
-  alternates: { canonical: "/privacy" },
+  alternates: { canonical: absoluteUrl("/privacy/") },
+  openGraph: {
+    title: `隐私说明 — ${siteConfig.name}`,
+    description: "LabX 独立 AI 实验室网站的基础访问分析与隐私边界。",
+    url: absoluteUrl("/privacy/"),
+    images: [socialPreviewImage],
+  },
+  twitter: {
+    card: "summary_large_image",
+    title: `隐私说明 — ${siteConfig.name}`,
+    description: "LabX 独立 AI 实验室网站的基础访问分析与隐私边界。",
+    images: [socialPreviewImage.url],
+  },
 };

 export default function PrivacyPage() {
@@ -19,7 +32,10 @@ export default function PrivacyPage() {
       </header>
       <article className="privacy-content">
         <h2>基础访问分析</h2>
-        <p>本站使用匿名访问统计了解页面访问情况，用于改善内容结构和体验。</p>
+        <p>
+          当前 GitHub Pages
+          版本暂未启用访问统计。后续如接入分析服务，将只使用匿名数据改善内容结构和体验。
+        </p>
         <h2>外链转化事件</h2>
         <p>
           当你点击作品的观看、收听、购买、试玩或关注入口时，本站只记录作品
diff --git a/app/robots.ts b/app/robots.ts
index 783ad2a..7ae6734 100644
--- a/app/robots.ts
+++ b/app/robots.ts
@@ -1,13 +1,15 @@
 import type { MetadataRoute } from "next";

-import { siteConfig } from "@/lib/site";
+import { absoluteUrl, withBasePath } from "@/lib/site";
+
+export const dynamic = "force-static";

 export default function robots(): MetadataRoute.Robots {
   return {
     rules: {
       userAgent: "*",
-      allow: "/",
+      allow: withBasePath("/"),
     },
-    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
+    sitemap: absoluteUrl("/sitemap.xml"),
   };
 }
diff --git a/app/sitemap.ts b/app/sitemap.ts
index feb3295..14a80a6 100644
--- a/app/sitemap.ts
+++ b/app/sitemap.ts
@@ -1,21 +1,23 @@
 import type { MetadataRoute } from "next";

 import { loadWorks } from "@/lib/content/repository";
-import { contentTypes, siteConfig } from "@/lib/site";
+import { absoluteUrl, contentTypes } from "@/lib/site";
+
+export const dynamic = "force-static";

 export default function sitemap(): MetadataRoute.Sitemap {
   const staticRoutes = [
-    "",
-    "/about",
-    "/privacy",
-    ...contentTypes.map((type) => `/${type}`),
+    "/",
+    "/about/",
+    "/privacy/",
+    ...contentTypes.map((type) => `/${type}/`),
   ];
-  const workRoutes = loadWorks().map((work) => `/${work.type}/${work.slug}`);
+  const workRoutes = loadWorks().map((work) => `/${work.type}/${work.slug}/`);

   return [...staticRoutes, ...workRoutes].map((route) => ({
-    url: new URL(route || "/", siteConfig.url).toString(),
+    url: absoluteUrl(route),
     lastModified: new Date(),
-    changeFrequency: route === "" ? "weekly" : "monthly",
-    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.7,
+    changeFrequency: route === "/" ? "weekly" : "monthly",
+    priority: route === "/" ? 1 : route.split("/").length === 3 ? 0.8 : 0.7,
   }));
 }
diff --git a/components/x-mark.tsx b/components/x-mark.tsx
index be556dc..13aa286 100644
--- a/components/x-mark.tsx
+++ b/components/x-mark.tsx
@@ -1,12 +1,25 @@
-import type { HTMLAttributes } from "react";
+import type { CSSProperties, HTMLAttributes } from "react";

+import { withBasePath } from "@/lib/site";
 import { cn } from "@/lib/utils";

 type XMarkProps = HTMLAttributes<HTMLSpanElement>;

 /** 使用用户提供的透明 X 图标作为主题自适应遮罩。 */
-export function XMark({ className, ...props }: XMarkProps) {
+export function XMark({ className, style, ...props }: XMarkProps) {
+  const xIconUrl = withBasePath("/x-x-x20/outputs/x-icon-transparent.svg");
+
   return (
-    <span aria-hidden="true" className={cn("x-mark", className)} {...props} />
+    <span
+      aria-hidden="true"
+      className={cn("x-mark", className)}
+      style={
+        {
+          "--x-icon": `url("${xIconUrl}")`,
+          ...style,
+        } as CSSProperties
+      }
+      {...props}
+    />
   );
 }
diff --git a/lib/site.ts b/lib/site.ts
index a50b155..43a3d46 100644
--- a/lib/site.ts
+++ b/lib/site.ts
@@ -63,10 +63,40 @@ export const modules: ModuleDefinition[] = [
   },
 ];

+function normalizeBasePath(value: string | undefined) {
+  if (!value || value === "/") return "";
+  return `/${value.replace(/^\/+|\/+$/g, "")}`;
+}
+
+const configuredSiteUrl = (
+  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
+).replace(/\/+$/, "");
+
 export const siteConfig = {
   name: "LabX",
   description:
     "LabX 是一个独立 AI 实验室，研究并构建 AI 在游戏、声音、叙事、视觉、影像与数字人格中的应用。",
   slogan: "探索和重构一切",
-  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
+  url: configuredSiteUrl,
+  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
+};
+
+/** 为 CSS 等不会被 Next.js 自动处理的 public 资源补上部署子路径。 */
+export function withBasePath(pathname: string, basePath = siteConfig.basePath) {
+  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
+  return `${normalizeBasePath(basePath)}${normalizedPath}`;
+}
+
+/** 生成保留 GitHub Pages 项目子路径的绝对 URL。 */
+export function absoluteUrl(pathname = "/", siteUrl = siteConfig.url) {
+  const normalizedSiteUrl = `${siteUrl.replace(/\/+$/, "")}/`;
+  const relativePath = pathname.replace(/^\/+/, "");
+  return new URL(relativePath, normalizedSiteUrl).toString();
+}
+
+export const socialPreviewImage = {
+  url: absoluteUrl("/og.png"),
+  width: 1731,
+  height: 909,
+  alt: "LabX — 探索和重构一切",
 };
diff --git a/next.config.ts b/next.config.ts
index 6f5f107..de34a58 100644
--- a/next.config.ts
+++ b/next.config.ts
@@ -1,7 +1,14 @@
 import type { NextConfig } from "next";

+const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
+const pagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
+
 const nextConfig: NextConfig = {
   agentRules: false,
+  // GitHub Pages 只提供静态文件服务；本地开发和未来的 Vercel 构建仍保留默认模式。
+  output: isGitHubPagesBuild ? "export" : undefined,
+  basePath: isGitHubPagesBuild ? pagesBasePath : "",
+  trailingSlash: isGitHubPagesBuild,
   poweredByHeader: false,
   reactStrictMode: true,
 };
diff --git a/tests/x-mark.test.tsx b/tests/x-mark.test.tsx
index f754b4f..f399bb6 100644
--- a/tests/x-mark.test.tsx
+++ b/tests/x-mark.test.tsx
@@ -15,6 +15,10 @@ const globalStyles = readFileSync(
   resolve(process.cwd(), "app/globals.css"),
   "utf8",
 );
+const xMarkSource = readFileSync(
+  resolve(process.cwd(), "components/x-mark.tsx"),
+  "utf8",
+);
 const headerSource = readFileSync(
   resolve(process.cwd(), "components/site-header.tsx"),
   "utf8",
@@ -38,9 +42,12 @@ function getRule(selector: string): string {
 describe("XMark 品牌图标", () => {
   it("使用透明 SVG 矢量资源作为主题遮罩", () => {
     expect(existsSync(iconPath)).toBe(true);
-    expect(globalStyles).toContain(
+    expect(globalStyles).not.toContain(
       '--x-icon: url("/x-x-x20/outputs/x-icon-transparent.svg")',
     );
+    expect(xMarkSource).toContain(
+      'withBasePath("/x-x-x20/outputs/x-icon-transparent.svg")',
+    );
     expect(globalStyles).toContain(
       "mask: var(--x-icon) center / contain no-repeat",
     );
@@ -56,6 +63,9 @@ describe("XMark 品牌图标", () => {
     const mark = screen.getByTestId("x-mark");
     expect(mark).toHaveClass("x-mark", "test-x-mark");
     expect(mark).toHaveAttribute("aria-hidden", "true");
+    expect(mark.style.getPropertyValue("--x-icon")).toBe(
+      'url("/x-x-x20/outputs/x-icon-transparent.svg")',
+    );
   });

   it("页头以大号 X 为主符号，LABX 与口号组成两行文字栈", () => {

diff --git a/.github/workflows/pages.yml b/.github/workflows/pages.yml
new file mode 100644
index 0000000..a26d549
--- /dev/null
+++ b/.github/workflows/pages.yml
@@ -0,0 +1,72 @@
+name: 发布 GitHub Pages
+
+on:
+  push:
+    branches:
+      - main
+  workflow_dispatch:
+
+permissions:
+  contents: read
+
+concurrency:
+  group: pages
+  cancel-in-progress: false
+
+jobs:
+  build:
+    runs-on: ubuntu-latest
+    steps:
+      - name: 检出仓库
+        uses: actions/checkout@v7
+
+      - name: 设置 pnpm 与 Node.js
+        uses: pnpm/setup@v2
+        with:
+          version: 11.19.0
+          runtime: node@22
+          cache: true
+          install: false
+
+      - name: 安装依赖
+        run: pnpm install --frozen-lockfile
+
+      - name: 读取 GitHub Pages 配置
+        id: pages
+        uses: actions/configure-pages@v6
+
+      - name: 代码规范
+        run: pnpm lint
+
+      - name: 类型检查
+        run: pnpm typecheck
+
+      - name: 单元与组件测试
+        run: pnpm test
+
+      - name: 生成静态站点
+        run: pnpm build
+        env:
+          GITHUB_PAGES: "true"
+          NEXT_PUBLIC_SITE_URL: ${{ steps.pages.outputs.base_url }}
+          NEXT_PUBLIC_BASE_PATH: ${{ steps.pages.outputs.base_path }}
+
+      - name: 上传静态站点
+        uses: actions/upload-pages-artifact@v5
+        with:
+          path: ./out
+
+  deploy:
+    needs: build
+    runs-on: ubuntu-latest
+    permissions:
+      contents: read
+      pages: write
+      id-token: write
+    environment:
+      name: github-pages
+      url: ${{ steps.deployment.outputs.page_url }}
+    steps:
+      - name: 发布 GitHub Pages
+        id: deployment
+        uses: actions/deploy-pages@v5

diff --git a/tests/github-pages.test.ts b/tests/github-pages.test.ts
new file mode 100644
index 0000000..d6a73ce
--- /dev/null
+++ b/tests/github-pages.test.ts
@@ -0,0 +1,95 @@
+import { readFileSync } from "node:fs";
+import { resolve } from "node:path";
+
+import { describe, expect, it } from "vitest";
+
+import { absoluteUrl, withBasePath } from "@/lib/site";
+
+function readProjectFile(path: string) {
+  return readFileSync(resolve(process.cwd(), path), "utf8");
+}
+
+describe("GitHub Pages 发布配置", () => {
+  it("为项目站资源补充 /LabX 子路径", () => {
+    expect(withBasePath("/og.png", "/LabX")).toBe("/LabX/og.png");
+    expect(withBasePath("x-icon.svg", "/LabX/")).toBe("/LabX/x-icon.svg");
+    expect(withBasePath("/", "/LabX")).toBe("/LabX/");
+    expect(withBasePath("/og.png", "")).toBe("/og.png");
+  });
+
+  it("生成保留项目子路径的公开绝对 URL", () => {
+    const pagesUrl = "https://lep-ton.github.io/LabX";
+
+    expect(absoluteUrl("/", pagesUrl)).toBe("https://lep-ton.github.io/LabX/");
+    expect(absoluteUrl("/about/", pagesUrl)).toBe(
+      "https://lep-ton.github.io/LabX/about/",
+    );
+    expect(absoluteUrl("/game/echoes-of-us/", pagesUrl)).toBe(
+      "https://lep-ton.github.io/LabX/game/echoes-of-us/",
+    );
+    expect(absoluteUrl("/sitemap.xml", pagesUrl)).toBe(
+      "https://lep-ton.github.io/LabX/sitemap.xml",
+    );
+  });
+
+  it("只在 GitHub Pages 构建中启用静态导出", () => {
+    const configSource = readProjectFile("next.config.ts");
+    const faviconRouteSource = readProjectFile("app/favicon.ico/route.ts");
+
+    expect(configSource).toContain('process.env.GITHUB_PAGES === "true"');
+    expect(configSource).toContain(
+      'output: isGitHubPagesBuild ? "export" : undefined',
+    );
+    expect(configSource).toContain(
+      'basePath: isGitHubPagesBuild ? pagesBasePath : ""',
+    );
+    expect(configSource).toContain("trailingSlash: isGitHubPagesBuild");
+    expect(faviconRouteSource).toContain(
+      'export const dynamic = "force-static"',
+    );
+  });
+
+  it("使用 GitHub Pages 官方 artifact 发布流程", () => {
+    const workflowSource = readProjectFile(".github/workflows/pages.yml");
+
+    expect(workflowSource).toContain("uses: actions/configure-pages@v6");
+    expect(workflowSource).toContain("uses: actions/upload-pages-artifact@v5");
+    expect(workflowSource).toContain("uses: actions/deploy-pages@v5");
+    expect(workflowSource).toContain('GITHUB_PAGES: "true"');
+    expect(workflowSource).toContain(
+      "NEXT_PUBLIC_SITE_URL: ${{ steps.pages.outputs.base_url }}",
+    );
+    expect(workflowSource).toContain(
+      "NEXT_PUBLIC_BASE_PATH: ${{ steps.pages.outputs.base_path }}",
+    );
+    expect(workflowSource).toContain("pages: write");
+    expect(workflowSource).toContain("id-token: write");
+    expect(workflowSource).toContain("path: ./out");
+  });
+
+  it("robots、sitemap 与分享元数据统一使用公开 URL 工具", () => {
+    const publicMetadataSources = [
+      "app/layout.tsx",
+      "app/about/page.tsx",
+      "app/privacy/page.tsx",
+      "app/[module]/page.tsx",
+      "app/[module]/[slug]/page.tsx",
+      "app/robots.ts",
+      "app/sitemap.ts",
+    ]
+      .map(readProjectFile)
+      .join("\n");
+
+    expect(publicMetadataSources).toContain("absoluteUrl(");
+    expect(publicMetadataSources).not.toContain(
+      'new URL("/sitemap.xml", siteConfig.url)',
+    );
+    expect(publicMetadataSources).not.toContain('url: "/og.png"');
+    expect(readProjectFile("app/robots.ts")).toContain(
+      'export const dynamic = "force-static"',
+    );
+    expect(readProjectFile("app/sitemap.ts")).toContain(
+      'export const dynamic = "force-static"',
+    );
+  });
+});
```

## 测试用例

### TC-001 本地模式保持兼容

- 类型：构建回归
- 优先级：高
- 操作步骤：在不设置 Pages 环境变量时运行 Next.js 生产构建。
- 预期结果：保持普通 Next.js 输出，33 个静态/SSG 页面生成成功。
- 是否通过：通过。

### TC-002 GitHub Pages 静态导出

- 类型：部署构建
- 优先级：高
- 操作步骤：
  1. 设置 `GITHUB_PAGES=true`。
  2. 设置 `NEXT_PUBLIC_SITE_URL=https://lep-ton.github.io/LabX`。
  3. 设置 `NEXT_PUBLIC_BASE_PATH=/LabX`。
  4. 运行 Next.js 生产构建。
- 预期结果：生成 `out/`，包含 33 个静态页面及所需公开资源。
- 是否通过：通过。

### TC-003 子路径与公开 URL

- 类型：单元测试 / 构建产物检查
- 优先级：高
- 操作步骤：
  1. 测试 `withBasePath()` 与 `absoluteUrl()`。
  2. 扫描导出的 HTML、CSS、XML 与 TXT。
  3. 检查根页 Canonical、OG 图片、Next.js chunks 和 X SVG 地址。
- 预期结果：站内资源使用 `/LabX`，公开 URL 使用 `https://lep-ton.github.io/LabX/`，不包含 localhost 或丢失子路径的 URL。
- 是否通过：通过。

### TC-004 robots 与 sitemap

- 类型：SEO 验证
- 优先级：高
- 操作步骤：检查导出的 `robots.txt` 与 `sitemap.xml`。
- 预期结果：robots 允许 `/LabX/` 并引用正确 Sitemap；Sitemap 包含 27 个公开页面 URL。
- 是否通过：通过。

### TC-005 工程质量

- 类型：自动化测试
- 优先级：高
- 操作步骤：运行 Prettier、ESLint、TypeScript、Vitest 和 Next.js 构建。
- 预期结果：全部通过。
- 是否通过：通过；9 个测试文件、38 项测试全部通过，普通构建与 Pages 构建均无警告。

### TC-006 GitHub Pages 在线发布

- 类型：发布验收
- 优先级：高
- 操作步骤：启用 GitHub Actions 作为 Pages 来源，推送 `main`，等待部署工作流结束并请求正式网址。
- 预期结果：`https://lep-ton.github.io/LabX/` 返回成功状态，静态资源与代表性详情路由可访问。
- 是否通过：通过；Pages 为公开 HTTPS 站点，最新部署工作流 `33759904311` 成功，五个公网验收地址均返回 HTTP 200。
