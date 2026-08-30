import type { MetadataRoute } from "next";

import { loadWorks } from "@/lib/content/repository";
import { contentTypes, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/privacy",
    ...contentTypes.map((type) => `/${type}`),
  ];
  const workRoutes = loadWorks().map((work) => `/${work.type}/${work.slug}`);

  return [...staticRoutes, ...workRoutes].map((route) => ({
    url: new URL(route || "/", siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.7,
  }));
}
