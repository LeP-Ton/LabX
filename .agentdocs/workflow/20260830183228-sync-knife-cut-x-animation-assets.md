# 同步 X 刀划开动画资产到 LabX

## 背景与目标

- 将 `C:\Users\Administrator\Documents\Codex\2026-08-30\x-x-x20` 中会话-10完成的最新 X-icon 动画同步到 LabX。
- 目标位置为 `public/x-x-x20`，沿用站点现有静态 X-icon 的资源包路径。
- 本次仅同步品牌资源、生成脚本与资源包记录，不把动画接入任何页面组件。

## 约束与原则

- 目标项目现用的静态黑色透明 PNG 与源文件哈希一致，不重复覆盖。
- 只增量替换四个动画文件、生成脚本、动画检查图和资源包索引，并新增会话-10记录。
- 不修改 `app/`、`components/`、测试逻辑或当前 CSS 遮罩引用。
- 白色与黑色动画保持相同 Alpha、透明背景、1500 毫秒无限循环。
- 新动画采用“刀尖细裂缝传播、刀锋尾迹逐步向两侧张开”的纸张/布料切开运动。

## 阶段与 TODO

- [x] 读取 LabX 项目认知与根文档索引。
- [x] 检查 `public/x-x-x20` 的旧资源包结构。
- [x] 比较源文件与目标文件 SHA-256 哈希。
- [x] 确认静态 PNG 无差异，不执行无意义覆盖。
- [x] 同步四个动画、生成脚本、检查图、资源索引和会话-10文档。
- [x] 更新 LabX 根文档索引。
- [x] 校验同步后源文件与目标文件哈希一致。
- [x] 运行 X-icon 定向测试。

## 同步文件

- 替换 `public/x-x-x20/outputs/x-icon-white-slash.webp`。
- 替换 `public/x-x-x20/outputs/x-icon-black-slash.webp`。
- 替换 `public/x-x-x20/outputs/x-icon-white-slash.gif`。
- 替换 `public/x-x-x20/outputs/x-icon-black-slash.gif`。
- 替换 `public/x-x-x20/work/generate_icon_variants.py`。
- 替换 `public/x-x-x20/work/icon-animation-contact-sheet.png`。
- 替换 `public/x-x-x20/.agentdocs/index.md`。
- 新增 `public/x-x-x20/.agentdocs/workflow/20260830175447-simulate-knife-cut-opening.md`。
- 更新 `.agentdocs/index.md`。
- 新增 `.agentdocs/workflow/20260830183228-sync-knife-cut-x-animation-assets.md`。

## 资产变更

```diff
Binary files a/public/x-x-x20/outputs/x-icon-white-slash.webp and b/public/x-x-x20/outputs/x-icon-white-slash.webp differ
Binary files a/public/x-x-x20/outputs/x-icon-black-slash.webp and b/public/x-x-x20/outputs/x-icon-black-slash.webp differ
Binary files a/public/x-x-x20/outputs/x-icon-white-slash.gif and b/public/x-x-x20/outputs/x-icon-white-slash.gif differ
Binary files a/public/x-x-x20/outputs/x-icon-black-slash.gif and b/public/x-x-x20/outputs/x-icon-black-slash.gif differ
Binary files a/public/x-x-x20/work/icon-animation-contact-sheet.png and b/public/x-x-x20/work/icon-animation-contact-sheet.png differ
```

## 代码变更

- `public/x-x-x20/work/generate_icon_variants.py`：将整体笔画显现改为刀尖细裂缝传播与尾迹张开。

