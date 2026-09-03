import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { XMark } from "@/components/x-mark";

const iconPath = resolve(
  process.cwd(),
  "public/x-x-x20/outputs/x-icon-transparent.svg",
);
const iconSource = readFileSync(iconPath, "utf8");
const globalStyles = readFileSync(
  resolve(process.cwd(), "app/globals.css"),
  "utf8",
);
const xMarkSource = readFileSync(
  resolve(process.cwd(), "components/x-mark.tsx"),
  "utf8",
);
const headerSource = readFileSync(
  resolve(process.cwd(), "components/site-header.tsx"),
  "utf8",
);
const footerSource = readFileSync(
  resolve(process.cwd(), "components/site-footer.tsx"),
  "utf8",
);

/** 提取品牌组合规则，防止 LABX 文字与口号重新压过 X 主符号。 */
function getRule(selector: string): string {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matchedRule = globalStyles.match(
    new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`),
  );

  if (!matchedRule) throw new Error(`没有找到 CSS 规则：${selector}`);
  return matchedRule[1];
}

describe("XMark 品牌图标", () => {
  it("使用透明 SVG 矢量资源作为主题遮罩", () => {
    expect(existsSync(iconPath)).toBe(true);
    expect(globalStyles).not.toContain(
      '--x-icon: url("/x-x-x20/outputs/x-icon-transparent.svg")',
    );
    expect(xMarkSource).toContain(
      'withBasePath("/x-x-x20/outputs/x-icon-transparent.svg")',
    );
    expect(globalStyles).toContain(
      "mask: var(--x-icon) center / contain no-repeat",
    );
    expect(globalStyles).toContain("mask-mode: alpha");
    expect(iconSource).toContain('viewBox="0 0 1254 1254"');
    expect(iconSource).toContain("<polygon");
    expect(iconSource).not.toContain("<rect");
  });

  it("默认作为装饰元素隐藏于辅助技术", () => {
    render(<XMark className="test-x-mark" data-testid="x-mark" />);

    const mark = screen.getByTestId("x-mark");
    expect(mark).toHaveClass("x-mark", "test-x-mark");
    expect(mark).toHaveAttribute("aria-hidden", "true");
    expect(mark.style.getPropertyValue("--x-icon")).toBe(
      'url("/x-x-x20/outputs/x-icon-transparent.svg")',
    );
  });

  it("页头以大号 X 为主符号，LABX 与口号组成两行文字栈", () => {
    const headerLabel = getRule(".wordmark-label");
    const headerX = getRule(".wordmark-x");
    const headerCopy = getRule(".wordmark-copy");
    const headerSlogan = getRule(".wordmark-slogan");
    const footerLabel = getRule(".footer-wordmark-label");

    expect(headerLabel).toContain("font-size: 0.64rem");
    expect(headerLabel).toContain("letter-spacing: 0.18em");
    expect(headerLabel).toContain("color: var(--muted)");
    expect(headerX).toContain("width: 3rem");
    expect(headerX).toContain("mask-size: 135%");
    expect(headerCopy).toContain("flex-direction: column");
    expect(headerSlogan).toContain("white-space: nowrap");
    expect(footerLabel).toContain("font-size: clamp(0.64rem, 0.8vw, 0.78rem)");
    expect(footerLabel).toContain("color: var(--muted)");
    expect(headerSource).toContain("modules, siteConfig");
    expect(headerSource).toContain(
      '<span className="wordmark-label">LABX</span>',
    );
    expect(headerSource).toContain(
      '<span className="wordmark-slogan">{siteConfig.slogan}</span>',
    );
    expect(footerSource).toContain(
      '<p className="footer-wordmark-label">LABX</p>',
    );
    expect(headerSource).not.toContain(
      '<span className="wordmark-label">LAB</span>',
    );
    expect(footerSource).not.toContain(
      '<p className="footer-wordmark-label">LAB</p>',
    );
    expect(globalStyles).not.toContain(".footer-wordmark-x");
  });

  it("页头六领域链接统一指向首页锚点", () => {
    expect(headerSource).toContain('aria-label="应用领域"');
    expect(headerSource).toContain("href={`/#${module.type}`}");
    expect(headerSource).not.toContain("href={`/${module.type}`}");
    expect(headerSource).toContain('className="header-utilities"');
  });
});
