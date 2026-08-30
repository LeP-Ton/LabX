# LabX 文档索引

## 项目认知

`../AGENTS.md` - 记录项目整体定位、技术选型、核心架构、运行方式与检索方法；开始项目工作时优先读取。

## 当前变更文档

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
- 前端采用 Next.js、React、TypeScript、Tailwind CSS，内容采用 MDX + Zod，包管理器使用 pnpm，部署目标为 Vercel。
- 实验室网站 MVP 已完成：六个应用领域均有演示项目，内容详情与跨领域关联可用，黑白主题、SEO、匿名外链事件和隐私说明已经接入。
- 依赖与锁文件已经生成；格式、Lint、类型、单元/组件测试、生产构建、端到端测试及 Lighthouse 审计均已通过。
- 中英文展示排版已经拆分：中文使用独立 CJK 字体栈与安全字距/行高，英文仅保留轻微紧凑效果。
- X-icon 已成为全站核心视觉符号，通过 CSS 遮罩应用于页头、Hero、模块、作品、编辑页与页脚，并同步更新 favicon 和社交分享图。
- X-icon 的白黑透明 WebP/GIF 刀划开动画已同步到 `public/x-x-x20/outputs/`，当前仅作为品牌资产入库，尚未接入页面组件。
- GitHub 公开仓库为 `https://github.com/LeP-Ton/LabX`，当前工作区已配置 `origin`；Vercel 尚未绑定，代码已经具备 Vercel 构建与 GitHub Actions 持续集成配置。
- 首页首屏采用项目优先结构：左侧为紧凑 LABX 标语与快捷入口，右侧直接展示一个主项目和两个次项目；其余项目与领域索引依次位于下方。
