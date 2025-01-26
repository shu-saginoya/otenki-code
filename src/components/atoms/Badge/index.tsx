import { FC } from "react";
import clsx from "clsx";
import Flex from "@/components/layout/Flex";
import Text from "@/components/atoms/Text";

export type BadgeProps = {
  /**
   * バッジのテキスト
   */
  content: string;
  /**
   * ユーティリティクラス
   */
  className: string;
};

/**
 * バッジ
 */
const Badge: FC<BadgeProps> = ({ content, className }) => {
  const baseStyle = "h-5 min-w-5 items-center justify-center rounded-full px-1";
  return (
    <Flex inline className={clsx(baseStyle, className)}>
      <Text className="text-xs text-white">{content}</Text>
    </Flex>
  );
};

export default Badge;
