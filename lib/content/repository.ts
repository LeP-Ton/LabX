import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { ContentType } from "@/lib/site";
import { contentTypes } from "@/lib/site";
import { type Work, workFrontmatterSchema } from "@/lib/content/schema";

const defaultContentRoot = path.join(process.cwd(), "content");

export interface LoadWorksOptions {
  contentRoot?: string;
  includeDrafts?: boolean;
}

/** 解析单个 MDX 文件，并用统一 Schema 校验其 frontmatter。 */
export function parseWorkSource(source: string, sourceName: string): Work {
  const { content, data } = matter(source);
  const result = workFrontmatterSchema.safeParse(data);

  if (!result.success) {
    throw new Error(`内容校验失败：${sourceName}\n${result.error.message}`);
  }

  return {
    ...result.data,
    body: content.trim(),
  };
}

/** 校验跨文件不变量，避免重复 ID、重复路由和失效关联进入构建结果。 */
export function validateWorkCollection(works: Work[]): void {
  const byId = new Map<string, Work>();
  const routes = new Set<string>();

  for (const work of works) {
    if (byId.has(work.id)) {
      throw new Error(`发现重复作品 ID：${work.id}`);
    }

    const route = `${work.type}/${work.slug}`;
    if (routes.has(route)) {
      throw new Error(`发现重复作品路由：/${route}`);
    }

    byId.set(work.id, work);
    routes.add(route);
  }

  for (const work of works) {
    for (const related of work.relatedWorks) {
      if (!byId.has(related.id)) {
        throw new Error(`作品 ${work.id} 引用了不存在的作品：${related.id}`);
      }
      if (related.id === work.id) {
        throw new Error(`作品 ${work.id} 不能关联自身`);
      }
    }
  }
}

function shouldIncludeDrafts() {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.VERCEL_ENV === "preview"
  );
}

/** 从六个应用领域读取作品；先校验全集，再根据环境过滤草稿。 */
export function loadWorks(options: LoadWorksOptions = {}): Work[] {
  const contentRoot = options.contentRoot ?? defaultContentRoot;
  const works: Work[] = [];

  for (const type of contentTypes) {
    const moduleDirectory = path.join(
      /* turbopackIgnore: true */ contentRoot,
      type,
    );
    if (!fs.existsSync(/* turbopackIgnore: true */ moduleDirectory)) continue;

    const filenames = fs
      .readdirSync(/* turbopackIgnore: true */ moduleDirectory)
      .filter((filename) => filename.endsWith(".mdx"))
      .sort();

    for (const filename of filenames) {
      const filePath = path.join(
        /* turbopackIgnore: true */ moduleDirectory,
        filename,
      );
      const source = fs.readFileSync(
        /* turbopackIgnore: true */ filePath,
        "utf8",
      );
      const work = parseWorkSource(
        source,
        path.relative(contentRoot, filePath),
      );
      const expectedSlug = filename.replace(/\.mdx$/, "");

      if (work.type !== type) {
        throw new Error(
          `${filename} 的 type 应为 ${type}，实际为 ${work.type}`,
        );
      }
      if (work.slug !== expectedSlug) {
        throw new Error(
          `${filename} 的 slug 应为 ${expectedSlug}，实际为 ${work.slug}`,
        );
      }

      works.push(work);
    }
  }

  validateWorkCollection(works);

  const includeDrafts = options.includeDrafts ?? shouldIncludeDrafts();
  const visibleWorks = includeDrafts
    ? works
    : works.filter((work) => work.status === "published");
  const visibleIds = new Set(visibleWorks.map((work) => work.id));

  for (const work of visibleWorks) {
    for (const related of work.relatedWorks) {
      if (!visibleIds.has(related.id)) {
        throw new Error(
          `可见作品 ${work.id} 引用了当前环境不可见的作品：${related.id}`,
        );
      }
    }
  }

  return visibleWorks.sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getWorksByType(type: ContentType) {
  return loadWorks().filter((work) => work.type === type);
}

export function getWorkByRoute(type: ContentType, slug: string) {
  return loadWorks().find((work) => work.type === type && work.slug === slug);
}

export function getRelatedWorks(work: Work) {
  const byId = new Map(loadWorks().map((item) => [item.id, item]));
  return work.relatedWorks.map((relation) => ({
    relation: relation.relation,
    work: byId.get(relation.id)!,
  }));
}
