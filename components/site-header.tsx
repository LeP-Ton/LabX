import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { XMark } from "@/components/x-mark";
import { modules } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="LabX 首页">
        <XMark className="wordmark-x" />
        <span className="wordmark-label">LABX</span>
      </Link>
      <nav aria-label="主导航" className="primary-nav">
        <div className="module-nav-links">
          {modules.map((module) => (
            <Link href={`/${module.type}`} key={module.type}>
              {module.name}
            </Link>
          ))}
        </div>
        <Link href="/about">关于</Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
