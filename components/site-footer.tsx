import Link from "next/link";

import { siteConfig } from "@/lib/site";

const mediaLinks = [
  { name: "Bilibili", href: "https://www.bilibili.com" },
  { name: "抖音", href: "https://www.douyin.com" },
  { name: "小红书", href: "https://www.xiaohongshu.com" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-copy">
        <p className="footer-wordmark-label">LABX</p>
        <p>{siteConfig.slogan}</p>
      </div>
      <nav aria-label="页脚导航" className="footer-nav">
        <Link href="/about">关于 LabX</Link>
        <Link href="/privacy">隐私说明</Link>
        {mediaLinks.map((media) => (
          <a
            href={media.href}
            key={media.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            {media.name}
          </a>
        ))}
      </nav>
      <p>© 2026 LabX</p>
    </footer>
  );
}
