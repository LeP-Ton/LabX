import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WorkCard } from "@/components/work-card";
import { parseWorkSource } from "@/lib/content/repository";

const source = `---
id: music-test
slug: test-track
type: music
title: 测试声音
summary: 一段用于组件测试的声音作品。
cover: module:music
publishedAt: 2026-08-30
status: published
featured: true
demo: true
tags:
  - 声音
creators:
  - LabX
relatedWorks: []
actions: []
---
`;

describe("作品卡片", () => {
  it("展示模块、演示标记和正确详情链接", () => {
    render(<WorkCard work={parseWorkSource(source, "test-track.mdx")} />);

    expect(
      screen.getByRole("heading", { name: "测试声音" }),
    ).toBeInTheDocument();
    expect(screen.getByText("演示内容")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "查看作品：测试声音" }),
    ).toHaveAttribute("href", "/music/test-track");
  });
});
