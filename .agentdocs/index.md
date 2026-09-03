# LabX 文档索引

## 项目认知

`../AGENTS.md` - 记录项目整体定位、技术选型、核心架构、运行方式与检索方法；开始项目工作时优先读取。

## 当前变更文档

`workflow/20260903210854-fix-module-e2e-demo-card-locator.md` - 修复领域页在拥有多个演示项目时触发的 Playwright 严格定位冲突，使 1、2、3 项内容布局都能通过远端质量检查；维护领域页 E2E 或演示内容数量时读取。
`workflow/20260903205305-publish-labx-to-github-pages.md` - 为 Next.js 增加条件式静态导出、GitHub Pages 子路径与 SEO 适配，并通过 GitHub Actions 自动发布公开站点；维护 Pages 部署、公开 URL 或静态资源路径时优先读取。
`workflow/20260830231331-expand-demo-content-across-fields.md` - 为六个应用领域各补充两个结构化占位项目，使首页每个领域都能展示完整的三项目布局；继续维护演示项目、跨领域关系或首页项目密度时读取。
`workflow/20260830225038-refactor-homepage-into-anchored-ai-fields.md` - 将首页重构为六个应用领域锚点分区，把品牌口号移入 Header，并按领域展示叙事与项目预览；继续调整首页信息架构、锚点导航或移动端 Header 时读取。
`workflow/20260830215124-publish-independent-ai-lab-first-version.md` - 将 LabX 的公开定位统一为独立 AI 实验室，把六模块表达为 AI 应用领域，并创建公开 GitHub 仓库首版；维护品牌定位、公开元数据或 GitHub 发布流程时读取。
`workflow/20260830195628-refactor-project-first-homepage.md` - 将首页重构为左侧紧凑品牌说明、右侧三项核心项目的首屏工作台，统一 LABX 字标并把项目目录前置；继续调整首页项目优先级、首屏密度或品牌字标时读取。
`workflow/20260830192517-remove-grand-narrative-sections.md` - 删除首页两个宏大叙事区和页脚巨型 X，压缩相邻留白并确立克制、实验导向的极客叙事；继续调整首页内容密度或品牌语气时读取。
`workflow/20260830183234-replace-x-raster-mask-with-svg.md` - 将全站 X-icon 从透明 PNG 遮罩替换为同轮廓的透明 SVG 矢量遮罩，解决大尺寸边缘不清晰问题；维护 X 资源、遮罩或缩放清晰度时读取。
`workflow/20260830183228-sync-knife-cut-x-animation-assets.md` - 将 X-icon 最新“刀尖细裂缝传播、尾迹逐步张开”透明 WebP/GIF 动画、生成脚本和资源包记录同步到 `public/x-x-x20`；需要使用、维护或继续接入动画品牌资产时读取。
`workflow/20260830182301-promote-x-as-primary-brand-symbol.md` - 重构页头与页脚品牌层级，让大号 X 成为主符号、LAB 退为小号说明标签，并通过遮罩缩放消除透明画布造成的视觉缩水；继续调整品牌组合层级时读取。
`workflow/20260830180739-balance-labx-wordmark-proportions.md` - 调轻页头与页脚 LAB 字重并放大 X-icon，修正透明图标画布留白造成的品牌组合比例失衡；继续调整品牌字标比例时读取。
`workflow/20260830174023-integrate-x-icon-visual-system.md` - 将用户提供的 X-icon 建立为全站核心视觉符号，重构首页、模块、作品、编辑页、图标和社交分享图；继续调整品牌视觉或静态资源时优先读取。
`workflow/20260830163831-fix-display-typography-spacing.md` - 修复中文标题与英文展示字母的过度压缩，拆分中英文字体栈并增加排版回归测试；调整全站标题排版或排查字符重叠时读取。
`workflow/20260830182600-complete-labx-portal-mvp.md` - 完成 LabX 门户 MVP、六个内容模块、MDX 内容体系、跨模块关系、主题、SEO、分析、测试和发布准备；维护或验收当前站点时优先读取。
`workflow/20260830150303-scaffold-labx-portal.md` - 建立 React、TypeScript、Next.js 与 Tailwind 基础工程和品牌首屏；继续安装依赖或完善门户功能前读取。
`workflow/20260830144524-define-labx-product-vision.md` - 确立 LabX 门户定位、内容模块协作、传播转化路径及品牌视觉；进行产品设计、信息架构或技术选型前读取。
`workflow/20260830143747-initialize-project-docs.md` - 初始化项目认知、兼容入口与文档索引；需要了解仓库初始状态时读取。

## 关键记忆

- LabX 是一个独立 AI 实验室，研究并构建 AI 在游戏、声音、叙事、视觉、影像与数字人格中的应用，并通过 GitHub 工程化保存、管理和关联实验项目。
- `Game`、`Music`、`Book`、`Art`、`Movie`、`Life` 是实验室的六个应用领域，各领域项目可以相互关联与复用。
- `Life` 面向数字永生，通过人格、记忆和行为特征丰富虚拟世界中的 NPC 个性。
- 内容通过哔哩哔哩、抖音、小红书等媒体传播，并引导用户消费与转化。
- 品牌口号为“探索和重构一切”，采用可切换的黑白色极简主题。
- 前端采用 Next.js、React、TypeScript、Tailwind CSS，内容采用 MDX + Zod，包管理器使用 pnpm；当前公开环境为 GitHub Pages，Vercel 保留为后续可选平台。
- 实验室网站 MVP 已完成：六个应用领域均有演示项目，内容详情与跨领域关联可用，黑白主题、SEO、匿名外链事件和隐私说明已经接入。
- 依赖与锁文件已经生成；格式、Lint、类型、单元/组件测试、生产构建、端到端测试及 Lighthouse 审计均已通过。
- 中英文展示排版已经拆分：中文使用独立 CJK 字体栈与安全字距/行高，英文仅保留轻微紧凑效果。
- X-icon 已成为全站核心视觉符号，通过 CSS 遮罩应用于页头、Hero、模块、作品、编辑页与页脚，并同步更新 favicon 和社交分享图。
- X-icon 的白黑透明 WebP/GIF 刀划开动画已同步到 `public/x-x-x20/outputs/`，当前仅作为品牌资产入库，尚未接入页面组件。
- GitHub 公开仓库为 `https://github.com/LeP-Ton/LabX`，公开站点为 `https://lep-ton.github.io/LabX/`；`main` 推送后由 GitHub Actions 完成质量检查与 Pages 静态发布。
- GitHub Pages 构建通过 `NEXT_PUBLIC_SITE_URL` 和 `NEXT_PUBLIC_BASE_PATH` 适配 `/LabX` 项目子路径；本地开发和普通构建继续使用根路径。
- Header 在 `LABX` 下方显示“探索和重构一切”，六领域菜单统一跳转首页 `#game` 至 `#life` 锚点；首页六段均采用左侧研究叙事、右侧最多三个项目预览的结构。
- 六个应用领域现各有三个已发布演示项目，共十八项；新增条目使用占位入口并通过稳定 ID 建立跨领域关联，`Life` 条目均为明确标注的虚构人格。
