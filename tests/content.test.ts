import { describe, expect, it } from "vitest";

import {
  parseWorkSource,
  validateWorkCollection,
} from "@/lib/content/repository";
import type { Work } from "@/lib/content/schema";

const validSource = `---
id: game-test
slug: test
type: game
title: 测试作品
summary: 用于验证内容模型的测试作品。
cover: module:game
publishedAt: 2026-08-30
status: published
featured: false
demo: true
tags:
  - 测试
creators:
  - LabX
relatedWorks: []
actions:
  - kind: play
    label: 试玩
    url: https://example.com/play
---

## 正文
`;

function createWork(overrides: Partial<Work> = {}): Work {
  return {
    ...parseWorkSource(validSource, "test.mdx"),
    ...overrides,
  };
}

describe("内容仓库", () => {
  it("解析并规范化 YAML 日期", () => {
    const work = parseWorkSource(validSource, "test.mdx");

    expect(work.publishedAt).toBe("2026-08-30");
    expect(work.body).toContain("## 正文");
  });

  it("拒绝非 HTTPS 行动入口", () => {
    const source = validSource.replace(
      "https://example.com/play",
      "http://example.com/play",
    );

    expect(() => parseWorkSource(source, "unsafe.mdx")).toThrow(
      "行动入口必须使用 HTTPS",
    );
  });

  it("拒绝重复作品 ID", () => {
    expect(() =>
      validateWorkCollection([createWork(), createWork({ slug: "other" })]),
    ).toThrow("发现重复作品 ID");
  });

  it("拒绝不存在的关联作品", () => {
    const work = createWork({
      relatedWorks: [{ id: "missing-work", relation: "测试关联" }],
    });

    expect(() => validateWorkCollection([work])).toThrow("引用了不存在的作品");
  });
});
