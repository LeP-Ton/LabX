import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type XMarkProps = HTMLAttributes<HTMLSpanElement>;

/** 使用用户提供的透明 X 图标作为主题自适应遮罩。 */
export function XMark({ className, ...props }: XMarkProps) {
  return (
    <span aria-hidden="true" className={cn("x-mark", className)} {...props} />
  );
}
