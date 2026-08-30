# 删除首页宏大叙事区并收紧极客感

## 背景与目标

- 用户认为首页宏大叙事过多，削弱了 LabX 应有的实验室与极客气质。
- 明确删除“作品不再孤立，生命不止一次。”、“每一次交叉，都是下一条路径的起点。”以及最底部过大的 X 图形。
- 目标是让首页从品牌首屏和六个领域直接进入真实作品，页脚只承担导航、品牌文字和版权信息。

## 约束与原则

- 完整删除对应 section，而不是只隐藏标题，避免继续保留空白高度和重复视觉。
- 保留 Hero、六模块入口、精选作品、媒体链接、隐私入口和黑白主题。
- 页脚移除 X 后同步压缩高度并增加细分隔线，避免形成无内容的大块留白。
- 清理所有专用 CSS 与移动端残留规则，不保留失效选择器。
- 将“克制、实验导向、避免连续宏大宣言”更新为项目核心品牌认知。

## 阶段与 TODO

- [x] 删除 `vision` 愿景 section。
- [x] 删除 `x-signature` 视觉宣言 section。
- [x] 删除页脚巨型 X 与对应组件依赖。
- [x] 清理桌面端、移动端专用 CSS。
- [x] 压缩六领域、精选作品和页脚的相邻留白。
- [x] 增加首页叙事密度与页脚无大 X 的回归测试。
- [x] 更新既有 XMark 品牌测试。
- [x] 更新项目核心认知、文档索引和本次变更记录。
- [x] 完成格式、Lint、类型、全量测试、本地响应和生产构建验证。

## 关键风险

- 删除两个 section 后，`worlds` 与 `featured` 直接相邻；已分别调整下边距与整体 padding，并用细边框明确分区。
- 页脚移除 X 后原有 `18rem/24rem` 最小高度会显得空；已收紧为桌面 `14rem`、移动端 `18rem`。
- 历史变更文档仍会出现被删除的文案，这是版本留痕，不属于运行时代码或当前页面内容。

## 当前进展

- 首页结构已收紧为 `Hero → 六个领域 → 精选作品 → 功能页脚`。
- 删除约 `150svh` 的宣言型页面高度与两处重复大 X。
- 页脚仅保留小号 `LAB`、口号、关于、隐私、媒体入口和版权信息。
- 新测试会阻止三个被删除对象重新进入首页源码或共享样式。

## 代码变更

### `app/page.tsx`

```diff
diff --git a/app/page.tsx b/app/page.tsx
--- a/app/page.tsx
+++ b/app/page.tsx
@@
-      <section className="vision" id="vision" aria-labelledby="vision-title">
-        <XMark className="vision-x-mark" />
-        <div>
-          <p className="eyebrow">OUR VISION</p>
-          <h2 id="vision-title">作品不再孤立，生命不止一次。</h2>
-          <p>
-            Music 为 Game 注入情绪，Book 提供叙事，Art 塑造形体，Movie
-            延展时间，Life 让人格继续存在。每一份创作都成为下一份创作的起点。
-          </p>
-        </div>
-      </section>
-
       <section className="featured" aria-labelledby="featured-title">
@@
-      <section className="x-signature" aria-labelledby="x-signature-title">
-        <div className="x-signature-visual" aria-hidden="true">
-          <span>FORM / X-02</span>
-          <XMark className="x-signature-mark" />
-          <span>45° / 135°</span>
-        </div>
-        <div className="x-signature-copy">
-          <p className="eyebrow">LABX VISUAL SYSTEM</p>
-          <h2 id="x-signature-title">每一次交叉，都是下一条路径的起点。</h2>
-          <p>两道斜线在中心相遇，像不同媒介、角色和记忆在同一世界汇合。</p>
-        </div>
-      </section>
-
       <SiteFooter />
```

### `components/site-footer.tsx`

