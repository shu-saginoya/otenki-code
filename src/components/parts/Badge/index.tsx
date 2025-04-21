import { JSX } from "react";

import { Text } from "@/components";
import { cn } from "@/lib/cn";

export type BadgeProps = {
  /**
   * バッジのテキスト
   */
  content: string;
  /**
   * ユーティリティクラス
   */
  className?: string;
};

/**
 * バッジ
 */
export const Badge = ({ content, className }: BadgeProps): JSX.Element => {
  const baseStyle =
    "h-5 min-w-5 items-center justify-center rounded-full px-1 inline-flex";
  return (
    <div className={cn(baseStyle, className)}>
      <Text className="text-xs text-white">{content}</Text>
    </div>
  );
};
