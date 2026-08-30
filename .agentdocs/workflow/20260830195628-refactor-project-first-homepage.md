# 将首页重构为项目优先首屏

## 背景与目标

- 用户指出页头和页脚的小字应从 `LAB` 统一更正为 `LABX`。
- 旧首页把超大标语和独立 X 展台作为第一视觉层级，核心项目必须滚动后才能看到，与门户的项目入口定位不符。
- 本次目标是把首页改成紧凑的项目工作台：左侧只承担品牌、短标语和快捷导航，右侧首屏直接呈现核心项目。

## 约束与原则

- 保留黑白主题、X-icon 视觉系统、六模块入口、项目详情和跨模块关联能力。
- 不新增宏大叙事；文案只描述项目管理方式、项目状态和可执行入口。
- 桌面端首屏使用一个主项目加两个次项目，三项都限制在视口高度内；移动端按标语、主项目、次项目顺序自然堆叠。
- 核心项目沿用现有 `featured` 数据和发布日期排序，首期选择《余响纪元》《记忆潮汐》《最后的档案馆》；其余项目在下一段展示，避免首屏重复。
- 使用现有 `WorkVisual` 和内容 Schema，不扩充内容元数据，不引入新依赖。

## 阶段与 TODO

- [x] 将页头、页脚字标统一为 `LABX`。
- [x] 删除首页独立 X 展台和三行超大标语布局。
- [x] 建立左侧紧凑品牌说明与双快捷入口。
- [x] 新增首屏核心项目卡，支持主卡和次卡两种密度。
- [x] 在右侧首屏展示三个核心项目。
- [x] 将其余三个项目前置到领域索引之前。
- [x] 完成桌面、中等宽度、低高度和移动端响应式规则。
- [x] 增加项目卡、首屏项目优先级和 LABX 字标回归测试。
- [x] 更新整体项目认知与文档索引。
- [x] 完成格式、Lint、类型、单元/组件测试和生产构建验证。

## 关键风险

- 核心项目当前按 `featured` 后的发布日期取前三项；将来新增更晚的精选项目会改变首屏顺序，届时应在内容模型中增加显式首页排序字段。
- “三项核心项目无需滚动”是桌面端约束；移动端优先保证阅读顺序、触控尺寸和无横向溢出，不强制在单个窄屏视口内塞入三张卡。
- 首屏卡片继续复用抽象 `WorkVisual`，因此不会增加图片下载；主次卡通过局部 CSS 控制视觉密度，不会影响模块页的标准作品卡。
- 验证阶段临时启动生产服务并确认首页返回 HTTP 200 与全部关键项目文案，完成后已关闭该临时进程；用户执行 `pnpm dev` 后即可继续视觉复核。
- 自动截图复核被浏览器的本地 URL 安全策略阻止，未尝试绕过或切换到其他自动化表面；已启动开发服务供用户在现有本地标签中手动刷新确认。

## 当前进展

- 首页结构已调整为 `紧凑标语 + 核心项目 → 其他项目 → 领域索引 → 页脚`。
- 首屏标语从三行、最高 `12rem` 收紧为两行、最高 `5.6rem`，并固定在左侧。
- 右侧用《余响纪元》作为主卡，《记忆潮汐》《最后的档案馆》作为次卡。
- 页头和页脚的文字标签均显示 `LABX`，X-icon 仍是独立的主题符号。
- 低于 `1100px` 时核心项目改为“主卡在上、两张次卡并列”；低于 `760px` 时改为单列。

## 代码变更

### `app/page.tsx`

