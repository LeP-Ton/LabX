import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { XMark } from "@/components/x-mark";
import { modules } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于 LabX",
  description: "了解 LabX 作为独立 AI 实验室的研究方向、项目方法与数据边界。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <header className="editorial-hero editorial-hero--statement">
        <XMark className="editorial-x-mark" />
        <p className="eyebrow">ABOUT LABX</p>
        <h1>
          独立 AI 实验室，研究并构建 AI
          在游戏、声音、叙事、视觉、影像与数字人格中的应用。
        </h1>
      </header>

      <div className="editorial-layout">
        <aside>
          <p>探索和重构一切</p>
        </aside>
        <article className="editorial-content">
          <h2>我们在做什么</h2>
          <p>
            我们使用 GitHub
            记录项目版本、作者、来源和关联，让实验能够被理解、复用并持续迭代。
          </p>
          <h2>应用领域</h2>
          <p>
            Game、Music、Book、Art、Movie 与 Life
            是实验室的六个应用领域。项目可以跨领域共享模型、数据、角色、叙事和资产，并在不同媒介中验证同一项研究。
          </p>
          <div className="about-modules">
            {modules.map((module) => (
              <div key={module.type}>
                <span>{module.index}</span>
                <strong>{module.name}</strong>
                <p>{module.chineseName}</p>
              </div>
            ))}
          </div>
          <h2>关于数字永生</h2>
          <p>
            Life
            领域探索人格、记忆与行为如何在虚拟世界中延续。这是一项长期愿景；真实人格数据的使用必须建立在明确授权、隐私保护、安全设计和伦理审查之上。
          </p>
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
