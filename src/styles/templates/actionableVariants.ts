import { cn } from "@/lib/cn";

const hoverBase = "cursor-pointer";
const focusBase = "focus-visible:ring";
const disabledBase = "disabled:cursor-not-allowed";

export const actionable = cn(hoverBase, focusBase, disabledBase);