```diff
diff --git a/app/page.tsx b/app/page.tsx
--- a/app/page.tsx
+++ b/app/page.tsx
@@
 import Link from "next/link";
 import { ArrowDownRight } from "lucide-react";
 
+import { CoreProjectCard } from "@/components/core-project-card";
 import { SiteFooter } from "@/components/site-footer";
 import { WorkCard } from "@/components/work-card";
 import { XMark } from "@/components/x-mark";
@@
 export default function HomePage() {
-  const featuredWorks = loadWorks().filter((work) => work.featured);
+  const works = loadWorks();
+  const featuredWorks = works.filter((work) => work.featured);
+  const coreWorks = featuredWorks.slice(0, 3);
+  const coreWorkIds = new Set(coreWorks.map((work) => work.id));
+  const otherWorks = works.filter((work) => !coreWorkIds.has(work.id));
 
   return (
     <main id="main-content">
       <section className="hero" aria-labelledby="hero-title">
-        <div className="hero-kicker">
-          <span>LABX / DIGITAL CONTENT UNIVERSE</span>
-          <span>EST. 2026</span>
-        </div>
-        <div className="hero-body">
-          <div className="hero-x-stage" aria-hidden="true">
-            <span className="hero-x-coordinate">X / 00</span>
-            <XMark className="hero-x-mark" />
-            <span className="hero-x-axis">AXIS 45°</span>
-          </div>
+        <div className="hero-brief">
+          <div className="hero-kicker">
+            <span>LABX / PROJECT INDEX</span>
+            <span>00—06</span>
+          </div>
+
           <div className="hero-copy">
+            <p className="hero-status">
+              <span aria-hidden="true" />
+              BUILDING IN PUBLIC
+            </p>
             <h1 id="hero-title">
-              探索
-              <br />
-              和重构
+              探索和重构
               <br />
-              一切
-              <span className="hero-dot">。</span>
+              一切<span className="hero-dot">。</span>
             </h1>
             <p className="hero-intro">
-              我们将故事、声音、图像和人格编织为彼此连接的数字世界。
+              用 GitHub 组织并持续迭代 Game、Music、Book、Art、Movie 与 Life
+              项目。
             </p>
           </div>
+
+          <nav className="hero-actions" aria-label="首页快捷入口">
+            <a href="#projects">
+              <span>全部项目</span>
+              <span>
+                {String(works.length).padStart(2, "0")}
+                <ArrowDownRight aria-hidden="true" />
+              </span>
+            </a>
+            <a href="#worlds">
+              <span>领域索引</span>
+              <span>
+                06
+                <ArrowDownRight aria-hidden="true" />
+              </span>
+            </a>
+          </nav>
         </div>
-        <a className="hero-scroll" href="#worlds">
-          探索六个领域
-          <ArrowDownRight aria-hidden="true" />
-        </a>
+
+        <div className="core-projects" aria-labelledby="core-projects-title">
+          <div className="core-projects-heading">
+            <div>
+              <p>CORE PROJECTS / ACTIVE</p>
+              <h2 id="core-projects-title">核心项目</h2>
+            </div>
+            <span>{String(coreWorks.length).padStart(2, "0")}</span>
+          </div>
+
+          <div className="core-project-grid">
+            {coreWorks.map((work, index) => (
+              <CoreProjectCard
+                key={work.id}
+                work={work}
+                index={String(index + 1).padStart(2, "0")}
+                prominence={index === 0 ? "lead" : "compact"}
+              />
+            ))}
+          </div>
+        </div>
       </section>
 
-      <section className="worlds" id="worlds" aria-labelledby="worlds-title">
+      <section
+        className="featured home-projects"
+        id="projects"
+        aria-labelledby="projects-title"
+      >
         <div className="section-heading">
-          <p>CONNECTED DISCIPLINES</p>
-          <h2 id="worlds-title">六个领域，一个宇宙</h2>
+          <p>PROJECT DIRECTORY</p>
+          <div>
+            <h2 id="projects-title">其他项目</h2>
+            <p className="section-intro">
+              按最近更新时间排列，进入项目可查看内容、关联资产与行动入口。
+            </p>
+          </div>
         </div>
-        <div className="module-grid">
-          {modules.map((module) => (
-            <Link
-              className="module-card"
-              href={`/${module.type}`}
-              key={module.type}
-            >
-              <span className="module-index">{module.index}</span>
-              <span className="module-symbol" aria-hidden="true">
-                <XMark className="module-x-mark" />
-              </span>
-              <span className="module-name">{module.name}</span>
-              <span className="module-chinese">{module.chineseName}</span>
-              <span className="module-description">{module.description}</span>
-              <ArrowDownRight className="module-arrow" aria-hidden="true" />
-            </Link>
+        <div className="work-grid home-project-grid">
+          {otherWorks.map((work) => (
+            <WorkCard work={work} key={work.id} />
           ))}
         </div>
       </section>
 
-      <section className="featured" aria-labelledby="featured-title">
+      <section className="worlds" id="worlds" aria-labelledby="worlds-title">
         <div className="section-heading">
-          <p>SELECTED EXPERIMENTS</p>
-          <div>
-            <h2 id="featured-title">正在发生的实验</h2>
-            <p className="section-intro">
-              用演示内容验证六个领域如何共享同一组世界、角色和资产。
-            </p>
-          </div>
+          <p>MODULE INDEX</p>
+          <h2 id="worlds-title">领域索引</h2>
         </div>
-        <div className="work-grid">
-          {featuredWorks.map((work) => (
-            <WorkCard work={work} key={work.id} />
+        <div className="module-grid">
+          {modules.map((module) => (
+            <Link
+              className="module-card"
+              href={`/${module.type}`}
+              key={module.type}
+            >
+              <span className="module-index">{module.index}</span>
+              <span className="module-symbol" aria-hidden="true">
+                <XMark className="module-x-mark" />
+              </span>
+              <span className="module-name">{module.name}</span>
+              <span className="module-chinese">{module.chineseName}</span>
+              <span className="module-description">{module.description}</span>
+              <ArrowDownRight className="module-arrow" aria-hidden="true" />
+            </Link>
           ))}
         </div>
       </section>
```

