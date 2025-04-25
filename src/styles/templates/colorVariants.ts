import { cn } from "@/lib/cn";
import {
  actionableBtnBase,
  bgColorMap,
  bgOpacityColorMap,
  bgHoverColorMap,
  bgHoverDarkColorMap,
  bgHoverOpacityColorMap,
  textColorMap,
} from "@/styles";

import type { Color } from "@/types";

// オプション
type Options = {
  actionable?: boolean
}

// カラーバリデーションを返す型
type ColorVariantFn = (color: Color, options?: Options ) => string;

/**
 * 背景を塗りつぶしたデザイン
 *
 * @param color - 色
 * @param options - オプション
 * @returns - 背景色、文字色を組み合わせたクラス名
 */
export const colorVariantPaint: ColorVariantFn = (color: Color, options?: Options) => {
  const actionableStyles = options?.actionable ?? cn(actionableBtnBase, bgHoverDarkColorMap[color])
  return cn(bgColorMap[color], "text-white", actionableStyles);
};

/**
 * ボーダーのあるデザイン
 *
 * @param color - 色
 * @param options - オプション
 * @returns - 背景色、文字色、ボーダー色を組み合わせたクラス名
 */
export const colorVariantOutlined: ColorVariantFn = (color: Color, options?: Options) => {
  const actionableStyles = options?.actionable ?? cn(
    actionableBtnBase,
    bgHoverColorMap[color],
    "hover:text-inherit hover:border-inherit"
  )

  return cn(
    "bg-transparent",
    textColorMap[color],
    "border border-current",
    actionableStyles
  );
};

/**
 * 背景に文字色と同じ不透明度を下げた色を使用したデザイン
 *
 * @param color - 色
 * @param options - オプション
 * @returns - 背景色、文字色を組み合わせたクラス名
 */
export const colorVariantTonal: ColorVariantFn = (color: Color, options?: Options) => {
  const actionableStyles = options?.actionable ?? cn(
    actionableBtnBase,
    bgHoverOpacityColorMap[color]
  );

  return cn(
    bgOpacityColorMap[color],
    textColorMap[color],
    actionableStyles
  );
};

/**
 * 複数のデザインをまとめたオブジェクト
 *
 * @param color - 色
 * @param options - オプション
 * @returns - スタイルを組み合わせたクラス名
 */
export const colorVariantMap = {
  paint: colorVariantPaint,
  outlined: colorVariantOutlined,
  tonal: colorVariantTonal,
};

export type ColorVariant = keyof typeof colorVariantMap;
