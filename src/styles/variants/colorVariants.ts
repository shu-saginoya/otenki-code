import { cn } from "@/lib/cn";
import { bgColorMap, textColorMap, borderColorMap } from "@/styles";

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
  return cn(bgColorMap[color], "text-white", borderColorMap[color]);
};

/**
 * ボーダーのあるデザイン
 *
 * @param color - 色
 * @returns - 背景色、文字色、ボーダー色を組み合わせたクラス名
 */
export const colorVariantOutlined: ColorVariantFn = (color: Color) => {
  return cn("bg-transparent", textColorMap[color], borderColorMap[color]);
};

/**
 * 背景に文字色と同じ不透明度を下げた色を使用したデザイン
 *
 * @param color - 色
 * @returns - 背景色、文字色、ボーダー色を組み合わせたクラス名
 */
export const colorVariantTonal: ColorVariantFn = (color: Color) => {
  return cn("bg-current/20", textColorMap[color], "border-current/20");
};

export const colorVariantMap = {
  paint: colorVariantPaint,
  outlined: colorVariantOutlined,
  tonal: colorVariantTonal,
};

export type ColorVariant = keyof typeof colorVariantMap;
