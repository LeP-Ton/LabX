# 首页重构为六领域锚点分区

## 背景与目标

- 将“探索和重构一切”从首页大标题移到 Header 的 `LABX` 下方，保持紧凑品牌层级。
- 首页不再使用“核心项目 / 其他项目 / 领域索引”，改为 Game、Music、Book、Art、Movie、Life 六个连续领域分区。
- 每个领域左侧承载研究叙事和完整列表入口，右侧最多预览三个最新项目。
- Header 六领域菜单统一跳转首页锚点，同时保留独立领域页、项目详情页与既有 URL。

## 约束与原则

- 不修改内容 Schema、MDX 字段、依赖、SEO URL、站点地图或社交分享图。
- `featured` 字段继续保留，但首页不再据此划分项目。
- 首页只调用一次 `loadWorks()`，按 `module.type` 分组并保留发布日期倒序。
- 移动端领域菜单保持可见并在自身容器内横向滚动，页面本身不得产生横向溢出。
- 使用原生 Fragment 锚点，不增加 ScrollSpy 或新的客户端状态。
- 本次只保留本地可运行版本，不提交或推送 GitHub。

## 阶段与 TODO

- [x] 将 Header 重构为 X、LABX/口号文字栈、六领域锚点导航和工具区。
- [x] 将首页重构为六个稳定锚点领域分区。
- [x] 按领域分组项目并限制每段最多预览三个。
- [x] 将核心项目卡泛化为无分类语义的首页项目卡。
- [x] 完成单项目、双项目、三项目和空状态布局。
- [x] 完成移动端两行 Header、横向导航和锚点偏移。
- [x] 更新 About 长标题并清理正文重复定位。
- [x] 更新整体认知、文档索引和回归测试。
- [x] 完成格式、Lint、类型、单元/组件、构建和端到端验证。

## 关键风险

- 每个领域首页只预览最新三个项目；完整内容继续通过“全部游戏”等入口访问领域页。
- 移动端 Header 使用固定 `7.75rem` 高度，口号禁止换行，避免锚点偏移随内容波动。
- 当前六个领域均有已发布项目；未来无项目时首页会保留领域叙事并显示“暂无公开项目”。
- 旧 `CoreProjectCard` 已删除并替换为 `HomeProjectCard`，调用方必须使用新的中性无障碍名称“查看项目”。

## 当前进展

- Header 已显示 X、LABX 与“探索和重构一切”，六领域链接指向 `/#game` 至 `/#life`。
- 首页六段按模块顺序生成，桌面端左叙事右项目，移动端自然堆叠。
- About Hero 已使用独立 AI 实验室完整定位，正文不再重复同一句定位。
- 本地开发页面返回 HTTP 200，生产构建生成 21 个静态/SSG 页面。

## 代码变更

```diff
diff --git a/.agentdocs/index.md b/.agentdocs/index.md
index 4d72545..2643ca1 100644
--- a/.agentdocs/index.md
+++ b/.agentdocs/index.md
@@ -6,6 +6,7 @@
 
 ## 当前变更文档
 
+`workflow/20260830225038-refactor-homepage-into-anchored-ai-fields.md` - 将首页重构为六个应用领域锚点分区，把品牌口号移入 Header，并按领域展示叙事与项目预览；继续调整首页信息架构、锚点导航或移动端 Header 时读取。
 `workflow/20260830215124-publish-independent-ai-lab-first-version.md` - 将 LabX 的公开定位统一为独立 AI 实验室，把六模块表达为 AI 应用领域，并创建公开 GitHub 仓库首版；维护品牌定位、公开元数据或 GitHub 发布流程时读取。
 `workflow/20260830195628-refactor-project-first-homepage.md` - 将首页重构为左侧紧凑品牌说明、右侧三项核心项目的首屏工作台，统一 LABX 字标并把项目目录前置；继续调整首页项目优先级、首屏密度或品牌字标时读取。
 `workflow/20260830192517-remove-grand-narrative-sections.md` - 删除首页两个宏大叙事区和页脚巨型 X，压缩相邻留白并确立克制、实验导向的极客叙事；继续调整首页内容密度或品牌语气时读取。
@@ -34,4 +35,4 @@
 - X-icon 已成为全站核心视觉符号，通过 CSS 遮罩应用于页头、Hero、模块、作品、编辑页与页脚，并同步更新 favicon 和社交分享图。
 - X-icon 的白黑透明 WebP/GIF 刀划开动画已同步到 `public/x-x-x20/outputs/`，当前仅作为品牌资产入库，尚未接入页面组件。
 - GitHub 公开仓库为 `https://github.com/LeP-Ton/LabX`，`main` 已发布并跟踪 `origin/main`，GitHub Actions 质量检查已通过；Vercel 尚未绑定。
-- 首页首屏采用项目优先结构：左侧为紧凑 LABX 标语与快捷入口，右侧直接展示一个主项目和两个次项目；其余项目与领域索引依次位于下方。
+- Header 在 `LABX` 下方显示“探索和重构一切”，六领域菜单统一跳转首页 `#game` 至 `#life` 锚点；首页六段均采用左侧研究叙事、右侧最多三个项目预览的结构。
diff --git a/AGENTS.md b/AGENTS.md
index e66cd41..c0b000d 100644
--- a/AGENTS.md
+++ b/AGENTS.md
@@ -16,7 +16,7 @@
 - 核心视觉符号：细长、中心对称的四尖 `X-icon`；以透明 SVG 矢量图形作为 CSS alpha 遮罩，并通过 `currentColor` 自动适配黑白主题与任意展示尺寸。
 - 版式语言：围绕 X 的两条斜线轴，使用细边框、坐标标记、几何网格和充足留白建立统一视觉系统。
 - 叙事语气：以实验、作品、连接关系和可操作信息为主，保持克制的极客感，避免连续宏大宣言与重复巨型符号。
-- 首页信息层级：首屏采用“左侧紧凑品牌与标语、右侧核心项目面板”的项目优先布局；品牌宣言不得压过项目内容与可操作入口。
+- 首页信息层级：Header 在 `LABX` 下方承载紧凑品牌口号，首页按六个应用领域组成连续锚点分区，每段左侧说明研究叙事、右侧预览该领域项目；不再以“核心项目 / 其他项目”划分首页内容。
 
 ## 应用领域与协作关系
 