### `components/core-project-card.tsx`

```diff
diff --git a/components/core-project-card.tsx b/components/core-project-card.tsx
new file mode 100644
--- /dev/null
+++ b/components/core-project-card.tsx
@@
+import { ArrowUpRight } from "lucide-react";
+import Link from "next/link";
+
+import { WorkVisual } from "@/components/work-visual";
+import type { Work } from "@/lib/content/schema";
+import { modules } from "@/lib/site";
+
+interface CoreProjectCardProps {
+  work: Work;
+  index: string;
+  prominence: "lead" | "compact";
+}
+
+/** 首屏项目卡只保留决策所需信息，让项目本身成为首页第一视觉层级。 */
+export function CoreProjectCard({
+  work,
+  index,
+  prominence,
+}: CoreProjectCardProps) {
+  const moduleDefinition = modules.find((module) => module.type === work.type)!;
+
+  return (
+    <article
+      className={`core-project-card core-project-card--${prominence}`}
+      data-prominence={prominence}
+    >
+      <Link
+        href={`/${work.type}/${work.slug}`}
+        aria-label={`查看核心项目：${work.title}`}
+      >
+        <WorkVisual
+          type={work.type}
+          title={work.title}
+          index={moduleDefinition.index}
+        />
+        <div className="core-project-card-copy">
+          <p className="core-project-card-label">
+            <span>PROJECT / {index}</span>
+            <span>
+              {moduleDefinition.name} / {moduleDefinition.chineseName}
+            </span>
+          </p>
+          <div className="core-project-card-title">
+            <h3>{work.title}</h3>
+            <ArrowUpRight aria-hidden="true" />
+          </div>
+          <p className="core-project-card-summary">{work.summary}</p>
+        </div>
+      </Link>
+    </article>
+  );
+}
```

### `components/site-header.tsx`

```diff
diff --git a/components/site-header.tsx b/components/site-header.tsx
--- a/components/site-header.tsx
+++ b/components/site-header.tsx
@@
-        <span className="wordmark-label">LAB</span>
+        <span className="wordmark-label">LABX</span>
```

### `components/site-footer.tsx`

```diff
diff --git a/components/site-footer.tsx b/components/site-footer.tsx
--- a/components/site-footer.tsx
+++ b/components/site-footer.tsx
@@
-        <p className="footer-wordmark-label">LAB</p>
+        <p className="footer-wordmark-label">LABX</p>
```

### `app/globals.css`

