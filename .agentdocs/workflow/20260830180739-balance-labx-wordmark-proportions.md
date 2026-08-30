# 调整 LAB 与 X-icon 品牌组合比例

## 背景与目标

- 用户截图标出页头和页脚的品牌组合：`LAB` 字母过粗，而 X-icon 的可见图形明显偏小。
- 根因是文字使用 `900` 字重，同时透明 X 资源的图形只占 1254×1254 画布中约 930×930；CSS 盒子相近并不代表可见尺寸相近。
- 目标是降低 LAB 的视觉重量，并通过增大 X 盒子补偿资源留白，使两者在页头与页脚形成平衡组合。

## 约束与原则

- 不修改用户提供的 X 图片，不进行裁切或重新生成。
- 保持既有 XMark 组件、CSS mask、黑白主题和导航语义不变。
- 页头和页脚使用同一套轻量无衬线方向，但分别按使用尺寸设置 X 比例。
- 不修改 Hero、模块卡片和其他 X-icon 尺寸，避免扩大本次调整范围。

## 阶段与 TODO

- [x] 根据截图与现有 CSS 确认文字字重和透明画布留白问题。
- [x] 调轻页头和页脚 LAB 字重与负字距。
- [x] 放大页头和页脚 X-icon 可视盒子。
- [x] 增加品牌组合比例回归测试。
- [x] 完成格式、Lint、类型、全量测试、本地响应和生产构建验证。
- [x] 更新文档索引和变更记录。

## 关键风险

- 不同操作系统的 Helvetica Neue / Arial 字体映射存在细微差异，但 `600` 字重会稳定低于原来的 `900`。
- X 资源自身仍保留透明边缘；当前通过视觉盒子补偿，未来若更换紧裁切资源需同步重新评估尺寸。

## 当前进展

- 页头 LAB 字重由 `900` 降为 `600`，字距由 `-0.04em` 调整为 `-0.02em`。
- 页头 X 盒子由 `1.05rem` 放大为 `1.55rem`。
- 页脚 LAB 字重由 `900` 降为 `600`，行高由 `0.9` 调整为 `1`。
- 页脚 X 盒子由 `0.8em` 放大为 `1.25em`。
- 回归测试会阻止品牌组合重新使用 `900` 字重或缩回旧 X 尺寸。

## 代码变更

### `app/globals.css`

```diff
diff --git a/app/globals.css b/app/globals.css
--- a/app/globals.css
+++ b/app/globals.css
@@
 .wordmark {
   display: inline-flex;
   align-items: center;
-  gap: 0.2rem;
-  font-family: var(--display);
-  font-size: 1.45rem;
-  font-weight: 900;
-  letter-spacing: -0.04em;
+  gap: 0.08rem;
+  font-family: "Helvetica Neue", Arial, sans-serif;
+  font-size: 1.4rem;
+  font-weight: 600;
+  letter-spacing: -0.02em;
 }
 
 .wordmark-x {
-  width: 1.05rem;
-  height: 1.05rem;
+  width: 1.55rem;
+  height: 1.55rem;
 }
@@
 .footer-wordmark {
   display: flex;
   align-items: center;
-  gap: 0.25rem;
-  font-family: var(--display);
+  gap: 0.12rem;
+  font-family: "Helvetica Neue", Arial, sans-serif;
   font-size: clamp(3rem, 7vw, 6rem);
-  font-weight: 900;
-  letter-spacing: -0.04em;
-  line-height: 0.9;
+  font-weight: 600;
+  letter-spacing: -0.02em;
+  line-height: 1;
 }
 
 .footer-wordmark-x {
-  width: 0.8em;
-  height: 0.8em;
+  width: 1.25em;
+  height: 1.25em;
 }
```

### `tests/x-mark.test.tsx`

```diff
diff --git a/tests/x-mark.test.tsx b/tests/x-mark.test.tsx
--- a/tests/x-mark.test.tsx
+++ b/tests/x-mark.test.tsx
@@
 const iconPath = resolve(
   process.cwd(),
   "public/x-x-x20/outputs/x-icon-black-transparent.png",
 );
+const globalStyles = readFileSync(
+  resolve(process.cwd(), "app/globals.css"),
+  "utf8",
+);
+
+/** 提取品牌组合规则，防止文字与 X 的视觉比例再次失衡。 */
+function getRule(selector: string): string {
+  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
+  const matchedRule = globalStyles.match(
+    new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`),
+  );
+
+  if (!matchedRule) throw new Error(`没有找到 CSS 规则：${selector}`);
+  return matchedRule[1];
+}
 
 describe("XMark 品牌图标", () => {
   it("使用用户提供的透明静态资源作为主题遮罩", () => {
-    const globalStyles = readFileSync(
-      resolve(process.cwd(), "app/globals.css"),
-      "utf8",
-    );
-
@@
     expect(mark).toHaveClass("x-mark", "test-x-mark");
     expect(mark).toHaveAttribute("aria-hidden", "true");
   });
+
+  it("页头与页脚使用较轻字重并补偿图标画布留白", () => {
+    const headerWordmark = getRule(".wordmark");
+    const headerX = getRule(".wordmark-x");
+    const footerWordmark = getRule(".footer-wordmark");
+    const footerX = getRule(".footer-wordmark-x");
+
+    expect(headerWordmark).toContain("font-weight: 600");
+    expect(headerWordmark).not.toContain("font-weight: 900");
+    expect(headerX).toContain("width: 1.55rem");
+    expect(footerWordmark).toContain("font-weight: 600");
+    expect(footerWordmark).not.toContain("font-weight: 900");
+    expect(footerX).toContain("width: 1.25em");
+  });
 });
```

### `.agentdocs/index.md`

```diff
diff --git a/.agentdocs/index.md b/.agentdocs/index.md
--- a/.agentdocs/index.md
+++ b/.agentdocs/index.md
@@
 ## 当前变更文档
 
+`workflow/20260830180739-balance-labx-wordmark-proportions.md` - 调轻页头与页脚 LAB 字重并放大 X-icon，修正透明图标画布留白造成的品牌组合比例失衡；继续调整品牌字标比例时读取。
 `workflow/20260830174023-integrate-x-icon-visual-system.md` - 将用户提供的 X-icon 建立为全站核心视觉符号，重构首页、模块、作品、编辑页、图标和社交分享图；继续调整品牌视觉或静态资源时优先读取。
```

## 测试用例

### TC-001 品牌组合参数

- 类型：单元回归测试
- 优先级：高
- 操作步骤：读取 `.wordmark`、`.wordmark-x`、`.footer-wordmark` 和 `.footer-wordmark-x` CSS 规则。
- 预期结果：两处 LAB 使用 `600` 字重且不包含 `900`；页头 X 宽 `1.55rem`，页脚 X 宽 `1.25em`。
- 是否通过：通过。

### TC-002 全量测试

- 类型：单元与组件测试
- 优先级：高
- 操作步骤：执行 `npm test`。
- 预期结果：既有内容、主题、排版、作品和 XMark 测试全部通过。
- 是否通过：通过；5 个测试文件共 17 项测试通过。

### TC-003 静态检查与格式

- 类型：代码质量测试
- 优先级：高
- 操作步骤：执行 `npm run format:check`、`npm run lint` 和 `npm run typecheck`。
- 预期结果：全部无错误。
- 是否通过：通过。

### TC-004 本地响应与生产构建

- 类型：运行时与构建测试
- 优先级：高
- 操作步骤：请求本地首页并执行 `npm run build`。
- 预期结果：首页返回 200，全部计划路由正常静态生成。
- 是否通过：通过；首页返回 200，生产构建生成 21 个静态页面。
