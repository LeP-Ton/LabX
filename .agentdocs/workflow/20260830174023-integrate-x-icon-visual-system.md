# 将 X-icon 建立为全站视觉系统

## 背景与目标

- 用户将 X 系列静态资源手动放入 `public/`，要求实际使用 `x-icon`，并按照其风格重新设计页面。
- 本次目标不是单点替换图标，而是提取四尖 X 的斜线轴、中心交叉、细边框和几何坐标语言，统一应用到全部主要页面。
- 保留既有内容架构、黑白主题、中文排版、静态生成、SEO、分析和无障碍能力。

## 约束与原则

- 站点继续保持黑白主题，不引入红色作为常驻 UI 色，以免破坏深色主题和既有品牌边界。
- 使用用户提供的 `x-icon-black-transparent.png` 作为 CSS 遮罩，以 `currentColor` 自动适配黑白主题，只加载一个透明资源。
- favicon 使用稍粗四尖版本，保证 16–32px 下的辨识度；正文视觉继续使用细长透明版本。
- 不上线 GIF：资产检查发现文件尾存在异常帧数据，`sharp/libvips` 无法稳定解析。
- 不启用无限循环 WebP：动画包含空白首帧、淡出与无限循环，当前页面更适合稳定、克制的静态标志。
- 功能控件继续复用既有组件和 Lucide 图标；X-icon 只承担品牌与装饰语义。

## 阶段与 TODO

- [x] 审查 `public/x-x-x20` 与 `public/x` 的透明、SVG、动画和完整字标资源。
- [x] 建立可复用、主题自适应的 `XMark` 组件。
- [x] 完成页头与首页 Hero 的第一版视觉切片并确认本地响应 200。
- [x] 将 X 视觉扩展到模块入口、愿景、作品封面、模块页、详情页、编辑页、404 和页脚。
- [x] 更新应用图标、传统 favicon、Open Graph / X 分享图与元数据尺寸。
- [x] 增加 XMark 静态资源、遮罩与无障碍回归测试。
- [x] 更新核心项目认知、文档索引和完整变更记录。
- [x] 通过格式、Lint、类型、全量测试和生产构建。

## 资产选型结论

- 主站图标：`public/x-x-x20/outputs/x-icon-black-transparent.png`，1254×1254、真透明、35607 字节。
- favicon 几何：`x-diagonal-symmetric-centered.svg` 的稍粗四尖坐标，小尺寸优于细长版。
- 不使用：`x-connected-centered.png`（体积大且边缘偏柔）、所有 GIF（帧数据异常）、`public/x/outputs` 红色完整字标（白底且不适配深色主题）。
- 暂不使用：透明 WebP 动画；仅在未来需要单处品牌动效并补齐减少动态效果降级时考虑。

## 关键风险

- `public/` 中包含用户完整搬入的工作文件、脚本和历史文档；当前仅引用明确的 `outputs/` 成品，不自动清理用户资产。
- CSS mask 依赖现代浏览器遮罩能力，同时声明 `-webkit-mask` 与标准 `mask` 以覆盖主流浏览器。
- 新社交图由生成模型制作，已人工检查标题和口号准确，但不作为产品详情页的作品封面继承。

## 当前进展

- `XMark` 组件通过 `currentColor` 在浅色主题显示黑色、深色主题显示白色。
- Hero 使用 X 图标、双斜线轴、坐标和角度标记；中文主标题继续使用安全字距和行高。
- 六模块入口、作品视觉、模块页、关于、隐私、404 和页脚共享同一 X 形态。
- 首页旧社交卡展示区替换为 X 视觉系统叙事区；社交分享图仍通过元数据独立使用。
- 新分享图由内置 ImageGen 单次生成，工作区外源文件为 `labx-social-share-card-20260830.png`。

## 生成文件留痕

