import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { WorkVisual } from "@/components/work-visual";
import type { Work } from "@/lib/content/schema";
import { modules } from "@/lib/site";

interface CoreProjectCardProps {
  work: Work;
  index: string;
  prominence: "lead" | "compact";
}

/** 首屏项目卡只保留决策所需信息，让项目本身成为首页第一视觉层级。 */
export function CoreProjectCard({
  work,
  index,
  prominence,
}: CoreProjectCardProps) {
  const moduleDefinition = modules.find((module) => module.type === work.type)!;

  return (
    <article
      className={`core-project-card core-project-card--${prominence}`}
      data-prominence={prominence}
    >
      <Link
        href={`/${work.type}/${work.slug}`}
        aria-label={`查看核心项目：${work.title}`}
      >
        <WorkVisual
          type={work.type}
          title={work.title}
          index={moduleDefinition.index}
        />
        <div className="core-project-card-copy">
          <p className="core-project-card-label">
            <span>PROJECT / {index}</span>
            <span>
              {moduleDefinition.name} / {moduleDefinition.chineseName}
            </span>
          </p>
          <div className="core-project-card-title">
            <h3>{work.title}</h3>
            <ArrowUpRight aria-hidden="true" />
          </div>
          <p className="core-project-card-summary">{work.summary}</p>
        </div>
      </Link>
    </article>
  );
}
