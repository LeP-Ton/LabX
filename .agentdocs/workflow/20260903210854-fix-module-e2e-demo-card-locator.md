# 修复领域页多演示项目 E2E 定位冲突

## 背景与目标

- GitHub Pages 首次部署已经成功，但并行的“质量检查”工作流在端到端测试阶段失败。
- 领域页由一个演示项目扩展为三个后，旧断言 `getByText("演示内容")` 同时匹配三处文本，触发 Playwright strict mode（严格定位模式）冲突。
- 将断言改为验证“至少存在一张带演示标记的项目卡”，兼容每个领域展示 1、2 或 3 个项目的状态。

## 约束与原则

- 不修改页面实现、内容数据或项目数量。
- 测试语义指向项目卡，不依赖“演示内容”文本全页唯一。
- 保留领域页至少有一项演示内容的原有验收目标。

## 阶段与 TODO

- [x] 读取远端失败日志并确认 strict locator 根因。
- [x] 将重复文本定位限定到首张带演示标记的项目卡。
- [x] 检查同一测试文件的其他唯一定位断言。
- [ ] 推送修复并确认远端 Pages 与质量检查重新通过。

## 关键风险

- `.first()` 只证明至少存在一张符合条件的卡片；项目总数与首页最多三项的规则继续由已有单元和首页 E2E 覆盖。
- 本次不把测试绑定为固定三项，以保留后续检查 1 项、2 项布局的能力。

## 当前进展

- GitHub Pages 工作流 `33759035726` 已成功构建并部署首版站点。
- 质量检查工作流 `33759035676` 的 11 项 E2E 通过、1 项跳过，桌面端和移动端各有同一断言失败。
- 修复已完成，等待提交并由 GitHub Actions 重新执行全量 E2E。

## 代码变更

### `.agentdocs/index.md`

```diff
diff --git a/.agentdocs/index.md b/.agentdocs/index.md
index ef26d6b..3c45f74 100644
--- a/.agentdocs/index.md
+++ b/.agentdocs/index.md
@@ -6,6 +6,7 @@

 ## 当前变更文档

+`workflow/20260903210854-fix-module-e2e-demo-card-locator.md` - 修复领域页在拥有多个演示项目时触发的 Playwright 严格定位冲突，使 1、2、3 项内容布局都能通过远端质量检查；维护领域页 E2E 或演示内容数量时读取。
 `workflow/20260903205305-publish-labx-to-github-pages.md` - 为 Next.js 增加条件式静态导出、GitHub Pages 子路径与 SEO 适配，并通过 GitHub Actions 自动发布公开站点；维护 Pages 部署、公开 URL 或静态资源路径时优先读取。
 `workflow/20260830231331-expand-demo-content-across-fields.md` - 为六个应用领域各补充两个结构化占位项目，使首页每个领域都能展示完整的三项目布局；继续维护演示项目、跨领域关系或首页项目密度时读取。
 `workflow/20260830225038-refactor-homepage-into-anchored-ai-fields.md` - 将首页重构为六个应用领域锚点分区，把品牌口号移入 Header，并按领域展示叙事与项目预览；继续调整首页信息架构、锚点导航或移动端 Header 时读取。
```

### `tests/e2e/portal.spec.ts`

```diff
diff --git a/tests/e2e/portal.spec.ts b/tests/e2e/portal.spec.ts
index e59d5c0..5773ff9 100644
--- a/tests/e2e/portal.spec.ts
+++ b/tests/e2e/portal.spec.ts
@@ -44,7 +44,12 @@ test("六个应用领域均可访问", async ({ page }) => {
     await page.goto(`/${moduleType}`);
     await expect(page.getByText("LABX APPLICATION FIELD")).toBeVisible();
     await expect(page.locator("main h1")).toBeVisible();
-    await expect(page.getByText("演示内容", { exact: true })).toBeVisible();
+    await expect(
+      page
+        .locator("article.work-card")
+        .filter({ hasText: "演示内容" })
+        .first(),
+    ).toBeVisible();
   }
 });
```

## 测试用例

### TC-001 多演示项目领域页

- 类型：端到端测试。
- 优先级：高。
- 关联模块：领域页、Playwright。
- 前置条件：任一领域存在多个带“演示内容”标记的项目。
- 操作步骤：依次访问 Game、Music、Book、Art、Movie、Life 领域页。
- 预期结果：每个页面均显示领域标题，且至少有一张带演示标记的项目卡可见；定位不发生 strict mode 冲突。
- 是否通过：待远端质量检查验证。

### TC-002 项目数量兼容性

- 类型：回归测试。
- 优先级：中。
- 关联模块：领域页内容列表。
- 前置条件：领域项目数量可分别为 1、2 或 3。
- 操作步骤：执行同一领域可访问性断言。
- 预期结果：断言不依赖固定项目数量，只要至少存在一项演示项目即可通过。
- 是否通过：代码审查通过，待远端 E2E 验证。
