import { ReactNode, ComponentProps } from "react";

export type GridProps = {
  children: ReactNode;
  inline?: boolean;
  className?: string;
} & ComponentProps<"div">;

/**
 * Grid コンポーネント
 * レイアウトの調整に利用するフレックスボックスコンテナ
 *
 * @param children 子要素
 * @param inline インライン要素(真偽値)
 * @param className 追加のクラス名（任意）
 * @returns
 */
const Grid = ({ children, inline = false, className, ...props }: GridProps) => {
  const display = inline ? "inline-grid" : "grid";
  return (
    <div {...props} className={`${display} ${className}`}>
      {children}
    </div>
  );
};

export default Grid;