```diff
diff --git a/components/site-footer.tsx b/components/site-footer.tsx
--- a/components/site-footer.tsx
+++ b/components/site-footer.tsx
@@
 import Link from "next/link";
 
-import { XMark } from "@/components/x-mark";
 import { siteConfig } from "@/lib/site";
@@
     <footer className="site-footer">
-      <div className="footer-brand">
-        <XMark className="footer-wordmark-x" />
-        <div className="footer-brand-copy">
-          <p className="footer-wordmark-label">LAB</p>
-          <p>{siteConfig.slogan}</p>
-        </div>
+      <div className="footer-brand-copy">
+        <p className="footer-wordmark-label">LAB</p>
+        <p>{siteConfig.slogan}</p>
       </div>
```

### `app/globals.css`

```diff
diff --git a/app/globals.css b/app/globals.css
--- a/app/globals.css
+++ b/app/globals.css
@@
 .worlds {
-  padding-block: clamp(6rem, 12vw, 12rem);
+  padding-block: clamp(6rem, 12vw, 12rem) clamp(4rem, 6vw, 6rem);
 }
 
 .featured {
-  padding-block: clamp(6rem, 12vw, 12rem);
+  border-top: 1px solid var(--line);
+  padding-block: clamp(4rem, 8vw, 8rem);
 }
@@
-.section-heading h2,
-.vision h2 {
+.section-heading h2 {
   margin: 0;
   font-family: var(--display-cjk);
   font-size: clamp(2.6rem, 7vw, 7rem);
@@
-.vision {
-  display: grid;
-  min-height: 80svh;
-  grid-template-columns: 1fr 3fr;
-  align-items: center;
-  gap: 2rem;
-  border-block: 1px solid var(--line);
-  padding-block: clamp(5rem, 10vw, 10rem);
-}
-
-.vision-x-mark {
-  width: clamp(7rem, 18vw, 17rem);
-  height: clamp(7rem, 18vw, 17rem);
-  color: var(--foreground);
-}
-
-.vision h2 {
-  max-width: 10ch;
-  margin-block: 2rem;
-}
-
-.vision div > p:last-child {
-  max-width: 42rem;
-  margin: 0;
-  color: var(--muted);
-  font-size: clamp(1rem, 1.4vw, 1.25rem);
-  line-height: 1.9;
-}
-
 .work-grid {
@@
-.x-signature {
-  display: grid;
-  min-height: 70svh;
-  grid-template-columns: 1fr 1fr;
-  align-items: stretch;
-  border-block: 1px solid var(--line);
-}
-
-.x-signature-visual {
-  position: relative;
-  display: grid;
-  min-height: 34rem;
-  place-items: center;
-  border-right: 1px solid var(--line);
-  background:
-    linear-gradient(
-      45deg,
-      transparent calc(50% - 0.5px),
-      var(--line) 50%,
-      transparent calc(50% + 0.5px)
-    ),
-    linear-gradient(
-      -45deg,
-      transparent calc(50% - 0.5px),
-      var(--line) 50%,
-      transparent calc(50% + 0.5px)
-    );
-}
-
-.x-signature-visual > span:not(.x-mark) {
-  position: absolute;
-  color: var(--muted);
-  font-size: 0.6rem;
-  font-weight: 700;
-  letter-spacing: 0.16em;
-}
-
-.x-signature-visual > span:first-child {
-  top: 1.25rem;
-  left: 1.25rem;
-}
-
-.x-signature-visual > span:last-child {
-  right: 1.25rem;
-  bottom: 1.25rem;
-}
-
-.x-signature-mark {
-  width: min(62%, 25rem);
-  aspect-ratio: 1;
-}
-
-.x-signature-copy {
-  display: flex;
-  flex-direction: column;
-  justify-content: center;
-  padding: clamp(3rem, 7vw, 7rem);
-}
-
-.x-signature-copy h2 {
-  max-width: 9ch;
-  margin: 2rem 0;
-  font-family: var(--display-cjk);
-  font-size: clamp(2.8rem, 6vw, 6rem);
-  font-weight: 820;
-  letter-spacing: 0.01em;
-  line-height: 1.1;
-}
-
-.x-signature-copy > p:last-child {
-  max-width: 34rem;
-  margin: 0;
-  color: var(--muted);
-  line-height: 1.8;
-}
-
 .module-hero {
@@
 .site-footer {
   display: grid;
-  min-height: 18rem;
+  min-height: 14rem;
   grid-template-columns: 2fr 1fr 1fr;
   align-items: end;
   gap: 2rem;
+  border-top: 1px solid var(--line);
   padding-block: 3rem;
@@
-.footer-brand {
-  display: grid;
-  grid-template-columns: auto minmax(8rem, 1fr);
-  align-items: end;
-  gap: clamp(0.75rem, 2vw, 1.5rem);
-  width: fit-content;
-}
-
-.footer-brand-copy {
-  padding-bottom: clamp(0.9rem, 2vw, 1.5rem);
-}
-
 .footer-brand-copy p {
@@
-.footer-wordmark-x {
-  width: clamp(10rem, 16vw, 14rem);
-  height: clamp(10rem, 16vw, 14rem);
-  -webkit-mask-size: 135%;
-  mask-size: 135%;
-}
-
 .footer-nav {
@@
   .hero-body,
-  .section-heading,
-  .vision {
+  .section-heading {
     grid-template-columns: 1fr;
   }
@@
   .work-detail-header,
   .work-information,
   .editorial-layout,
-  .x-signature,
   .site-footer {
     grid-template-columns: 1fr;
   }
@@
-  .x-signature-visual {
-    min-height: 24rem;
-    border-right: 0;
-    border-bottom: 1px solid var(--line);
-  }
-
   .about-modules {
@@
   .site-footer {
-    min-height: 24rem;
+    min-height: 18rem;
     align-items: start;
   }
-
-  .footer-brand {
-    grid-template-columns: auto minmax(0, 1fr);
-  }
-
-  .footer-wordmark-x {
-    width: clamp(7.5rem, 38vw, 10rem);
-    height: clamp(7.5rem, 38vw, 10rem);
-  }
@@
-  .vision-marker {
-    font-size: 8rem;
-  }
 }
```

