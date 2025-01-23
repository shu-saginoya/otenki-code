import { ReactNode } from "react";

export type FlexProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Flex コンポーネント
 * レイアウトの調整に利用するフレックスボックスコンテナ
 *
 * @param children 子要素
 * @param className 追加のクラス名（任意）
 * @returns
 */
const Flex = ({ children, className }: FlexProps) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export default Flex;
