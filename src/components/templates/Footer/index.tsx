import { JSX } from "react";
import { cn } from "@/lib/cn";
import { Stack } from "@/components";

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
