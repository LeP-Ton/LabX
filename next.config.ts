import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const pagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  agentRules: false,
  // GitHub Pages 只提供静态文件服务；本地开发和未来的 Vercel 构建仍保留默认模式。
  output: isGitHubPagesBuild ? "export" : undefined,
  basePath: isGitHubPagesBuild ? pagesBasePath : "",
  trailingSlash: isGitHubPagesBuild,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
