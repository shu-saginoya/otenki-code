export type Color = "none" | "primary";

export const baseColorMap: Record<Color, string> = {
  none: "bg-transparent text-foreground dark:text-background",
  primary: "bg-primary text-white",
} as const;

export const focusColorMap: Record<Color, string> = {
  none: "hover:bg-black/20 focus:bg-black/20 ",
  primary: "hover:bg-primary-dark focus:bg-primary-dark ",
} as const;

export const disabledColorMap: Record<Color, string> = {
  none: "disabled:text-disabled disabled:hover:bg-transparent disabled:focus:bg-transparent",
  primary: "disabled:bg-primary-light disabled:hover:bg-primary-light disabled:focus:bg-primary-light",
} as const;