diff --git a/app/about/page.tsx b/app/about/page.tsx
index 7acc96f..c7de15f 100644
--- a/app/about/page.tsx
+++ b/app/about/page.tsx
@@ -13,10 +13,13 @@ export const metadata: Metadata = {
 export default function AboutPage() {
   return (
     <main id="main-content">
-      <header className="editorial-hero">
+      <header className="editorial-hero editorial-hero--statement">
         <XMark className="editorial-x-mark" />
         <p className="eyebrow">ABOUT LABX</p>
-        <h1>独立研究，持续构建。</h1>
+        <h1>
+          独立 AI 实验室，研究并构建 AI
+          在游戏、声音、叙事、视觉、影像与数字人格中的应用。
+        </h1>
       </header>
 
       <div className="editorial-layout">
@@ -26,8 +29,7 @@ export default function AboutPage() {
         <article className="editorial-content">
           <h2>我们在做什么</h2>
           <p>
-            LabX 是一个独立 AI 实验室，研究并构建 AI
-            在游戏、声音、叙事、视觉、影像与数字人格中的应用。我们使用 GitHub
+            我们使用 GitHub
             记录项目版本、作者、来源和关联，让实验能够被理解、复用并持续迭代。
           </p>
           <h2>应用领域</h2>
diff --git a/app/globals.css b/app/globals.css
index d9c519f..978e179 100644
--- a/app/globals.css
+++ b/app/globals.css
@@ -7,6 +7,7 @@
   --muted: #676762;
   --soft: #e7e6e1;
   --line: #b9b8b2;
+  --site-header-height: 5rem;
   --x-icon: url("/x-x-x20/outputs/x-icon-transparent.svg");
   --display: "Arial Narrow", "Helvetica Neue", Arial, sans-serif;
   /* 中文不使用窄体拉伸，避免字体回退后仍继承拉丁字母的压缩参数。 */
@@ -87,10 +88,12 @@ a {
   position: sticky;
   top: 0;
   z-index: 40;
-  display: flex;
-  min-height: 5rem;
+  display: grid;
+  height: var(--site-header-height);
+  grid-template-areas: "brand modules utilities";
+  grid-template-columns: auto minmax(0, 1fr) auto;
   align-items: center;
-  justify-content: space-between;
+  gap: clamp(1rem, 3vw, 2.5rem);
   border-bottom: 1px solid var(--line);
   background: color-mix(in srgb, var(--background) 90%, transparent);
   backdrop-filter: blur(16px);
@@ -106,11 +109,19 @@ a {
 }
 
 .wordmark {
+  grid-area: brand;
   display: inline-flex;
   align-items: center;
   gap: 0.45rem;
 }
 
+.wordmark-copy {
+  display: flex;
+  flex-direction: column;
+  align-items: flex-start;
+  gap: 0.3rem;
+}
+
 .wordmark-label {
   color: var(--muted);
   font-family: "Helvetica Neue", Arial, sans-serif;
@@ -120,6 +131,16 @@ a {
   line-height: 1;
 }
 
+.wordmark-slogan {
+  color: var(--muted);
+  font-family: var(--display-cjk);
+  font-size: 0.55rem;
+  font-weight: 500;
+  letter-spacing: 0.08em;
+  line-height: 1;
+  white-space: nowrap;
+}
+
 .wordmark-x {
   width: 3rem;
   height: 3rem;
@@ -127,39 +148,67 @@ a {
   mask-size: 135%;
 }
 
-.primary-nav {
+.module-nav-links {
+  grid-area: modules;
   display: flex;
+  min-width: 0;
   align-items: center;
-  gap: clamp(1rem, 3vw, 2.5rem);
+  justify-content: center;
+  gap: clamp(0.8rem, 1.8vw, 1.75rem);
+  overflow-x: auto;
   font-size: 0.75rem;
   font-weight: 600;
   letter-spacing: 0.12em;
+  scrollbar-width: none;
   text-transform: uppercase;
+  white-space: nowrap;
+}
+
+.module-nav-links::-webkit-scrollbar {
+  display: none;
 }
 
-.primary-nav a {
+.module-nav-links a,
+.header-utilities a {
   border-bottom: 1px solid transparent;
-  transition: border-color 160ms ease;
+  transition:
+    border-color 160ms ease,
+    color 160ms ease;
 }
 
-.primary-nav a:hover {
+.module-nav-links a:hover,
+.module-nav-links a:focus-visible,
+.header-utilities a:hover,
+.header-utilities a:focus-visible {
   border-color: currentColor;
 }
 
-.module-nav-links {
+.module-nav-links a:focus-visible,
+.header-utilities a:focus-visible {
+  outline: 2px solid var(--foreground);
+  outline-offset: 0.3rem;
+}
+
+.header-utilities {
+  grid-area: utilities;
   display: flex;
   align-items: center;
-  gap: clamp(0.8rem, 1.8vw, 1.75rem);
+  gap: clamp(1rem, 2vw, 1.75rem);
+  font-size: 0.75rem;
+  font-weight: 600;
+  letter-spacing: 0.12em;
+  text-transform: uppercase;
 }
 
-.hero {
+.home-field {
   display: grid;
-  min-height: calc(100svh - 5rem);
-  grid-template-columns: minmax(17rem, 0.68fr) minmax(0, 1.45fr);
+  min-height: calc(100svh - var(--site-header-height));
+  grid-template-columns: minmax(19rem, 0.82fr) minmax(0, 1.18fr);
+  border-bottom: 1px solid var(--line);
+  scroll-margin-top: var(--site-header-height);
 }
 
-.hero-kicker,
-.section-heading > p,
+.home-field-kicker,
 .eyebrow {
   display: flex;
   justify-content: space-between;
@@ -169,7 +218,7 @@ a {
   letter-spacing: 0.16em;
 }
 
-.hero-brief {
+.home-field-brief {
   display: flex;
   min-width: 0;
   flex-direction: column;
@@ -177,72 +226,56 @@ a {
   padding: clamp(1.5rem, 3vw, 3rem) clamp(1.5rem, 3vw, 3rem) 2rem 0;
 }
 
-.hero-kicker {
+.home-field-kicker {
   gap: 1rem;
 }
 
-.hero-copy {
+.home-field-copy {
   display: flex;
   flex: 1;
   flex-direction: column;
   align-items: flex-start;
   justify-content: center;
-  padding-block: clamp(2.5rem, 8vh, 6rem);
+  padding-block: clamp(3rem, 9vh, 7rem);
 }
 
-.hero-status {
+.home-field-name {
   display: flex;
   align-items: center;
   gap: 0.6rem;
   margin: 0 0 1.5rem;
   color: var(--muted);
-  font-size: 0.6rem;
+  font-size: 0.62rem;
   font-weight: 650;
   letter-spacing: 0.14em;
+  text-transform: uppercase;
 }
 
-.hero-status > span {
+.home-field-name > span {
   width: 0.4rem;
   height: 0.4rem;
   border-radius: 50%;
   background: var(--foreground);
 }
 
-.hero h1 {
-  max-width: 8ch;
+.home-field-copy h2 {
+  max-width: 14ch;
   margin: 0;
   font-family: var(--display-cjk);
-  font-size: clamp(3.1rem, 5.1vw, 5.6rem);
+  font-size: clamp(2.2rem, 3.5vw, 3.8rem);
   font-stretch: normal;
-  font-weight: 820;
+  font-weight: 780;
   letter-spacing: 0.01em;
-  line-height: 1.06;
-}
-
-.hero-dot {
-  color: var(--muted);
-}
-
-.hero-intro {
-  max-width: 24rem;
-  margin: 1.5rem 0 0;
-  color: var(--muted);
-  font-size: 0.9rem;
-  line-height: 1.75;
+  line-height: 1.18;
 }
 
-.hero-actions {
-  display: grid;
-  grid-template-columns: repeat(2, minmax(0, 1fr));
-  border-top: 1px solid var(--line);
-}
-
-.hero-actions a {
+.home-field-action {
   display: flex;
   min-height: 3.5rem;
   align-items: center;
   justify-content: space-between;
   gap: 1rem;
+  border-top: 1px solid var(--line);
   padding-top: 1rem;
   font-size: 0.68rem;
   font-weight: 650;
@@ -250,32 +283,27 @@ a {
   transition: color 160ms ease;
 }
 
-.hero-actions a:first-child {
-  border-right: 1px solid var(--line);
-  padding-right: 1rem;
-}
-
-.hero-actions a:last-child {
-  padding-left: 1rem;
+.home-field-action:hover,
+.home-field-action:focus-visible {
+  color: var(--muted);
 }
 
-.hero-actions a:hover,
-.hero-actions a:focus-visible {
-  color: var(--muted);
+.home-field-action:focus-visible {
+  outline: 2px solid var(--foreground);
+  outline-offset: 0.3rem;
 }
 
-.hero-actions a > span:last-child {
+.home-field-action > span:last-child {
   display: inline-flex;
   align-items: center;
   gap: 0.45rem;
 }
 
-.hero-actions svg,
-.module-arrow {
+.home-field-action svg {
   width: 1rem;
 }
 
-.core-projects {
+.home-field-projects {
   display: grid;
   min-width: 0;
   grid-template-rows: auto minmax(0, 1fr);
@@ -283,60 +311,56 @@ a {
   padding: clamp(1.5rem, 3vw, 3rem) 0 2rem clamp(1.5rem, 3vw, 3rem);
 }
 
-.core-projects-heading {
+.home-field-projects-heading {
   display: flex;
   align-items: end;
   justify-content: space-between;
   gap: 2rem;
-}
-
-.core-projects-heading p,
-.core-project-card-label {
-  margin: 0;
   color: var(--muted);
   font-size: 0.6rem;
   font-weight: 650;
   letter-spacing: 0.14em;
 }
 
-.core-projects-heading h2 {
-  margin: 0.45rem 0 0;
-  font-family: var(--display-cjk);
-  font-size: clamp(1.35rem, 2.2vw, 2.2rem);
-  font-weight: 760;
-  letter-spacing: 0.01em;
-  line-height: 1.1;
-}
-
-.core-projects-heading > span {
-  color: var(--muted);
+.home-field-projects-heading > span:last-child {
   font-family: var(--display);
   font-size: clamp(1.5rem, 2.8vw, 2.8rem);
   letter-spacing: -0.03em;
   line-height: 0.8;
 }
 
-.core-project-grid {
+.home-project-grid {
   display: grid;
   height: min(66svh, 42rem);
-  min-height: 26rem;
+  min-height: 28rem;
+  gap: 0.75rem;
+}
+
+.home-project-grid--count-1 {
+  grid-template-columns: minmax(0, 1fr);
+}
+
+.home-project-grid--count-2 {
+  grid-template-columns: repeat(2, minmax(0, 1fr));
+}
+
+.home-project-grid--count-3 {
   grid-template-columns: minmax(0, 1.18fr) minmax(15rem, 0.82fr);
   grid-template-rows: repeat(2, minmax(0, 1fr));
-  gap: 0.75rem;
 }
 
-.core-project-card {
+.home-project-grid--count-3 .home-project-card--lead {
+  grid-row: 1 / -1;
+}
+
+.home-project-card {
   min-width: 0;
   min-height: 0;
   overflow: hidden;
   border: 1px solid var(--line);
 }
 
-.core-project-card--lead {
-  grid-row: 1 / -1;
-}
-
-.core-project-card > a {
+.home-project-card > a {
   display: grid;
   width: 100%;
   height: 100%;
@@ -344,61 +368,61 @@ a {
   transition: background-color 180ms ease;
 }
 
-.core-project-card > a:hover,
-.core-project-card > a:focus-visible {
+.home-project-card > a:hover,
+.home-project-card > a:focus-visible {
   background: var(--soft);
   outline: none;
 }
 
-.core-project-card > a:focus-visible {
+.home-project-card > a:focus-visible {
   box-shadow: inset 0 0 0 2px var(--foreground);
 }
 
-.core-project-card--lead > a {
+.home-project-card--lead > a {
   grid-template-rows: minmax(0, 1fr) auto;
 }
 
-.core-project-card--compact > a {
+.home-project-card--compact > a {
   grid-template-columns: minmax(7.5rem, 0.82fr) minmax(0, 1.18fr);
 }
 
-.core-project-card .work-visual {
+.home-project-card .work-visual {
   height: 100%;
   min-height: 0;
   aspect-ratio: auto;
   border: 0;
 }
 
-.core-project-card--lead .work-visual {
+.home-project-card--lead .work-visual {
   border-bottom: 1px solid var(--line);
 }
 
-.core-project-card--compact .work-visual {
+.home-project-card--compact .work-visual {
   border-right: 1px solid var(--line);
 }
 
-.core-project-card .work-visual-title {
+.home-project-card .work-visual-title {
   font-size: clamp(1.8rem, 3.5vw, 3.8rem);
 }
 
-.core-project-card--compact .work-visual-title {
+.home-project-card--compact .work-visual-title {
   right: 0.7rem;
   bottom: 0.65rem;
   left: 0.7rem;
   font-size: clamp(1rem, 1.5vw, 1.45rem);
 }
 
-.core-project-card--compact .work-visual-index {
+.home-project-card--compact .work-visual-index {
   top: 0.7rem;
   left: 0.7rem;
 }
 
-.core-project-card--compact .work-visual-type {
+.home-project-card--compact .work-visual-type {
   top: 0.7rem;
   right: 0.7rem;
 }
 
-.core-project-card-copy {
+.home-project-card-copy {
   display: flex;
   min-width: 0;
   flex-direction: column;
@@ -406,15 +430,18 @@ a {
   padding: 1rem 1.1rem;
 }
 
-.core-project-card-label {
+.home-project-card-label {
   display: flex;
   justify-content: space-between;
   gap: 0.75rem;
+  margin: 0;
+  color: var(--muted);
   font-size: 0.56rem;
+  font-weight: 650;
   letter-spacing: 0.1em;
 }
 
-.core-project-card-title {
+.home-project-card-title {
   display: flex;
   align-items: flex-start;
   justify-content: space-between;
@@ -422,7 +449,7 @@ a {
   margin-top: 0.75rem;
 }
 
-.core-project-card-title h3 {
+.home-project-card-title h3 {
   margin: 0;
   font-family: var(--display-cjk);
   font-size: clamp(1.35rem, 2.3vw, 2.25rem);
@@ -431,17 +458,17 @@ a {
   line-height: 1.15;
 }
 
-.core-project-card-title svg {
+.home-project-card-title svg {
   width: 1rem;
   flex: 0 0 auto;
   transition: transform 180ms ease;
 }
 
-.core-project-card > a:hover .core-project-card-title svg {
+.home-project-card > a:hover .home-project-card-title svg {
   transform: translate(0.18rem, -0.18rem);
 }
 
-.core-project-card-summary {
+.home-project-card-summary {
   display: -webkit-box;
   overflow: hidden;
   margin: 0.75rem 0 0;
@@ -452,117 +479,35 @@ a {
   -webkit-line-clamp: 2;
 }
 
-.core-project-card--compact .core-project-card-copy {
+.home-project-card--compact .home-project-card-copy {
   padding: 0.85rem;
 }
 
-.core-project-card--compact .core-project-card-label {
+.home-project-card--compact .home-project-card-label {
   flex-direction: column;
   gap: 0.3rem;
 }
 
-.core-project-card--compact .core-project-card-title {
+.home-project-card--compact .home-project-card-title {
   margin-top: 0.65rem;
 }
 
-.core-project-card--compact .core-project-card-title h3 {
+.home-project-card--compact .home-project-card-title h3 {
   font-size: clamp(1.05rem, 1.6vw, 1.45rem);
 }
 
-.worlds {
-  border-top: 1px solid var(--line);
-  padding-block: clamp(4rem, 8vw, 8rem) clamp(4rem, 6vw, 6rem);
-}
-
-.featured {
-  border-top: 1px solid var(--line);
-  padding-block: clamp(4rem, 8vw, 8rem);
-}
-
-.section-intro {
-  max-width: 34rem;
-  margin: 1.5rem 0 0;
-  color: var(--muted);
-  font-size: 0.95rem;
-  line-height: 1.7;
-}
-
-.section-heading {
-  display: grid;
-  grid-template-columns: 1fr 3fr;
-  gap: 2rem;
-  align-items: baseline;
-  margin-bottom: clamp(3rem, 7vw, 6rem);
-}
-
-.section-heading h2 {
-  margin: 0;
-  font-family: var(--display-cjk);
-  font-size: clamp(2.6rem, 7vw, 7rem);
-  font-weight: 800;
-  letter-spacing: 0.01em;
-  line-height: 1.08;
-}
-
-.module-grid {
-  border-top: 1px solid var(--line);
-}
-
-.module-card {
-  position: relative;
+.home-field-empty {
   display: grid;
-  grid-template-columns: 0.4fr 0.4fr 1.5fr 0.8fr 2fr auto;
-  min-height: 10rem;
-  align-items: center;
-  gap: 1rem;
-  border-bottom: 1px solid var(--line);
-  transition:
-    background-color 180ms ease,
-    color 180ms ease,
-    padding 180ms ease;
-}
-
-.module-card:hover,
-.module-card:focus-visible {
-  padding-inline: 1rem;
-  background: var(--foreground);
-  color: var(--background);
-  outline: none;
-}
-
-.module-index,
-.module-chinese {
-  font-size: 0.72rem;
-  letter-spacing: 0.08em;
-}
-
-.module-symbol {
-  display: flex;
-  align-items: center;
-}
-
-.module-x-mark {
-  width: 1.25rem;
-  height: 1.25rem;
-}
-
-.module-name {
-  font-family: var(--display);
-  font-size: clamp(2.2rem, 5vw, 5rem);
-  font-weight: 800;
-  letter-spacing: -0.035em;
-}
-
-.module-description {
-  max-width: 28rem;
+  min-height: 28rem;
+  place-items: center;
+  border: 1px solid var(--line);
   color: var(--muted);
-  font-size: 0.86rem;
-  line-height: 1.7;
+  font-size: 0.8rem;
+  letter-spacing: 0.08em;
 }
 
-.module-card:hover .module-description,
-.module-card:focus-visible .module-description {
-  color: color-mix(in srgb, var(--background) 70%, transparent);
+.home-field-empty p {
+  margin: 0;
 }
 
 .work-grid {
@@ -571,10 +516,6 @@ a {
   gap: clamp(2.5rem, 5vw, 5rem) clamp(1rem, 3vw, 2.5rem);
 }
 
-.home-project-grid {
-  grid-template-columns: repeat(3, minmax(0, 1fr));
-}
-
 .work-card {
   min-width: 0;
 }
@@ -1105,6 +1046,16 @@ a {
   line-height: 1.05;
 }
 
+.editorial-hero--statement {
+  min-height: 65svh;
+}
+
+.editorial-hero--statement h1 {
+  max-width: 16ch;
+  font-size: clamp(2.6rem, 6vw, 6rem);
+  line-height: 1.12;
+}
+
 .editorial-layout {
   display: grid;
   grid-template-columns: 1fr 3fr;
@@ -1233,147 +1184,153 @@ a {
 }
 
 @media (max-width: 1100px) and (min-width: 761px) {
-  .hero {
-    grid-template-columns: minmax(14rem, 0.52fr) minmax(0, 1.48fr);
+  .home-field {
+    grid-template-columns: minmax(16rem, 0.66fr) minmax(0, 1.34fr);
   }
 
-  .hero-brief {
+  .home-field-brief {
     padding-right: 1.5rem;
   }
 
-  .hero h1 {
-    font-size: clamp(2.8rem, 4.8vw, 4.2rem);
-  }
-
-  .hero-actions {
-    grid-template-columns: 1fr;
-  }
-
-  .hero-actions a:first-child {
-    border-right: 0;
-    padding-right: 0;
+  .home-field-copy h2 {
+    font-size: clamp(2rem, 3.3vw, 3rem);
   }
 
-  .hero-actions a:last-child {
-    border-top: 1px solid var(--line);
-    padding-left: 0;
+  .home-field-projects {
+    padding-left: 1.5rem;
   }
 
-  .core-projects {
-    padding-left: 1.5rem;
+  .home-project-grid--count-2 {
+    grid-template-columns: repeat(2, minmax(0, 1fr));
   }
 
-  .core-project-grid {
+  .home-project-grid--count-3 {
     grid-template-columns: repeat(2, minmax(0, 1fr));
     grid-template-rows: minmax(0, 1.2fr) minmax(0, 0.8fr);
   }
 
-  .core-project-card--lead {
+  .home-project-grid--count-3 .home-project-card--lead {
     grid-column: 1 / -1;
     grid-row: 1;
   }
 
-  .core-project-card--lead > a {
+  .home-project-grid--count-3 .home-project-card--lead > a {
     grid-template-columns: minmax(0, 1.08fr) minmax(11rem, 0.92fr);
     grid-template-rows: minmax(0, 1fr);
   }
 
-  .core-project-card--lead .work-visual {
+  .home-project-grid--count-3 .home-project-card--lead .work-visual {
     border-right: 1px solid var(--line);
     border-bottom: 0;
   }
 
-  .core-project-card--compact > a {
+  .home-project-card--compact > a {
     grid-template-columns: minmax(6rem, 0.72fr) minmax(0, 1.28fr);
   }
 
-  .core-project-card--compact .core-project-card-summary {
+  .home-project-card--compact .home-project-card-summary {
     display: none;
   }
-
-  .home-project-grid {
-    grid-template-columns: repeat(2, minmax(0, 1fr));
-  }
 }
 
 @media (max-height: 720px) and (min-width: 761px) {
-  .hero-copy {
+  .home-field-copy {
     padding-block: 2rem;
   }
 
-  .core-project-grid {
+  .home-project-grid {
     height: min(58svh, 34rem);
     min-height: 22rem;
   }
 
-  .core-project-card-summary {
+  .home-project-card-summary {
     display: none;
   }
 }
 
 @media (max-width: 760px) {
+  :root {
+    --site-header-height: 7.75rem;
+  }
+
+  .site-header {
+    grid-template-areas:
+      "brand utilities"
+      "modules modules";
+    grid-template-columns: minmax(0, 1fr) auto;
+    grid-template-rows: 4.75rem 3rem;
+    gap: 0 1rem;
+  }
+
   .module-nav-links {
-    display: none;
+    width: 100%;
+    align-self: stretch;
+    justify-content: flex-start;
+    gap: 0;
+    border-top: 1px solid var(--line);
   }
 
-  .hero,
-  .section-heading {
-    grid-template-columns: 1fr;
+  .module-nav-links a {
+    display: flex;
+    min-height: 3rem;
+    align-items: center;
+    padding-right: 1.5rem;
   }
 
-  .hero {
-    min-height: auto;
+  .home-field {
+    min-height: 0;
+    grid-template-columns: 1fr;
   }
 
-  .hero-brief {
-    min-height: calc(100svh - 5rem);
+  .home-field-brief {
     border-right: 0;
     border-bottom: 1px solid var(--line);
-    padding: 1.25rem 0;
+    padding: 1.5rem 0;
   }
 
-  .hero-copy {
-    padding-block: clamp(3.5rem, 14vh, 6rem);
+  .home-field-copy {
+    min-height: 24rem;
+    padding-block: clamp(3.5rem, 12vh, 6rem);
   }
 
-  .hero h1 {
-    font-size: clamp(2.8rem, 13vw, 4.4rem);
+  .home-field-copy h2 {
+    font-size: clamp(2rem, 9vw, 3rem);
   }
 
-  .core-projects {
+  .home-field-projects {
     gap: 1.25rem;
     padding: 2.5rem 0 1.5rem;
   }
 
-  .core-project-grid {
+  .home-project-grid {
     height: auto;
     min-height: 0;
     grid-template-columns: 1fr;
     grid-template-rows: auto;
   }
 
-  .core-project-card--lead {
+  .home-project-grid--count-3 .home-project-card--lead {
     grid-column: auto;
     grid-row: auto;
   }
 
-  .core-project-card--lead > a {
+  .home-project-card--lead > a {
     grid-template-rows: auto auto;
   }
 
-  .core-project-card--lead .work-visual {
+  .home-project-card--lead .work-visual {
     height: auto;
     aspect-ratio: 16 / 10;
     border-right: 0;
     border-bottom: 1px solid var(--line);
   }
 
-  .core-project-card--compact > a {
+  .home-project-card--compact > a {
     min-height: 10.5rem;
     grid-template-columns: minmax(7.5rem, 0.72fr) minmax(0, 1.28fr);
   }
 
-  .core-project-card--compact .core-project-card-summary {
+  .home-project-card--compact .home-project-card-summary {
     display: none;
   }
 
@@ -1421,30 +1378,6 @@ a {
   .site-footer > p:last-child {
     align-self: end;
   }
-
-  .module-card {
-    grid-template-columns: 2.5rem 1fr auto;
-    min-height: 11rem;
-    padding-block: 1.5rem;
-  }
-
-  .module-symbol,
-  .module-chinese {
-    display: none;
-  }
-
-  .module-name {
-    grid-column: 2;
-  }
-
-  .module-description {
-    grid-column: 2 / -1;
-  }
-
-  .module-arrow {
-    grid-column: 3;
-    grid-row: 1;
-  }
 }
 
 @media (prefers-reduced-motion: reduce) {
diff --git a/app/page.tsx b/app/page.tsx
index 0d7bae1..ffdc854 100644
--- a/app/page.tsx
+++ b/app/page.tsx
@@ -1,130 +1,101 @@
-import Link from "next/link";
 import { ArrowDownRight } from "lucide-react";
+import Link from "next/link";
 
-import { CoreProjectCard } from "@/components/core-project-card";
+import { HomeProjectCard } from "@/components/home-project-card";
 import { SiteFooter } from "@/components/site-footer";
-import { WorkCard } from "@/components/work-card";
-import { XMark } from "@/components/x-mark";
 import { loadWorks } from "@/lib/content/repository";
+import type { Work } from "@/lib/content/schema";
 import { modules } from "@/lib/site";
 
+const homepagePreviewLimit = 3;
+
 export default function HomePage() {
   const works = loadWorks();
-  const featuredWorks = works.filter((work) => work.featured);
-  const coreWorks = featuredWorks.slice(0, 3);
-  const coreWorkIds = new Set(coreWorks.map((work) => work.id));
-  const otherWorks = works.filter((work) => !coreWorkIds.has(work.id));
+  const worksByType = new Map(
+    modules.map((module) => [module.type, [] as Work[]]),
+  );
+
+  // loadWorks 已按发布日期倒序排列，分组时继续保留该稳定顺序。
+  for (const work of works) {
+    worksByType.get(work.type)!.push(work);
+  }
 
   return (
     <main id="main-content">
-      <section className="hero" aria-labelledby="hero-title">
-        <div className="hero-brief">
-          <div className="hero-kicker">
-            <span>LABX / PROJECT INDEX</span>
-            <span>00—06</span>
-          </div>
+      <h1 className="sr-only">LabX 独立 AI 实验室项目</h1>
 
-          <div className="hero-copy">
-            <p className="hero-status">
-              <span aria-hidden="true" />
-              BUILDING IN PUBLIC
-            </p>
-            <h1 id="hero-title">
-              探索和重构
-              <br />
-              一切<span className="hero-dot">。</span>
-            </h1>
-            <p className="hero-intro">
-              独立 AI 实验室，研究并构建 AI
-              在游戏、声音、叙事、视觉、影像与数字人格中的应用。
-            </p>
-          </div>
+      {modules.map((module) => {
+        const moduleWorks = worksByType.get(module.type)!;
+        const previewWorks = moduleWorks.slice(0, homepagePreviewLimit);
+        const previewCount = previewWorks.length;
 
-          <nav className="hero-actions" aria-label="首页快捷入口">
-            <a href="#projects">
-              <span>全部项目</span>
-              <span>
-                {String(works.length).padStart(2, "0")}
-                <ArrowDownRight aria-hidden="true" />
-              </span>
-            </a>
-            <a href="#worlds">
-              <span>领域索引</span>
-              <span>
-                06
-                <ArrowDownRight aria-hidden="true" />
-              </span>
-            </a>
-          </nav>
-        </div>
+        return (
+          <section
+            className="home-field"
+            id={module.type}
+            aria-labelledby={`${module.type}-title`}
+            key={module.type}
+          >
+            <div className="home-field-brief">
+              <div className="home-field-kicker">
+                <span>APPLICATION FIELD / {module.index}</span>
+                <span>{module.name}</span>
+              </div>
 
-        <div className="core-projects" aria-labelledby="core-projects-title">
-          <div className="core-projects-heading">
-            <div>
-              <p>CORE PROJECTS / ACTIVE</p>
-              <h2 id="core-projects-title">核心项目</h2>
-            </div>
-            <span>{String(coreWorks.length).padStart(2, "0")}</span>
-          </div>
-
-          <div className="core-project-grid">
-            {coreWorks.map((work, index) => (
-              <CoreProjectCard
-                key={work.id}
-                work={work}
-                index={String(index + 1).padStart(2, "0")}
-                prominence={index === 0 ? "lead" : "compact"}
-              />
-            ))}
-          </div>
-        </div>
-      </section>
+              <div className="home-field-copy">
+                <p className="home-field-name">
+                  <span aria-hidden="true" />
+                  {module.name} / {module.chineseName}
+                </p>
+                <h2 id={`${module.type}-title`}>{module.description}</h2>
+              </div>
 
-      <section
-        className="featured home-projects"
-        id="projects"
-        aria-labelledby="projects-title"
-      >
-        <div className="section-heading">
-          <p>PROJECT DIRECTORY</p>
-          <div>
-            <h2 id="projects-title">其他项目</h2>
-            <p className="section-intro">
-              按最近更新时间排列，进入项目可查看内容、关联资产与行动入口。
-            </p>
-          </div>
-        </div>
-        <div className="work-grid home-project-grid">
-          {otherWorks.map((work) => (
-            <WorkCard work={work} key={work.id} />
-          ))}
-        </div>
-      </section>
+              <Link
+                className="home-field-action"
+                href={`/${module.type}`}
+                aria-label={`全部${module.chineseName}`}
+              >
+                <span>全部{module.chineseName}</span>
+                <span>
+                  {String(moduleWorks.length).padStart(2, "0")}
+                  <ArrowDownRight aria-hidden="true" />
+                </span>
+              </Link>
+            </div>
 
-      <section className="worlds" id="worlds" aria-labelledby="worlds-title">
-        <div className="section-heading">
-          <p>APPLICATION FIELDS</p>
-          <h2 id="worlds-title">领域索引</h2>
-        </div>
-        <div className="module-grid">
-          {modules.map((module) => (
-            <Link
-              className="module-card"
-              href={`/${module.type}`}
-              key={module.type}
+            <div
+              className="home-field-projects"
+              aria-label={`${module.chineseName}项目预览`}
             >
-              <span className="module-index">{module.index}</span>
-              <span className="module-symbol" aria-hidden="true">
-                <XMark className="module-x-mark" />
-              </span>
-              <span className="module-name">{module.name}</span>
-              <span className="module-chinese">{module.chineseName}</span>
-              <span className="module-description">{module.description}</span>
-              <ArrowDownRight className="module-arrow" aria-hidden="true" />
-            </Link>
-          ))}
-        </div>
-      </section>
+              <div className="home-field-projects-heading">
+                <span>PROJECTS / LATEST</span>
+                <span>{String(previewCount).padStart(2, "0")}</span>
+              </div>
+
+              {previewCount > 0 ? (
+                <div
+                  className={`home-project-grid home-project-grid--count-${previewCount}`}
+                >
+                  {previewWorks.map((work, index) => (
+                    <HomeProjectCard
+                      key={work.id}
+                      work={work}
+                      index={String(index + 1).padStart(2, "0")}
+                      prominence={
+                        previewCount === 3 && index > 0 ? "compact" : "lead"
+                      }
+                    />
+                  ))}
+                </div>
+              ) : (
+                <div className="home-field-empty">
+                  <p>暂无公开项目。</p>
+                </div>
+              )}
+            </div>
+          </section>
+        );
+      })}
 
       <SiteFooter />
     </main>
diff --git a/components/core-project-card.tsx b/components/core-project-card.tsx
deleted file mode 100644
index 263fcae..0000000
--- a/components/core-project-card.tsx
+++ /dev/null
@@ -1,52 +0,0 @@
-import { ArrowUpRight } from "lucide-react";
-import Link from "next/link";
-
-import { WorkVisual } from "@/components/work-visual";
-import type { Work } from "@/lib/content/schema";
-import { modules } from "@/lib/site";
-
-interface CoreProjectCardProps {
-  work: Work;
-  index: string;
-  prominence: "lead" | "compact";
-}
-
-/** 首屏项目卡只保留决策所需信息，让项目本身成为首页第一视觉层级。 */
-export function CoreProjectCard({
-  work,
-  index,
-  prominence,
-}: CoreProjectCardProps) {
-  const moduleDefinition = modules.find((module) => module.type === work.type)!;
-
-  return (
-    <article
-      className={`core-project-card core-project-card--${prominence}`}
-      data-prominence={prominence}
-    >
-      <Link
-        href={`/${work.type}/${work.slug}`}
-        aria-label={`查看核心项目：${work.title}`}
-      >
-        <WorkVisual
-          type={work.type}
-          title={work.title}
-          index={moduleDefinition.index}
-        />
-        <div className="core-project-card-copy">
-          <p className="core-project-card-label">
-            <span>PROJECT / {index}</span>
-            <span>
-              {moduleDefinition.name} / {moduleDefinition.chineseName}
-            </span>
-          </p>
-          <div className="core-project-card-title">
-            <h3>{work.title}</h3>
-            <ArrowUpRight aria-hidden="true" />
-          </div>
-          <p className="core-project-card-summary">{work.summary}</p>
-        </div>
-      </Link>
-    </article>
-  );
-}
diff --git a/components/site-header.tsx b/components/site-header.tsx
index 59f82f9..7cf80f5 100644
--- a/components/site-header.tsx
+++ b/components/site-header.tsx
@@ -2,26 +2,29 @@ import Link from "next/link";
 
 import { ThemeToggle } from "@/components/theme-toggle";
 import { XMark } from "@/components/x-mark";
-import { modules } from "@/lib/site";
+import { modules, siteConfig } from "@/lib/site";
 
 export function SiteHeader() {
   return (
     <header className="site-header">
       <Link className="wordmark" href="/" aria-label="LabX 首页">
         <XMark className="wordmark-x" />
-        <span className="wordmark-label">LABX</span>
+        <span className="wordmark-copy">
+          <span className="wordmark-label">LABX</span>
+          <span className="wordmark-slogan">{siteConfig.slogan}</span>
+        </span>
       </Link>
-      <nav aria-label="主导航" className="primary-nav">
-        <div className="module-nav-links">
-          {modules.map((module) => (
-            <Link href={`/${module.type}`} key={module.type}>
-              {module.name}
-            </Link>
-          ))}
-        </div>
+      <nav aria-label="应用领域" className="module-nav-links">
+        {modules.map((module) => (
+          <Link href={`/#${module.type}`} key={module.type}>
+            {module.name}
+          </Link>
+        ))}
+      </nav>
+      <div className="header-utilities">
         <Link href="/about">关于</Link>
         <ThemeToggle />
-      </nav>
+      </div>
     </header>
   );
 }
diff --git a/tests/core-project-card.test.tsx b/tests/core-project-card.test.tsx
deleted file mode 100644
index b45caf6..0000000
--- a/tests/core-project-card.test.tsx
+++ /dev/null
@@ -1,44 +0,0 @@
-import { render, screen } from "@testing-library/react";
-import { describe, expect, it } from "vitest";
-
-import { CoreProjectCard } from "@/components/core-project-card";
-import type { Work } from "@/lib/content/schema";
-
-const work: Work = {
-  id: "game-echoes-of-us",
-  slug: "echoes-of-us",
-  type: "game",
-  title: "余响纪元",
-  summary: "六个应用领域首次汇聚的可玩世界原型。",
-  cover: "module:game",
-  publishedAt: "2026-08-30",
-  status: "published",
-  featured: true,
-  demo: true,
-  tags: ["世界原型"],
-  creators: ["LabX"],
-  relatedWorks: [],
-  actions: [],
-  body: "演示正文",
-};
-
-describe("首屏核心项目卡", () => {
-  it.each(["lead", "compact"] as const)(
-    "正确渲染 %s 层级的项目链接与无障碍名称",
-    (prominence) => {
-      render(
-        <CoreProjectCard work={work} index="01" prominence={prominence} />,
-      );
-
-      const link = screen.getByRole("link", {
-        name: "查看核心项目：余响纪元",
-      });
-      expect(link).toHaveAttribute("href", "/game/echoes-of-us");
-      expect(link.closest("article")).toHaveClass(
-        "core-project-card",
-        `core-project-card--${prominence}`,
-      );
-      expect(screen.getAllByText("余响纪元")).toHaveLength(2);
-    },
-  );
-});
diff --git a/tests/e2e/portal.spec.ts b/tests/e2e/portal.spec.ts
index 33ce2f9..e59d5c0 100644
--- a/tests/e2e/portal.spec.ts
+++ b/tests/e2e/portal.spec.ts
@@ -1,6 +1,43 @@
 import { expect, test } from "@playwright/test";
 
-const modules = ["game", "music", "book", "art", "movie", "life"];
+const modules = ["game", "music", "book", "art", "movie", "life"] as const;
+
+const fieldDescriptions = {
+  game: "研究生成式 AI、智能体与交互叙事如何共同构建可进入的虚拟世界。",
+  music: "研究 AI 在作曲、声音设计与自适应音频中的创作和协作方式。",
+  book: "研究语言模型如何参与世界观、角色、剧本与长篇叙事的构建。",
+  art: "研究生成式 AI 在 UI、原画、视觉设计与三维资产流程中的应用。",
+  movie: "研究 AI 在分镜、动画、影像生成与虚拟制作流程中的应用。",
+  life: "研究人格建模、记忆系统与行为智能，构建具有持续性的虚拟角色。",
+};
+
+test("首页按既定顺序展示六个领域及其项目预览", async ({ page }) => {
+  await page.goto("/");
+
+  await expect(page.locator("main > h1")).toHaveText("LabX 独立 AI 实验室项目");
+  await expect(page.locator("section.home-field")).toHaveCount(6);
+
+  const fieldOrder = await page
+    .locator("section.home-field")
+    .evaluateAll((sections) => sections.map((section) => section.id));
+  expect(fieldOrder).toEqual(modules);
+
+  for (const moduleType of modules) {
+    const field = page.locator(`#${moduleType}`);
+    await expect(
+      field.getByRole("heading", {
+        name: fieldDescriptions[moduleType],
+        exact: true,
+      }),
+    ).toBeVisible();
+
+    const previewCount = await field
+      .locator("article.home-project-card")
+      .count();
+    expect(previewCount).toBeGreaterThan(0);
+    expect(previewCount).toBeLessThanOrEqual(3);
+  }
+});
 
 test("六个应用领域均可访问", async ({ page }) => {
   for (const moduleType of modules) {
@@ -29,15 +66,71 @@ test("黑白主题切换会持久化", async ({ page }) => {
   await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
 });
 
-test("移动端保留核心导航和内容入口", async ({ page, isMobile }) => {
+test("跨页领域导航返回首页锚点且内容不被页头遮挡", async ({ page }) => {
+  await page.goto("/about");
+  await page
+    .getByRole("navigation", { name: "应用领域" })
+    .getByRole("link", { name: "Music", exact: true })
+    .click();
+
+  await expect(page).toHaveURL(/\/#music$/);
+  await expect(page.locator("#music")).toBeVisible();
+
+  await expect
+    .poll(async () =>
+      page.evaluate(() => {
+        const header = document.querySelector<HTMLElement>(".site-header");
+        const field = document.querySelector<HTMLElement>("#music");
+
+        if (!header || !field) return false;
+        return (
+          field.getBoundingClientRect().top >=
+          header.getBoundingClientRect().bottom - 1
+        );
+      }),
+    )
+    .toBe(true);
+});
+
+test("领域入口可以进入完整游戏列表", async ({ page }) => {
+  await page.goto("/#game");
+  await page.getByRole("link", { name: "全部游戏", exact: true }).click();
+
+  await expect(page).toHaveURL(/\/game$/);
+  await expect(page.getByText("LABX APPLICATION FIELD")).toBeVisible();
+});
+
+test("移动端保留横向领域导航和内容入口", async ({ page, isMobile }) => {
   test.skip(!isMobile, "仅在移动设备项目中执行");
   await page.goto("/");
 
   await expect(page.getByRole("link", { name: "LabX 首页" })).toBeVisible();
+  await expect(
+    page.locator(".site-header").getByText("探索和重构一切", { exact: true }),
+  ).toBeVisible();
   await expect(
     page.getByRole("link", { name: "关于", exact: true }),
   ).toBeVisible();
+  const fieldNavigation = page.getByRole("navigation", { name: "应用领域" });
+  await expect(fieldNavigation).toBeVisible();
+
+  for (const moduleName of ["Game", "Music", "Book", "Art", "Movie", "Life"]) {
+    await expect(
+      fieldNavigation.getByRole("link", { name: moduleName, exact: true }),
+    ).toBeVisible();
+  }
+
+  const navigationOverflow = await fieldNavigation.evaluate(
+    (navigation) => getComputedStyle(navigation).overflowX,
+  );
+  expect(["auto", "scroll"]).toContain(navigationOverflow);
+
   await expect(
-    page.getByRole("link", { name: "查看核心项目：余响纪元" }),
+    page.getByRole("link", { name: "查看项目：余响纪元" }),
   ).toBeVisible();
+
+  const hasPageOverflow = await page.evaluate(
+    () => document.documentElement.scrollWidth > window.innerWidth + 1,
+  );
+  expect(hasPageOverflow).toBe(false);
 });
diff --git a/tests/home-page.test.ts b/tests/home-page.test.ts
index 1e3ecd1..183f994 100644
--- a/tests/home-page.test.ts
+++ b/tests/home-page.test.ts
@@ -13,41 +13,59 @@ const globalStyles = readFileSync(
   "utf8",
 );
 
-describe("首页项目优先级与叙事密度", () => {
-  it("不再渲染宏大叙事区块和页脚巨型 X", () => {
+describe("首页六领域项目索引", () => {
+  it("移除旧首页分类、领域索引和宏大叙事区块", () => {
+    expect(homeSource).not.toContain("核心项目");
+    expect(homeSource).not.toContain("其他项目");
+    expect(homeSource).not.toContain("领域索引");
     expect(homeSource).not.toContain("作品不再孤立，生命不止一次。");
     expect(homeSource).not.toContain("每一次交叉，都是下一条路径的起点。");
-    expect(homeSource).not.toContain('className="vision"');
+    expect(homeSource).not.toContain('className="hero"');
+    expect(homeSource).not.toContain('className="worlds"');
     expect(homeSource).not.toContain('className="x-signature"');
-    expect(homeSource).not.toContain('className="hero-x-stage"');
     expect(footerSource).not.toContain("footer-wordmark-x");
-    expect(globalStyles).not.toContain(".vision {");
-    expect(globalStyles).not.toContain(".x-signature {");
-    expect(globalStyles).not.toContain(".hero-x-stage");
-    expect(globalStyles).not.toContain(".footer-wordmark-x");
+    expect(globalStyles).not.toContain(".core-projects");
+    expect(globalStyles).not.toContain(".core-project-card");
+    expect(globalStyles).not.toContain(".hero {");
+    expect(globalStyles).not.toContain(".worlds {");
   });
 
-  it("首屏右侧直接展示三个核心项目，其他项目随后出现", () => {
-    const coreProjectsPosition = homeSource.indexOf(
-      'className="core-projects"',
+  it("按既定顺序生成六个带稳定锚点的领域分区", () => {
+    expect(homeSource).toContain('<h1 className="sr-only">');
+    expect(homeSource).toContain("{modules.map((module) => {");
+    expect(homeSource).toContain('className="home-field"');
+    expect(homeSource).toContain("id={module.type}");
+    expect(homeSource).toContain("aria-labelledby={`${module.type}-title`}");
+    expect(homeSource).toContain(
+      "<h2 id={`${module.type}-title`}>{module.description}</h2>",
     );
-    const otherProjectsPosition = homeSource.indexOf('id="projects"');
+    expect(homeSource).toContain("APPLICATION FIELD / {module.index}");
+  });
 
-    expect(homeSource).toContain("const coreWorks = featuredWorks.slice(0, 3)");
+  it("一次加载并分组项目，每个领域最多预览三个最新项目", () => {
+    expect(homeSource).toContain("const homepagePreviewLimit = 3");
+    expect(homeSource.match(/loadWorks\(\)/g)).toHaveLength(1);
+    expect(homeSource).toContain("const worksByType = new Map(");
+    expect(homeSource).toContain("worksByType.get(work.type)!.push(work)");
     expect(homeSource).toContain(
-      'prominence={index === 0 ? "lead" : "compact"}',
+      "const previewWorks = moduleWorks.slice(0, homepagePreviewLimit)",
     );
-    expect(coreProjectsPosition).toBeGreaterThan(-1);
-    expect(otherProjectsPosition).toBeGreaterThan(coreProjectsPosition);
-    expect(globalStyles).toContain(
-      "grid-template-columns: minmax(17rem, 0.68fr) minmax(0, 1.45fr)",
+    expect(homeSource).toContain("previewWorks.map((work, index) => (");
+    expect(homeSource).toContain("<HomeProjectCard");
+    expect(homeSource).toContain(
+      'previewCount === 3 && index > 0 ? "compact" : "lead"',
     );
-    expect(globalStyles).toContain("height: min(66svh, 42rem)");
+    expect(homeSource).toContain("暂无公开项目。");
   });
 
-  it("标语压缩为两行，并限制为项目标题以下的视觉层级", () => {
-    expect(homeSource).toContain("探索和重构");
-    expect(homeSource).toContain('className="hero-dot"');
-    expect(globalStyles).toContain("font-size: clamp(3.1rem, 5.1vw, 5.6rem)");
+  it("领域左侧提供叙事、项目总数和完整列表入口", () => {
+    expect(homeSource).toContain("{module.name} / {module.chineseName}");
+    expect(homeSource).toContain("{module.description}");
+    expect(homeSource).toContain("href={`/${module.type}`}");
+    expect(homeSource).toContain("aria-label={`全部${module.chineseName}`}");
+    expect(homeSource).toContain("<span>全部{module.chineseName}</span>");
+    expect(homeSource).toContain(
+      '{String(moduleWorks.length).padStart(2, "0")}',
+    );
   });
 });
diff --git a/tests/positioning.test.ts b/tests/positioning.test.ts
index b8f0e4e..7e5d2ca 100644
--- a/tests/positioning.test.ts
+++ b/tests/positioning.test.ts
@@ -5,18 +5,23 @@ import { describe, expect, it } from "vitest";
 
 const standardPositioning =
   "LabX 是一个独立 AI 实验室，研究并构建 AI 在游戏、声音、叙事、视觉、影像与数字人格中的应用。";
+const aboutHeadline =
+  "独立 AI 实验室，研究并构建 AI 在游戏、声音、叙事、视觉、影像与数字人格中的应用。";
 
 function readProjectFile(path: string) {
   return readFileSync(resolve(process.cwd(), path), "utf8");
 }
 
 describe("LabX 独立 AI 实验室定位", () => {
-  it("首页、站点元数据和 README 使用统一定位", () => {
+  it("站点元数据、README 和 About 使用统一定位", () => {
     const homeSource = readProjectFile("app/page.tsx");
+    const aboutSource = readProjectFile("app/about/page.tsx");
     const siteSource = readProjectFile("lib/site.ts");
     const readmeSource = readProjectFile("README.md");
+    const headlineSource = aboutSource.match(/<h1>([\s\S]*?)<\/h1>/)?.[1];
 
-    expect(homeSource).toContain("独立 AI 实验室");
+    expect(homeSource).toContain("LabX 独立 AI 实验室项目");
+    expect(headlineSource?.replace(/\s+/g, " ").trim()).toBe(aboutHeadline);
     expect(siteSource).toContain(standardPositioning);
     expect(readmeSource).toContain(standardPositioning);
   });
@@ -43,7 +48,8 @@ describe("LabX 独立 AI 实验室定位", () => {
     const siteSource = readProjectFile("lib/site.ts");
     const leadProjectSource = readProjectFile("content/game/echoes-of-us.mdx");
 
-    expect(homeSource).toContain("APPLICATION FIELDS");
+    expect(homeSource).toContain("APPLICATION FIELD / {module.index}");
+    expect(homeSource).toContain("{module.description}");
     expect(modulePageSource).toContain("LABX APPLICATION FIELD");
     expect(modulePageSource).not.toContain("CONTENT DOMAIN");
     expect(modulePageSource).toContain("领域项目");
@@ -56,10 +62,23 @@ describe("LabX 独立 AI 实验室定位", () => {
     expect(leadProjectSource).not.toContain("LabX 内容生态");
   });
 
-  it("本次定位同步不改变首页既有项目分类", () => {
+  it("首页不再按核心与其他项目分类", () => {
     const homeSource = readProjectFile("app/page.tsx");
 
-    expect(homeSource).toContain("核心项目");
-    expect(homeSource).toContain("其他项目");
+    expect(homeSource).not.toContain("核心项目");
+    expect(homeSource).not.toContain("其他项目");
+    expect(homeSource).not.toContain("领域索引");
+    expect(homeSource).toContain("HomeProjectCard");
+  });
+
+  it("About 正文不重复 Hero 中的实验室定位", () => {
+    const aboutSource = readProjectFile("app/about/page.tsx");
+    const articleSource = aboutSource.match(
+      /<article className="editorial-content">([\s\S]*?)<\/article>/,
+    )?.[1];
+
+    expect(articleSource).toBeDefined();
+    expect(articleSource).not.toContain("独立 AI 实验室");
+    expect(articleSource).toContain("我们使用 GitHub");
   });
 });
diff --git a/tests/typography.test.ts b/tests/typography.test.ts
index 5ddeefe..5b63f02 100644
--- a/tests/typography.test.ts
+++ b/tests/typography.test.ts
@@ -23,19 +23,29 @@ function getRule(selector: string): string {
 }
 
 describe("中文展示字体", () => {
-  it("首页中文主标题使用独立字体、正常字宽与安全行高", () => {
-    const heroTitleRule = getRule(".hero h1");
+  it("首页领域叙事使用独立字体、正常字宽与安全行高", () => {
+    const fieldTitleRule = getRule(".home-field-copy h2");
 
     expect(globalStyles).toContain("--display-cjk:");
-    expect(heroTitleRule).toContain("font-family: var(--display-cjk)");
-    expect(heroTitleRule).toContain("font-stretch: normal");
-    expect(heroTitleRule).toContain("letter-spacing: 0.01em");
-    expect(heroTitleRule).toContain("line-height: 1.06");
+    expect(fieldTitleRule).toContain("font-family: var(--display-cjk)");
+    expect(fieldTitleRule).toContain("font-stretch: normal");
+    expect(fieldTitleRule).toContain("letter-spacing: 0.01em");
+    expect(fieldTitleRule).toContain("line-height:");
+    expect(fieldTitleRule).not.toMatch(/letter-spacing:\s*-/);
+  });
+
+  it("About 长定位标题使用专用紧凑尺度", () => {
+    const statementTitleRule = getRule(".editorial-hero--statement h1");
+
+    expect(statementTitleRule).toContain("max-width:");
+    expect(statementTitleRule).toContain("font-size: clamp(");
+    expect(statementTitleRule).not.toContain("10rem");
   });
 
   it.each([
     ".work-visual-title",
     ".work-card-meta h3",
+    ".home-project-card-title h3",
     ".list-heading h2",
     ".work-detail-heading h1",
     ".action-link",
diff --git a/tests/x-mark.test.tsx b/tests/x-mark.test.tsx
index 3b5550b..f754b4f 100644
--- a/tests/x-mark.test.tsx
+++ b/tests/x-mark.test.tsx
@@ -24,7 +24,7 @@ const footerSource = readFileSync(
   "utf8",
 );
 
-/** 提取品牌组合规则，防止 LABX 文字重新压过 X 主符号。 */
+/** 提取品牌组合规则，防止 LABX 文字与口号重新压过 X 主符号。 */
 function getRule(selector: string): string {
   const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
   const matchedRule = globalStyles.match(
@@ -58,9 +58,11 @@ describe("XMark 品牌图标", () => {
     expect(mark).toHaveAttribute("aria-hidden", "true");
   });
 
-  it("页头以大号 X 为主符号，文字标签统一为小号 LABX", () => {
+  it("页头以大号 X 为主符号，LABX 与口号组成两行文字栈", () => {
     const headerLabel = getRule(".wordmark-label");
     const headerX = getRule(".wordmark-x");
+    const headerCopy = getRule(".wordmark-copy");
+    const headerSlogan = getRule(".wordmark-slogan");
     const footerLabel = getRule(".footer-wordmark-label");
 
     expect(headerLabel).toContain("font-size: 0.64rem");
@@ -68,11 +70,17 @@ describe("XMark 品牌图标", () => {
     expect(headerLabel).toContain("color: var(--muted)");
     expect(headerX).toContain("width: 3rem");
     expect(headerX).toContain("mask-size: 135%");
+    expect(headerCopy).toContain("flex-direction: column");
+    expect(headerSlogan).toContain("white-space: nowrap");
     expect(footerLabel).toContain("font-size: clamp(0.64rem, 0.8vw, 0.78rem)");
     expect(footerLabel).toContain("color: var(--muted)");
+    expect(headerSource).toContain("modules, siteConfig");
     expect(headerSource).toContain(
       '<span className="wordmark-label">LABX</span>',
     );
+    expect(headerSource).toContain(
+      '<span className="wordmark-slogan">{siteConfig.slogan}</span>',
+    );
     expect(footerSource).toContain(
       '<p className="footer-wordmark-label">LABX</p>',
     );
@@ -84,4 +92,11 @@ describe("XMark 品牌图标", () => {
     );
     expect(globalStyles).not.toContain(".footer-wordmark-x");
   });
+
+  it("页头六领域链接统一指向首页锚点", () => {
+    expect(headerSource).toContain('aria-label="应用领域"');
+    expect(headerSource).toContain("href={`/#${module.type}`}");
+    expect(headerSource).not.toContain("href={`/${module.type}`}");
+    expect(headerSource).toContain('className="header-utilities"');
+  });
 });
diff --git a/components/home-project-card.tsx b/components/home-project-card.tsx
new file mode 100644
index 0000000..4922a60
--- /dev/null
+++ b/components/home-project-card.tsx
@@ -0,0 +1,52 @@
+import { ArrowUpRight } from "lucide-react";
+import Link from "next/link";
+
+import { WorkVisual } from "@/components/work-visual";
+import type { Work } from "@/lib/content/schema";
+import { modules } from "@/lib/site";
+
+interface HomeProjectCardProps {
+  work: Work;
+  index: string;
+  prominence: "lead" | "compact";
+}
+
+/** 首页领域项目卡只保留浏览项目所需信息，不再引入“核心项目”分类。 */
+export function HomeProjectCard({
+  work,
+  index,
+  prominence,
+}: HomeProjectCardProps) {
+  const moduleDefinition = modules.find((module) => module.type === work.type)!;
+
+  return (
+    <article
+      className={`home-project-card home-project-card--${prominence}`}
+      data-prominence={prominence}
+    >
+      <Link
+        href={`/${work.type}/${work.slug}`}
+        aria-label={`查看项目：${work.title}`}
+      >
+        <WorkVisual
+          type={work.type}
+          title={work.title}
+          index={moduleDefinition.index}
+        />
+        <div className="home-project-card-copy">
+          <p className="home-project-card-label">
+            <span>PROJECT / {index}</span>
+            <span>
+              {moduleDefinition.name} / {moduleDefinition.chineseName}
+            </span>
+          </p>
+          <div className="home-project-card-title">
+            <h3>{work.title}</h3>
+            <ArrowUpRight aria-hidden="true" />
+          </div>
+          <p className="home-project-card-summary">{work.summary}</p>
+        </div>
+      </Link>
+    </article>
+  );
+}
diff --git a/tests/home-project-card.test.tsx b/tests/home-project-card.test.tsx
new file mode 100644
index 0000000..b372b55
--- /dev/null
+++ b/tests/home-project-card.test.tsx
@@ -0,0 +1,48 @@
+import { render, screen } from "@testing-library/react";
+import { describe, expect, it } from "vitest";
+
+import { HomeProjectCard } from "@/components/home-project-card";
+import type { Work } from "@/lib/content/schema";
+
+const work: Work = {
+  id: "game-echoes-of-us",
+  slug: "echoes-of-us",
+  type: "game",
+  title: "余响纪元",
+  summary: "六个应用领域首次汇聚的可玩世界原型。",
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
+describe("首页领域项目卡", () => {
+  it.each(["lead", "compact"] as const)(
+    "正确渲染 %s 层级的项目链接与无障碍名称",
+    (prominence) => {
+      render(
+        <HomeProjectCard work={work} index="01" prominence={prominence} />,
+      );
+
+      const link = screen.getByRole("link", {
+        name: "查看项目：余响纪元",
+      });
+      expect(link).toHaveAttribute("href", "/game/echoes-of-us");
+      expect(link.closest("article")).toHaveClass(
+        "home-project-card",
+        `home-project-card--${prominence}`,
+      );
+      expect(link.closest("article")).toHaveAttribute(
+        "data-prominence",
+        prominence,
+      );
+      expect(screen.getAllByText("余响纪元")).toHaveLength(2);
+    },
+  );
+});
```

## 测试用例

### TC-001 Header 品牌与锚点导航

- 类型：组件与端到端测试
- 优先级：高
- 操作步骤：访问首页和 About，检查品牌文字栈并点击 Music 导航。
- 预期结果：Header 显示 LABX 与口号，URL 返回 `/#music`，目标区域位于 Sticky Header 下方。
- 是否通过：通过。

### TC-002 六领域项目分区

- 类型：源码、组件与端到端测试
- 优先级：高
- 操作步骤：访问首页并检查六个 `.home-field`。
- 预期结果：分区顺序为 game、music、book、art、movie、life；每段显示对应叙事与最多三个同领域项目。
- 是否通过：通过。

### TC-003 完整领域入口

- 类型：端到端测试
- 优先级：高
- 操作步骤：从 `/#game` 点击“全部游戏”。
- 预期结果：进入 `/game` 并显示现有领域页。
- 是否通过：通过。

### TC-004 About 定位与排版

- 类型：源码与排版回归测试
- 优先级：高
- 操作步骤：检查 About Hero 标题、正文和专用标题样式。
- 预期结果：Hero 使用指定定位句，正文不重复定位，长标题不使用原有 10rem 尺度。
- 是否通过：通过。

### TC-005 移动端导航与溢出

- 类型：移动端端到端测试
- 优先级：高
- 操作步骤：在移动端访问首页，检查六领域菜单及页面宽度。
- 预期结果：菜单横向滚动且全部链接可访问，页面自身没有横向溢出。
- 是否通过：通过。

## 验证结果

- `pnpm format:check`：通过。
- `pnpm lint`：通过。
- `pnpm typecheck`：通过。
- `pnpm test`：通过，8 个测试文件、31 项测试全部通过。
- `pnpm build`：通过，21 个静态/SSG 页面全部生成成功。
- `pnpm test:e2e`：通过，13 项通过、1 项按桌面环境正常跳过。
- 本地首页：`http://localhost:3000/` 返回 HTTP 200。

