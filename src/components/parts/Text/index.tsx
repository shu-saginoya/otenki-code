import { ReactNode, JSX } from "react";
import { cn } from "@/lib/cn";
import {
  fontFamilyMap,
  FontFamily,
  fontSizeMap,
  FontSize,
  fontWeightMap,
  FontWeight,
  letterSpacingMap,
  LetterSpacing,
} from "@/styles";

export type TextProps = {
  children: ReactNode;
  as?: "span" | "p" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  family?: FontFamily;
  size?: FontSize;
  weight?: FontWeight;
  spacing?: LetterSpacing;
  className?: string;
};

/**
 * Text component
 * インライン要素のテキストを扱うコンポーネント
 * @param children 子要素
 * @param as - タグの指定(デフォルトspan)
 * @param family - フォントファミリー
 * @param size - フォントサイズ
 * @param weight - フォントウェイト
 * @param spacing - 文字間隔
 * @param className 追加のクラス名（任意）
 * @returns
 */
export const Text = ({
  children,
  as: Component = "span",
  family,
  size,
  weight,
  spacing,
  className,
}: TextProps): JSX.Element => {
  return (
    <Component
      className={cn(
        family !== undefined && fontFamilyMap[family],
        size !== undefined && fontSizeMap[size],
        weight !== undefined && fontWeightMap[weight],
        spacing !== undefined && letterSpacingMap[spacing],
        className
      )}
    >
      {children}
    </Component>
  );
};
