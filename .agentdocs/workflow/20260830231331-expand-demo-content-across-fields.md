# 扩充六领域演示项目内容

## 背景与目标

- 首页已支持每个应用领域最多展示三个项目，但六个领域原先都只有一个项目，右侧项目区无法呈现完整布局。
- 为 Game、Music、Book、Art、Movie、Life 各补充两个结构化占位项目，让每个领域稳定展示一张主卡与两张紧凑卡。
- 用跨领域关联展示实验项目之间的素材、规则、声音、视觉、影像与虚构人格协作关系。

## 约束与原则

- 不修改内容 Schema、首页布局、依赖或现有 URL。
- 所有新增条目均为 `published` 且 `demo: true`，正文明确说明是占位或结构化演示，不暗示真实产品已经发布。
- 行动入口继续使用 HTTPS 示例地址，不接入真实外部服务。
- `Life` 只使用完全虚构的人格，不包含真实个人的身份、记忆、声音、肖像或行为数据。
- 保留现有项目为各领域最新主项目，新条目使用更早发布日期作为补充预览。

## 阶段与 TODO

- [x] 为六个领域各新增两个演示项目。
- [x] 为十二个新项目配置稳定 ID、标签、创作者、行动入口和跨领域关联。
- [x] 增加真实内容仓库数量及 Life 虚构人格边界测试。
- [x] 完成格式、Lint、类型、单元/组件测试和生产构建验证。
- [x] 更新文档索引与关键记忆。

## 当前进展

- 内容仓库现有十八个已发布演示项目，每个领域恰好三个。
- 首页无需修改读取逻辑即可按发布日期显示每个领域的三个最新项目。
- 新增关系全部通过构建期集合校验；生产构建静态生成十八个项目详情页。
- 本次未部署、未提交或推送 GitHub。

## 关键风险

- `example.com` 行动链接仅用于验证入口结构，上线真实项目时必须替换为可访问的 HTTPS 地址。
- 新增内容用于占位和信息架构演示，标题、研究结论与项目状态不能作为已经完成的产品或研究成果对外宣称。
- 后续新增第四个及更多项目时，首页仍只预览最新三个，其余项目通过对应领域页访问。

## 代码变更

