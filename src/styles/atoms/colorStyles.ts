import { Color } from "@/types";

export const bgColorMap: Record<Color, string> = {
  primary: "bg-primary",
  foreground: "bg-foreground dark:bg-background",
  background: "bg-background dark:bg-foreground",
  disabled: "bg-disabled",
  link: "bg-link",
  success: "bg-success",
  error: "bg-error",
  warning: "bg-warning",
} as const;

export const textColorMap: Record<Color, string> = {
  primary: "text-primary",
  foreground: "text-foreground dark:text-background",
  background: "text-background dark:text-foreground",
  disabled: "text-disabled",
  link: "text-link",
  success: "text-success",
  error: "text-error",
  warning: "text-warning",
} as const;

export const borderColorMap: Record<Color, string> = {
  primary: "border-primary",
  foreground: "border-foreground dark:border-background",
  background: "border-background dark:border-foreground",
  disabled: "border-disabled",
  link: "border-link",
  success: "border-success",
  error: "border-error",
  warning: "border-warning",
} as const;
