// 文字スタイル
export const textOptions = {
  title: "text-xl font-bold",
  subtitle: "text-lg font-bold",
  base: "text-base",
  caption: "text-sm",
} as const;

export type TextOptions = keyof typeof textOptions;
