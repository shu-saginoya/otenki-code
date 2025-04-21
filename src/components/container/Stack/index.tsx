import { ReactNode, JSX } from "react";
import {
  gapMap,
  Gap,
  flexDirectionMap,
  FlexDirection,
  justifyContentMap,
  JustifyContent,
  alignItemsMap,
  AlignItems,
} from "@/styles";
import { cn } from "@/lib/cn";

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
 * Flexコンポーネント
 * 要素を整列するレイアウトコンポーネントです
 *
 * @param gap - 子要素同士の間隔
 * @param direction - 縦並び・横並びの設定
 * @param justify - 行揃え
 * @param align - 縦方向の揃え
 * @param className - 追加のクラス
 * @returns
 */
export const Stack = ({
  gap,
  children,
  as: Component = "div",
  direction,
  justify,
  align,
  className,
}: StackProps): JSX.Element => {
  return (
    <Component
      className={cn(
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