```diff
diff --git a/app/globals.css b/app/globals.css
--- a/app/globals.css
+++ b/app/globals.css
@@
 .hero {
-  display: flex;
+  display: grid;
   min-height: calc(100svh - 5rem);
-  flex-direction: column;
-  justify-content: space-between;
-  padding-block: clamp(1.5rem, 4vw, 4rem) 2rem;
+  grid-template-columns: minmax(17rem, 0.68fr) minmax(0, 1.45fr);
 }
@@
-.hero-body {
-  display: grid;
-  grid-template-columns: minmax(18rem, 0.95fr) minmax(0, 1.65fr);
-  align-items: end;
-  gap: clamp(2rem, 6vw, 7rem);
-}
-
-.hero-x-stage {
-  position: relative;
-  width: min(100%, 32rem);
-  aspect-ratio: 1;
-  border: 1px solid var(--line);
-  color: var(--foreground);
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
-.hero-x-mark {
-  position: absolute;
-  inset: 13%;
-}
-
-.hero-x-coordinate,
-.hero-x-axis {
-  position: absolute;
-  z-index: 1;
-  padding: 0.25rem 0.4rem;
-  background: var(--background);
-  color: var(--muted);
-  font-size: 0.58rem;
-  font-weight: 700;
-  letter-spacing: 0.16em;
-}
-
-.hero-x-coordinate {
-  top: -0.55rem;
-  left: 1rem;
-}
-
-.hero-x-axis {
-  right: 1rem;
-  bottom: -0.55rem;
+.hero-brief {
+  display: flex;
+  min-width: 0;
+  flex-direction: column;
+  border-right: 1px solid var(--line);
+  padding: clamp(1.5rem, 3vw, 3rem) clamp(1.5rem, 3vw, 3rem) 2rem 0;
+}
+
+.hero-kicker {
+  gap: 1rem;
+}
+
+.hero-copy {
+  display: flex;
+  flex: 1;
+  flex-direction: column;
+  align-items: flex-start;
+  justify-content: center;
+  padding-block: clamp(2.5rem, 8vh, 6rem);
+}
+
+.hero-status {
+  display: flex;
+  align-items: center;
+  gap: 0.6rem;
+  margin: 0 0 1.5rem;
+  color: var(--muted);
+  font-size: 0.6rem;
+  font-weight: 650;
+  letter-spacing: 0.14em;
+}
+
+.hero-status > span {
+  width: 0.4rem;
+  height: 0.4rem;
+  border-radius: 50%;
+  background: var(--foreground);
 }
 
 .hero h1 {
-  max-width: 9ch;
+  max-width: 8ch;
   margin: 0;
   font-family: var(--display-cjk);
-  font-size: clamp(4.4rem, 12.5vw, 12rem);
+  font-size: clamp(3.1rem, 5.1vw, 5.6rem);
   font-stretch: normal;
-  font-weight: 900;
+  font-weight: 820;
   letter-spacing: 0.01em;
-  line-height: 1.02;
-}
-
-.hero-copy {
-  min-width: 0;
+  line-height: 1.06;
 }
@@
 .hero-intro {
-  max-width: 31rem;
-  margin: clamp(2rem, 5vw, 4rem) 0 0 auto;
-  font-size: clamp(1rem, 1.5vw, 1.3rem);
-  line-height: 1.65;
+  max-width: 24rem;
+  margin: 1.5rem 0 0;
+  color: var(--muted);
+  font-size: 0.9rem;
+  line-height: 1.75;
 }
 
-.hero-scroll {
-  display: flex;
-  width: fit-content;
+.hero-actions {
+  display: grid;
+  grid-template-columns: repeat(2, minmax(0, 1fr));
+  border-top: 1px solid var(--line);
+}
+
+.hero-actions a {
+  display: flex;
+  min-height: 3.5rem;
   align-items: center;
-  gap: 0.75rem;
-  border-bottom: 1px solid currentColor;
-  padding-bottom: 0.35rem;
-  font-size: 0.8rem;
-  font-weight: 600;
+  justify-content: space-between;
+  gap: 1rem;
+  padding-top: 1rem;
+  font-size: 0.68rem;
+  font-weight: 650;
+  letter-spacing: 0.08em;
+  transition: color 160ms ease;
 }
 
-.hero-scroll svg,
+.hero-actions a:first-child {
+  border-right: 1px solid var(--line);
+  padding-right: 1rem;
+}
+
+.hero-actions a:last-child {
+  padding-left: 1rem;
+}
+
+.hero-actions a:hover,
+.hero-actions a:focus-visible {
+  color: var(--muted);
+}
+
+.hero-actions a > span:last-child {
+  display: inline-flex;
+  align-items: center;
+  gap: 0.45rem;
+}
+
+.hero-actions svg,
 .module-arrow {
   width: 1rem;
 }
+
+.core-projects {
+  display: grid;
+  min-width: 0;
+  grid-template-rows: auto minmax(0, 1fr);
+  gap: 1rem;
+  padding: clamp(1.5rem, 3vw, 3rem) 0 2rem clamp(1.5rem, 3vw, 3rem);
+}
+
+.core-projects-heading {
+  display: flex;
+  align-items: end;
+  justify-content: space-between;
+  gap: 2rem;
+}
+
+.core-projects-heading p,
+.core-project-card-label {
+  margin: 0;
+  color: var(--muted);
+  font-size: 0.6rem;
+  font-weight: 650;
+  letter-spacing: 0.14em;
+}
+
+.core-projects-heading h2 {
+  margin: 0.45rem 0 0;
+  font-family: var(--display-cjk);
+  font-size: clamp(1.35rem, 2.2vw, 2.2rem);
+  font-weight: 760;
+  letter-spacing: 0.01em;
+  line-height: 1.1;
+}
+
+.core-projects-heading > span {
+  color: var(--muted);
+  font-family: var(--display);
+  font-size: clamp(1.5rem, 2.8vw, 2.8rem);
+  letter-spacing: -0.03em;
+  line-height: 0.8;
+}
+
+.core-project-grid {
+  display: grid;
+  height: min(66svh, 42rem);
+  min-height: 26rem;
+  grid-template-columns: minmax(0, 1.18fr) minmax(15rem, 0.82fr);
+  grid-template-rows: repeat(2, minmax(0, 1fr));
+  gap: 0.75rem;
+}
+
+.core-project-card {
+  min-width: 0;
+  min-height: 0;
+  overflow: hidden;
+  border: 1px solid var(--line);
+}
+
+.core-project-card--lead {
+  grid-row: 1 / -1;
+}
+
+.core-project-card > a {
+  display: grid;
+  width: 100%;
+  height: 100%;
+  background: var(--background);
+  transition: background-color 180ms ease;
+}
+
+.core-project-card > a:hover,
+.core-project-card > a:focus-visible {
+  background: var(--soft);
+  outline: none;
+}
+
+.core-project-card > a:focus-visible {
+  box-shadow: inset 0 0 0 2px var(--foreground);
+}
+
+.core-project-card--lead > a {
+  grid-template-rows: minmax(0, 1fr) auto;
+}
+
+.core-project-card--compact > a {
+  grid-template-columns: minmax(7.5rem, 0.82fr) minmax(0, 1.18fr);
+}
+
+.core-project-card .work-visual {
+  height: 100%;
+  min-height: 0;
+  aspect-ratio: auto;
+  border: 0;
+}
+
+.core-project-card--lead .work-visual {
+  border-bottom: 1px solid var(--line);
+}
+
+.core-project-card--compact .work-visual {
+  border-right: 1px solid var(--line);
+}
+
+.core-project-card .work-visual-title {
+  font-size: clamp(1.8rem, 3.5vw, 3.8rem);
+}
+
+.core-project-card--compact .work-visual-title {
+  right: 0.7rem;
+  bottom: 0.65rem;
+  left: 0.7rem;
+  font-size: clamp(1rem, 1.5vw, 1.45rem);
+}
+
+.core-project-card--compact .work-visual-index {
+  top: 0.7rem;
+  left: 0.7rem;
+}
+
+.core-project-card--compact .work-visual-type {
+  top: 0.7rem;
+  right: 0.7rem;
+}
+
+.core-project-card-copy {
+  display: flex;
+  min-width: 0;
+  flex-direction: column;
+  justify-content: center;
+  padding: 1rem 1.1rem;
+}
+
+.core-project-card-label {
+  display: flex;
+  justify-content: space-between;
+  gap: 0.75rem;
+  font-size: 0.56rem;
+  letter-spacing: 0.1em;
+}
+
+.core-project-card-title {
+  display: flex;
+  align-items: flex-start;
+  justify-content: space-between;
+  gap: 1rem;
+  margin-top: 0.75rem;
+}
+
+.core-project-card-title h3 {
+  margin: 0;
+  font-family: var(--display-cjk);
+  font-size: clamp(1.35rem, 2.3vw, 2.25rem);
+  font-weight: 760;
+  letter-spacing: 0.01em;
+  line-height: 1.15;
+}
+
+.core-project-card-title svg {
+  width: 1rem;
+  flex: 0 0 auto;
+  transition: transform 180ms ease;
+}
+
+.core-project-card > a:hover .core-project-card-title svg {
+  transform: translate(0.18rem, -0.18rem);
+}
+
+.core-project-card-summary {
+  display: -webkit-box;
+  overflow: hidden;
+  margin: 0.75rem 0 0;
+  color: var(--muted);
+  font-size: 0.76rem;
+  line-height: 1.6;
+  -webkit-box-orient: vertical;
+  -webkit-line-clamp: 2;
+}
+
+.core-project-card--compact .core-project-card-copy {
+  padding: 0.85rem;
+}
+
+.core-project-card--compact .core-project-card-label {
+  flex-direction: column;
+  gap: 0.3rem;
+}
+
+.core-project-card--compact .core-project-card-title {
+  margin-top: 0.65rem;
+}
+
+.core-project-card--compact .core-project-card-title h3 {
+  font-size: clamp(1.05rem, 1.6vw, 1.45rem);
+}
 
 .worlds {
-  padding-block: clamp(6rem, 12vw, 12rem) clamp(4rem, 6vw, 6rem);
+  border-top: 1px solid var(--line);
+  padding-block: clamp(4rem, 8vw, 8rem) clamp(4rem, 6vw, 6rem);
 }
@@
 .work-grid {
   display: grid;
   grid-template-columns: repeat(2, minmax(0, 1fr));
   gap: clamp(2.5rem, 5vw, 5rem) clamp(1rem, 3vw, 2.5rem);
 }
+
+.home-project-grid {
+  grid-template-columns: repeat(3, minmax(0, 1fr));
+}
@@
+@media (max-width: 1100px) and (min-width: 761px) {
+  .hero {
+    grid-template-columns: minmax(14rem, 0.52fr) minmax(0, 1.48fr);
+  }
+
+  .hero-brief {
+    padding-right: 1.5rem;
+  }
+
+  .hero h1 {
+    font-size: clamp(2.8rem, 4.8vw, 4.2rem);
+  }
+
+  .hero-actions {
+    grid-template-columns: 1fr;
+  }
+
+  .hero-actions a:first-child {
+    border-right: 0;
+    padding-right: 0;
+  }
+
+  .hero-actions a:last-child {
+    border-top: 1px solid var(--line);
+    padding-left: 0;
+  }
+
+  .core-projects {
+    padding-left: 1.5rem;
+  }
+
+  .core-project-grid {
+    grid-template-columns: repeat(2, minmax(0, 1fr));
+    grid-template-rows: minmax(0, 1.2fr) minmax(0, 0.8fr);
+  }
+
+  .core-project-card--lead {
+    grid-column: 1 / -1;
+    grid-row: 1;
+  }
+
+  .core-project-card--lead > a {
+    grid-template-columns: minmax(0, 1.08fr) minmax(11rem, 0.92fr);
+    grid-template-rows: minmax(0, 1fr);
+  }
+
+  .core-project-card--lead .work-visual {
+    border-right: 1px solid var(--line);
+    border-bottom: 0;
+  }
+
+  .core-project-card--compact > a {
+    grid-template-columns: minmax(6rem, 0.72fr) minmax(0, 1.28fr);
+  }
+
+  .core-project-card--compact .core-project-card-summary {
+    display: none;
+  }
+
+  .home-project-grid {
+    grid-template-columns: repeat(2, minmax(0, 1fr));
+  }
+}
+
+@media (max-height: 720px) and (min-width: 761px) {
+  .hero-copy {
+    padding-block: 2rem;
+  }
+
+  .core-project-grid {
+    height: min(58svh, 34rem);
+    min-height: 22rem;
+  }
+
+  .core-project-card-summary {
+    display: none;
+  }
+}
+
 @media (max-width: 760px) {
@@
-  .hero-body,
+  .hero,
   .section-heading {
     grid-template-columns: 1fr;
   }
 
-  .hero-x-stage {
-    width: min(66vw, 18rem);
+  .hero {
+    min-height: auto;
   }
 
-  .hero h1 {
-    font-size: clamp(4.2rem, 23vw, 8rem);
+  .hero-brief {
+    min-height: calc(100svh - 5rem);
+    border-right: 0;
+    border-bottom: 1px solid var(--line);
+    padding: 1.25rem 0;
+  }
+
+  .hero-copy {
+    padding-block: clamp(3.5rem, 14vh, 6rem);
+  }
+
+  .hero h1 {
+    font-size: clamp(2.8rem, 13vw, 4.4rem);
+  }
+
+  .core-projects {
+    gap: 1.25rem;
+    padding: 2.5rem 0 1.5rem;
+  }
+
+  .core-project-grid {
+    height: auto;
+    min-height: 0;
+    grid-template-columns: 1fr;
+    grid-template-rows: auto;
+  }
+
+  .core-project-card--lead {
+    grid-column: auto;
+    grid-row: auto;
+  }
+
+  .core-project-card--lead > a {
+    grid-template-rows: auto auto;
+  }
+
+  .core-project-card--lead .work-visual {
+    height: auto;
+    aspect-ratio: 16 / 10;
+    border-right: 0;
+    border-bottom: 1px solid var(--line);
+  }
+
+  .core-project-card--compact > a {
+    min-height: 10.5rem;
+    grid-template-columns: minmax(7.5rem, 0.72fr) minmax(0, 1.28fr);
+  }
+
+  .core-project-card--compact .core-project-card-summary {
+    display: none;
   }
@@
-  .hero-intro {
-    margin-left: 0;
-  }
-
   .module-card {
```

