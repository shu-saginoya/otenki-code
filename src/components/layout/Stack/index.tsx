import { ReactNode, FC, JSX } from "react";
import {
  gapMap,
  Gap,
  flexDirectionMap,
  FlexDirection,
  justifyContentMap,
  JustifyContent,
  alignItemsMap,
  AlignItems,
} from "@/utils";
import clsx from "clsx";

type StackProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  gap?: Gap;
  direction?: FlexDirection;
  justify?: JustifyContent;
  align?: AlignItems;
};

/**
 * Stackコンポーネント
 * 要素を横並びに整列するレイアウトコンポーネントです
 *
 * @param gap - 子要素同士の間隔
 * @param direction - 縦並び・横並びの設定
 * @param justify - 行揃え
 * @param align - 縦方向の揃え
 * @param className - 追加のクラス
 * @returns
 */
const Stack: FC<StackProps> = ({
  gap,
  children,
  as: Component = "div",
  direction,
  justify,
  align,
  className,
}) => {
  return (
    <Component
      className={clsx(
        "flex",
        gap !== undefined && gapMap[gap],
        direction !== undefined && flexDirectionMap[direction],
        justify !== undefined && justifyContentMap[justify],
        align !== undefined && alignItemsMap[align],
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Stack;
