import { FC, ReactNode } from "react";
import clsx from "clsx";

export type MainProps = {
  children: ReactNode;
  className: string;
};

/**
 * メイン
 */
const Main: FC<MainProps> = ({ children, className }) => {
  return <main className={clsx(className, "p-1")}>{children}</main>;
};

export default Main;