- `public/og.png`：1731×909，821790 字节，SHA-256 `A7014915FC6B7CB6685A32C52FFC60867E3F7BC1F8D3E5193C0ADC6F280349B9`。
- ImageGen 模式：使用用户 X-icon 作为参考的全新横向品牌图生成，仅调用一次。
- ImageGen 提示词要点：保持细长双斜线与四尖几何；纯黑白；仅含“LabX”和“探索和重构一切”；加入锐利斜线、细边框、轴线和留白；禁止红色、额外文字与水印。

## 代码变更

### 新增可复用 XMark

```diff
diff --git a/components/x-mark.tsx b/components/x-mark.tsx
new file mode 100644
--- /dev/null
+++ b/components/x-mark.tsx
@@ -0,0 +1,17 @@
+import type { HTMLAttributes } from "react";
+
+import { cn } from "@/lib/utils";
+
+type XMarkProps = HTMLAttributes<HTMLSpanElement>;
+
+/** 使用用户提供的透明 X 图标作为主题自适应遮罩。 */
+export function XMark({ className, ...props }: XMarkProps) {
+  return (
+    <span
+      aria-hidden="true"
+      className={cn("x-mark", className)}
+      {...props}
+    />
+  );
+}
```

### 首页与共享组件

```diff
diff --git a/components/site-header.tsx b/components/site-header.tsx
--- a/components/site-header.tsx
+++ b/components/site-header.tsx
@@
 import { ThemeToggle } from "@/components/theme-toggle";
+import { XMark } from "@/components/x-mark";
@@
-        LAB<span aria-hidden="true">×</span>
+        <span>LAB</span>
+        <XMark className="wordmark-x" />

diff --git a/components/site-footer.tsx b/components/site-footer.tsx
--- a/components/site-footer.tsx
+++ b/components/site-footer.tsx
@@
+import { XMark } from "@/components/x-mark";
@@
-        <p className="footer-wordmark">LAB×</p>
+        <p className="footer-wordmark">
+          LAB
+          <XMark className="footer-wordmark-x" />
+        </p>

diff --git a/components/work-visual.tsx b/components/work-visual.tsx
--- a/components/work-visual.tsx
+++ b/components/work-visual.tsx
@@
+import { XMark } from "@/components/x-mark";
 import type { ContentType } from "@/lib/site";
@@
       <span className="work-visual-grid" />
+      <XMark className="work-visual-mark" />
       <span className="work-visual-index">{index}</span>
```

### 首页重构

```diff
diff --git a/app/page.tsx b/app/page.tsx
--- a/app/page.tsx
+++ b/app/page.tsx
@@
 import Link from "next/link";
-import Image from "next/image";
-import { ArrowDownRight, Asterisk } from "lucide-react";
+import { ArrowDownRight } from "lucide-react";
@@
+import { XMark } from "@/components/x-mark";
@@
-          <p className="hero-index" aria-hidden="true">
-            X
-          </p>
-          <div>
+          <div className="hero-x-stage" aria-hidden="true">
+            <span className="hero-x-coordinate">X / 00</span>
+            <XMark className="hero-x-mark" />
+            <span className="hero-x-axis">AXIS 45°</span>
+          </div>
+          <div className="hero-copy">
@@
-                <Asterisk strokeWidth={1} />
+                <XMark className="module-x-mark" />
@@
-        <p className="vision-marker">∞</p>
+        <XMark className="vision-x-mark" />
@@
-      <section className="brand-card" aria-label="LabX 品牌视觉">
-        <Image
-          src="/og.png"
-          alt="LabX，探索和重构一切"
-          width={1734}
-          height={912}
-          sizes="(max-width: 760px) 100vw, 92vw"
-        />
+      <section className="x-signature" aria-labelledby="x-signature-title">
+        <div className="x-signature-visual" aria-hidden="true">
+          <span>FORM / X-02</span>
+          <XMark className="x-signature-mark" />
+          <span>45° / 135°</span>
+        </div>
+        <div className="x-signature-copy">
+          <p className="eyebrow">LABX VISUAL SYSTEM</p>
+          <h2 id="x-signature-title">每一次交叉，都是下一条路径的起点。</h2>
+          <p>两道斜线在中心相遇，像不同媒介、角色和记忆在同一世界汇合。</p>
+        </div>
       </section>
```

