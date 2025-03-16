import { ReactNode, ComponentProps, JSX } from "react";

export type ParagraphProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"p">;

/**
 * Paragraph component
 * 段落要素
 * @param children 子要素
 * @param className 追加のクラス名（任意）
 * @returns
 */
const Paragraph = ({
  children,
  className,
  ...props
}: ParagraphProps): JSX.Element => {
  return (
    <p {...props} className={className}>
      {children}
    </p>
  );
};

export default Paragraph;