```diff
@@
-动画流程：第一道长轴刀痕显现 → 第二道短轴刀痕交叉显现 → 完整停留 → 淡出重置。
+动画流程：长轴细裂口传播并张开 → 短轴细裂口交叉传播并张开 → 完整停留 → 淡出重置。
@@
-def progressive_reveal(
+def cut_open_reveal(
     stroke_alpha: np.ndarray,
     along_axis: np.ndarray,
+    distance_to_axis: np.ndarray,
     front: float,
-    feather: float = 14.0,
+    max_half_width: float,
+    opening_length: float = 420.0,
+    crack_half_width: float = 1.5,
+    edge_feather: float = 1.25,
 ) -> np.ndarray:
-    """让一道刀痕在移动前锋之后逐步留下完整形状。"""
-    reveal_gate = np.clip(
-        (front - along_axis + feather) / (2.0 * feather),
+    """模拟刀尖推进后，细裂口沿刀锋尾迹逐渐向两侧张开。"""
+    passed_distance = front - along_axis
+    blade_gate = np.clip(
+        (passed_distance + 2.0) / 4.0,
         0.0,
         1.0,
     )
+    opening_progress = np.clip(
+        passed_distance / opening_length,
+        0.0,
+        1.0,
+    )
+    opening_progress = (
+        opening_progress
+        * opening_progress
+        * (3.0 - 2.0 * opening_progress)
+    )
+    current_half_width = (
+        crack_half_width
+        + (max_half_width - crack_half_width) * opening_progress
+    )
+    opening_gate = np.clip(
+        (
+            current_half_width
+            + edge_feather
+            - distance_to_axis
+        )
+        / (2.0 * edge_feather),
+        0.0,
+        1.0,
+    )
     return np.rint(
-        stroke_alpha.astype(np.float32) * reveal_gate
+        stroke_alpha.astype(np.float32) * blade_gate * opening_gate
     ).astype(np.uint8)
@@
     diagonal = 1.0 / math.sqrt(2.0)
     long_direction = (diagonal, -diagonal)
+    long_normal = (diagonal, diagonal)
     short_direction = (diagonal, diagonal)
+    short_normal = (-diagonal, diagonal)
@@
     short_along = (
         (x_grid - center) * short_direction[0]
         + (y_grid - center) * short_direction[1]
     )
+    long_distance = np.abs(
+        (x_grid - center) * long_normal[0]
+        + (y_grid - center) * long_normal[1]
+    )
+    short_distance = np.abs(
+        (x_grid - center) * short_normal[0]
+        + (y_grid - center) * short_normal[1]
+    )
@@
-            # 第一刀：沿较长的左下 → 右上斜线留下刀痕。
+            # 第一刀：刀尖推进，后方切口像纸张或布料一样逐步张开。
             progress = (frame_index - 4) / 6.0
             front = -760.0 + 1520.0 * progress
-            icon_alpha = progressive_reveal(
+            icon_alpha = cut_open_reveal(
                 long_alpha,
                 long_along,
+                long_distance,
                 front,
+                max_half_width=56.0,
             )
@@
-            # 第二刀：沿较短的左上 → 右下斜线交叉补全四角星。
+            # 第二刀：以相同的细裂口传播与两侧张开方式补全四角星。
             progress = (frame_index - 12) / 6.0
             front = -590.0 + 1180.0 * progress
-            short_partial = progressive_reveal(
+            short_partial = cut_open_reveal(
                 short_alpha,
                 short_along,
+                short_distance,
                 front,
+                max_half_width=58.0,
             )
```

- `.agentdocs/index.md`：登记同步记录并说明动画尚未接入页面。

```diff
 ## 当前变更文档
+`workflow/20260830183228-sync-knife-cut-x-animation-assets.md` - 将 X-icon 最新“刀尖细裂缝传播、尾迹逐步张开”透明 WebP/GIF 动画、生成脚本和资源包记录同步到 `public/x-x-x20`；需要使用、维护或继续接入动画品牌资产时读取。
 `workflow/20260830182301-promote-x-as-primary-brand-symbol.md` - 重构页头与页脚品牌层级，让大号 X 成为主符号、LAB 退为小号说明标签，并通过遮罩缩放消除透明画布造成的视觉缩水；继续调整品牌组合层级时读取。
@@
 - X-icon 已成为全站核心视觉符号，通过 CSS 遮罩应用于页头、Hero、模块、作品、编辑页与页脚，并同步更新 favicon 和社交分享图。
+- X-icon 的白黑透明 WebP/GIF 刀划开动画已同步到 `public/x-x-x20/outputs/`，当前仅作为品牌资产入库，尚未接入页面组件。
```

## 测试用例

### TC-001 增量同步范围正确

- 类型：文件范围测试
- 优先级：高
- 操作步骤：同步前比较源、目标哈希，仅复制存在差异的动画、脚本、检查图与文档。
- 预期结果：静态 PNG 不覆盖，应用源码与组件不修改。
- 是否通过：通过。

### TC-002 同步文件哈希一致

- 类型：文件完整性测试
- 优先级：高
- 操作步骤：同步后逐个计算源文件与目标文件的 SHA-256。
- 预期结果：全部同步文件哈希一致。
- 是否通过：通过。

### TC-003 X-icon 定向测试

- 类型：单元/组件回归测试
- 优先级：高
- 操作步骤：运行 `.\\node_modules\\.bin\\vitest.CMD run tests\\x-mark.test.tsx`。
- 预期结果：测试全部通过，现有静态遮罩路径与组件行为不受影响。
- 是否通过：通过。

### TC-004 动画文件结构

- 类型：动画结构测试
- 优先级：高
- 操作步骤：检查 WebP/GIF 可读取、透明、无限循环且总时长为 1500 毫秒。
- 预期结果：四个动画结构正确。
- 是否通过：通过。
