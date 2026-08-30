import Link from "next/link";

import { XMark } from "@/components/x-mark";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <XMark className="not-found-x" />
      <p>404 / LOST COORDINATE</p>
      <h1>这段记忆尚未被保存。</h1>
      <Link href="/">返回 LabX</Link>
    </main>
  );
}
