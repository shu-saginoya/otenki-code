import { FC } from "react";
import clsx from "clsx";
import Text from "@/components/atoms/Text";

export type BadgeProps = {
  /**
   * バッジのテキスト
   */
  content: string;
  /**
   * ユーティリティクラス
   */
  className?: string;
};

/**
 * バッジ
 */
const Badge: FC<BadgeProps> = ({ content, className }) => {
  const baseStyle =
    "h-5 min-w-5 items-center justify-center rounded-full px-1 inline-flex";
  return (
    <div className={clsx(baseStyle, className)}>
      <Text className="text-xs text-white">{content}</Text>
    </div>
  );
};

export default Badge;
