import { z } from "zod";

import { contentTypes } from "@/lib/site";

export const contentTypeSchema = z.enum(contentTypes);
export const workStatusSchema = z.enum(["draft", "published"]);
export const actionKindSchema = z.enum([
  "view",
  "listen",
  "buy",
  "play",
  "follow",
]);

const relatedWorkSchema = z
  .object({
    id: z.string().trim().min(1, "关联作品 ID 不能为空"),
    relation: z.string().trim().min(1, "关联说明不能为空"),
  })
  .strict();

const workActionSchema = z
  .object({
    kind: actionKindSchema,
    label: z.string().trim().min(1, "行动入口文案不能为空"),
    url: z
      .url("行动入口必须是有效 URL")
      .refine(
        (url) => new URL(url).protocol === "https:",
        "行动入口必须使用 HTTPS",
      ),
  })
  .strict();

export const workFrontmatterSchema = z
  .object({
    id: z
      .string()
      .trim()
      .regex(/^[a-z0-9-]+$/, "ID 只能包含小写字母、数字和连字符"),
    slug: z
      .string()
      .trim()
      .regex(/^[a-z0-9-]+$/, "slug 只能包含小写字母、数字和连字符"),
    type: contentTypeSchema,
    title: z.string().trim().min(1, "标题不能为空"),
    summary: z
      .string()
      .trim()
      .min(1, "摘要不能为空")
      .max(180, "摘要不能超过 180 个字符"),
    cover: z
      .string()
      .trim()
      .regex(/^module:(game|music|book|art|movie|life)$/),
    publishedAt: z.preprocess(
      (value) =>
        value instanceof Date ? value.toISOString().slice(0, 10) : value,
      z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "发布日期必须使用 YYYY-MM-DD"),
    ),
    status: workStatusSchema,
    featured: z.boolean(),
    demo: z.boolean().default(false),
    tags: z.array(z.string().trim().min(1)).min(1, "至少需要一个标签"),
    creators: z.array(z.string().trim().min(1)).min(1, "至少需要一位创作者"),
    relatedWorks: z.array(relatedWorkSchema),
    actions: z.array(workActionSchema),
  })
  .strict();

export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>;
export type ActionKind = z.infer<typeof actionKindSchema>;
export type WorkStatus = z.infer<typeof workStatusSchema>;

export interface Work extends WorkFrontmatter {
  body: string;
}
