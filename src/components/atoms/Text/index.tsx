import React from "react";

export type TextProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Text component
 * インライン要素のテキストを扱うコンポーネント
 * @param children 子要素
 * @param className 追加のクラス名（任意）
 * @returns
 */
const Text: React.FC<TextProps> = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

export default Text;
