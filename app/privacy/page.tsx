import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { XMark } from "@/components/x-mark";

export const metadata: Metadata = {
  title: "隐私说明",
  description: "LabX 独立 AI 实验室网站的基础访问分析与隐私边界。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <header className="editorial-hero editorial-hero--compact">
        <XMark className="editorial-x-mark" />
        <p className="eyebrow">PRIVACY</p>
        <h1>只理解内容如何抵达，不追踪你是谁。</h1>
      </header>
      <article className="privacy-content">
        <h2>基础访问分析</h2>
        <p>本站使用匿名访问统计了解页面访问情况，用于改善内容结构和体验。</p>
        <h2>外链转化事件</h2>
        <p>
          当你点击作品的观看、收听、购买、试玩或关注入口时，本站只记录作品
          ID、所属应用领域和行动类型，不发送作品标题、人格内容或用户身份。
        </p>
        <h2>本地主题偏好</h2>
        <p>黑白主题选择仅保存在当前设备的浏览器中，不会上传到服务器。</p>
        <h2>Life 数据边界</h2>
        <p>
          当前 Life
          内容均为虚构演示，不收集或处理任何真实个人的人格、记忆、声音、肖像或行为数据。
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}
