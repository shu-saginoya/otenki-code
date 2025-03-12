import { ReactNode, FC, JSX } from "react";
import {
  gapMap,
  Gap,
  flexDirectionMap,
  justifyContentMap,
  JustifyContent,
} from "@/utils";
import clsx from "clsx";

type FlowProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  gap?: Gap;
  reverse?: boolean;
  align?: JustifyContent;
};

/**
 * Flowコンポーネント
 * 要素を横並びに整列するレイアウトコンポーネントです。
 *
 * @param gap - 子要素同士の間隔。
 * @param reverse - 並び順を逆にする。真偽値
 * @param align - 子要素の整列方法
 * @returns
 */
const Flow: FC<FlowProps> = ({
  gap,
  children,
  as: Component = "div",
  reverse,
  align,
}) => {
  return (
    <Component
      className={clsx(
        "flex",
        gap !== undefined && gapMap[gap],
        reverse !== undefined &&
          flexDirectionMap[reverse ? "rowReverse" : "row"],
        align !== undefined && justifyContentMap[align]
      )}
    >
      {children}
    </Component>
  );
};

export default Flow;
