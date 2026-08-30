import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

import { CoreProjectCard } from "@/components/core-project-card";
import { SiteFooter } from "@/components/site-footer";
import { WorkCard } from "@/components/work-card";
import { XMark } from "@/components/x-mark";
import { loadWorks } from "@/lib/content/repository";
import { modules } from "@/lib/site";

export default function HomePage() {
  const works = loadWorks();
  const featuredWorks = works.filter((work) => work.featured);
  const coreWorks = featuredWorks.slice(0, 3);
  const coreWorkIds = new Set(coreWorks.map((work) => work.id));
  const otherWorks = works.filter((work) => !coreWorkIds.has(work.id));

  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-brief">
          <div className="hero-kicker">
            <span>LABX / PROJECT INDEX</span>
            <span>00—06</span>
          </div>

          <div className="hero-copy">
            <p className="hero-status">
              <span aria-hidden="true" />
              BUILDING IN PUBLIC
            </p>
            <h1 id="hero-title">
              探索和重构
              <br />
              一切<span className="hero-dot">。</span>
            </h1>
            <p className="hero-intro">
              独立 AI 实验室，研究并构建 AI
              在游戏、声音、叙事、视觉、影像与数字人格中的应用。
            </p>
          </div>

          <nav className="hero-actions" aria-label="首页快捷入口">
            <a href="#projects">
              <span>全部项目</span>
              <span>
                {String(works.length).padStart(2, "0")}
                <ArrowDownRight aria-hidden="true" />
              </span>
            </a>
            <a href="#worlds">
              <span>领域索引</span>
              <span>
                06
                <ArrowDownRight aria-hidden="true" />
              </span>
            </a>
          </nav>
        </div>

        <div className="core-projects" aria-labelledby="core-projects-title">
          <div className="core-projects-heading">
            <div>
              <p>CORE PROJECTS / ACTIVE</p>
              <h2 id="core-projects-title">核心项目</h2>
            </div>
            <span>{String(coreWorks.length).padStart(2, "0")}</span>
          </div>

          <div className="core-project-grid">
            {coreWorks.map((work, index) => (
              <CoreProjectCard
                key={work.id}
                work={work}
                index={String(index + 1).padStart(2, "0")}
                prominence={index === 0 ? "lead" : "compact"}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="featured home-projects"
        id="projects"
        aria-labelledby="projects-title"
      >
        <div className="section-heading">
          <p>PROJECT DIRECTORY</p>
          <div>
            <h2 id="projects-title">其他项目</h2>
            <p className="section-intro">
              按最近更新时间排列，进入项目可查看内容、关联资产与行动入口。
            </p>
          </div>
        </div>
        <div className="work-grid home-project-grid">
          {otherWorks.map((work) => (
            <WorkCard work={work} key={work.id} />
          ))}
        </div>
      </section>

      <section className="worlds" id="worlds" aria-labelledby="worlds-title">
        <div className="section-heading">
          <p>APPLICATION FIELDS</p>
          <h2 id="worlds-title">领域索引</h2>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <Link
              className="module-card"
              href={`/${module.type}`}
              key={module.type}
            >
              <span className="module-index">{module.index}</span>
              <span className="module-symbol" aria-hidden="true">
                <XMark className="module-x-mark" />
              </span>
              <span className="module-name">{module.name}</span>
              <span className="module-chinese">{module.chineseName}</span>
              <span className="module-description">{module.description}</span>
              <ArrowDownRight className="module-arrow" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
