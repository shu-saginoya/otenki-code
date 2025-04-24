import { Color } from "@/types";

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

export const fontFamilyMap = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
} as const;

export type FontFamily = keyof typeof fontFamilyMap;

export const fontSizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
} as const;

export type FontSize = keyof typeof fontSizeMap;

export const fontWeightMap = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
} as const;

export type FontWeight = keyof typeof fontWeightMap;

export const letterSpacingMap = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest",
} as const;

export type LetterSpacing = keyof typeof letterSpacingMap;
