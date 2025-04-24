export const ringMap = {
  1: "ring",
  2: "ring-2",
  4: "ring-4",
} as const;

export type Ring = keyof typeof ringMap;

export const opacityMap = {
  0: "opacity-0",
  25: "opacity-25",
  50: "opacity-50",
  75: "opacity-75",
  100: "opacity-100",
} as const;

export type Opacity = keyof typeof opacityMap;
