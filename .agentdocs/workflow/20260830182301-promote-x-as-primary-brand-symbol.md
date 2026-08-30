# 将 X 提升为品牌主符号

## 背景与目标

- 用户认为当前 `LAB + X` 仍像同等权重的传统文字字标，组合关系不够协调。
- 品牌视觉应以 X 作为可独立识别的主题抽象图案，`LAB` 只在旁边承担小号文字说明。
- 目标是在页头和页脚建立一致但尺度不同的“主符号 + 说明文字”层级。

## 约束与原则

- 将 X 放在组合首位，LAB 退为其右侧的弱化说明标签，不改变首页链接、页脚语义和黑白主题行为。
- 继续复用用户提供的透明 X 静态资源和统一 `XMark` 组件，不生成或替换图片。
- 只重构页头与页脚品牌组合，不扩大到 Hero、模块卡片和作品视觉。
- 通过品牌实例局部调整 `mask-size` 补偿素材透明留白，不改变其他 X 图案的显示方式。

## 阶段与 TODO

- [x] 检查页头、页脚组件及共享品牌样式。
- [x] 将两处 X 调整到组合首位，为 LAB 增加独立的小号标签类名。
- [x] 大幅提高页头与页脚 X 的尺寸与视觉占比。
- [x] 增加透明画布的局部遮罩缩放补偿。
- [x] 将页脚品牌区重组为大号 X 与右侧说明块。
- [x] 增加移动端 X 尺寸约束与品牌层级回归测试。
- [x] 完成格式、Lint、类型、全量测试、本地响应和生产构建验证。
- [x] 更新文档索引与本次变更记录。

## 关键风险

- `mask-size: 135%` 会裁掉透明画布，但当前图形主体仍完整位于盒内；更换 X 素材后需要重新评估该比例。
- 页脚 X 最大达到 `14rem`，用于形成明显品牌落款；小屏下会切换为 `clamp(7.5rem, 38vw, 10rem)`，避免挤压说明块。
- 不同系统的 Helvetica Neue / Arial 映射略有差异，但 LAB 的字号、弱化颜色与 X 的绝对比例已确保主次关系稳定。

## 当前进展

- 页头顺序从 `LAB → X` 调整为 `X → LAB`。
- 页头 LAB 从 `1.4rem` 主字标降为 `0.64rem`、`0.18em` 疏字距的弱化说明标签。
- 页头 X 从 `1.55rem` 提升至 `3rem`，并使用 `135%` 遮罩缩放填满视觉盒。
- 页脚原有大字号 LAB 字标被拆为大号 X 与右侧说明块，LAB 最大仅 `0.78rem`。
- 页脚 X 从相对文字的 `1.25em` 改为 `clamp(10rem, 16vw, 14rem)`，成为页脚主视觉。
- 现有开发服务首页返回 HTTP 200，热更新后即可查看新比例。

## 代码变更

### `components/site-header.tsx`

```diff
diff --git a/components/site-header.tsx b/components/site-header.tsx
--- a/components/site-header.tsx
+++ b/components/site-header.tsx
@@
       <Link className="wordmark" href="/" aria-label="LabX 首页">
-        <span>LAB</span>
         <XMark className="wordmark-x" />
+        <span className="wordmark-label">LAB</span>
       </Link>
```

### `components/site-footer.tsx`

```diff
diff --git a/components/site-footer.tsx b/components/site-footer.tsx
--- a/components/site-footer.tsx
+++ b/components/site-footer.tsx
@@
     <footer className="site-footer">
-      <div>
-        <p className="footer-wordmark">
-          LAB
-          <XMark className="footer-wordmark-x" />
-        </p>
-        <p>{siteConfig.slogan}</p>
+      <div className="footer-brand">
+        <XMark className="footer-wordmark-x" />
+        <div className="footer-brand-copy">
+          <p className="footer-wordmark-label">LAB</p>
+          <p>{siteConfig.slogan}</p>
+        </div>
       </div>
```

### `app/globals.css`