### `tests/x-mark.test.tsx`

```diff
diff --git a/tests/x-mark.test.tsx b/tests/x-mark.test.tsx
--- a/tests/x-mark.test.tsx
+++ b/tests/x-mark.test.tsx
@@
-  it("页头与页脚以大号 X 为主符号，LAB 仅作为小号标签", () => {
+  it("页头以大号 X 为主符号，页脚仅保留小号 LAB 标签", () => {
     const headerLabel = getRule(".wordmark-label");
     const headerX = getRule(".wordmark-x");
     const footerLabel = getRule(".footer-wordmark-label");
-    const footerX = getRule(".footer-wordmark-x");
@@
     expect(headerX).toContain("mask-size: 135%");
     expect(footerLabel).toContain("font-size: clamp(0.64rem, 0.8vw, 0.78rem)");
     expect(footerLabel).toContain("color: var(--muted)");
-    expect(footerX).toContain("width: clamp(10rem, 16vw, 14rem)");
-    expect(footerX).toContain("mask-size: 135%");
+    expect(globalStyles).not.toContain(".footer-wordmark-x");
   });
```

### `tests/home-page.test.ts`

```diff
diff --git a/tests/home-page.test.ts b/tests/home-page.test.ts
new file mode 100644
--- /dev/null
+++ b/tests/home-page.test.ts
@@
+import { readFileSync } from "node:fs";
+import { resolve } from "node:path";
+
+import { describe, expect, it } from "vitest";
+
+const homeSource = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
+const footerSource = readFileSync(
+  resolve(process.cwd(), "components/site-footer.tsx"),
+  "utf8",
+);
+const globalStyles = readFileSync(
+  resolve(process.cwd(), "app/globals.css"),
+  "utf8",
+);
+
+describe("首页叙事密度", () => {
+  it("不再渲染宏大叙事区块和页脚巨型 X", () => {
+    expect(homeSource).not.toContain("作品不再孤立，生命不止一次。");
+    expect(homeSource).not.toContain("每一次交叉，都是下一条路径的起点。");
+    expect(homeSource).not.toContain('className="vision"');
+    expect(homeSource).not.toContain('className="x-signature"');
+    expect(footerSource).not.toContain("footer-wordmark-x");
+    expect(globalStyles).not.toContain(".vision {");
+    expect(globalStyles).not.toContain(".x-signature {");
+    expect(globalStyles).not.toContain(".footer-wordmark-x");
+  });
+});
```

