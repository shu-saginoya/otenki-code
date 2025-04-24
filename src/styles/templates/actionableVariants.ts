import { cn } from "@/lib/cn";

const hoverBase = "cursor-pointer";
const focusBase = "focus-visible:ring";
const disabledBase = "disabled:cursor-not-allowed";

const disabledDark = "disabled:brightness-50";

export const actionableButton = cn(
  hoverBase,
  focusBase,
  disabledBase,
  disabledDark
);
