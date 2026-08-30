import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const standardPositioning =
  "LabX 是一个独立 AI 实验室，研究并构建 AI 在游戏、声音、叙事、视觉、影像与数字人格中的应用。";

function readProjectFile(path: string) {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("LabX 独立 AI 实验室定位", () => {
  it("首页、站点元数据和 README 使用统一定位", () => {
    const homeSource = readProjectFile("app/page.tsx");
    const siteSource = readProjectFile("lib/site.ts");
    const readmeSource = readProjectFile("README.md");

    expect(homeSource).toContain("独立 AI 实验室");
    expect(siteSource).toContain(standardPositioning);
    expect(readmeSource).toContain(standardPositioning);
  });

  it("当前公开页面不再把 LabX 描述为公司数字内容门户", () => {
    const currentPublicSources = [
      "app/page.tsx",
      "app/about/page.tsx",
      "app/privacy/page.tsx",
      "lib/site.ts",
      "README.md",
    ]
      .map(readProjectFile)
      .join("\n");

    expect(currentPublicSources).not.toContain("公司的数字内容门户");
    expect(currentPublicSources).not.toContain("LabX 门户");
    expect(currentPublicSources).toContain("六个应用领域");
  });

  it("六个模块被表达为 AI 应用领域", () => {
    const homeSource = readProjectFile("app/page.tsx");
    const modulePageSource = readProjectFile("app/[module]/page.tsx");
    const siteSource = readProjectFile("lib/site.ts");
    const leadProjectSource = readProjectFile("content/game/echoes-of-us.mdx");

    expect(homeSource).toContain("APPLICATION FIELDS");
    expect(modulePageSource).toContain("LABX APPLICATION FIELD");
    expect(modulePageSource).not.toContain("CONTENT DOMAIN");
    expect(modulePageSource).toContain("领域项目");
    expect(siteSource).toContain("生成式 AI");
    expect(siteSource).toContain("语言模型");
    expect(siteSource).toContain("人格建模");
    expect(leadProjectSource).toContain("六个应用领域");
    expect(leadProjectSource).toContain("LabX 跨领域 AI 实验");
    expect(leadProjectSource).not.toContain("六个内容域");
    expect(leadProjectSource).not.toContain("LabX 内容生态");
  });

  it("本次定位同步不改变首页既有项目分类", () => {
    const homeSource = readProjectFile("app/page.tsx");

    expect(homeSource).toContain("核心项目");
    expect(homeSource).toContain("其他项目");
  });
});
