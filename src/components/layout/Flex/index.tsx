import { ReactNode } from "react";

export type FlexProps = {
  children: ReactNode;
  inline?: boolean;
  className?: string;
};

/**
 * Flex コンポーネント
 * レイアウトの調整に利用するフレックスボックスコンテナ
 *
 * @param children 子要素
 * @param inline インライン要素(真偽値)
 * @param className 追加のクラス名（任意）
 * @returns
 */
const Flex = ({ children, inline = false, className }: FlexProps) => {
  const display = inline ? "inline-flex" : "flex";
  return <div className={`${display} ${className}`}>{children}</div>;
};

export default Flex;
