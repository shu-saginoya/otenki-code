import { ReactNode } from "react";

export type GridProps = {
  children: ReactNode;
  inline?: boolean;
  className?: string;
};

/**
 * Grid コンポーネント
 * レイアウトの調整に利用するフレックスボックスコンテナ
 *
 * @param children 子要素
 * @param inline インライン要素(真偽値)
 * @param className 追加のクラス名（任意）
 * @returns
 */
const Grid = ({ children, inline = false, className }: GridProps) => {
  const display = inline ? "inline-grid" : "grid";
  return <div className={`${display} ${className}`}>{children}</div>;
};

export default Grid;
