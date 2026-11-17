import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * clsxとtailwind-mergeを組み合わせて、クラス名を結合する関数
 * @param inputs - クラス名の配列または文字列
 * @returns 結合されたクラス名の文字列
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};
