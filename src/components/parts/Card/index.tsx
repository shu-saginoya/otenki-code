import { JSX, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { paddingMap, colorVariantMap, Padding, ColorVariant } from "@/styles";

import type { Color } from "@/types";

type CardProps = {
  children: ReactNode;
  color?: Color;
  variant?: ColorVariant;
  padding?: Padding;
  className?: string;
};

/**
 * コンテンツをグループ化するカードコンポーネント
 * @param children - カード内に表示するコンテンツ
 * @param color - カードの色
 * @param variant - カードのデザインの異型
 * @param padding - カード内のコンテンツのパディング
 * @param className - 追加のスタイリングのためのクラス名
 */
export const Card = ({
  children,
  className,
  color = "foreground",
  variant = "outlined",
  padding = 2,
}: CardProps): JSX.Element => {
  return (
    <div
      role="region"
      aria-label="Content section"
      className={cn([
        // 基本スタイル
        "box-border rounded-lg",
        // Padding
        paddingMap[padding],
        // デザインの異型
        colorVariantMap[variant](color),
        // カスタムクラス
        className,
      ])}
    >
      {children}
    </div>
  );
};
