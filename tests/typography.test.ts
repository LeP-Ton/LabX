import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const globalStyles = readFileSync(
  resolve(process.cwd(), "app/globals.css"),
  "utf8",
);

/** 提取单个 CSS 规则，用于防止中文标题再次继承窄体负字距。 */
function getRule(selector: string): string {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matchedRule = globalStyles.match(
    new RegExp(`^${escapedSelector}\\s*\\{([^}]*)\\}`, "m"),
  );

  if (!matchedRule) {
    throw new Error(`没有找到 CSS 规则：${selector}`);
  }

  return matchedRule[1];
}

describe("中文展示字体", () => {
  it("首页领域叙事使用独立字体、正常字宽与安全行高", () => {
    const fieldTitleRule = getRule(".home-field-copy h2");

    expect(globalStyles).toContain("--display-cjk:");
    expect(fieldTitleRule).toContain("font-family: var(--display-cjk)");
    expect(fieldTitleRule).toContain("font-stretch: normal");
    expect(fieldTitleRule).toContain("letter-spacing: 0.01em");
    expect(fieldTitleRule).toContain("line-height:");
    expect(fieldTitleRule).not.toMatch(/letter-spacing:\s*-/);
  });

  it("About 长定位标题使用专用紧凑尺度", () => {
    const statementTitleRule = getRule(".editorial-hero--statement h1");

    expect(statementTitleRule).toContain("max-width:");
    expect(statementTitleRule).toContain("font-size: clamp(");
    expect(statementTitleRule).not.toContain("10rem");
  });

  it.each([
    ".work-visual-title",
    ".work-card-meta h3",
    ".home-project-card-title h3",
    ".list-heading h2",
    ".work-detail-heading h1",
    ".action-link",
    ".editorial-hero h1",
    ".not-found h1",
  ])("%s 不再使用负字距", (selector) => {
    const rule = getRule(selector);

    expect(rule).toContain("font-family: var(--display-cjk)");
    expect(rule).not.toMatch(/letter-spacing:\s*-/);
  });
});
