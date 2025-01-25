import { ReactNode, ComponentProps } from "react";

export type TextProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"span">;

/**
 * Text component
 * インライン要素のテキストを扱うコンポーネント
 * @param children 子要素
 * @param className 追加のクラス名（任意）
 * @returns
 */
const Text: React.FC<TextProps> = ({ children, className, ...props }) => {
  return (
    <span {...props} className={className}>
      {children}
    </span>
  );
};

export default Text;
