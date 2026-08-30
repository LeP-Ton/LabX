import { XMark } from "@/components/x-mark";
import type { ContentType } from "@/lib/site";

interface WorkVisualProps {
  type: ContentType;
  title: string;
  index?: string;
}

/** 使用界面排版生成模块封面，避免在仓库中复制大型媒体资产。 */
export function WorkVisual({ type, title, index = "X" }: WorkVisualProps) {
  return (
    <div className={`work-visual work-visual--${type}`} aria-hidden="true">
      <span className="work-visual-grid" />
      <XMark className="work-visual-mark" />
      <span className="work-visual-index">{index}</span>
      <span className="work-visual-title">{title}</span>
      <span className="work-visual-type">{type.toUpperCase()}</span>
    </div>
  );
}
