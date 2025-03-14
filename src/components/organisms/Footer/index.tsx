import { FC } from "react";
import clsx from "clsx";
import Stack from "@/components/layout/Stack";

export type FooterProps = {
  className: string;
};

/**
 * フッター
 */
const Footer: FC<FooterProps> = ({ className }) => {
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

export default Footer;
