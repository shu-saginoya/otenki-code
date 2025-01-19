import { ReactNode } from "react";
import { gaps, Gap } from "@/utils/useClassName";

export type FlexProps = {
  children: ReactNode;
  direction?: "row" | "rowReverse" | "col" | "colReverse";
  wrap?: "wrap" | "wrapReverse" | "nowrap";
  gap?: Gap;
};

const directions = {
  row: "flex-row",
  rowReverse: "flex-row-reverse",
  col: "flex-col",
  colReverse: "flex-col-reverse",
};

const wraps = {
  wrap: "flex-wrap",
  wrapReverse: "flex-wrap-reverse",
  nowrap: "flex-nowrap",
};

/**
 * Flex コンポーネント
 * レイアウトの調整に利用するコンテナーコンポーネント
 */
const Flex = ({
  children,
  direction = "row",
  wrap = "nowrap",
  gap = "none",
}: FlexProps) => {
  const style = `${directions[direction]} ${wraps[wrap]} ${gaps[gap]}`;

  return <div className={`flex ${style}`}>{children}</div>;
};

export default Flex;
