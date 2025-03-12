export const gapMap = {
  0: "gap-0",
  0.5: "gap-0.5",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  8: "gap-8",
  12: "gap-12",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
  28: "gap-28",
  32: "gap-32",
} as const;

export type Gap = keyof typeof gapMap;

export type GridCol = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const gridColMap: Record<GridCol, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
} as const;

export const mdGridColMap: Record<GridCol, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
} as const;

export const lgGridColMap: Record<GridCol, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
} as const;

export const xlGridColMap: Record<GridCol, string> = {
  1: "xl:col-span-1",
  2: "xl:col-span-2",
  3: "xl:col-span-3",
  4: "xl:col-span-4",
  5: "xl:col-span-5",
  6: "xl:col-span-6",
  7: "xl:col-span-7",
  8: "xl:col-span-8",
  9: "xl:col-span-9",
  10: "xl:col-span-10",
  11: "xl:col-span-11",
  12: "xl:col-span-12",
} as const;

export const flexWrapMap = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  wrapReverse: "flex-wrap-reverse",
} as const;

export type FlexWrap = keyof typeof flexWrapMap;

export const flexDirectionMap = {
  row: "flex-row",
  rowReverse: "flex-row-reverse",
  col: "flex-col",
  colReverse: "flex-col-reverse",
} as const;

export type FlexDirection = keyof typeof flexDirectionMap;

export const justifyContentMap = {
  start: "justify-start",
  content: "justify-content",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
  stretch: "justify-stretch",
  baseline: "justify-baseline",
  normal: "justify-normal",
} as const;

export type JustifyContent = keyof typeof justifyContentMap;

export const alignItemsMap = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
} as const;

export type AlignItems = keyof typeof alignItemsMap;
