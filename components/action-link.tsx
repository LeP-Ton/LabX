"use client";

import { track } from "@vercel/analytics/react";
import { ArrowUpRight } from "lucide-react";

import type { ActionKind } from "@/lib/content/schema";
import type { ContentType } from "@/lib/site";

interface ActionLinkProps {
  href: string;
  label: string;
  kind: ActionKind;
  workId: string;
  module: ContentType;
}

export function ActionLink({
  href,
  label,
  kind,
  workId,
  module,
}: ActionLinkProps) {
  function recordOutboundAction() {
    // 仅记录作品 ID、模块和行动类型，不上传标题、人格内容或用户标识。
    track("outbound_action_click", {
      workId,
      module,
      actionKind: kind,
    });
  }

  return (
    <a
      className="action-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordOutboundAction}
    >
      <span>{label}</span>
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}
