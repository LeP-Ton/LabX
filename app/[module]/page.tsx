import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { WorkCard } from "@/components/work-card";
import { XMark } from "@/components/x-mark";
import { getWorksByType } from "@/lib/content/repository";
import {
  absoluteUrl,
  contentTypes,
  modules,
  siteConfig,
  socialPreviewImage,
  type ContentType,
} from "@/lib/site";

interface ModulePageProps {
  params: Promise<{ module: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return contentTypes.map((module) => ({ module }));
}

function getModuleDefinition(value: string) {
  return modules.find((module) => module.type === value);
}

export async function generateMetadata({
  params,
}: ModulePageProps): Promise<Metadata> {
  const { module } = await params;
  const definition = getModuleDefinition(module);
  if (!definition) return { title: "应用领域不存在" };

  const title = `${definition.name} / ${definition.chineseName}`;
  return {
    title,
    description: definition.description,
    alternates: { canonical: absoluteUrl(`/${definition.type}/`) },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description: definition.description,
      url: absoluteUrl(`/${definition.type}/`),
      images: [socialPreviewImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteConfig.name}`,
      description: definition.description,
      images: [socialPreviewImage.url],
    },
  };
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module } = await params;
  const definition = getModuleDefinition(module);
  if (!definition) notFound();

  const works = getWorksByType(definition.type as ContentType);

  return (
    <main id="main-content">
      <header className="module-hero">
        <div className="module-hero-symbol" aria-hidden="true">
          <span className="module-hero-index">{definition.index}</span>
          <XMark className="module-hero-x" />
        </div>
        <div>
          <p className="eyebrow">LABX APPLICATION FIELD</p>
          <h1>{definition.name}</h1>
          <div className="module-hero-meta">
            <p>{definition.chineseName}</p>
            <p>{definition.description}</p>
          </div>
        </div>
      </header>

      <section className="module-works" aria-labelledby="module-works-title">
        <div className="list-heading">
          <h2 id="module-works-title">领域项目</h2>
          <p>{works.length.toString().padStart(2, "0")} PROJECTS</p>
        </div>
        {works.length > 0 ? (
          <div className="work-grid">
            {works.map((work) => (
              <WorkCard work={work} key={work.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>新的项目正在形成。</p>
            <span>COMING SOON</span>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
