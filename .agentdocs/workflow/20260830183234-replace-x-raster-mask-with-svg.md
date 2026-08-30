# 将 X 栅格遮罩替换为 SVG 矢量遮罩

## 背景与目标

- 用户发现大尺寸 X 图案边缘不够清晰，并明确要求改用 SVG 矢量图形。
- 当前全站 `XMark` 通过 CSS mask 引用 1254×1254 的透明 PNG，页脚放大到最高 `14rem` 后仍受栅格采样影响。
- 目标是在保持当前 X 轮廓、黑白主题、品牌比例和组件接口不变的前提下，将全站统一切换为可无限缩放的透明 SVG 遮罩。

## 约束与原则

- 保留用户放入 `public/x-x-x20/outputs/` 的原始 PNG 与两个带黑底 SVG，不覆盖或删除原始资源。
- 从 `x-diagonal-symmetric-centered-slim.svg` 复用精确 polygon 轮廓，仅移除黑色背景，形成透明遮罩专用文件。
- 继续使用 `background: currentColor` 为 X 着色，避免分别维护黑色与白色图标。
- 不修改 `XMark` 组件、页头页脚比例、Hero、模块卡片和其他页面布局。

## 轮廓核对

- `slim.svg` 与当前透明 PNG 的二值遮罩 IoU（交并比）为 `99.67%`，alpha 相关系数为 `0.999829`。
- 普通版 SVG 的 IoU 仅为 `72.46%`，中心更粗、尖端更短，因此不适合作为无感替换源。
- 新 SVG 保留 slim 版的 8 个 polygon 顶点和 `1254 × 1254` viewBox，并删除不透明 `<rect>` 背景。

## 阶段与 TODO

- [x] 检查现有 PNG、普通 SVG 与 slim SVG 的画布和轮廓结构。
- [x] 确认 slim SVG 与当前透明 PNG 的轮廓一致性。
- [x] 新增透明底 SVG 遮罩资源。
- [x] 将全局 `--x-icon` 设计令牌切换到 SVG。
- [x] 显式指定 alpha 遮罩模式。
- [x] 更新资源存在性、结构和 CSS 引用回归测试。
- [x] 更新项目核心认知和文档索引。
- [x] 完成格式、Lint、类型、全量测试、本地资源响应与生产构建验证。

## 关键风险

- 如果未来替换 SVG 轮廓，需要同时检查页头和页脚的 `mask-size: 135%` 是否仍适合新素材的透明边界。
- 外部 SVG 作为 CSS mask 时浏览器会使用图像透明度；当前额外设置 `mask-mode: alpha`，避免填充颜色参与亮度计算。
- 原 PNG 仍保留在仓库中供历史追溯，但运行时 XMark 不再引用它。

## 当前进展

- 新增 `x-icon-transparent.svg`，文件仅包含透明画布上的白色 polygon。
- `--x-icon` 已从 `x-icon-black-transparent.png` 切换到 `x-icon-transparent.svg`。
- 所有复用 `.x-mark` 的页头、Hero、模块、作品、编辑页和页脚自动获得矢量清晰度。
- 回归测试会阻止遮罩重新指向 PNG、SVG 恢复不透明背景或遗漏 alpha 模式。

## 代码变更

### `public/x-x-x20/outputs/x-icon-transparent.svg`

```diff
diff --git a/public/x-x-x20/outputs/x-icon-transparent.svg b/public/x-x-x20/outputs/x-icon-transparent.svg
new file mode 100644
--- /dev/null
+++ b/public/x-x-x20/outputs/x-icon-transparent.svg
@@
+<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254">
+  <!-- 沿用用户提供的 slim 矢量轮廓，移除底色后作为主题自适应遮罩。 -->
+  <polygon
+    points="285,285 627,557 1090,164 697,627 969,969 627,697 164,1090 557,627"
+    fill="#fff"
+    shape-rendering="geometricPrecision"
+  />
+</svg>
```

### `app/globals.css`

