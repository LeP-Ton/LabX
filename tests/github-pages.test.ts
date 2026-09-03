import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { absoluteUrl, withBasePath } from "@/lib/site";

function readProjectFile(path: string) {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("GitHub Pages 发布配置", () => {
  it("为项目站资源补充 /LabX 子路径", () => {
    expect(withBasePath("/og.png", "/LabX")).toBe("/LabX/og.png");
    expect(withBasePath("x-icon.svg", "/LabX/")).toBe("/LabX/x-icon.svg");
    expect(withBasePath("/", "/LabX")).toBe("/LabX/");
    expect(withBasePath("/og.png", "")).toBe("/og.png");
  });

  it("生成保留项目子路径的公开绝对 URL", () => {
    const pagesUrl = "https://lep-ton.github.io/LabX";

    expect(absoluteUrl("/", pagesUrl)).toBe("https://lep-ton.github.io/LabX/");
    expect(absoluteUrl("/about/", pagesUrl)).toBe(
      "https://lep-ton.github.io/LabX/about/",
    );
    expect(absoluteUrl("/game/echoes-of-us/", pagesUrl)).toBe(
      "https://lep-ton.github.io/LabX/game/echoes-of-us/",
    );
    expect(absoluteUrl("/sitemap.xml", pagesUrl)).toBe(
      "https://lep-ton.github.io/LabX/sitemap.xml",
    );
  });

  it("只在 GitHub Pages 构建中启用静态导出", () => {
    const configSource = readProjectFile("next.config.ts");
    const faviconRouteSource = readProjectFile("app/favicon.ico/route.ts");

    expect(configSource).toContain('process.env.GITHUB_PAGES === "true"');
    expect(configSource).toContain(
      'output: isGitHubPagesBuild ? "export" : undefined',
    );
    expect(configSource).toContain(
      'basePath: isGitHubPagesBuild ? pagesBasePath : ""',
    );
    expect(configSource).toContain("trailingSlash: isGitHubPagesBuild");
    expect(faviconRouteSource).toContain(
      'export const dynamic = "force-static"',
    );
  });

  it("使用 GitHub Pages 官方 artifact 发布流程", () => {
    const workflowSource = readProjectFile(".github/workflows/pages.yml");

    expect(workflowSource).toContain("uses: actions/configure-pages@v6");
    expect(workflowSource).toContain("uses: actions/upload-pages-artifact@v5");
    expect(workflowSource).toContain("uses: actions/deploy-pages@v5");
    expect(workflowSource).toContain('GITHUB_PAGES: "true"');
    expect(workflowSource).toContain(
      "NEXT_PUBLIC_SITE_URL: ${{ steps.pages.outputs.base_url }}",
    );
    expect(workflowSource).toContain(
      "NEXT_PUBLIC_BASE_PATH: ${{ steps.pages.outputs.base_path }}",
    );
    expect(workflowSource).toContain("pages: write");
    expect(workflowSource).toContain("id-token: write");
    expect(workflowSource).toContain("path: ./out");
  });

  it("robots、sitemap 与分享元数据统一使用公开 URL 工具", () => {
    const publicMetadataSources = [
      "app/layout.tsx",
      "app/about/page.tsx",
      "app/privacy/page.tsx",
      "app/[module]/page.tsx",
      "app/[module]/[slug]/page.tsx",
      "app/robots.ts",
      "app/sitemap.ts",
    ]
      .map(readProjectFile)
      .join("\n");

    expect(publicMetadataSources).toContain("absoluteUrl(");
    expect(publicMetadataSources).not.toContain(
      'new URL("/sitemap.xml", siteConfig.url)',
    );
    expect(publicMetadataSources).not.toContain('url: "/og.png"');
    expect(readProjectFile("app/robots.ts")).toContain(
      'export const dynamic = "force-static"',
    );
    expect(readProjectFile("app/sitemap.ts")).toContain(
      'export const dynamic = "force-static"',
    );
  });
});
