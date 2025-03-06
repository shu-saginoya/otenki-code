import { FC } from "react";
import clsx from "clsx";

export type HeaderProps = {
  className: string;
};

/**
 * ヘッダー
 */
const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header className={clsx(className, "bg-primary p-1")}>ヘッダー</header>
  );
};

export default Header;
