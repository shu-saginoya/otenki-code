import { cva } from "class-variance-authority";

export const buttonBase = "rounded-full border-0 disabled:cursor-not-allowed";

export const buttonVariants = cva(buttonBase, {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
