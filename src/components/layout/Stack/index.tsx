import { ReactNode, FC, JSX } from "react";
import {
  gapMap,
  Gap,
} from "@/utils";
import clsx from "clsx";

type ContainerProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  gap?: Gap;
};

/**
 * コンテナーコンポーネント
 * レイアウトを担当するコンポーネントです。子要素にはColコンポーネントを利用してください。
 *
 * @param gap - 子要素同士の間隔。
 * @returns
 */
export const Container: FC<ContainerProps> = ({
  gap,
  children,
  as: Component = "div",
}) => {
  return (
    <Component
      className={clsx("flex", gap !== undefined && gapMap[gap])}
    >
      {children}
    </Component>
  );
};
