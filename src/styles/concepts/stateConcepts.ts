import { cn } from "@/lib/cn";
import { stateHover, stateFocus, stateDisabled } from "@/styles";

export const actionableConcept = ({
  disabled = true,
}: {
  disabled?: boolean;
} = {}) => {
  return cn(stateHover, stateFocus, disabled && stateDisabled);
};
