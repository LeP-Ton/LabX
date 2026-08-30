import { ArrowDownRight } from "lucide-react";
import Link from "next/link";

import { HomeProjectCard } from "@/components/home-project-card";
import { SiteFooter } from "@/components/site-footer";
import { loadWorks } from "@/lib/content/repository";
import type { Work } from "@/lib/content/schema";
import { modules } from "@/lib/site";

const homepagePreviewLimit = 4;

export default function HomePage() {
  const works = loadWorks();
  const worksByType = new Map(
    modules.map((module) => [module.type, [] as Work[]]),
  );

  // loadWorks 已按发布日期倒序排列，分组时继续保留该稳定顺序。
  for (const work of works) {
    worksByType.get(work.type)!.push(work);
  }

  return (
    <main id="main-content">
      <h1 className="sr-only">LabX 独立 AI 实验室项目</h1>

      {modules.map((module) => {
        const moduleWorks = worksByType.get(module.type)!;
        const previewWorks = moduleWorks.slice(0, homepagePreviewLimit);
        const previewCount = previewWorks.length;

        return (
          <section
            className="home-field"
            id={module.type}
            aria-labelledby={`${module.type}-title`}
            key={module.type}
          >
            <div className="home-field-brief">
              <div className="home-field-kicker">
                <span>APPLICATION FIELD / {module.index}</span>
                <span>{module.name}</span>
              </div>

              <div className="home-field-copy">
                <p className="home-field-name">
                  <span aria-hidden="true" />
                  {module.name} / {module.chineseName}
                </p>
                <h2 id={`${module.type}-title`}>{module.description}</h2>
              </div>

              <Link
                className="home-field-action"
                href={`/${module.type}`}
                aria-label={`全部${module.chineseName}`}
              >
                <span>全部{module.chineseName}</span>
                <span>
                  {String(moduleWorks.length).padStart(2, "0")}
                  <ArrowDownRight aria-hidden="true" />
                </span>
              </Link>
            </div>

            <div
              className="home-field-projects"
              aria-label={`${module.chineseName}项目预览`}
            >
              <div className="home-field-projects-heading">
                <span>PROJECTS / LATEST</span>
                <span>{String(previewCount).padStart(2, "0")}</span>
              </div>

              {previewCount > 0 ? (
                <div
                  className={`home-project-grid home-project-grid--count-${previewCount}`}
                >
                  {previewWorks.map((work, index) => (
                    <HomeProjectCard
                      key={work.id}
                      work={work}
                      index={String(index + 1).padStart(2, "0")}
                      prominence={
                        previewCount === 3 && index > 0 ? "compact" : "lead"
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="home-field-empty">
                  <p>暂无公开项目。</p>
                </div>
              )}
            </div>
          </section>
        );
      })}

      <SiteFooter />
    </main>
  );
}
