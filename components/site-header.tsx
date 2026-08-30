import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { XMark } from "@/components/x-mark";
import { modules, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="LabX 首页">
        <XMark className="wordmark-x" />
        <span className="wordmark-copy">
          <span className="wordmark-label">LABX</span>
          <span className="wordmark-slogan">{siteConfig.slogan}</span>
        </span>
      </Link>
      <nav aria-label="应用领域" className="module-nav-links">
        {modules.map((module) => (
          <Link href={`/#${module.type}`} key={module.type}>
            {module.name}
          </Link>
        ))}
      </nav>
      <div className="header-utilities">
        <Link href="/about">关于</Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
