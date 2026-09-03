import type { MetadataRoute } from "next";

import { loadWorks } from "@/lib/content/repository";
import { absoluteUrl, contentTypes } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about/",
    "/privacy/",
    ...contentTypes.map((type) => `/${type}/`),
  ];
  const workRoutes = loadWorks().map((work) => `/${work.type}/${work.slug}/`);

  return [...staticRoutes, ...workRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").length === 3 ? 0.8 : 0.7,
  }));
}
