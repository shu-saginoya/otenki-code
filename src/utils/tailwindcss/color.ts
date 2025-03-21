export const colorMap = {
  primary:
    "bg-primary text-white hover:bg-primary-dark disabled:bg-primary-light",
  none: "bg-transparent text-foreground dark:text-background hover:bg-black/20 disabled:text-disabled disabled:hover:bg-transparent",
};

export type Color = keyof typeof colorMap;
