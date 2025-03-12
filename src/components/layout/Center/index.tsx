import { ReactNode, FC, JSX } from "react";
import { justifyContentMap, alignItemsMap } from "@/utils";
import clsx from "clsx";

type CenterProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
};

const Center: FC<CenterProps> = ({ children, as: Component = "div" }) => {
  return (
    <Component
      className={clsx(
        "flex h-full w-full",
        alignItemsMap["center"],
        justifyContentMap["center"]
      )}
    >
      {children}
    </Component>
  );
};

export default Center;
