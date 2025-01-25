import React from "react";

export type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Paragraph component
 * 段落要素
 * @param children 子要素
 * @param className 追加のクラス名（任意）
 * @returns
 */
const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
  return <p className={className}>{children}</p>;
};

export default Paragraph;