```diff
diff --git a/app/globals.css b/app/globals.css
--- a/app/globals.css
+++ b/app/globals.css
@@
 .wordmark {
   display: inline-flex;
   align-items: center;
-  gap: 0.08rem;
+  gap: 0.45rem;
+}
+
+.wordmark-label {
+  color: var(--muted);
   font-family: "Helvetica Neue", Arial, sans-serif;
-  font-size: 1.4rem;
+  font-size: 0.64rem;
   font-weight: 600;
-  letter-spacing: -0.02em;
+  letter-spacing: 0.18em;
+  line-height: 1;
 }
 
 .wordmark-x {
-  width: 1.55rem;
-  height: 1.55rem;
+  width: 3rem;
+  height: 3rem;
+  -webkit-mask-size: 135%;
+  mask-size: 135%;
 }
@@
-.footer-wordmark {
-  display: flex;
-  align-items: center;
-  gap: 0.12rem;
+.footer-brand {
+  display: grid;
+  grid-template-columns: auto minmax(8rem, 1fr);
+  align-items: end;
+  gap: clamp(0.75rem, 2vw, 1.5rem);
+  width: fit-content;
+}
+
+.footer-brand-copy {
+  padding-bottom: clamp(0.9rem, 2vw, 1.5rem);
+}
+
+.footer-brand-copy p {
+  margin-block: 0.65rem 0;
+}
+
+.footer-wordmark-label {
+  color: var(--muted);
   font-family: "Helvetica Neue", Arial, sans-serif;
-  font-size: clamp(3rem, 7vw, 6rem);
+  font-size: clamp(0.64rem, 0.8vw, 0.78rem);
   font-weight: 600;
-  letter-spacing: -0.02em;
-  line-height: 1;
+  letter-spacing: 0.18em;
+  line-height: 1;
 }
 
 .footer-wordmark-x {
-  width: 1.25em;
-  height: 1.25em;
+  width: clamp(10rem, 16vw, 14rem);
+  height: clamp(10rem, 16vw, 14rem);
+  -webkit-mask-size: 135%;
+  mask-size: 135%;
 }
@@
   .site-footer {
     min-height: 24rem;
     align-items: start;
   }
+
+  .footer-brand {
+    grid-template-columns: auto minmax(0, 1fr);
+  }
+
+  .footer-wordmark-x {
+    width: clamp(7.5rem, 38vw, 10rem);
+    height: clamp(7.5rem, 38vw, 10rem);
+  }
```

### `tests/x-mark.test.tsx`

```diff
diff --git a/tests/x-mark.test.tsx b/tests/x-mark.test.tsx
--- a/tests/x-mark.test.tsx
+++ b/tests/x-mark.test.tsx
@@
-/** 提取品牌组合规则，防止文字与 X 的视觉比例再次失衡。 */
+/** 提取品牌组合规则，防止 LAB 文字重新压过 X 主符号。 */
 function getRule(selector: string): string {
@@
-  it("页头与页脚使用较轻字重并补偿图标画布留白", () => {
-    const headerWordmark = getRule(".wordmark");
+  it("页头与页脚以大号 X 为主符号，LAB 仅作为小号标签", () => {
+    const headerLabel = getRule(".wordmark-label");
     const headerX = getRule(".wordmark-x");
-    const footerWordmark = getRule(".footer-wordmark");
+    const footerLabel = getRule(".footer-wordmark-label");
     const footerX = getRule(".footer-wordmark-x");
 
-    expect(headerWordmark).toContain("font-weight: 600");
-    expect(headerWordmark).not.toContain("font-weight: 900");
-    expect(headerX).toContain("width: 1.55rem");
-    expect(footerWordmark).toContain("font-weight: 600");
-    expect(footerWordmark).not.toContain("font-weight: 900");
-    expect(footerX).toContain("width: 1.25em");
+    expect(headerLabel).toContain("font-size: 0.64rem");
+    expect(headerLabel).toContain("letter-spacing: 0.18em");
+    expect(headerLabel).toContain("color: var(--muted)");
+    expect(headerX).toContain("width: 3rem");
+    expect(headerX).toContain("mask-size: 135%");
+    expect(footerLabel).toContain("font-size: clamp(0.64rem, 0.8vw, 0.78rem)");
+    expect(footerLabel).toContain("color: var(--muted)");
+    expect(footerX).toContain("width: clamp(10rem, 16vw, 14rem)");
+    expect(footerX).toContain("mask-size: 135%");
   });
 });
```

### `.agentdocs/index.md`

```diff
diff --git a/.agentdocs/index.md b/.agentdocs/index.md
--- a/.agentdocs/index.md
+++ b/.agentdocs/index.md
@@
 ## 当前变更文档
 
+`workflow/20260830182301-promote-x-as-primary-brand-symbol.md` - 重构页头与页脚品牌层级，让大号 X 成为主符号、LAB 退为小号说明标签，并通过遮罩缩放消除透明画布造成的视觉缩水；继续调整品牌组合层级时读取。
 `workflow/20260830180739-balance-labx-wordmark-proportions.md` - 调轻页头与页脚 LAB 字重并放大 X-icon，修正透明图标画布留白造成的品牌组合比例失衡；继续调整品牌字标比例时读取。
```

## 测试用例

### TC-001 品牌主次层级

- 类型：单元回归测试
- 优先级：高
- 操作步骤：读取页头与页脚 LAB 标签、X 图标对应的 CSS 规则。
- 预期结果：页头 LAB 为 `0.64rem`、X 为 `3rem`；页脚 LAB 最大 `0.78rem`、X 最大 `14rem`；两处 X 均使用 `135%` 遮罩缩放且 LAB 使用弱化颜色。
- 是否通过：通过。

### TC-002 全量测试

- 类型：单元与组件测试
- 优先级：高
- 操作步骤：执行 `npm test`。
- 预期结果：内容、主题、排版、作品与 XMark 测试全部通过。
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
- 操作步骤：请求 `http://localhost:3000/` 并执行 `npm run build`。
- 预期结果：首页返回 HTTP 200，全部计划路由正常静态生成。
- 是否通过：通过；首页返回 HTTP 200，生产构建生成 21 个静态页面。
