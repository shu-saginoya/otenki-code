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

export const bgOpacityColorMap: Record<Color, string> = {
  primary: "bg-primary/25",
  foreground: "bg-foreground/25 dark:bg-background/25",
  background: "bg-background/25 dark:bg-foreground/25",
  disabled: "bg-disabled/25",
  link: "bg-link/25",
  success: "bg-success/25",
  error: "bg-error/25",
  warning: "bg-warning/25",
} as const;

export const bgHoverOpacityColorMap: Record<Color, string> = {
  primary: "hover:bg-primary/50",
  foreground: "hover:bg-foreground/50 hover:dark:bg-background/50",
  background: "hover:bg-background/50 hover:dark:bg-foreground/50",
  disabled: "hover:bg-disabled/50",
  link: "hover:bg-link/50",
  success: "hover:bg-success/50",
  error: "hover:bg-error/50",
  warning: "hover:bg-warning/50",
} as const;

export const bgHoverColorMap: Record<Color, string> = {
  primary: "hover:bg-primary",
  foreground: "hover:bg-foreground hover:dark:bg-background",
  background: "hover:bg-background hover:dark:bg-foreground",
  disabled: "hover:bg-disabled",
  link: "hover:bg-link",
  success: "hover:bg-success",
  error: "hover:bg-error",
  warning: "hover:bg-warning",
} as const;

export const bgHoverDarkColorMap: Record<Color, string> = {
  primary: "hover:bg-primary-dark",
  foreground: "hover:bg-foreground-dark hover:dark:bg-background-dark",
  background: "hover:bg-background-dark hover:dark:bg-foreground-dark",
  disabled: "hover:bg-disabled-dark",
  link: "hover:bg-link-dark",
  success: "hover:bg-success-dark",
  error: "hover:bg-error-dark",
  warning: "hover:bg-warning-dark",
} as const;
