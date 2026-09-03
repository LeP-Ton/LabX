import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { ActionLink } from "@/components/action-link";
import { SiteFooter } from "@/components/site-footer";
import { WorkCard, formatPublishedAt } from "@/components/work-card";
import { WorkVisual } from "@/components/work-visual";
import {
  getRelatedWorks,
  getWorkByRoute,
  loadWorks,
} from "@/lib/content/repository";
import {
  absoluteUrl,
  contentTypes,
  modules,
  siteConfig,
  type ContentType,
} from "@/lib/site";

interface WorkPageProps {
  params: Promise<{ module: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return loadWorks().map((work) => ({ module: work.type, slug: work.slug }));
}

function isContentType(value: string): value is ContentType {
  return contentTypes.includes(value as ContentType);
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { module, slug } = await params;
  if (!isContentType(module)) return { title: "作品不存在" };

  const work = getWorkByRoute(module, slug);
  if (!work) return { title: "作品不存在" };

  const url = absoluteUrl(`/${work.type}/${work.slug}/`);
  return {
    title: work.title,
    description: work.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${work.title} — ${siteConfig.name}`,
      description: work.summary,
      url,
      publishedTime: work.publishedAt,
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${work.title} — ${siteConfig.name}`,
      description: work.summary,
      images: [],
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { module, slug } = await params;
  if (!isContentType(module)) notFound();

  const work = getWorkByRoute(module, slug);
  if (!work) notFound();

  const definition = modules.find((item) => item.type === work.type)!;
  const relatedWorks = getRelatedWorks(work);

  return (
    <main id="main-content">
      <article className="work-detail">
        <Link className="back-link" href={`/${work.type}`}>
          <ArrowLeft aria-hidden="true" />
          返回 {definition.name}
        </Link>

        <header className="work-detail-header">
          <div className="work-detail-heading">
            <p className="eyebrow">
              {definition.name} / {definition.chineseName}
              {work.demo ? <span>演示内容</span> : null}
            </p>
            <h1>{work.title}</h1>
            <p className="work-lead">{work.summary}</p>
          </div>
          <WorkVisual
            type={work.type}
            title={work.title}
            index={definition.index}
          />
        </header>

        <div className="work-information">
          <dl>
            <div>
              <dt>发布日期</dt>
              <dd>
                <time dateTime={work.publishedAt}>
                  {formatPublishedAt(work.publishedAt)}
                </time>
              </dd>
            </div>
            <div>
              <dt>创作者</dt>
              <dd>{work.creators.join("、")}</dd>
            </div>
            <div>
              <dt>标签</dt>
              <dd>{work.tags.join("、")}</dd>
            </div>
          </dl>
          <div className="work-actions">
            {work.actions.map((action) => (
              <ActionLink
                href={action.url}
                label={action.label}
                kind={action.kind}
                workId={work.id}
                module={work.type}
                key={`${action.kind}-${action.url}`}
              />
            ))}
          </div>
        </div>

        <div className="mdx-content">
          <MDXRemote source={work.body} />
        </div>
      </article>

      {relatedWorks.length > 0 ? (
        <section className="related-works" aria-labelledby="related-title">
          <div className="list-heading">
            <h2 id="related-title">跨域关联</h2>
            <p>CONNECTED WORKS</p>
          </div>
          <div className="work-grid">
            {relatedWorks.map(({ relation, work: relatedWork }) => (
              <WorkCard
                work={relatedWork}
                relation={relation}
                key={relatedWork.id}
              />
            ))}
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </main>
  );
}
