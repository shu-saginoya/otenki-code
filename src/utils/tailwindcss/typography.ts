// 文字スタイル
export const textStyleMap = {
  title: "text-xl font-bold",
  subtitle: "text-lg font-bold",
  base: "text-base",
  caption: "text-sm",
} as const;

export type TextStyle = keyof typeof textStyleMap;
