import { ReactNode, FC, JSX } from "react";
import {
  gapMap,
  Gap,
  colSpanMap,
  mdColSpanMap,
  lgColSpanMap,
  xlColSpanMap,
  ColsNumber,
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
      className={clsx("grid grid-cols-12", gap !== undefined && gapMap[gap])}
    >
      {children}
    </Component>
  );
};

type ColProps = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  // 基本の横幅（1～12の整数。12なら100%、6なら50%）
  cols?: ColsNumber;
  // レスポンシブ対応：sm, md, lg, xl それぞれでのカラム数を指定
  md?: ColsNumber;
  lg?: ColsNumber;
  xl?: ColsNumber;
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
 * @returns
 */
export const Col: FC<ColProps> = ({
  cols,
  md,
  lg,
  xl,
  children,
  as: Component = "div",
}) => {
  return (
    <Component
      className={clsx(
        cols !== undefined && colSpanMap[cols],
        md !== undefined && mdColSpanMap[md],
        lg !== undefined && lgColSpanMap[lg],
        xl !== undefined && xlColSpanMap[xl],
        "bg-slate-700"
      )}
    >
      {children}
    </Component>
  );
};
