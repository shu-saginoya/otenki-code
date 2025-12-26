import { Color } from "@/types";

export const borderColorMap: Record<Color, string> = {
  primary: "border-primary",
  foreground: "border-foreground",
  background: "border-background",
  disabled: "border-disabled",
  link: "border-link",
  success: "border-success",
  error: "border-error",
  warning: "border-warning",
} as const;

export const roundedMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
} as const;

export type Rounded = keyof typeof roundedMap;
