export const paddingMap = {
  px: "p-px",
  1: "p-1",
  2: "p-2",
  3: "p-3",
  4: "p-4",
  6: "p-6",
  8: "p-6",
  12: "p-12",
  16: "p-16",
  20: "p-20",
  24: "p-24",
  28: "p-28",
  32: "p-32",
} as const;

export type Padding = keyof typeof paddingMap;

export const paddingXMap: Record<Padding, string> = {
  px: "px-px",
  1: "px-1",
  2: "px-2",
  3: "px-3",
  4: "px-4",
  6: "px-6",
  8: "px-6",
  12: "px-12",
  16: "px-16",
  20: "px-20",
  24: "px-24",
  28: "px-28",
  32: "px-32",
} as const;

export const paddingYMap = {
  px: "py-px",
  1: "py-1",
  2: "py-2",
  3: "py-3",
  4: "py-4",
  6: "py-6",
  8: "py-6",
  12: "py-12",
  16: "py-16",
  20: "py-20",
  24: "py-24",
  28: "py-28",
  32: "py-32",
} as const;
