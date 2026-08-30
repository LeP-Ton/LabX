import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const homeSource = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
const footerSource = readFileSync(
  resolve(process.cwd(), "components/site-footer.tsx"),
  "utf8",
);
const globalStyles = readFileSync(
  resolve(process.cwd(), "app/globals.css"),
  "utf8",
);

describe("首页六领域项目索引", () => {
  it("移除旧首页分类、领域索引和宏大叙事区块", () => {
    expect(homeSource).not.toContain("核心项目");
    expect(homeSource).not.toContain("其他项目");
    expect(homeSource).not.toContain("领域索引");
    expect(homeSource).not.toContain("作品不再孤立，生命不止一次。");
    expect(homeSource).not.toContain("每一次交叉，都是下一条路径的起点。");
    expect(homeSource).not.toContain('className="hero"');
    expect(homeSource).not.toContain('className="worlds"');
    expect(homeSource).not.toContain('className="x-signature"');
    expect(footerSource).not.toContain("footer-wordmark-x");
    expect(globalStyles).not.toContain(".core-projects");
    expect(globalStyles).not.toContain(".core-project-card");
    expect(globalStyles).not.toContain(".hero {");
    expect(globalStyles).not.toContain(".worlds {");
  });

  it("按既定顺序生成六个带稳定锚点的领域分区", () => {
    expect(homeSource).toContain('<h1 className="sr-only">');
    expect(homeSource).toContain("{modules.map((module) => {");
    expect(homeSource).toContain('className="home-field"');
    expect(homeSource).toContain("id={module.type}");
    expect(homeSource).toContain("aria-labelledby={`${module.type}-title`}");
    expect(homeSource).toContain(
      "<h2 id={`${module.type}-title`}>{module.description}</h2>",
    );
    expect(homeSource).toContain("APPLICATION FIELD / {module.index}");
  });

  it("一次加载并分组项目，每个领域最多预览三个最新项目", () => {
    expect(homeSource).toContain("const homepagePreviewLimit = 3");
    expect(homeSource.match(/loadWorks\(\)/g)).toHaveLength(1);
    expect(homeSource).toContain("const worksByType = new Map(");
    expect(homeSource).toContain("worksByType.get(work.type)!.push(work)");
    expect(homeSource).toContain(
      "const previewWorks = moduleWorks.slice(0, homepagePreviewLimit)",
    );
    expect(homeSource).toContain("previewWorks.map((work, index) => (");
    expect(homeSource).toContain("<HomeProjectCard");
    expect(homeSource).toContain(
      'previewCount === 3 && index > 0 ? "compact" : "lead"',
    );
    expect(homeSource).toContain("暂无公开项目。");
  });

  it("领域左侧提供叙事、项目总数和完整列表入口", () => {
    expect(homeSource).toContain("{module.name} / {module.chineseName}");
    expect(homeSource).toContain("{module.description}");
    expect(homeSource).toContain("href={`/${module.type}`}");
    expect(homeSource).toContain("aria-label={`全部${module.chineseName}`}");
    expect(homeSource).toContain("<span>全部{module.chineseName}</span>");
    expect(homeSource).toContain(
      '{String(moduleWorks.length).padStart(2, "0")}',
    );
  });
});
