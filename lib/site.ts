export const contentTypes = [
  "game",
  "music",
  "book",
  "art",
  "movie",
  "life",
] as const;

export type ContentType = (typeof contentTypes)[number];

export interface ModuleDefinition {
  type: ContentType;
  name: string;
  chineseName: string;
  index: string;
  description: string;
}

export const modules: ModuleDefinition[] = [
  {
    type: "game",
    name: "Game",
    chineseName: "游戏",
    index: "01",
    description:
      "研究生成式 AI、智能体与交互叙事如何共同构建可进入的虚拟世界。",
  },
  {
    type: "music",
    name: "Music",
    chineseName: "音乐",
    index: "02",
    description: "研究 AI 在作曲、声音设计与自适应音频中的创作和协作方式。",
  },
  {
    type: "book",
    name: "Book",
    chineseName: "著作",
    index: "03",
    description: "研究语言模型如何参与世界观、角色、剧本与长篇叙事的构建。",
  },
  {
    type: "art",
    name: "Art",
    chineseName: "视觉",
    index: "04",
    description: "研究生成式 AI 在 UI、原画、视觉设计与三维资产流程中的应用。",
  },
  {
    type: "movie",
    name: "Movie",
    chineseName: "影视",
    index: "05",
    description: "研究 AI 在分镜、动画、影像生成与虚拟制作流程中的应用。",
  },
  {
    type: "life",
    name: "Life",
    chineseName: "数字永生",
    index: "06",
    description: "研究人格建模、记忆系统与行为智能，构建具有持续性的虚拟角色。",
  },
];

function normalizeBasePath(value: string | undefined) {
  if (!value || value === "/") return "";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

const configuredSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const siteConfig = {
  name: "LabX",
  description:
    "LabX 是一个独立 AI 实验室，研究并构建 AI 在游戏、声音、叙事、视觉、影像与数字人格中的应用。",
  slogan: "探索和重构一切",
  url: configuredSiteUrl,
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
};

/** 为 CSS 等不会被 Next.js 自动处理的 public 资源补上部署子路径。 */
export function withBasePath(pathname: string, basePath = siteConfig.basePath) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${normalizeBasePath(basePath)}${normalizedPath}`;
}

/** 生成保留 GitHub Pages 项目子路径的绝对 URL。 */
export function absoluteUrl(pathname = "/", siteUrl = siteConfig.url) {
  const normalizedSiteUrl = `${siteUrl.replace(/\/+$/, "")}/`;
  const relativePath = pathname.replace(/^\/+/, "");
  return new URL(relativePath, normalizedSiteUrl).toString();
}

export const socialPreviewImage = {
  url: absoluteUrl("/og.png"),
  width: 1731,
  height: 909,
  alt: "LabX — 探索和重构一切",
};
