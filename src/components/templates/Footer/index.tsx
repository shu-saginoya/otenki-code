import { JSX } from "react";
import clsx from "clsx";
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
      className={clsx(className, "bg-primary p-1")}
    >
      フッター
    </Stack>
  );
};