### `tests/core-project-card.test.tsx`

```diff
diff --git a/tests/core-project-card.test.tsx b/tests/core-project-card.test.tsx
new file mode 100644
--- /dev/null
+++ b/tests/core-project-card.test.tsx
@@
+import { render, screen } from "@testing-library/react";
+import { describe, expect, it } from "vitest";
+
+import { CoreProjectCard } from "@/components/core-project-card";
+import type { Work } from "@/lib/content/schema";
+
+const work: Work = {
+  id: "game-echoes-of-us",
+  slug: "echoes-of-us",
+  type: "game",
+  title: "余响纪元",
+  summary: "六个内容域首次汇聚的可玩世界原型。",
+  cover: "module:game",
+  publishedAt: "2026-08-30",
+  status: "published",
+  featured: true,
+  demo: true,
+  tags: ["世界原型"],
+  creators: ["LabX"],
+  relatedWorks: [],
+  actions: [],
+  body: "演示正文",
+};
+
+describe("首屏核心项目卡", () => {
+  it.each(["lead", "compact"] as const)(
+    "正确渲染 %s 层级的项目链接与无障碍名称",
+    (prominence) => {
+      render(
+        <CoreProjectCard
+          work={work}
+          index="01"
+          prominence={prominence}
+        />,
+      );
+
+      const link = screen.getByRole("link", {
+        name: "查看核心项目：余响纪元",
+      });
+      expect(link).toHaveAttribute("href", "/game/echoes-of-us");
+      expect(link.closest("article")).toHaveClass(
+        "core-project-card",
+        `core-project-card--${prominence}`,
+      );
+      expect(screen.getAllByText("余响纪元")).toHaveLength(2);
+    },
+  );
+});
```

