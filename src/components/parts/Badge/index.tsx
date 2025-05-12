import { JSX } from "react";

import { Text } from "@/components";
import { cn } from "@/lib/cn";
import { colorVariantMap, ColorVariant } from "@/styles";

import type { Color } from "@/types";

export type BadgeProps = {
  content?: string;
  variant?: ColorVariant;
  color?: Color;
};

/**
 * バッジ
 *
 * @param content バッジの内容
 * @param variant バッジのバリアント
 * @param color バッジの色
 * @returns
 */
export const Badge = ({
  content,
  variant = "paint",
  color = "primary",
}: BadgeProps): JSX.Element => {
  const baseStyle =
    "h-5 min-w-5 items-center justify-center rounded-full px-1 inline-flex";
  return (
    <div className={cn(baseStyle, colorVariantMap[variant](color))}>
      <Text className="text-xs">{content}</Text>
    </div>
  );
};
