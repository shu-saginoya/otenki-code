import { cn } from "@/lib/cn";
import {
  bgColorMap,
  bgOpacityColorMap,
  bgHoverColorMap,
  bgHoverDarkColorMap,
  bgHoverOpacityColorMap,
  textColorMap,
} from "@/styles";

import type { Color } from "@/types";

// カラーバリデーションを返す型
type ColorVariantFn = (color: Color) => string;

/**
 * 背景を塗りつぶしたデザイン
 *
 * @param color - 色
 * @returns - 背景色、文字色、ボーダー色を組み合わせたクラス名
 */
export const colorVariantPaint: ColorVariantFn = (color: Color) => {
  return cn(bgColorMap[color], bgHoverDarkColorMap[color], "text-white");
};

/**
 * ボーダーのあるデザイン
 *
 * @param color - 色
 * @returns - 背景色、文字色、ボーダー色を組み合わせたクラス名
 */
export const colorVariantOutlined: ColorVariantFn = (color: Color) => {
  return cn(
    "bg-transparent",
    bgHoverColorMap[color],
    textColorMap[color],
    "hover:text-inherit",
    "border border-current hover:border-inherit"
  );
};

/**
 * 背景に文字色と同じ不透明度を下げた色を使用したデザイン
 *
 * @param color - 色
 * @returns - 背景色、文字色、ボーダー色を組み合わせたクラス名
 */
export const colorVariantTonal: ColorVariantFn = (color: Color) => {
  return cn(
    bgOpacityColorMap[color],
    textColorMap[color],
    bgHoverOpacityColorMap[color]
  );
};

export const colorVariantMap = {
  paint: colorVariantPaint,
  outlined: colorVariantOutlined,
  tonal: colorVariantTonal,
};

export type ColorVariant = keyof typeof colorVariantMap;
