import { JSX, ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  padding?: Padding;
};

const variants = {
  default: "",
  elevated: "shadow-md",
  outlined: "border border-foreground-light dark:border-background-light",
};

type Variant = keyof typeof variants;

const paddings = {
  none: "p-0",
  small: "p-2",
  medium: "p-4",
  large: "p-6",
};

type Padding = keyof typeof paddings;

/**
 * コンテンツをグループ化するカードコンポーネント
 * @param children - カード内に表示するコンテンツ
 * @param className - 追加のスタイリングのためのクラス名
 */
export const Card = ({
  children,
  className,
  variant = "default",
  padding = "small",
}: CardProps): JSX.Element => {
  return (
    <div
      role="region"
      aria-label="Content section"
      className={cn([
        // 基本スタイル
        "box-border rounded-lg",
        // Padding
        paddings[padding],
        // 背景と境界
        "bg-background-light dark:bg-foreground-light",
        // デザインの異型
        variants[variant],
        // シャドウ効果
        "shadow-sm",
        // カスタムクラス
        className,
      ])}
    >
      {children}
    </div>
  );
};
