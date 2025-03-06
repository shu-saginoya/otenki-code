import { FC } from "react";
import clsx from "clsx";

export type FooterProps = {
  className: string;
};

/**
 * フッター
 */
const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer className={clsx(className, "bg-primary p-1")}>フッター</footer>
  );
};

export default Footer;