```diff
diff --git a/content/game/agent-playground.mdx b/content/game/agent-playground.mdx
new file mode 100644
index 0000000..97cbe25
--- /dev/null
+++ b/content/game/agent-playground.mdx
@@ -0,0 +1,34 @@
+---
+id: game-agent-playground
+slug: agent-playground
+type: game
+title: 智能体游乐场
+summary: 一个观察多智能体协作、竞争与临场决策的沙盒游戏概念，用来验证角色行为如何改变空间与任务。
+cover: module:game
+publishedAt: 2026-08-24
+status: published
+featured: false
+demo: true
+tags:
+  - 多智能体
+  - 沙盒实验
+creators:
+  - LabX Game
+relatedWorks:
+  - id: life-morrow-7
+    relation: 实验 NPC 人格
+  - id: music-adaptive-score-engine
+    relation: 实时配乐原型
+  - id: art-procedural-interface-kit
+    relation: 实验操作界面
+actions:
+  - kind: play
+    label: 体验演示入口
+    url: https://example.com/labx/game/agent-playground
+---
+
+## 让角色先行动
+
+《智能体游乐场》把规则、资源和目标放进同一座小型沙盒，观察由不同策略驱动的角色如何结盟、冲突并临时改变计划。
+
+本条目是用于验证项目卡片、详情页和跨领域关联的结构化占位内容，不代表已有可公开试玩的产品版本。

diff --git a/content/game/dream-cartographer.mdx b/content/game/dream-cartographer.mdx
new file mode 100644
index 0000000..974aed1
--- /dev/null
+++ b/content/game/dream-cartographer.mdx
@@ -0,0 +1,34 @@
+---
+id: game-dream-cartographer
+slug: dream-cartographer
+type: game
+title: 梦境制图师
+summary: 一款让玩家与生成模型共同绘制变化地貌的探索游戏概念，用地图记录规则、情绪与叙事分支。
+cover: module:game
+publishedAt: 2026-08-18
+status: published
+featured: false
+demo: true
+tags:
+  - 生成世界
+  - 探索叙事
+creators:
+  - LabX Game
+relatedWorks:
+  - id: art-latent-atlas
+    relation: 生成地貌视觉
+  - id: book-world-model-notes
+    relation: 世界规则原型
+  - id: movie-virtual-camera-test
+    relation: 场景预演影像
+actions:
+  - kind: play
+    label: 体验演示入口
+    url: https://example.com/labx/game/dream-cartographer
+---
+
+## 地图也会做梦
+
+玩家通过描述、移动和选择为一张空白地图增加地貌，系统则根据世界规则重新解释路线，让同一片区域在多次进入时呈现不同结构。
+
+本条目是用于展示生成世界项目组织方式的结构化占位内容，不代表已经完成或公开发行的游戏。

diff --git a/content/music/adaptive-score-engine.mdx b/content/music/adaptive-score-engine.mdx
new file mode 100644
index 0000000..48f7d4e
--- /dev/null
+++ b/content/music/adaptive-score-engine.mdx
@@ -0,0 +1,32 @@
+---
+id: music-adaptive-score-engine
+slug: adaptive-score-engine
+type: music
+title: 自适应配乐引擎
+summary: 根据场景状态、角色关系与行动节奏实时重组音乐层次的声音系统概念，探索可解释的动态配乐。
+cover: module:music
+publishedAt: 2026-08-23
+status: published
+featured: false
+demo: true
+tags:
+  - 自适应音频
+  - 生成音乐
+creators:
+  - LabX Music
+relatedWorks:
+  - id: game-agent-playground
+    relation: 沙盒状态输入
+  - id: movie-virtual-camera-test
+    relation: 预演节奏参考
+actions:
+  - kind: listen
+    label: 收听演示入口
+    url: https://example.com/labx/music/adaptive-score-engine
+---
+
+## 配乐跟随系统变化
+
+这个概念把旋律、节奏与音色拆成可以独立调度的层，让角色距离、冲突强度和镜头运动共同影响声音的组合方式。
+
+本条目仅是用于演示音乐项目元数据、详情正文和关联关系的占位内容，尚未发布真实可用的音频引擎。

diff --git a/content/music/synthetic-choir.mdx b/content/music/synthetic-choir.mdx
new file mode 100644
index 0000000..e9201d6
--- /dev/null
+++ b/content/music/synthetic-choir.mdx
@@ -0,0 +1,32 @@
+---
+id: music-synthetic-choir
+slug: synthetic-choir
+type: music
+title: 合成声部
+summary: 将虚构角色的语言节奏转化为多层人声纹理的概念实验，研究声音身份与叙事场景之间的连接。
+cover: module:music
+publishedAt: 2026-08-17
+status: published
+featured: false
+demo: true
+tags:
+  - 声音生成
+  - 角色声线
+creators:
+  - LabX Music
+relatedWorks:
+  - id: movie-prompted-storyboard
+    relation: 分镜场景声音草图
+  - id: life-echo-persona
+    relation: 虚构人格语音特征
+actions:
+  - kind: listen
+    label: 收听演示入口
+    url: https://example.com/labx/music/synthetic-choir
+---
+
+## 每个角色都是一个声部
+
+《合成声部》尝试把虚构人格的语速、停顿和词汇偏好映射为不同声部，使一段对白能够延展为场景中的人声纹理。
+
+本条目是用于页面排版与跨领域关系测试的结构化占位内容，不包含真实人物数据，也不代表音乐作品已经公开发行。

diff --git a/content/book/world-model-notes.mdx b/content/book/world-model-notes.mdx
new file mode 100644
index 0000000..d524142
--- /dev/null
+++ b/content/book/world-model-notes.mdx
@@ -0,0 +1,33 @@
+---
+id: book-world-model-notes
+slug: world-model-notes
+type: book
+title: 世界模型手记
+summary: 一组把生成规则、地点关系与角色认知整理为可计算叙事约束的世界观实验笔记。
+cover: module:book
+publishedAt: 2026-08-22
+status: published
+featured: false
+demo: true
+tags:
+  - 世界观
+  - 生成式叙事
+  - 规则系统
+creators:
+  - LabX Book
+relatedWorks:
+  - id: game-dream-cartographer
+    relation: 世界规则原型
+  - id: art-latent-atlas
+    relation: 概念图谱
+actions:
+  - kind: view
+    label: 阅读演示手记
+    url: https://example.com/labx/book/world-model-notes
+---
+
+## 让世界观成为可运行的约束
+
+《世界模型手记》尝试把地点、资源、历史和角色认知拆成相互关联的规则，使语言模型生成的事件能够留下后果，并在后续叙事中持续生效。
+
+本条目是用于验证内容结构、跨领域关联和列表排版的占位演示，不代表相关研究已经完成或正式发布。

diff --git a/content/book/dialogue-protocol.mdx b/content/book/dialogue-protocol.mdx
new file mode 100644
index 0000000..d16921a
--- /dev/null
+++ b/content/book/dialogue-protocol.mdx
@@ -0,0 +1,33 @@
+---
+id: book-dialogue-protocol
+slug: dialogue-protocol
+type: book
+title: 对话协议
+summary: 一套为虚拟人格定义语气、知识边界、关系变化与沉默策略的交互叙事实验。
+cover: module:book
+publishedAt: 2026-08-16
+status: published
+featured: false
+demo: true
+tags:
+  - 对话系统
+  - 角色写作
+  - 交互叙事
+creators:
+  - LabX Book
+relatedWorks:
+  - id: life-echo-persona
+    relation: 人格对话规则
+  - id: game-agent-playground
+    relation: 智能体交互脚本
+actions:
+  - kind: view
+    label: 查看协议演示
+    url: https://example.com/labx/book/dialogue-protocol
+---
+
+## 对话不只是生成一句回答
+
+《对话协议》把角色能说什么、为什么沉默、如何记住关系变化等写作判断整理成可测试的规则，让人格表现不只依赖单次提示词。
+
+本条目仅是用于展示内容模型与关联关系的占位演示，不表示协议已经形成可用产品或对外发布。

diff --git a/content/art/latent-atlas.mdx b/content/art/latent-atlas.mdx
new file mode 100644
index 0000000..becebc2
--- /dev/null
+++ b/content/art/latent-atlas.mdx
@@ -0,0 +1,35 @@
+---
+id: art-latent-atlas
+slug: latent-atlas
+type: art
+title: 潜空间图谱
+summary: 将模型中的语义邻域转译为地貌、建筑与视觉坐标的生成式概念设计实验。
+cover: module:art
+publishedAt: 2026-08-21
+status: published
+featured: false
+demo: true
+tags:
+  - 概念设计
+  - 生成式视觉
+  - 世界构建
+creators:
+  - LabX Art
+relatedWorks:
+  - id: game-dream-cartographer
+    relation: 生成地貌视觉
+  - id: book-world-model-notes
+    relation: 世界设定图谱
+  - id: movie-virtual-camera-test
+    relation: 场景视觉原型
+actions:
+  - kind: view
+    label: 查看图谱演示
+    url: https://example.com/labx/art/latent-atlas
+---
+
+## 把语义距离画成地形
+
+《潜空间图谱》探索如何将概念之间的接近、冲突与突变转译成可见的路径、边界和地貌，为生成世界提供连续而可追溯的视觉规则。
+
+本条目是用于检验卡片布局、详情页和跨领域链接的占位演示，不代表相关视觉资产已经制作完成或正式公开。

diff --git a/content/art/procedural-interface-kit.mdx b/content/art/procedural-interface-kit.mdx
new file mode 100644
index 0000000..06291f1
--- /dev/null
+++ b/content/art/procedural-interface-kit.mdx
@@ -0,0 +1,33 @@
+---
+id: art-procedural-interface-kit
+slug: procedural-interface-kit
+type: art
+title: 生成式界面组件
+summary: 根据任务、人格状态与世界事件动态组合信息层级的界面组件研究。
+cover: module:art
+publishedAt: 2026-08-15
+status: published
+featured: false
+demo: true
+tags:
+  - UI
+  - 生成式设计
+  - 信息架构
+creators:
+  - LabX Art
+relatedWorks:
+  - id: game-agent-playground
+    relation: 实验操作界面
+  - id: life-morrow-7
+    relation: 人格状态界面
+actions:
+  - kind: view
+    label: 查看组件演示
+    url: https://example.com/labx/art/procedural-interface-kit
+---
+
+## 让界面响应实验状态
+
+《生成式界面组件》研究如何用有限的排版、控件和反馈规则，依据智能体任务与人格状态重组操作界面，同时保持信息层级稳定可读。
+
+本条目仅用于占位展示内容结构、领域归组与关联项目，不声称已有可下载组件库或正式产品发布。

diff --git a/content/movie/prompted-storyboard.mdx b/content/movie/prompted-storyboard.mdx
new file mode 100644
index 0000000..ec3d0c6
--- /dev/null
+++ b/content/movie/prompted-storyboard.mdx
@@ -0,0 +1,34 @@
+---
+id: movie-prompted-storyboard
+slug: prompted-storyboard
+type: movie
+title: 提示词分镜
+summary: 一组由文本条件驱动的分镜占位实验，用于验证对白、镜头节奏、场景视觉与概念声音如何在制作前快速对齐。
+cover: module:movie
+publishedAt: 2026-08-20
+status: published
+featured: false
+demo: true
+tags:
+  - AI 分镜
+  - 影像预演
+creators:
+  - LabX Movie
+relatedWorks:
+  - id: music-synthetic-choir
+    relation: 概念声音轨
+  - id: book-dialogue-protocol
+    relation: 对白结构
+  - id: art-latent-atlas
+    relation: 场景视觉
+actions:
+  - kind: view
+    label: 查看分镜演示
+    url: https://example.com/labx/movie/prompted-storyboard
+---
+
+## 从文本到镜头
+
+实验把场景目标、角色动作与镜头限制整理为结构化提示词，再生成可快速替换的分镜草图，以便在正式制作前检查叙事节奏和跨领域素材是否一致。
+
+本页面是用于验证内容结构和跨领域关系的占位演示，不代表已有可观看或已经公开发布的影视产品。

diff --git a/content/movie/virtual-camera-test.mdx b/content/movie/virtual-camera-test.mdx
new file mode 100644
index 0000000..c947b36
--- /dev/null
+++ b/content/movie/virtual-camera-test.mdx
@@ -0,0 +1,34 @@
+---
+id: movie-virtual-camera-test
+slug: virtual-camera-test
+type: movie
+title: 虚拟摄影机测试
+summary: 在可探索场景中测试由 AI 辅助控制的虚拟摄影机，让构图、运动与动态声音随角色行动产生可复现的变化。
+cover: module:movie
+publishedAt: 2026-08-14
+status: published
+featured: false
+demo: true
+tags:
+  - 虚拟制作
+  - 摄影机智能体
+creators:
+  - LabX Movie
+relatedWorks:
+  - id: game-dream-cartographer
+    relation: 可探索场景
+  - id: music-adaptive-score-engine
+    relation: 动态声音
+  - id: art-latent-atlas
+    relation: 场景视觉原型
+actions:
+  - kind: view
+    label: 查看摄影机测试
+    url: https://example.com/labx/movie/virtual-camera-test
+---
+
+## 可计算的镜头调度
+
+摄影机根据角色距离、空间遮挡与叙事重点生成候选轨迹，并记录每次选择的参数，使镜头结果既能响应场景变化，也能被创作者复查和重新编排。
+
+本页面仅为占位和结构化演示内容，用于展示项目元数据与关联方式，不声称对应的虚拟制作工具已经完成或公开发布。

diff --git a/content/life/morrow-7.mdx b/content/life/morrow-7.mdx
new file mode 100644
index 0000000..11b4635
--- /dev/null
+++ b/content/life/morrow-7.mdx
@@ -0,0 +1,34 @@
+---
+id: life-morrow-7
+slug: morrow-7
+type: life
+title: 莫罗 / MORROW-7
+summary: 一个完全虚构的实验 NPC 人格，用于测试目标、情绪状态与对话规则如何共同影响虚拟角色的短期行为选择。
+cover: module:life
+publishedAt: 2026-08-19
+status: published
+featured: false
+demo: true
+tags:
+  - 虚构人格
+  - 行为智能体
+creators:
+  - LabX Life
+relatedWorks:
+  - id: game-agent-playground
+    relation: 实验 NPC 人格
+  - id: book-dialogue-protocol
+    relation: 对话行为规则
+  - id: art-procedural-interface-kit
+    relation: 人格状态界面
+actions:
+  - kind: follow
+    label: 查看人格演示
+    url: https://example.com/labx/life/morrow-7
+---
+
+## 可观察的行为状态
+
+MORROW-7 以少量虚构目标、关系权重和情绪变量驱动行为，并通过状态界面展示每次对话选择的依据，方便研究者检查人格表现是否连贯。
+
+这是完全虚构的占位和结构化演示内容，不代表真实产品已经发布；不包含任何真实个人的身份、记忆、声音、肖像或行为数据。

diff --git a/content/life/echo-persona.mdx b/content/life/echo-persona.mdx
new file mode 100644
index 0000000..bf7c6c6
--- /dev/null
+++ b/content/life/echo-persona.mdx
@@ -0,0 +1,34 @@
+---
+id: life-echo-persona
+slug: echo-persona
+type: life
+title: 回声人格 / ECHO
+summary: 一个完全虚构的声音导向人格占位原型，用于研究对话规则、合成声部与角色预演如何形成一致的虚拟角色表达。
+cover: module:life
+publishedAt: 2026-08-13
+status: published
+featured: false
+demo: true
+tags:
+  - 虚构人格
+  - 多模态角色
+creators:
+  - LabX Life
+relatedWorks:
+  - id: book-dialogue-protocol
+    relation: 人格对话规则
+  - id: music-synthetic-choir
+    relation: 合成声部原型
+  - id: movie-prompted-storyboard
+    relation: 角色预演
+actions:
+  - kind: follow
+    label: 查看人格演示
+    url: https://example.com/labx/life/echo-persona
+---
+
+## 跨媒介的一致角色
+
+ECHO 把虚构的表达偏好、对话约束与声音参数放在同一份角色规格中，测试同一人格在文字对白、合成声音和分镜预演中能否保持可辨认的一致性。
+
+这是完全虚构的占位和结构化演示内容，不代表真实产品已经发布；不包含任何真实个人的身份、记忆、声音、肖像或行为数据。

diff --git a/tests/content.test.ts b/tests/content.test.ts
index c7efe71..148f643 100644
--- a/tests/content.test.ts
+++ b/tests/content.test.ts
@@ -1,10 +1,12 @@
 import { describe, expect, it } from "vitest";
 
 import {
+  loadWorks,
   parseWorkSource,
   validateWorkCollection,
 } from "@/lib/content/repository";
 import type { Work } from "@/lib/content/schema";
+import { contentTypes } from "@/lib/site";
 
 const validSource = `---
 id: game-test
