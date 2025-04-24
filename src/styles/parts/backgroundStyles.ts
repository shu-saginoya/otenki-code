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