### 模块、编辑页和错误页

```diff
diff --git a/app/[module]/page.tsx b/app/[module]/page.tsx
--- a/app/[module]/page.tsx
+++ b/app/[module]/page.tsx
@@
 import { WorkCard } from "@/components/work-card";
+import { XMark } from "@/components/x-mark";
@@
-        <p className="module-hero-index">{definition.index}</p>
+        <div className="module-hero-symbol" aria-hidden="true">
+          <span className="module-hero-index">{definition.index}</span>
+          <XMark className="module-hero-x" />
+        </div>

diff --git a/app/about/page.tsx b/app/about/page.tsx
--- a/app/about/page.tsx
+++ b/app/about/page.tsx
@@
 import { SiteFooter } from "@/components/site-footer";
+import { XMark } from "@/components/x-mark";
@@
       <header className="editorial-hero">
+        <XMark className="editorial-x-mark" />

diff --git a/app/privacy/page.tsx b/app/privacy/page.tsx
--- a/app/privacy/page.tsx
+++ b/app/privacy/page.tsx
@@
 import { SiteFooter } from "@/components/site-footer";
+import { XMark } from "@/components/x-mark";
@@
       <header className="editorial-hero editorial-hero--compact">
+        <XMark className="editorial-x-mark" />

diff --git a/app/not-found.tsx b/app/not-found.tsx
--- a/app/not-found.tsx
+++ b/app/not-found.tsx
@@
 import Link from "next/link";
+
+import { XMark } from "@/components/x-mark";
@@
     <main id="main-content" className="not-found">
+      <XMark className="not-found-x" />
```

### 图标与社交元数据

```diff
diff --git a/app/layout.tsx b/app/layout.tsx
--- a/app/layout.tsx
+++ b/app/layout.tsx
@@
         url: "/og.png",
-        width: 1734,
-        height: 912,
+        width: 1731,
+        height: 909,

diff --git a/app/icon.svg b/app/icon.svg
--- a/app/icon.svg
+++ b/app/icon.svg
@@
-<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
-  <rect width="64" height="64" fill="#0a0a0a"/>
-  <path d="M15 10 32 28 49 10 55 16 38 32 55 48 49 54 32 36 15 54 9 48 26 32 9 16Z" fill="#f4f3ef"/>
+<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254">
+  <rect width="1254" height="1254" fill="#080808"/>
+  <!-- 小尺寸图标使用稍粗的四尖版本，确保 16–32px 下仍可辨识。 -->
+  <polygon points="310,310 627,525 1052,202 729,627 944,944 627,729 202,1052 525,627" fill="#f4f3ef"/>
 </svg>

diff --git a/app/favicon.ico/route.ts b/app/favicon.ico/route.ts
--- a/app/favicon.ico/route.ts
+++ b/app/favicon.ico/route.ts
@@
-const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
-  <rect width="64" height="64" fill="#0a0a0a"/>
-  <path d="M15 10 32 28 49 10 55 16 38 32 55 48 49 54 32 36 15 54 9 48 26 32 9 16Z" fill="#f4f3ef"/>
+const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254">
+  <rect width="1254" height="1254" fill="#080808"/>
+  <polygon points="310,310 627,525 1052,202 729,627 944,944 627,729 202,1052 525,627" fill="#f4f3ef"/>
 </svg>`;
```

### 全局 X 视觉样式

```diff
diff --git a/app/globals.css b/app/globals.css
--- a/app/globals.css
+++ b/app/globals.css
@@
   --line: #b9b8b2;
