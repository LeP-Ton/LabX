import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { WorkVisual } from "@/components/work-visual";
import type { Work } from "@/lib/content/schema";
import { modules } from "@/lib/site";

interface HomeProjectCardProps {
  work: Work;
  index: string;
  prominence: "lead" | "compact";
}

/** 首页领域项目卡只保留浏览项目所需信息，不再引入“核心项目”分类。 */
export function HomeProjectCard({
  work,
  index,
  prominence,
}: HomeProjectCardProps) {
  const moduleDefinition = modules.find((module) => module.type === work.type)!;

  return (
    <article
      className={`home-project-card home-project-card--${prominence}`}
      data-prominence={prominence}
    >
      <Link
        href={`/${work.type}/${work.slug}`}
        aria-label={`查看项目：${work.title}`}
      >
        <WorkVisual
          type={work.type}
          title={work.title}
          index={moduleDefinition.index}
        />
        <div className="home-project-card-copy">
          <p className="home-project-card-label">
            <span>PROJECT / {index}</span>
            <span>
              {moduleDefinition.name} / {moduleDefinition.chineseName}
            </span>
          </p>
          <div className="home-project-card-title">
            <h3>{work.title}</h3>
            <ArrowUpRight aria-hidden="true" />
          </div>
          <p className="home-project-card-summary">{work.summary}</p>
        </div>
      </Link>
    </article>
  );
}
