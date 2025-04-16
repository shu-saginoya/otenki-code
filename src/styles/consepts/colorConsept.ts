import { defaultColorMap, focusColorMap, disabledColorMap, Color} from "@/styles"
import { cn } from "@/lib/cn"

export const actionableConcept = (color: Color) => {
    return cn(defaultColorMap[color])
};

export const actionableConcept = (color: Color) => {
  return cn(focusColorMap[color], disabledColorMap[color])
};