# 搭建 LabX 门户基础工程与品牌首屏

## 背景与目标

- 按已确认方案使用 Next.js、React、TypeScript 与 Tailwind CSS 建设 LabX 品牌门户。
- 首个阶段先建立可识别的品牌首屏、六模块入口、黑白主题与响应式基础。
- 在首屏成功运行并完成预览后，再扩展 MDX 内容系统、详情页、分析与完整测试。

## 约束与原则

- 保留已有项目认知和文档记录。
- 使用 pnpm 管理依赖，安装成功后提交锁文件。
- 遵循黑白极简设计，不使用通用脚手架默认视觉。
- 在依赖不可用时不虚报构建或预览结果。

## 阶段与 TODO

- [x] 创建 Next.js、TypeScript、Tailwind 与代码质量配置。
- [x] 建立黑白设计令牌、主题初始化与切换控件。
- [x] 实现品牌首屏、六模块入口、愿景段落与响应式布局。
- [ ] 安装运行依赖并生成 `pnpm-lock.yaml`。
- [ ] 启动首个可运行预览并验证页面响应。
- [ ] 建立 MDX 内容模型、完整路由、演示内容、分析和自动化测试。

## 关键风险

- npm 网络访问在沙箱内返回 EACCES；两次外部权限审核均超时。
- 依赖尚未安装，因此当前代码尚未经过编译、类型检查或视觉预览。
- 后续依赖版本以实际安装并写入锁文件的版本为准。

## 当前进展

- 品牌门户基础工程与产品化首屏源码已创建。
- 项目核心认知已更新为 Next.js、React、TypeScript、Tailwind CSS、MDX、Zod、pnpm 与 Vercel。
- 当前唯一阻塞为依赖下载权限。

## 代码变更

