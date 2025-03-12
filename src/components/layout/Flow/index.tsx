import { ReactNode, FC, JSX } from "react";
import {
  gapMap,
  Gap,
  flexDirectionMap,
  justifyContentMap,
  JustifyContent,
  alignItemsMap,
  AlignItems,
} from "@/utils";
import clsx from "clsx";

type FlowProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  gap?: Gap;
  reverse?: boolean;
  justify?: JustifyContent;
  align?: AlignItems;
};

/**
 * Flowコンポーネント
 * 要素を横並びに整列するレイアウトコンポーネントです。
 *
 * @param gap - 子要素同士の間隔。
 * @param reverse - 並び順を逆にする。真偽値
 * @param justify - 行揃え
 * @param align - 縦方向の揃え
 * @returns
 */
const Flow: FC<FlowProps> = ({
  gap,
  children,
  as: Component = "div",
  reverse,
  justify,
  align,
}) => {
  return (
    <Component
      className={clsx(
        "flex",
        gap !== undefined && gapMap[gap],
        reverse !== undefined &&
          flexDirectionMap[reverse ? "rowReverse" : "row"],
        justify !== undefined && justifyContentMap[justify],
        align !== undefined && alignItemsMap[align]
      )}
    >
      {children}
    </Component>
  );
};

export default Flow;
