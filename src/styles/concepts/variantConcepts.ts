import { cn } from "@/lib/cn";
import { bgColorMap, textColorMap, borderColorMap } from "@/styles";

import type { Color } from "@/types";

/**
 * 背景を塗りつぶしたデザイン
 *
 * @param color - 色
 */
export const variantPaintConcept = (color: Color) => {
  return cn(bgColorMap[color], "text-white");
};

/**
 * ボーダーのあるデザイン
 *
 * @param color - 色
 */
export const variantOutlinedConcept = (color: Color) => {
  return cn("bg-transparent", textColorMap[color], borderColorMap[color]);
};

/**
 * 背景に文字色と同じ不透明度を下げた色を使用したデザイン
 *
 * @param color - 色
 */
export const variantTonalConcept = (color: Color) => {
  return cn("bg-current/20", textColorMap[color]);
};

export const variantConceptMap = {
  paint: variantPaintConcept,
  outlined: variantOutlinedConcept,
  tonal: variantTonalConcept,
};

export type VariantConcept = keyof typeof variantConceptMap;