### `tests/home-page.test.ts`

```diff
diff --git a/tests/home-page.test.ts b/tests/home-page.test.ts
--- a/tests/home-page.test.ts
+++ b/tests/home-page.test.ts
@@
-describe("首页叙事密度", () => {
+describe("首页项目优先级与叙事密度", () => {
   it("不再渲染宏大叙事区块和页脚巨型 X", () => {
@@
     expect(homeSource).not.toContain('className="vision"');
     expect(homeSource).not.toContain('className="x-signature"');
+    expect(homeSource).not.toContain('className="hero-x-stage"');
     expect(footerSource).not.toContain("footer-wordmark-x");
     expect(globalStyles).not.toContain(".vision {");
     expect(globalStyles).not.toContain(".x-signature {");
+    expect(globalStyles).not.toContain(".hero-x-stage");
     expect(globalStyles).not.toContain(".footer-wordmark-x");
   });
+
+  it("首屏右侧直接展示三个核心项目，其他项目随后出现", () => {
+    const coreProjectsPosition = homeSource.indexOf('className="core-projects"');
+    const otherProjectsPosition = homeSource.indexOf('id="projects"');
+
+    expect(homeSource).toContain(
+      "const coreWorks = featuredWorks.slice(0, 3)",
+    );
+    expect(homeSource).toContain(
+      'prominence={index === 0 ? "lead" : "compact"}',
+    );
+    expect(coreProjectsPosition).toBeGreaterThan(-1);
+    expect(otherProjectsPosition).toBeGreaterThan(coreProjectsPosition);
+    expect(globalStyles).toContain(
+      "grid-template-columns: minmax(17rem, 0.68fr) minmax(0, 1.45fr)",
+    );
+    expect(globalStyles).toContain("height: min(66svh, 42rem)");
+  });
+
+  it("标语压缩为两行，并限制为项目标题以下的视觉层级", () => {
+    expect(homeSource).toContain("探索和重构");
+    expect(homeSource).toContain('className="hero-dot"');
+    expect(globalStyles).toContain(
+      "font-size: clamp(3.1rem, 5.1vw, 5.6rem)",
+    );
+  });
 });
```

