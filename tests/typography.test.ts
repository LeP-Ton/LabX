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
  it("首页中文主标题使用独立字体、正常字宽与安全行高", () => {
    const heroTitleRule = getRule(".hero h1");

    expect(globalStyles).toContain("--display-cjk:");
    expect(heroTitleRule).toContain("font-family: var(--display-cjk)");
    expect(heroTitleRule).toContain("font-stretch: normal");
    expect(heroTitleRule).toContain("letter-spacing: 0.01em");
    expect(heroTitleRule).toContain("line-height: 1.06");
  });

  it.each([
    ".work-visual-title",
    ".work-card-meta h3",
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
