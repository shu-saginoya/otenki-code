import { ReactNode } from "react";

export type GridProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Grid コンポーネント
 * レイアウトの調整に利用するフレックスボックスコンテナ
 *
 * @param children 子要素
 * @param className 追加のクラス名（任意）
 * @returns
 */
const Grid = ({ children, className }: GridProps) => {
  return <div className={`grid ${className}`}>{children}</div>;
};

export default Grid;
