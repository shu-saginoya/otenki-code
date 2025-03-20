import { ReactNode, JSX } from "react";
import {
  gapMap,
  Gap,
  gridColMap,
  mdGridColMap,
  lgGridColMap,
  xlGridColMap,
  GridCol,
  justifySelfMap,
  JustifySelf,
  alignItemsMap,
  AlignItems,
} from "@/utils";
import clsx from "clsx";

type ContainerProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  gap?: Gap;
  align?: AlignItems;
  className?: string;
};

/**
 * Containerコンポーネント
 * レイアウトを担当するコンポーネントです。子要素にはColコンポーネントを利用してください。
 *
 * @param as - タグの指定
 * @param gap - 子要素同士の間隔
 * @param className - 追加のクラス
 * @returns
 */
export const Container = ({
  children,
  gap,
  align,
  className,
  as: Component = "div",
}: ContainerProps): JSX.Element => {
  return (
    <Component
      className={clsx(
        "grid grid-cols-12",
        gap !== undefined && gapMap[gap],
        align !== undefined && alignItemsMap[align],
        className
      )}
    >
      {children}
    </Component>
  );
};

type ColProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  // 基本の横幅（1～12の整数。12なら100%、6なら50%）
  cols?: GridCol;
  // レスポンシブ対応：sm, md, lg, xl それぞれでのカラム数を指定
  md?: GridCol;
  lg?: GridCol;
  xl?: GridCol;
  justify?: JustifySelf;
};

/**
 * Colコンポーネント
 * Containerコンポーネントの子要素
 *
 * @param cols - 基本の横幅(カラム数1～12)
 * @param md - レスポンシブ時の横幅(カラム数1～12)
 * @param lg - レスポンシブ時の横幅(カラム数1～12)
 * @param xl - レスポンシブ時の横幅(カラム数1～12)
 * @param as - タグの種類を指定(デフォルトはdiv)
 * @param justify - 行揃え
 * @returns
 */
export const Col = ({
  cols,
  md,
  lg,
  xl,
  children,
  justify,
  as: Component = "div",
}: ColProps): JSX.Element => {
  return (
    <Component
      className={clsx(
        cols !== undefined && gridColMap[cols],
        md !== undefined && mdGridColMap[md],
        lg !== undefined && lgGridColMap[lg],
        xl !== undefined && xlGridColMap[xl],
        justify !== undefined && justifySelfMap[justify]
      )}
    >
      {children}
    </Component>
  );
};
