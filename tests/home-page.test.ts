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

describe("首页项目优先级与叙事密度", () => {
  it("不再渲染宏大叙事区块和页脚巨型 X", () => {
    expect(homeSource).not.toContain("作品不再孤立，生命不止一次。");
    expect(homeSource).not.toContain("每一次交叉，都是下一条路径的起点。");
    expect(homeSource).not.toContain('className="vision"');
    expect(homeSource).not.toContain('className="x-signature"');
    expect(homeSource).not.toContain('className="hero-x-stage"');
    expect(footerSource).not.toContain("footer-wordmark-x");
    expect(globalStyles).not.toContain(".vision {");
    expect(globalStyles).not.toContain(".x-signature {");
    expect(globalStyles).not.toContain(".hero-x-stage");
    expect(globalStyles).not.toContain(".footer-wordmark-x");
  });

  it("首屏右侧直接展示三个核心项目，其他项目随后出现", () => {
    const coreProjectsPosition = homeSource.indexOf(
      'className="core-projects"',
    );
    const otherProjectsPosition = homeSource.indexOf('id="projects"');

    expect(homeSource).toContain("const coreWorks = featuredWorks.slice(0, 3)");
    expect(homeSource).toContain(
      'prominence={index === 0 ? "lead" : "compact"}',
    );
    expect(coreProjectsPosition).toBeGreaterThan(-1);
    expect(otherProjectsPosition).toBeGreaterThan(coreProjectsPosition);
    expect(globalStyles).toContain(
      "grid-template-columns: minmax(17rem, 0.68fr) minmax(0, 1.45fr)",
    );
    expect(globalStyles).toContain("height: min(66svh, 42rem)");
  });

  it("标语压缩为两行，并限制为项目标题以下的视觉层级", () => {
    expect(homeSource).toContain("探索和重构");
    expect(homeSource).toContain('className="hero-dot"');
    expect(globalStyles).toContain("font-size: clamp(3.1rem, 5.1vw, 5.6rem)");
  });
});
