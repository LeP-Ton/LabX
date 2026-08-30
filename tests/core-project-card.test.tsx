import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CoreProjectCard } from "@/components/core-project-card";
import type { Work } from "@/lib/content/schema";

const work: Work = {
  id: "game-echoes-of-us",
  slug: "echoes-of-us",
  type: "game",
  title: "余响纪元",
  summary: "六个应用领域首次汇聚的可玩世界原型。",
  cover: "module:game",
  publishedAt: "2026-08-30",
  status: "published",
  featured: true,
  demo: true,
  tags: ["世界原型"],
  creators: ["LabX"],
  relatedWorks: [],
  actions: [],
  body: "演示正文",
};

describe("首屏核心项目卡", () => {
  it.each(["lead", "compact"] as const)(
    "正确渲染 %s 层级的项目链接与无障碍名称",
    (prominence) => {
      render(
        <CoreProjectCard work={work} index="01" prominence={prominence} />,
      );

      const link = screen.getByRole("link", {
        name: "查看核心项目：余响纪元",
      });
      expect(link).toHaveAttribute("href", "/game/echoes-of-us");
      expect(link.closest("article")).toHaveClass(
        "core-project-card",
        `core-project-card--${prominence}`,
      );
      expect(screen.getAllByText("余响纪元")).toHaveLength(2);
    },
  );
});