+  --x-icon: url("/x-x-x20/outputs/x-icon-black-transparent.png");
@@
+.x-mark {
+  display: inline-block;
+  flex: 0 0 auto;
+  background: currentColor;
+  -webkit-mask: var(--x-icon) center / contain no-repeat;
+  mask: var(--x-icon) center / contain no-repeat;
+}
+
 .wordmark {
+  display: inline-flex;
+  align-items: center;
+  gap: 0.2rem;
@@
-.wordmark span {
-  display: inline-block;
-  margin-left: 0.08em;
-  font-weight: 400;
+.wordmark-x {
+  width: 1.05rem;
+  height: 1.05rem;
 }
@@
 .hero-body {
-  grid-template-columns: minmax(4rem, 1fr) minmax(0, 5fr);
+  grid-template-columns: minmax(18rem, 0.95fr) minmax(0, 1.65fr);
-  gap: 2rem;
+  gap: clamp(2rem, 6vw, 7rem);
 }
 
-.hero-index {
-  margin: 0;
-  color: var(--muted);
-  font-family: var(--display);
-  font-size: clamp(5rem, 14vw, 13rem);
-  font-weight: 200;
-  line-height: 0.72;
+.hero-x-stage {
+  position: relative;
+  width: min(100%, 32rem);
+  aspect-ratio: 1;
+  border: 1px solid var(--line);
+  color: var(--foreground);
+  background:
+    linear-gradient(
+      45deg,
+      transparent calc(50% - 0.5px),
+      var(--line) 50%,
+      transparent calc(50% + 0.5px)
+    ),
+    linear-gradient(
+      -45deg,
+      transparent calc(50% - 0.5px),
+      var(--line) 50%,
+      transparent calc(50% + 0.5px)
+    );
+}
+
+.hero-x-mark {
+  position: absolute;
+  inset: 13%;
+}
+
+.hero-x-coordinate,
+.hero-x-axis {
+  position: absolute;
+  z-index: 1;
+  padding: 0.25rem 0.4rem;
+  background: var(--background);
+  color: var(--muted);
+  font-size: 0.58rem;
+  font-weight: 700;
+  letter-spacing: 0.16em;
+}
+
+.hero-x-coordinate {
+  top: -0.55rem;
+  left: 1rem;
+}
+.hero-x-axis {
+  right: 1rem;
+  bottom: -0.55rem;
+}
+.hero-copy {
+  min-width: 0;
+}
@@
-.module-symbol svg {
+.module-symbol {
+  display: flex;
+  align-items: center;
+}
+.module-x-mark {
   width: 1.25rem;
+  height: 1.25rem;
 }
@@
-.vision-marker {
-  margin: 0;
-  font-family: Georgia, serif;
-  font-size: clamp(6rem, 16vw, 16rem);
-  font-weight: 300;
-  line-height: 1;
+.vision-x-mark {
+  width: clamp(7rem, 18vw, 17rem);
+  height: clamp(7rem, 18vw, 17rem);
+  color: var(--foreground);
 }
@@
+.work-visual-mark {
+  position: absolute;
+  top: 50%;
+  left: 50%;
+  width: 46%;
+  height: 74%;
+  opacity: 0.2;
+  transform: translate(-50%, -50%);
+}
@@
-.brand-card {
-  border-block: 1px solid var(--line);
-  padding-block: clamp(1rem, 3vw, 3rem);
-}
-.brand-card img { display: block; width: 100%; height: auto; }
+.x-signature {
+  display: grid;
+  min-height: 70svh;
+  grid-template-columns: 1fr 1fr;
+  align-items: stretch;
+  border-block: 1px solid var(--line);
+}
+.x-signature-visual {
+  position: relative;
+  display: grid;
+  min-height: 34rem;
+  place-items: center;
+  border-right: 1px solid var(--line);
+  background:
+    linear-gradient(
+      45deg,
+      transparent calc(50% - 0.5px),
+      var(--line) 50%,
+      transparent calc(50% + 0.5px)
+    ),
+    linear-gradient(
+      -45deg,
+      transparent calc(50% - 0.5px),
+      var(--line) 50%,
+      transparent calc(50% + 0.5px)
+    );
+}
+.x-signature-visual > span:not(.x-mark) {
+  position: absolute;
+  color: var(--muted);
+  font-size: 0.6rem;
+  font-weight: 700;
+  letter-spacing: 0.16em;
+}
+.x-signature-visual > span:first-child {
+  top: 1.25rem;
+  left: 1.25rem;
+}
+.x-signature-visual > span:last-child {
+  right: 1.25rem;
+  bottom: 1.25rem;
+}
+.x-signature-mark {
+  width: min(62%, 25rem);
+  aspect-ratio: 1;
+}
+.x-signature-copy {
+  display: flex;
+  flex-direction: column;
+  justify-content: center;
+  padding: clamp(3rem, 7vw, 7rem);
+}
+.x-signature-copy h2 {
+  max-width: 9ch;
+  margin: 2rem 0;
+  font-family: var(--display-cjk);
+  font-size: clamp(2.8rem, 6vw, 6rem);
+  font-weight: 820;
+  letter-spacing: 0.01em;
+  line-height: 1.1;
+}
+.x-signature-copy > p:last-child {
+  max-width: 34rem;
+  margin: 0;
+  color: var(--muted);
+  line-height: 1.8;
+}
@@
 .module-hero-index {
+  position: absolute;
+  top: 1rem;
+  left: 1rem;
@@
+}
+.module-hero-symbol {
+  position: relative;
+  width: min(100%, 19rem);
+  aspect-ratio: 1;
+  border: 1px solid var(--line);
+}
+.module-hero-symbol::before,
+.module-hero-symbol::after {
+  position: absolute;
+  inset: 50% 0 auto;
+  height: 1px;
+  background: var(--line);
+  content: "";
+}
+.module-hero-symbol::before {
+  transform: rotate(45deg);
+}
+.module-hero-symbol::after {
+  transform: rotate(-45deg);
+}
+.module-hero-x {
+  position: absolute;
+  inset: 17%;
+}
@@
 .editorial-hero {
+  position: relative;
@@
+}
+.editorial-x-mark {
+  position: absolute;
+  top: clamp(3rem, 8vw, 7rem);
+  right: 0;
+  width: clamp(8rem, 22vw, 22rem);
+  height: clamp(8rem, 22vw, 22rem);
+  color: var(--line);
+}
@@
 .editorial-hero h1 {
+  position: relative;
@@
 .not-found {
+  position: relative;
+  overflow: hidden;
@@
+}
+.not-found-x {
+  position: absolute;
+  right: -4%;
+  bottom: 3%;
+  width: min(42vw, 34rem);
+  height: min(42vw, 34rem);
+  color: var(--line);
+}
@@
 .not-found > p,
 .not-found h1,
 .not-found a {
+  position: relative;
 }
@@
 .footer-wordmark {
+  display: flex;
+  align-items: center;
+  gap: 0.25rem;
@@
+}
+.footer-wordmark-x {
+  width: 0.8em;
+  height: 0.8em;
+}
@@
 @media (max-width: 760px) {
+  .hero-x-stage {
+    width: min(66vw, 18rem);
+  }
@@
+  .x-signature { grid-template-columns: 1fr; }
   .module-hero {
-    grid-template-columns: 2.5rem 1fr;
+    grid-template-columns: 1fr;
   }
+  .module-hero-symbol {
+    width: 8rem;
+  }
+  .x-signature-visual {
+    min-height: 24rem;
+    border-right: 0;
+    border-bottom: 1px solid var(--line);
+  }
```

### XMark 回归测试

```diff
diff --git a/tests/x-mark.test.tsx b/tests/x-mark.test.tsx
new file mode 100644
--- /dev/null
+++ b/tests/x-mark.test.tsx
@@ -0,0 +1,40 @@
+import { existsSync, readFileSync } from "node:fs";
+import { resolve } from "node:path";
+
+import { render, screen } from "@testing-library/react";
+import { describe, expect, it } from "vitest";
+
+import { XMark } from "@/components/x-mark";
+
+const iconPath = resolve(
+  process.cwd(),
+  "public/x-x-x20/outputs/x-icon-black-transparent.png",
+);
+
+describe("XMark 品牌图标", () => {
+  it("使用用户提供的透明静态资源作为主题遮罩", () => {
+    const globalStyles = readFileSync(
+      resolve(process.cwd(), "app/globals.css"),
+      "utf8",
+    );
+
+    expect(existsSync(iconPath)).toBe(true);
+    expect(globalStyles).toContain(
+      '--x-icon: url("/x-x-x20/outputs/x-icon-black-transparent.png")',
+    );
+    expect(globalStyles).toContain("mask: var(--x-icon) center / contain no-repeat");
+  });
+
+  it("默认作为装饰元素隐藏于辅助技术", () => {
+    render(<XMark className="test-x-mark" data-testid="x-mark" />);
+
+    const mark = screen.getByTestId("x-mark");
+    expect(mark).toHaveClass("x-mark", "test-x-mark");
+    expect(mark).toHaveAttribute("aria-hidden", "true");
+  });
+});
```

### 项目认知与索引

```diff
diff --git a/AGENTS.md b/AGENTS.md
--- a/AGENTS.md
+++ b/AGENTS.md
@@
 - 主题能力：支持黑色与白色主题切换，并在两种模式中保持一致的品牌辨识度与可读性。
+- 核心视觉符号：细长、中心对称的四尖 `X-icon`；以透明黑色 PNG 作为 CSS 遮罩并通过 `currentColor` 自动适配黑白主题。
+- 版式语言：围绕 X 的两条斜线轴，使用细边框、坐标标记、几何网格和充足留白建立统一视觉系统。

diff --git a/.agentdocs/index.md b/.agentdocs/index.md
--- a/.agentdocs/index.md
+++ b/.agentdocs/index.md
@@
 ## 当前变更文档
+`workflow/20260830174023-integrate-x-icon-visual-system.md` - 将用户提供的 X-icon 建立为全站核心视觉符号，重构首页、模块、作品、编辑页、图标和社交分享图；继续调整品牌视觉或静态资源时优先读取。
@@
+- X-icon 已成为全站核心视觉符号，通过 CSS 遮罩应用于页头、Hero、模块、作品、编辑页与页脚，并同步更新 favicon 和社交分享图。
```

## 测试用例

### TC-001 主题自适应 XMark

- 类型：组件与静态资源测试
- 优先级：高
- 操作步骤：检查透明资源存在、CSS 遮罩路径、标准与 WebKit mask 声明，并渲染 `XMark`。
- 预期结果：组件包含 `x-mark` 类，默认 `aria-hidden=true`，资源路径有效。
- 是否通过：通过；2 项测试全部通过。

### TC-002 既有功能回归

- 类型：单元与组件测试
- 优先级：高
- 操作步骤：执行 `npm test`。
- 预期结果：内容、主题、作品卡片、中文排版和 XMark 测试全部通过。
- 是否通过：通过；5 个测试文件共 16 项测试通过。

### TC-003 静态检查

- 类型：代码质量测试
- 优先级：高
- 操作步骤：执行 `npm run lint` 与 `npm run typecheck`。
- 预期结果：无 ESLint 和 TypeScript 错误。
- 是否通过：通过。

### TC-004 生产构建

- 类型：构建测试
- 优先级：高
- 操作步骤：执行 `npm run build`。
- 预期结果：全部路由编译并静态生成，无构建警告。
- 是否通过：通过；生成 21 个静态页面。

### TC-005 本地第一版预览

- 类型：运行时烟雾测试
- 优先级：高
- 操作步骤：开发服务器热更新后请求 `http://localhost:3000/`。
- 预期结果：首页返回成功状态且无阻塞编译错误。
- 是否通过：通过；HTTP 200。