### `tests/x-mark.test.tsx`

```diff
diff --git a/tests/x-mark.test.tsx b/tests/x-mark.test.tsx
--- a/tests/x-mark.test.tsx
+++ b/tests/x-mark.test.tsx
@@
 const globalStyles = readFileSync(
   resolve(process.cwd(), "app/globals.css"),
   "utf8",
 );
+const headerSource = readFileSync(
+  resolve(process.cwd(), "components/site-header.tsx"),
+  "utf8",
+);
+const footerSource = readFileSync(
+  resolve(process.cwd(), "components/site-footer.tsx"),
+  "utf8",
+);
 
-/** 提取品牌组合规则，防止 LAB 文字重新压过 X 主符号。 */
+/** 提取品牌组合规则，防止 LABX 文字重新压过 X 主符号。 */
@@
-  it("页头以大号 X 为主符号，页脚仅保留小号 LAB 标签", () => {
+  it("页头以大号 X 为主符号，文字标签统一为小号 LABX", () => {
@@
     expect(footerLabel).toContain(
       "font-size: clamp(0.64rem, 0.8vw, 0.78rem)",
     );
     expect(footerLabel).toContain("color: var(--muted)");
+    expect(headerSource).toContain(
+      '<span className="wordmark-label">LABX</span>',
+    );
+    expect(footerSource).toContain(
+      '<p className="footer-wordmark-label">LABX</p>',
+    );
+    expect(headerSource).not.toContain(
+      '<span className="wordmark-label">LAB</span>',
+    );
+    expect(footerSource).not.toContain(
+      '<p className="footer-wordmark-label">LAB</p>',
+    );
     expect(globalStyles).not.toContain(".footer-wordmark-x");
   });
 });
```

### `tests/typography.test.ts`

