# 修复中英文展示排版过度压缩

## 背景与目标

- 用户截图显示首页“探索和重构一切”中文字形横向、纵向互相覆盖，其他英文展示文字也显得拥挤。
- 目标是保留 LabX 黑白极简和大字号编辑感，同时让中文笔画、英文字符及多行标题保持清晰边界。

## 约束与原则

- 不引入网络字体，继续使用系统字体，避免额外下载和授权风险。
- 中文与拉丁字母使用不同展示字体栈，不让中文回退字体继承窄体拉伸和负字距。
- 英文保留轻微紧凑感，但降低负字距幅度；中文统一使用非负字距和安全行高。
- 同步覆盖首页、模块页、作品卡片、详情、编辑页和 404，避免局部修复。

## 阶段与 TODO

- [x] 定位 `font-stretch`、负字距、过低行高和中文字体回退的叠加问题。
- [x] 新增中文 CJK（中日韩统一表意文字）系统字体栈。
- [x] 修复所有中文展示标题的字距和行高。
- [x] 缓和英文品牌、模块名和模块主标题的负字距。
- [x] 增加中文排版回归测试。
- [x] 完成格式、Lint、类型、全量测试和生产构建。

## 关键风险

- Windows、macOS 和 Linux 使用的首选中文系统字体不同，具体字面宽度会略有差异，但当前字体栈和非负字距可避免字符重叠。
- 超大标题仍使用响应式字号；极窄屏由既有移动端规则限制字号，不改变原有信息结构。
- 当前内置浏览器受 localhost URL 安全策略限制，无法直接接管页面进行截图复核；使用静态规则测试和生产构建验证代码正确性。

## 当前进展

- 首页中文主标题已改用独立字体栈，取消窄体拉伸，字距改为 `0.01em`，行高改为 `1.02`。
- 中文二级标题、作品标题、详情标题、行动链接、编辑页标题和 404 标题均取消负字距。
- 英文品牌和模块标题的负字距从最高约 `-0.095em` 缓和至 `-0.035em` 或 `-0.04em`。
- 新增测试确保首页关键参数固定，并防止主要中文标题重新出现负字距。

## 代码变更

### `app/globals.css`

```diff
diff --git a/app/globals.css b/app/globals.css
--- a/app/globals.css
+++ b/app/globals.css
@@
   --line: #b9b8b2;
   --display: "Arial Narrow", "Helvetica Neue", Arial, sans-serif;
+  /* 中文不使用窄体拉伸，避免字体回退后仍继承拉丁字母的压缩参数。 */
+  --display-cjk:
+    "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", "Source Han Sans SC",
+    system-ui, sans-serif;
   --body:
@@
 .wordmark {
   font-family: var(--display);
   font-size: 1.45rem;
   font-weight: 900;
-  letter-spacing: -0.08em;
+  letter-spacing: -0.04em;
 }
@@
 .hero h1 {
   max-width: 9ch;
   margin: 0;
-  font-family: var(--display);
+  font-family: var(--display-cjk);
   font-size: clamp(4.4rem, 12.5vw, 12rem);
-  font-stretch: condensed;
+  font-stretch: normal;
   font-weight: 900;
-  letter-spacing: -0.09em;
-  line-height: 0.76;
+  letter-spacing: 0.01em;
+  line-height: 1.02;
 }
@@
 .section-heading h2,
 .vision h2 {
   margin: 0;
-  font-family: var(--display);
+  font-family: var(--display-cjk);
   font-size: clamp(2.6rem, 7vw, 7rem);
   font-weight: 800;
-  letter-spacing: -0.065em;
-  line-height: 0.95;
+  letter-spacing: 0.01em;
+  line-height: 1.08;
 }
@@
 .module-name {
   font-family: var(--display);
   font-size: clamp(2.2rem, 5vw, 5rem);
   font-weight: 800;
-  letter-spacing: -0.07em;
+  letter-spacing: -0.035em;
 }
@@
 .work-visual-title {
-  font-family: var(--display);
+  font-family: var(--display-cjk);
   font-size: clamp(2.2rem, 5.5vw, 5.5rem);
   font-weight: 850;
-  letter-spacing: -0.08em;
-  line-height: 0.9;
+  letter-spacing: 0.01em;
+  line-height: 1.08;
 }
@@
 .work-card-meta h3 {
   margin: 0.55rem 0 0;
-  font-family: var(--display);
+  font-family: var(--display-cjk);
   font-size: clamp(1.7rem, 3vw, 2.8rem);
   font-weight: 780;
-  letter-spacing: -0.055em;
+  letter-spacing: 0.01em;
+  line-height: 1.2;
 }
@@
 .module-hero h1 {
-  letter-spacing: -0.095em;
-  line-height: 0.72;
+  letter-spacing: -0.035em;
+  line-height: 0.85;
 }
@@
 .list-heading h2 {
   margin: 0;
-  font-family: var(--display);
+  font-family: var(--display-cjk);
   font-size: clamp(2.2rem, 5vw, 5rem);
   font-weight: 800;
-  letter-spacing: -0.06em;
+  letter-spacing: 0.01em;
+  line-height: 1.1;
 }
@@
 .empty-state p {
-  font-family: var(--display);
+  font-family: var(--display-cjk);
   font-size: 2rem;
   font-weight: 700;
 }
@@
 .work-detail-heading h1 {
   margin: 1.5rem 0 2rem;
-  font-family: var(--display);
+  font-family: var(--display-cjk);
   font-size: clamp(4rem, 10vw, 10rem);
   font-weight: 850;
-  letter-spacing: -0.085em;
-  line-height: 0.83;
+  letter-spacing: 0.01em;
+  line-height: 1.05;
 }
@@
 .action-link {
-  font-family: var(--display);
+  font-family: var(--display-cjk);
   font-size: clamp(1.25rem, 2.5vw, 2rem);
   font-weight: 700;
-  letter-spacing: -0.03em;
+  letter-spacing: 0.01em;
+  line-height: 1.3;
 }
@@
 .mdx-content h2,
 .privacy-content h2,
 .editorial-content h2 {
   margin: 4rem 0 1.25rem;
-  font-family: var(--display);
+  font-family: var(--display-cjk);
   font-size: clamp(2rem, 4vw, 3.7rem);
   font-weight: 780;
-  letter-spacing: -0.055em;
+  letter-spacing: 0.01em;
+  line-height: 1.2;
 }
@@
 .editorial-hero h1 {
-  font-family: var(--display);
+  font-family: var(--display-cjk);
   font-size: clamp(4rem, 10vw, 10rem);
   font-weight: 850;
-  letter-spacing: -0.085em;
-  line-height: 0.9;
+  letter-spacing: 0.01em;
+  line-height: 1.05;
 }
@@
 .not-found h1 {
-  font-family: var(--display);
+  font-family: var(--display-cjk);
   font-size: clamp(4rem, 10vw, 10rem);
   font-weight: 850;
-  letter-spacing: -0.08em;
-  line-height: 0.9;
+  letter-spacing: 0.01em;
+  line-height: 1.05;
 }
@@
 .footer-wordmark {
-  letter-spacing: -0.09em;
-  line-height: 0.8;
+  letter-spacing: -0.04em;
+  line-height: 0.9;
 }
```

