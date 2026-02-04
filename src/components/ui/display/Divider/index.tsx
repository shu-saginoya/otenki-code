import { JSX } from "react";

import { cn } from "@/lib/cn";

export type DividerProps = {
  text: string;
  className?: string;
};

/**
 * Divider component
 * 区切り線コンポーネント
 * @param text 線の上に表示するテキスト
 * @param className 追加のクラス名（任意）
 * @returns
 */
export const Divider = ({ text, className }: DividerProps): JSX.Element => {
  return (
    <div
      role="separator"
      aria-label={text}
      className={cn("flex items-center gap-4", className)}
    >
      <div className="h-px flex-1 bg-foreground" aria-hidden="true" />
      <span className="text-sm text-foreground">{text}</span>
      <div className="h-px flex-1 bg-foreground" aria-hidden="true" />
    </div>
  );
};
