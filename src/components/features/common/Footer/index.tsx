import { JSX } from "react";

import { Stack } from "@/components/ui";
import { cn } from "@/lib/cn";

export type FooterProps = {
  className: string;
};

/**
 * フッター
 */
export const Footer = ({ className }: FooterProps): JSX.Element => {
  return (
    <Stack
      as="footer"
      justify="center"
      className={cn(className, "bg-primary p-1")}
    >
      フッター
    </Stack>
  );
};