### `tests/typography.test.ts`

```diff
diff --git a/tests/typography.test.ts b/tests/typography.test.ts
new file mode 100644
--- /dev/null
+++ b/tests/typography.test.ts
@@ -0,0 +1,49 @@
+import { readFileSync } from "node:fs";
+import { resolve } from "node:path";
+
+import { describe, expect, it } from "vitest";
+
+const globalStyles = readFileSync(
+  resolve(process.cwd(), "app/globals.css"),
+  "utf8",
+);
+
+/** 提取单个 CSS 规则，用于防止中文标题再次继承窄体负字距。 */
+function getRule(selector: string): string {
+  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
+  const matchedRule = globalStyles.match(
+    new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`),
+  );
+
+  if (!matchedRule) {
+    throw new Error(`没有找到 CSS 规则：${selector}`);
+  }
+
+  return matchedRule[1];
+}
+
+describe("中文展示字体", () => {
+  it("首页中文主标题使用独立字体、正常字宽与安全行高", () => {
+    const heroTitleRule = getRule(".hero h1");
+
+    expect(globalStyles).toContain("--display-cjk:");
+    expect(heroTitleRule).toContain("font-family: var(--display-cjk)");
+    expect(heroTitleRule).toContain("font-stretch: normal");
+    expect(heroTitleRule).toContain("letter-spacing: 0.01em");
+    expect(heroTitleRule).toContain("line-height: 1.02");
+  });
+
+  it.each([
+    ".work-visual-title",
+    ".work-card-meta h3",
+    ".list-heading h2",
+    ".work-detail-heading h1",
+    ".action-link",
+    ".editorial-hero h1",
+    ".not-found h1",
+  ])("%s 不再使用负字距", (selector) => {
+    const rule = getRule(selector);
+
+    expect(rule).toContain("font-family: var(--display-cjk)");
+    expect(rule).not.toMatch(/letter-spacing:\s*-/);
+  });
+});
```

### `.agentdocs/index.md`

```diff
diff --git a/.agentdocs/index.md b/.agentdocs/index.md
--- a/.agentdocs/index.md
+++ b/.agentdocs/index.md
@@
 ## 当前变更文档
 
+`workflow/20260830163831-fix-display-typography-spacing.md` - 修复中文标题与英文展示字母的过度压缩，拆分中英文字体栈并增加排版回归测试；调整全站标题排版或排查字符重叠时读取。
 `workflow/20260830182600-complete-labx-portal-mvp.md` - 完成 LabX 门户 MVP、六个内容模块、MDX 内容体系、跨模块关系、主题、SEO、分析、测试和发布准备；维护或验收当前站点时优先读取。
@@
 - 依赖与锁文件已经生成；格式、Lint、类型、单元/组件测试、生产构建、端到端测试及 Lighthouse 审计均已通过。
+- 中英文展示排版已经拆分：中文使用独立 CJK 字体栈与安全字距/行高，英文仅保留轻微紧凑效果。
 - 当前仓库尚未配置 Git remote 与 Vercel 项目绑定；代码已经具备 Vercel 构建与 GitHub Actions 持续集成配置。
```

## 测试用例

### TC-001 首页中文标题排版约束

- 类型：单元回归测试
- 优先级：高
- 操作步骤：读取 `app/globals.css` 中 `.hero h1` 规则。
- 预期结果：使用中文字体栈、正常字宽、`0.01em` 字距和 `1.02` 行高。
- 是否通过：通过。

### TC-002 全站中文展示标题负字距

- 类型：单元回归测试
- 优先级：高
- 操作步骤：检查作品视觉、卡片、列表、详情、行动链接、编辑页和 404 标题规则。
- 预期结果：全部使用中文字体栈，且不存在负字距。
- 是否通过：通过；参数化测试 7 项全部通过。

### TC-003 工程质量检查

- 类型：静态与构建验证
- 优先级：高
- 操作步骤：执行 `npm run format:check`、`npm run lint`、`npm run typecheck`、`npm test` 与 `npm run build`。
- 预期结果：所有命令无错误，生产页面继续静态生成。
- 是否通过：通过；格式、Lint、类型检查均无错误，4 个测试文件共 14 项测试通过，生产构建生成 21 个静态页面。
