export const colorMap = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus:bg-primary-dark disabled:bg-primary-light",
  none: "bg-transparent text-foreground dark:text-background hover:bg-black/20 focus:bg-black/20 disabled:text-disabled disabled:hover:bg-transparent disabled:focus:bg-transparent",
};

export type Color = keyof typeof colorMap;
