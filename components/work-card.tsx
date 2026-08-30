import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { WorkVisual } from "@/components/work-visual";
import type { Work } from "@/lib/content/schema";
import { modules } from "@/lib/site";

export function formatPublishedAt(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

interface WorkCardProps {
  work: Work;
  relation?: string;
}

export function WorkCard({ work, relation }: WorkCardProps) {
  const moduleDefinition = modules.find((module) => module.type === work.type)!;

  return (
    <article className="work-card">
      <Link
        href={`/${work.type}/${work.slug}`}
        aria-label={`查看作品：${work.title}`}
      >
        <WorkVisual
          type={work.type}
          title={work.title}
          index={moduleDefinition.index}
        />
        <div className="work-card-meta">
          <div>
            <p className="work-card-label">
              {moduleDefinition.name} / {moduleDefinition.chineseName}
              {work.demo ? <span>演示内容</span> : null}
            </p>
            <h3>{work.title}</h3>
          </div>
          <ArrowUpRight aria-hidden="true" />
        </div>
        {relation ? <p className="work-card-relation">{relation}</p> : null}
        <p className="work-card-summary">{work.summary}</p>
        <div className="work-card-footer">
          <span>{work.tags.join(" · ")}</span>
          <time dateTime={work.publishedAt}>
            {formatPublishedAt(work.publishedAt)}
          </time>
        </div>
      </Link>
    </article>
  );
}
