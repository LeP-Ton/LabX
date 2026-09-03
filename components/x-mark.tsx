import type { CSSProperties, HTMLAttributes } from "react";

import { withBasePath } from "@/lib/site";
import { cn } from "@/lib/utils";

type XMarkProps = HTMLAttributes<HTMLSpanElement>;

/** 使用用户提供的透明 X 图标作为主题自适应遮罩。 */
export function XMark({ className, style, ...props }: XMarkProps) {
  const xIconUrl = withBasePath("/x-x-x20/outputs/x-icon-transparent.svg");

  return (
    <span
      aria-hidden="true"
      className={cn("x-mark", className)}
      style={
        {
          "--x-icon": `url("${xIconUrl}")`,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