@@ -39,6 +41,31 @@ function createWork(overrides: Partial<Work> = {}): Work {
 }
 
 describe("内容仓库", () => {
+  it("为六个领域各提供三个已发布演示项目", () => {
+    const works = loadWorks({ includeDrafts: false });
+
+    expect(works).toHaveLength(contentTypes.length * 3);
+    expect(works.every((work) => work.status === "published")).toBe(true);
+    expect(works.every((work) => work.demo)).toBe(true);
+
+    for (const type of contentTypes) {
+      expect(works.filter((work) => work.type === type)).toHaveLength(3);
+    }
+  });
+
+  it("Life 演示项目只使用明确标注的虚构人格", () => {
+    const lifeWorks = loadWorks({ includeDrafts: false }).filter(
+      (work) => work.type === "life",
+    );
+
+    expect(lifeWorks).toHaveLength(3);
+    expect(
+      lifeWorks.every((work) =>
+        `${work.summary}\n${work.body}`.includes("虚构"),
+      ),
+    ).toBe(true);
+  });
+
   it("解析并规范化 YAML 日期", () => {
     const work = parseWorkSource(validSource, "test.mdx");

diff --git a/.agentdocs/index.md b/.agentdocs/index.md
--- a/.agentdocs/index.md
+++ b/.agentdocs/index.md
@@ -6,6 +6,7 @@
 
 ## 当前变更文档
 
+`workflow/20260830231331-expand-demo-content-across-fields.md` - 为六个应用领域各补充两个结构化占位项目，使首页每个领域都能展示完整的三项目布局；继续维护演示项目、跨领域关系或首页项目密度时读取。
 `workflow/20260830225038-refactor-homepage-into-anchored-ai-fields.md` - 将首页重构为六个应用领域锚点分区，把品牌口号移入 Header，并按领域展示叙事与项目预览；继续调整首页信息架构、锚点导航或移动端 Header 时读取。
 `workflow/20260830215124-publish-independent-ai-lab-first-version.md` - 将 LabX 的公开定位统一为独立 AI 实验室，把六模块表达为 AI 应用领域，并创建公开 GitHub 仓库首版；维护品牌定位、公开元数据或 GitHub 发布流程时读取。
 `workflow/20260830195628-refactor-project-first-homepage.md` - 将首页重构为左侧紧凑品牌说明、右侧三项核心项目的首屏工作台，统一 LABX 字标并把项目目录前置；继续调整首页项目优先级、首屏密度或品牌字标时读取。
@@ -36,3 +37,4 @@
 - X-icon 的白黑透明 WebP/GIF 刀划开动画已同步到 `public/x-x-x20/outputs/`，当前仅作为品牌资产入库，尚未接入页面组件。
 - GitHub 公开仓库为 `https://github.com/LeP-Ton/LabX`，`main` 已发布并跟踪 `origin/main`，GitHub Actions 质量检查已通过；Vercel 尚未绑定。
 - Header 在 `LABX` 下方显示“探索和重构一切”，六领域菜单统一跳转首页 `#game` 至 `#life` 锚点；首页六段均采用左侧研究叙事、右侧最多三个项目预览的结构。
+- 六个应用领域现各有三个已发布演示项目，共十八项；新增条目使用占位入口并通过稳定 ID 建立跨领域关联，`Life` 条目均为明确标注的虚构人格。
```

## 测试用例

### TC-001 六领域内容数量

- 类型：单元测试
- 优先级：高
- 关联模块：内容仓库
- 前置条件：十八个 MDX 文件均存在。
- 操作步骤：
  1. 使用 `loadWorks({ includeDrafts: false })` 读取生产可见内容。
  2. 按 `game`、`music`、`book`、`art`、`movie`、`life` 分组。
- 预期结果：共十八个已发布演示项目，每个领域恰好三个。
- 是否通过：通过。

### TC-002 跨领域引用与内容安全

- 类型：单元测试 / 构建期校验
- 优先级：高
- 关联模块：Zod Schema、内容仓库
- 前置条件：所有新增项目已配置 `relatedWorks` 和 HTTPS 行动入口。
- 操作步骤：
  1. 解析全部 MDX frontmatter。
  2. 校验全局 ID、路由、跨领域引用和行动入口。
  3. 检查三个 Life 项目的摘要与正文均包含“虚构”标记。
- 预期结果：无重复 ID、失效关联或不安全入口，Life 内容边界清晰。
- 是否通过：通过。

### TC-003 首页三项目预览

- 类型：集成验证
- 优先级：高
- 关联模块：首页六领域分区
- 前置条件：本地开发页可访问。
- 操作步骤：
  1. 请求 `http://localhost:3000/`。
  2. 结合内容数量测试与首页 `slice(0, 3)` 逻辑确认六个领域预览。
- 预期结果：首页返回 200，每个领域具备三项可预览内容。
- 是否通过：通过。

### TC-004 工程质量与静态生成

- 类型：自动化测试
- 优先级：高
- 关联模块：全项目
- 操作步骤：
  1. 运行 Prettier 格式检查。
  2. 运行 ESLint 与 TypeScript 类型检查。
  3. 运行 Vitest。
  4. 运行 Next.js 生产构建。
- 预期结果：全部命令通过，生成 33 个静态页面，其中包含十八个项目详情路由。
- 是否通过：通过；8 个测试文件、33 项测试全部通过，生产构建无警告。

