export type Gap =
  | "none"
  | "half"
  | "1"
  | "2"
  | "4"
  | "8"
  | "16"
  | "24"
  | "32"
  | "48";

export const gaps: Record<Gap, string> = {
  none: "gap-0",
  half: "gap-0.5",
  1: "gap-1",
  2: "gap-2",
  4: "gap-4",
  8: "gap-8",
  16: "gap-16",
  24: "gap-24",
  32: "gap-32",
  48: "gap-48",
};