```diff
diff --git a/tests/typography.test.ts b/tests/typography.test.ts
--- a/tests/typography.test.ts
+++ b/tests/typography.test.ts
@@
   const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
   const matchedRule = globalStyles.match(
-    new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`),
+    new RegExp(`^${escapedSelector}\\s*\\{([^}]*)\\}`, "m"),
@@
-    expect(heroTitleRule).toContain("line-height: 1.02");
+    expect(heroTitleRule).toContain("line-height: 1.06");
```

### `AGENTS.md`

```diff
diff --git a/AGENTS.md b/AGENTS.md
--- a/AGENTS.md
+++ b/AGENTS.md
@@
 - 版式语言：围绕 X 的两条斜线轴，使用细边框、坐标标记、几何网格和充足留白建立统一视觉系统。
 - 叙事语气：以实验、作品、连接关系和可操作信息为主，保持克制的极客感，避免连续宏大宣言与重复巨型符号。
+- 首页信息层级：首屏采用“左侧紧凑品牌与标语、右侧核心项目面板”的项目优先布局；品牌宣言不得压过项目内容与可操作入口。
```

### `.agentdocs/index.md`

```diff
diff --git a/.agentdocs/index.md b/.agentdocs/index.md
--- a/.agentdocs/index.md
+++ b/.agentdocs/index.md
@@
 ## 当前变更文档
 
+`workflow/20260830195628-refactor-project-first-homepage.md` - 将首页重构为左侧紧凑品牌说明、右侧三项核心项目的首屏工作台，统一 LABX 字标并把项目目录前置；继续调整首页项目优先级、首屏密度或品牌字标时读取。
 `workflow/20260830192517-remove-grand-narrative-sections.md` - 删除首页两个宏大叙事区和页脚巨型 X，压缩相邻留白并确立克制、实验导向的极客叙事；继续调整首页内容密度或品牌语气时读取。
@@
 - 当前仓库尚未配置 Git remote 与 Vercel 项目绑定；代码已经具备 Vercel 构建与 GitHub Actions 持续集成配置。
+- 首页首屏采用项目优先结构：左侧为紧凑 LABX 标语与快捷入口，右侧直接展示一个主项目和两个次项目；其余项目与领域索引依次位于下方。
```

## 测试用例

### TC-001 LABX 字标一致

- 类型：组件/源码回归测试
- 优先级：高
- 前置条件：已加载页头和页脚组件源码。
- 操作步骤：运行 `pnpm test`。
- 预期结果：页头和页脚都包含 `LABX`，不再包含独立 `LAB` 标签；X-icon 继续作为透明 SVG 遮罩。
- 是否通过：通过。

### TC-002 首屏项目优先级

- 类型：结构回归测试
- 优先级：高
- 前置条件：仓库包含至少三个 `featured` 已发布项目。
- 操作步骤：运行 `pnpm test`，检查首页源码和共享样式。
- 预期结果：首屏右侧存在三项核心项目，主卡与次卡层级正确；其他项目位于首屏之后；独立 Hero X 展台不再存在。
- 是否通过：通过。

### TC-003 核心项目卡语义与链接

- 类型：组件测试
- 优先级：高
- 前置条件：测试环境已加载 Testing Library。
- 操作步骤：分别渲染 `lead` 与 `compact` 核心项目卡。
- 预期结果：两种卡片都保留正确详情链接、项目标题、语义化 `article` 和完整无障碍名称。
- 是否通过：通过。

### TC-004 响应式首屏

- 类型：样式回归测试
- 优先级：高
- 前置条件：加载 `app/globals.css`。
- 操作步骤：检查桌面、中等宽度、低高度和移动端媒体查询。
- 预期结果：桌面端左右分栏且项目面板高度不超过首屏；中等宽度主卡在上、次卡并列；移动端单列且无固定高度和横向溢出。
- 是否通过：通过（规则与生产构建验证）；待用户本地浏览器视觉复核。

### TC-005 工程质量与静态生成

- 类型：自动化验收
- 优先级：高
- 操作步骤：依次运行 `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm build`。
- 预期结果：Lint 与类型检查无错误，7 个测试文件共 22 项测试全部通过，21 个页面完成静态生成且无构建警告。
- 是否通过：通过。

## 验证结果

- `pnpm lint`：通过。
- `pnpm typecheck`：通过。
- `pnpm test`：通过，7 个测试文件、22 项测试全部通过。
- `pnpm build`：通过，21 个静态/SSG 页面全部生成成功。
- `git diff --check`：通过，无空白错误。
- `pnpm start` + `http://localhost:3000/`：通过，首页返回 HTTP 200，`LABX / PROJECT INDEX`、三个核心项目、其他项目和领域索引均存在；验证后已关闭临时服务。
- `pnpm dev`：已启动在 `http://localhost:3000`，用于用户刷新现有浏览器标签进行视觉复核。
- 自动浏览器截图：本地 URL 被浏览器安全策略阻止，未绕过；不影响 HTTP、测试与构建验收结论。