```diff
warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
diff --git a/package.json b/package.json
new file mode 100644
index 0000000..751d56f
--- /dev/null
+++ b/package.json
@@ -0,0 +1,17 @@
+{
+  "name": "labx-portal",
+  "version": "0.1.0",
+  "private": true,
+  "scripts": {
+    "dev": "next dev",
+    "build": "next build",
+    "start": "next start",
+    "lint": "eslint .",
+    "typecheck": "tsc --noEmit",
+    "test": "vitest run",
+    "test:watch": "vitest",
+    "test:e2e": "playwright test",
+    "format": "prettier --write .",
+    "format:check": "prettier --check ."
+  }
+}
warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it
diff --git a/.gitignore b/.gitignore
new file mode 100644
index 0000000..a119696
--- /dev/null
+++ b/.gitignore
@@ -0,0 +1,16 @@
+# 依赖与构建产物
+node_modules/
+.next/
+out/
+coverage/
+playwright-report/
+test-results/
+
+# 本地配置
+.env*
+!.env.example
+*.log
+.DS_Store
+
+# Vercel 本地项目绑定
+.vercel/
warning: in the working copy of 'tsconfig.json', LF will be replaced by CRLF the next time Git touches it
diff --git a/tsconfig.json b/tsconfig.json
new file mode 100644
index 0000000..30e767c
--- /dev/null
+++ b/tsconfig.json
@@ -0,0 +1,23 @@
+{
+  "compilerOptions": {
+    "target": "ES2017",
+    "lib": ["dom", "dom.iterable", "esnext"],
+    "allowJs": false,
+    "skipLibCheck": true,
+    "strict": true,
+    "noEmit": true,
+    "esModuleInterop": true,
+    "module": "esnext",
+    "moduleResolution": "bundler",
+    "resolveJsonModule": true,
+    "isolatedModules": true,
+    "jsx": "react-jsx",
+    "incremental": true,
+    "plugins": [{ "name": "next" }],
+    "paths": {
+      "@/*": ["./*"]
+    }
+  },
+  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
+  "exclude": ["node_modules"]
+}
warning: in the working copy of 'next-env.d.ts', LF will be replaced by CRLF the next time Git touches it
diff --git a/next-env.d.ts b/next-env.d.ts
new file mode 100644
index 0000000..1168cd5
--- /dev/null
+++ b/next-env.d.ts
@@ -0,0 +1,4 @@
+/// <reference types="next" />
+/// <reference types="next/image-types/global" />
+
+// 此文件由 Next.js 使用，通常无需手动编辑。
warning: in the working copy of 'next.config.ts', LF will be replaced by CRLF the next time Git touches it
diff --git a/next.config.ts b/next.config.ts
new file mode 100644
index 0000000..dcf4784
--- /dev/null
+++ b/next.config.ts
@@ -0,0 +1,8 @@
+import type { NextConfig } from "next";
+
+const nextConfig: NextConfig = {
+  poweredByHeader: false,
+  reactStrictMode: true,
+};
+
+export default nextConfig;
warning: in the working copy of 'postcss.config.mjs', LF will be replaced by CRLF the next time Git touches it
diff --git a/postcss.config.mjs b/postcss.config.mjs
new file mode 100644
index 0000000..c2ddf74
--- /dev/null
+++ b/postcss.config.mjs
@@ -0,0 +1,5 @@
+export default {
+  plugins: {
+    "@tailwindcss/postcss": {},
+  },
+};
warning: in the working copy of 'eslint.config.mjs', LF will be replaced by CRLF the next time Git touches it
diff --git a/eslint.config.mjs b/eslint.config.mjs
new file mode 100644
index 0000000..56ed46f
--- /dev/null
+++ b/eslint.config.mjs
@@ -0,0 +1,9 @@
+import { defineConfig, globalIgnores } from "eslint/config";
+import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
+import nextTypeScript from "eslint-config-next/typescript";
+
+export default defineConfig([
+  ...nextCoreWebVitals,
+  ...nextTypeScript,
+  globalIgnores([".next/**", "out/**", "coverage/**", "next-env.d.ts"]),
+]);
warning: in the working copy of '.prettierrc.json', LF will be replaced by CRLF the next time Git touches it
diff --git a/.prettierrc.json b/.prettierrc.json
new file mode 100644
index 0000000..a828e0f
--- /dev/null
+++ b/.prettierrc.json
@@ -0,0 +1,7 @@
+{
+  "plugins": ["prettier-plugin-tailwindcss"],
+  "semi": true,
+  "singleQuote": false,
+  "tabWidth": 2,
+  "trailingComma": "all"
+}
warning: in the working copy of 'components.json', LF will be replaced by CRLF the next time Git touches it
diff --git a/components.json b/components.json
new file mode 100644
index 0000000..461a755
--- /dev/null
+++ b/components.json
@@ -0,0 +1,19 @@
+{
+  "$schema": "https://ui.shadcn.com/schema.json",
+  "style": "new-york",
+  "rsc": true,
+  "tsx": true,
+  "tailwind": {
+    "css": "app/globals.css",
+    "baseColor": "neutral",
+    "cssVariables": true
+  },
+  "aliases": {
+    "components": "@/components",
+    "utils": "@/lib/utils",
+    "ui": "@/components/ui",
+    "lib": "@/lib",
+    "hooks": "@/hooks"
+  },
+  "iconLibrary": "lucide"
+}
warning: in the working copy of 'lib/utils.ts', LF will be replaced by CRLF the next time Git touches it
diff --git a/lib/utils.ts b/lib/utils.ts
new file mode 100644
index 0000000..3098bbe
--- /dev/null
+++ b/lib/utils.ts
@@ -0,0 +1,7 @@
+import { clsx, type ClassValue } from "clsx";
+import { twMerge } from "tailwind-merge";
+
+/** 合并条件类名，并解决 Tailwind 工具类冲突。 */
+export function cn(...inputs: ClassValue[]) {
+  return twMerge(clsx(inputs));
+}
warning: in the working copy of 'lib/site.ts', LF will be replaced by CRLF the next time Git touches it
diff --git a/lib/site.ts b/lib/site.ts
new file mode 100644
index 0000000..76ba53f
--- /dev/null
+++ b/lib/site.ts
@@ -0,0 +1,71 @@
+export const contentTypes = [
+  "game",
+  "music",
+  "book",
+  "art",
+  "movie",
+  "life",
+] as const;
+
+export type ContentType = (typeof contentTypes)[number];
+
+export interface ModuleDefinition {
+  type: ContentType;
+  name: string;
+  chineseName: string;
+  index: string;
+  description: string;
+}
+
+export const modules: ModuleDefinition[] = [
+  {
+    type: "game",
+    name: "Game",
+    chineseName: "游戏",
+    index: "01",
+    description: "让叙事、声音、视觉与人格汇聚成可以进入的世界。",
+  },
+  {
+    type: "music",
+    name: "Music",
+    chineseName: "音乐",
+    index: "02",
+    description: "为虚拟世界赋予节奏、情绪与不可替代的听觉记忆。",
+  },
+  {
+    type: "book",
+    name: "Book",
+    chineseName: "著作",
+    index: "03",
+    description: "书写世界观、人物和故事，成为一切体验的叙事原点。",
+  },
+  {
+    type: "art",
+    name: "Art",
+    chineseName: "视觉",
+    index: "04",
+    description: "从 UI、原画到建模，为想象建立可见的形态。",
+  },
+  {
+    type: "movie",
+    name: "Movie",
+    chineseName: "影视",
+    index: "05",
+    description: "让静态设定进入时间，以动画和影像扩展世界边界。",
+  },
+  {
+    type: "life",
+    name: "Life",
+    chineseName: "数字永生",
+    index: "06",
+    description: "保存人格、记忆与行为，使生命在虚拟世界中继续生长。",
+  },
+];
+
+export const siteConfig = {
+  name: "LabX",
+  description:
+    "LabX 是探索数字创作边界的内容门户，连接游戏、音乐、著作、视觉、影视与数字生命。",
+  slogan: "探索和重构一切",
+  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
+};
warning: in the working copy of 'components/ui/button.tsx', LF will be replaced by CRLF the next time Git touches it
diff --git a/components/ui/button.tsx b/components/ui/button.tsx
new file mode 100644
index 0000000..6b615b4
--- /dev/null
+++ b/components/ui/button.tsx
@@ -0,0 +1,43 @@
+import * as React from "react";
+import { cva, type VariantProps } from "class-variance-authority";
+
+import { cn } from "@/lib/utils";
+
+const buttonVariants = cva(
+  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50",
+  {
+    variants: {
+      variant: {
+        default:
+          "bg-[var(--foreground)] text-[var(--background)] hover:opacity-80",
+        outline:
+          "border border-[var(--line)] bg-transparent hover:bg-[var(--soft)]",
+        ghost: "bg-transparent hover:bg-[var(--soft)]",
+      },
+      size: {
+        default: "h-10 px-5",
+        icon: "size-10",
+        sm: "h-8 px-3 text-xs",
+      },
+    },
+    defaultVariants: {
+      variant: "default",
+      size: "default",
+    },
+  },
+);
+
+export interface ButtonProps
+  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
+    VariantProps<typeof buttonVariants> {}
+
+function Button({ className, variant, size, ...props }: ButtonProps) {
+  return (
+    <button
+      className={cn(buttonVariants({ variant, size, className }))}
+      {...props}
+    />
+  );
+}
+
+export { Button, buttonVariants };
warning: in the working copy of 'components/theme-toggle.tsx', LF will be replaced by CRLF the next time Git touches it
diff --git a/components/theme-toggle.tsx b/components/theme-toggle.tsx
new file mode 100644
index 0000000..5575903
--- /dev/null
+++ b/components/theme-toggle.tsx
@@ -0,0 +1,43 @@
+"use client";
+
+import { Moon, Sun } from "lucide-react";
+import { useEffect, useState } from "react";
+
+import { Button } from "@/components/ui/button";
+
+type Theme = "light" | "dark";
+
+function readTheme(): Theme {
+  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
+}
+
+export function ThemeToggle() {
+  const [theme, setTheme] = useState<Theme>("light");
+
+  useEffect(() => {
+    setTheme(readTheme());
+  }, []);
+
+  function toggleTheme() {
+    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
+    document.documentElement.dataset.theme = nextTheme;
+    document.documentElement.style.colorScheme = nextTheme;
+    localStorage.setItem("labx-theme", nextTheme);
+    setTheme(nextTheme);
+  }
+
+  const nextThemeLabel = theme === "dark" ? "切换到白色主题" : "切换到黑色主题";
+
+  return (
+    <Button
+      type="button"
+      variant="ghost"
+      size="icon"
+      onClick={toggleTheme}
+      aria-label={nextThemeLabel}
+      title={nextThemeLabel}
+    >
+      {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
+    </Button>
+  );
+}
warning: in the working copy of 'components/site-header.tsx', LF will be replaced by CRLF the next time Git touches it
diff --git a/components/site-header.tsx b/components/site-header.tsx
new file mode 100644
index 0000000..ab678bf
--- /dev/null
+++ b/components/site-header.tsx
@@ -0,0 +1,18 @@
+import Link from "next/link";
+
+import { ThemeToggle } from "@/components/theme-toggle";
+
+export function SiteHeader() {
+  return (
+    <header className="site-header">
+      <Link className="wordmark" href="/" aria-label="LabX 首页">
+        LAB<span aria-hidden="true">×</span>
+      </Link>
+      <nav aria-label="主导航" className="primary-nav">
+        <a href="#worlds">领域</a>
+        <a href="#vision">愿景</a>
+        <ThemeToggle />
+      </nav>
+    </header>
+  );
+}
warning: in the working copy of 'app/layout.tsx', LF will be replaced by CRLF the next time Git touches it
diff --git a/app/layout.tsx b/app/layout.tsx
new file mode 100644
index 0000000..a4ace63
--- /dev/null
+++ b/app/layout.tsx
@@ -0,0 +1,70 @@
+import type { Metadata, Viewport } from "next";
+
+import { SiteHeader } from "@/components/site-header";
+import { siteConfig } from "@/lib/site";
+
+import "./globals.css";
+
+const themeBootScript = `
+(() => {
+  try {
+    const stored = localStorage.getItem("labx-theme");
+    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
+    const theme = stored === "light" || stored === "dark" ? stored : systemDark ? "dark" : "light";
+    document.documentElement.dataset.theme = theme;
+    document.documentElement.style.colorScheme = theme;
+  } catch (_) {}
+})();`;
+
+export const metadata: Metadata = {
+  metadataBase: new URL(siteConfig.url),
+  title: {
+    default: `${siteConfig.name} — ${siteConfig.slogan}`,
+    template: `%s — ${siteConfig.name}`,
+  },
+  description: siteConfig.description,
+  applicationName: siteConfig.name,
+  alternates: { canonical: "/" },
+  openGraph: {
+    type: "website",
+    locale: "zh_CN",
+    siteName: siteConfig.name,
+    title: `${siteConfig.name} — ${siteConfig.slogan}`,
+    description: siteConfig.description,
+    url: "/",
+  },
+  twitter: {
+    card: "summary_large_image",
+    title: `${siteConfig.name} — ${siteConfig.slogan}`,
+    description: siteConfig.description,
+  },
+};
+
+export const viewport: Viewport = {
+  width: "device-width",
+  initialScale: 1,
+  colorScheme: "light dark",
+  themeColor: [
+    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
+    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
+  ],
+};
+
+export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
+  return (
+    <html lang="zh-CN" suppressHydrationWarning>
+      <head>
+        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
+      </head>
+      <body>
+        <a className="skip-link" href="#main-content">
+          跳到主要内容
+        </a>
+        <div className="site-shell">
+          <SiteHeader />
+          {children}
+        </div>
+      </body>
+    </html>
+  );
+}
warning: in the working copy of 'app/page.tsx', LF will be replaced by CRLF the next time Git touches it
diff --git a/app/page.tsx b/app/page.tsx
new file mode 100644
index 0000000..3197701
--- /dev/null
+++ b/app/page.tsx
@@ -0,0 +1,77 @@
+import Link from "next/link";
+import { ArrowDownRight, Asterisk } from "lucide-react";
+
+import { modules, siteConfig } from "@/lib/site";
+
+export default function HomePage() {
+  return (
+    <main id="main-content">
+      <section className="hero" aria-labelledby="hero-title">
+        <div className="hero-kicker">
+          <span>LABX / DIGITAL CONTENT UNIVERSE</span>
+          <span>EST. 2026</span>
+        </div>
+        <div className="hero-body">
+          <p className="hero-index" aria-hidden="true">
+            X
+          </p>
+          <div>
+            <h1 id="hero-title">
+              探索
+              <br />
+              和重构
+              <br />
+              一切
+              <span className="hero-dot">。</span>
+            </h1>
+            <p className="hero-intro">
+              我们将故事、声音、图像和人格编织为彼此连接的数字世界。
+            </p>
+          </div>
+        </div>
+        <a className="hero-scroll" href="#worlds">
+          探索六个领域
+          <ArrowDownRight aria-hidden="true" />
+        </a>
+      </section>
+
+      <section className="worlds" id="worlds" aria-labelledby="worlds-title">
+        <div className="section-heading">
+          <p>CONNECTED DISCIPLINES</p>
+          <h2 id="worlds-title">六个领域，一个宇宙</h2>
+        </div>
+        <div className="module-grid">
+          {modules.map((module) => (
+            <Link className="module-card" href={`/${module.type}`} key={module.type}>
+              <span className="module-index">{module.index}</span>
+              <span className="module-symbol" aria-hidden="true">
+                <Asterisk strokeWidth={1} />
+              </span>
+              <span className="module-name">{module.name}</span>
+              <span className="module-chinese">{module.chineseName}</span>
+              <span className="module-description">{module.description}</span>
+              <ArrowDownRight className="module-arrow" aria-hidden="true" />
+            </Link>
+          ))}
+        </div>
+      </section>
+
+      <section className="vision" id="vision" aria-labelledby="vision-title">
+        <p className="vision-marker">∞</p>
+        <div>
+          <p className="eyebrow">OUR VISION</p>
+          <h2 id="vision-title">作品不再孤立，生命不止一次。</h2>
+          <p>
+            Music 为 Game 注入情绪，Book 提供叙事，Art 塑造形体，Movie
+            延展时间，Life 让人格继续存在。每一份创作都成为下一份创作的起点。
+          </p>
+        </div>
+      </section>
+
+      <footer className="site-footer">
+        <p>LABX © 2026</p>
+        <p>{siteConfig.slogan}</p>
+      </footer>
+    </main>
+  );
+}
warning: in the working copy of 'app/globals.css', LF will be replaced by CRLF the next time Git touches it
diff --git a/app/globals.css b/app/globals.css
new file mode 100644
index 0000000..1c4bd22
--- /dev/null
+++ b/app/globals.css
@@ -0,0 +1,372 @@
+@import "tailwindcss";
+
+:root,
+:root[data-theme="light"] {
+  --background: #f4f3ef;
+  --foreground: #111111;
+  --muted: #676762;
+  --soft: #e7e6e1;
+  --line: #b9b8b2;
+  --display: "Arial Narrow", "Helvetica Neue", Arial, sans-serif;
+  --body: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
+}
+
+:root[data-theme="dark"] {
+  --background: #0a0a0a;
+  --foreground: #f2f1ec;
+  --muted: #999993;
+  --soft: #191919;
+  --line: #383834;
+}
+
+* {
+  box-sizing: border-box;
+}
+
+html {
+  scroll-behavior: smooth;
+  background: var(--background);
+}
+
+body {
+  margin: 0;
+  background: var(--background);
+  color: var(--foreground);
+  font-family: var(--body);
+  text-rendering: optimizeLegibility;
+  transition: background-color 180ms ease, color 180ms ease;
+}
+
+a {
+  color: inherit;
+  text-decoration: none;
+}
+
+button,
+a {
+  -webkit-tap-highlight-color: transparent;
+}
+
+::selection {
+  background: var(--foreground);
+  color: var(--background);
+}
+
+.skip-link {
+  position: fixed;
+  top: 0.75rem;
+  left: 0.75rem;
+  z-index: 100;
+  padding: 0.75rem 1rem;
+  background: var(--foreground);
+  color: var(--background);
+  transform: translateY(-150%);
+  transition: transform 160ms ease;
+}
+
+.skip-link:focus {
+  transform: translateY(0);
+}
+
+.site-shell {
+  width: min(100%, 1600px);
+  margin-inline: auto;
+  padding-inline: clamp(1rem, 3vw, 3rem);
+}
+
+.site-header {
+  position: sticky;
+  top: 0;
+  z-index: 40;
+  display: flex;
+  min-height: 5rem;
+  align-items: center;
+  justify-content: space-between;
+  border-bottom: 1px solid var(--line);
+  background: color-mix(in srgb, var(--background) 90%, transparent);
+  backdrop-filter: blur(16px);
+}
+
+.wordmark {
+  font-family: var(--display);
+  font-size: 1.45rem;
+  font-weight: 900;
+  letter-spacing: -0.08em;
+}
+
+.wordmark span {
+  display: inline-block;
+  margin-left: 0.08em;
+  font-weight: 400;
+}
+
+.primary-nav {
+  display: flex;
+  align-items: center;
+  gap: clamp(1rem, 3vw, 2.5rem);
+  font-size: 0.75rem;
+  font-weight: 600;
+  letter-spacing: 0.12em;
+  text-transform: uppercase;
+}
+
+.primary-nav > a {
+  border-bottom: 1px solid transparent;
+  transition: border-color 160ms ease;
+}
+
+.primary-nav > a:hover {
+  border-color: currentColor;
+}
+
+.hero {
+  display: flex;
+  min-height: calc(100svh - 5rem);
+  flex-direction: column;
+  justify-content: space-between;
+  padding-block: clamp(1.5rem, 4vw, 4rem) 2rem;
+}
+
+.hero-kicker,
+.section-heading > p,
+.eyebrow {
+  display: flex;
+  justify-content: space-between;
+  color: var(--muted);
+  font-size: 0.66rem;
+  font-weight: 650;
+  letter-spacing: 0.16em;
+}
+
+.hero-body {
+  display: grid;
+  grid-template-columns: minmax(4rem, 1fr) minmax(0, 5fr);
+  align-items: end;
+  gap: 2rem;
+}
+
+.hero-index {
+  margin: 0;
+  color: var(--muted);
+  font-family: var(--display);
+  font-size: clamp(5rem, 14vw, 13rem);
+  font-weight: 200;
+  line-height: 0.72;
+}
+
+.hero h1 {
+  max-width: 9ch;
+  margin: 0;
+  font-family: var(--display);
+  font-size: clamp(4.4rem, 12.5vw, 12rem);
+  font-stretch: condensed;
+  font-weight: 900;
+  letter-spacing: -0.09em;
+  line-height: 0.76;
+}
+
+.hero-dot {
+  color: var(--muted);
+}
+
+.hero-intro {
+  max-width: 31rem;
+  margin: clamp(2rem, 5vw, 4rem) 0 0 auto;
+  font-size: clamp(1rem, 1.5vw, 1.3rem);
+  line-height: 1.65;
+}
+
+.hero-scroll {
+  display: flex;
+  width: fit-content;
+  align-items: center;
+  gap: 0.75rem;
+  border-bottom: 1px solid currentColor;
+  padding-bottom: 0.35rem;
+  font-size: 0.8rem;
+  font-weight: 600;
+}
+
+.hero-scroll svg,
+.module-arrow {
+  width: 1rem;
+}
+
+.worlds {
+  padding-block: clamp(6rem, 12vw, 12rem);
+}
+
+.section-heading {
+  display: grid;
+  grid-template-columns: 1fr 3fr;
+  gap: 2rem;
+  align-items: baseline;
+  margin-bottom: clamp(3rem, 7vw, 6rem);
+}
+
+.section-heading h2,
+.vision h2 {
+  margin: 0;
+  font-family: var(--display);
+  font-size: clamp(2.6rem, 7vw, 7rem);
+  font-weight: 800;
+  letter-spacing: -0.065em;
+  line-height: 0.95;
+}
+
+.module-grid {
+  border-top: 1px solid var(--line);
+}
+
+.module-card {
+  position: relative;
+  display: grid;
+  grid-template-columns: 0.4fr 0.4fr 1.5fr 0.8fr 2fr auto;
+  min-height: 10rem;
+  align-items: center;
+  gap: 1rem;
+  border-bottom: 1px solid var(--line);
+  transition: background-color 180ms ease, color 180ms ease, padding 180ms ease;
+}
+
+.module-card:hover,
+.module-card:focus-visible {
+  padding-inline: 1rem;
+  background: var(--foreground);
+  color: var(--background);
+  outline: none;
+}
+
+.module-index,
+.module-chinese {
+  font-size: 0.72rem;
+  letter-spacing: 0.08em;
+}
+
+.module-symbol svg {
+  width: 1.25rem;
+}
+
+.module-name {
+  font-family: var(--display);
+  font-size: clamp(2.2rem, 5vw, 5rem);
+  font-weight: 800;
+  letter-spacing: -0.07em;
+}
+
+.module-description {
+  max-width: 28rem;
+  color: var(--muted);
+  font-size: 0.86rem;
+  line-height: 1.7;
+}
+
+.module-card:hover .module-description,
+.module-card:focus-visible .module-description {
+  color: color-mix(in srgb, var(--background) 70%, transparent);
+}
+
+.vision {
+  display: grid;
+  min-height: 80svh;
+  grid-template-columns: 1fr 3fr;
+  align-items: center;
+  gap: 2rem;
+  border-block: 1px solid var(--line);
+  padding-block: clamp(5rem, 10vw, 10rem);
+}
+
+.vision-marker {
+  margin: 0;
+  font-family: Georgia, serif;
+  font-size: clamp(6rem, 16vw, 16rem);
+  font-weight: 300;
+  line-height: 1;
+}
+
+.vision h2 {
+  max-width: 10ch;
+  margin-block: 2rem;
+}
+
+.vision div > p:last-child {
+  max-width: 42rem;
+  margin: 0;
+  color: var(--muted);
+  font-size: clamp(1rem, 1.4vw, 1.25rem);
+  line-height: 1.9;
+}
+
+.site-footer {
+  display: flex;
+  min-height: 8rem;
+  align-items: center;
+  justify-content: space-between;
+  font-size: 0.7rem;
+  font-weight: 650;
+  letter-spacing: 0.12em;
+  text-transform: uppercase;
+}
+
+@media (max-width: 760px) {
+  .primary-nav > a {
+    display: none;
+  }
+
+  .hero-body,
+  .section-heading,
+  .vision {
+    grid-template-columns: 1fr;
+  }
+
+  .hero-index {
+    display: none;
+  }
+
+  .hero h1 {
+    font-size: clamp(4.2rem, 23vw, 8rem);
+  }
+
+  .hero-intro {
+    margin-left: 0;
+  }
+
+  .module-card {
+    grid-template-columns: 2.5rem 1fr auto;
+    min-height: 11rem;
+    padding-block: 1.5rem;
+  }
+
+  .module-symbol,
+  .module-chinese {
+    display: none;
+  }
+
+  .module-name {
+    grid-column: 2;
+  }
+
+  .module-description {
+    grid-column: 2 / -1;
+  }
+
+  .module-arrow {
+    grid-column: 3;
+    grid-row: 1;
+  }
+
+  .vision-marker {
+    font-size: 8rem;
+  }
+}
+
+@media (prefers-reduced-motion: reduce) {
+  *,
+  *::before,
+  *::after {
+    scroll-behavior: auto !important;
+    transition-duration: 0.01ms !important;
+    animation-duration: 0.01ms !important;
+    animation-iteration-count: 1 !important;
+  }
+}
```

## 测试用例

### TC-001 依赖安装

- 类型：环境验证
- 优先级：阻塞
- 操作步骤：执行 `pnpm install`。
- 预期结果：依赖安装完成并生成 `pnpm-lock.yaml`。
- 是否通过：未通过；网络权限审核超时。

### TC-002 品牌首屏编译

- 类型：构建验证
- 优先级：高
- 前置条件：依赖安装完成。
- 操作步骤：执行 `pnpm typecheck` 与 `pnpm build`。
- 预期结果：TypeScript 检查和生产构建无错误。
- 是否通过：待验证。

### TC-003 黑白主题与响应式布局

- 类型：界面验证
- 优先级：高
- 前置条件：开发服务器成功启动。
- 操作步骤：检查主题切换、刷新持久化、移动端模块布局与键盘焦点。
- 预期结果：主题无闪烁且可持久化，主要页面在桌面端和移动端均可访问。
- 是否通过：待验证。