```diff
diff --git a/app/globals.css b/app/globals.css
--- a/app/globals.css
+++ b/app/globals.css
@@
-  --x-icon: url("/x-x-x20/outputs/x-icon-black-transparent.png");
+  --x-icon: url("/x-x-x20/outputs/x-icon-transparent.svg");
@@
 .x-mark {
   display: inline-block;
   flex: 0 0 auto;
   background: currentColor;
   -webkit-mask: var(--x-icon) center / contain no-repeat;
   mask: var(--x-icon) center / contain no-repeat;
+  mask-mode: alpha;
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
-  "public/x-x-x20/outputs/x-icon-black-transparent.png",
+  "public/x-x-x20/outputs/x-icon-transparent.svg",
 );
+const iconSource = readFileSync(iconPath, "utf8");
 const globalStyles = readFileSync(
@@
-  it("使用用户提供的透明静态资源作为主题遮罩", () => {
+  it("使用透明 SVG 矢量资源作为主题遮罩", () => {
     expect(existsSync(iconPath)).toBe(true);
     expect(globalStyles).toContain(
-      '--x-icon: url("/x-x-x20/outputs/x-icon-black-transparent.png")',
+      '--x-icon: url("/x-x-x20/outputs/x-icon-transparent.svg")',
     );
     expect(globalStyles).toContain(
       "mask: var(--x-icon) center / contain no-repeat",
     );
+    expect(globalStyles).toContain("mask-mode: alpha");
+    expect(iconSource).toContain('viewBox="0 0 1254 1254"');
+    expect(iconSource).toContain("<polygon");
+    expect(iconSource).not.toContain("<rect");
   });
```

### `AGENTS.md`

```diff
diff --git a/AGENTS.md b/AGENTS.md
--- a/AGENTS.md
+++ b/AGENTS.md
@@
-- 核心视觉符号：细长、中心对称的四尖 `X-icon`；以透明黑色 PNG 作为 CSS 遮罩并通过 `currentColor` 自动适配黑白主题。
+- 核心视觉符号：细长、中心对称的四尖 `X-icon`；以透明 SVG 矢量图形作为 CSS alpha 遮罩，并通过 `currentColor` 自动适配黑白主题与任意展示尺寸。
```

### `.agentdocs/index.md`

```diff
diff --git a/.agentdocs/index.md b/.agentdocs/index.md
--- a/.agentdocs/index.md
+++ b/.agentdocs/index.md
@@
 ## 当前变更文档
 
+`workflow/20260830183234-replace-x-raster-mask-with-svg.md` - 将全站 X-icon 从透明 PNG 遮罩替换为同轮廓的透明 SVG 矢量遮罩，解决大尺寸边缘不清晰问题；维护 X 资源、遮罩或缩放清晰度时读取。
 `workflow/20260830183228-sync-knife-cut-x-animation-assets.md` - 将 X-icon 最新“刀尖细裂缝传播、尾迹逐步张开”透明 WebP/GIF 动画、生成脚本和资源包记录同步到 `public/x-x-x20`；需要使用、维护或继续接入动画品牌资产时读取。
```

## 测试用例

### TC-001 SVG 遮罩资源结构

- 类型：单元回归测试
- 优先级：高
- 操作步骤：读取 `x-icon-transparent.svg` 与全局 CSS。
- 预期结果：SVG 存在且包含 `viewBox` 与 polygon，不包含不透明 `<rect>`；`--x-icon` 指向 SVG 并使用 alpha mask。
- 是否通过：通过。

### TC-002 SVG 静态资源响应

- 类型：运行时测试
- 优先级：高
- 操作步骤：请求本地开发服务中的 `/x-x-x20/outputs/x-icon-transparent.svg`。
- 预期结果：返回 HTTP 200，内容类型为 `image/svg+xml`。
- 是否通过：通过。

### TC-003 全量测试

- 类型：单元与组件测试
- 优先级：高
- 操作步骤：执行 `npm test`。
- 预期结果：内容、主题、排版、作品与 XMark 测试全部通过。
- 是否通过：通过；5 个测试文件共 17 项测试通过。

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