### `AGENTS.md`

```diff
diff --git a/AGENTS.md b/AGENTS.md
--- a/AGENTS.md
+++ b/AGENTS.md
@@
 - 核心视觉符号：细长、中心对称的四尖 `X-icon`；以透明 SVG 矢量图形作为 CSS alpha 遮罩，并通过 `currentColor` 自动适配黑白主题与任意展示尺寸。
 - 版式语言：围绕 X 的两条斜线轴，使用细边框、坐标标记、几何网格和充足留白建立统一视觉系统。
+- 叙事语气：以实验、作品、连接关系和可操作信息为主，保持克制的极客感，避免连续宏大宣言与重复巨型符号。
```

### `.agentdocs/index.md`

```diff
diff --git a/.agentdocs/index.md b/.agentdocs/index.md
--- a/.agentdocs/index.md
+++ b/.agentdocs/index.md
@@
 ## 当前变更文档
 
+`workflow/20260830192517-remove-grand-narrative-sections.md` - 删除首页两个宏大叙事区和页脚巨型 X，压缩相邻留白并确立克制、实验导向的极客叙事；继续调整首页内容密度或品牌语气时读取。
 `workflow/20260830183234-replace-x-raster-mask-with-svg.md` - 将全站 X-icon 从透明 PNG 遮罩替换为同轮廓的透明 SVG 矢量遮罩，解决大尺寸边缘不清晰问题；维护 X 资源、遮罩或缩放清晰度时读取。
```

## 测试用例

### TC-001 首页移除宏大叙事区

- 类型：源码回归测试
- 优先级：高
- 操作步骤：读取首页、页脚与全局样式源码。
- 预期结果：两个指定文案、`vision`、`x-signature` 和 `footer-wordmark-x` 均不存在。
- 是否通过：通过。

### TC-002 页脚品牌层级

- 类型：单元回归测试
- 优先级：高
- 操作步骤：读取页头 X 与页脚 LAB 的共享品牌样式。
- 预期结果：页头继续保留大号 SVG X；页脚只保留小号 LAB，不存在巨型 X 规则。
- 是否通过：通过。

### TC-003 全量测试

- 类型：单元与组件测试
- 优先级：高
- 操作步骤：执行 `npm test`。
- 预期结果：内容、主题、排版、作品、首页密度与 XMark 测试全部通过。
- 是否通过：通过；6 个测试文件共 18 项测试通过。

### TC-004 静态检查与格式

- 类型：代码质量测试
- 优先级：高
- 操作步骤：执行 `npm run format:check`、`npm run lint` 和 `npm run typecheck`。
- 预期结果：全部无错误。
- 是否通过：通过。

### TC-005 本地首页与生产构建

- 类型：运行时与构建测试
- 优先级：高
- 操作步骤：请求 `http://localhost:3000/` 并执行 `npm run build`。
- 预期结果：首页返回 HTTP 200，全部计划路由正常静态生成。
- 是否通过：通过；首页返回 HTTP 200，生产构建生成 21 个静态页面。
