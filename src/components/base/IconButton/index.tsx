import { ComponentProps, JSX, createElement } from "react";

import { cn } from "@/lib/cn";
import {
  colorVariantMap,
  fontSizeMap,
  roundedMap,
  paddingMap,
  FontSize,
  ColorVariant,
} from "@/styles";
import { iconMap, Icon } from "@/utils";

import type { Color } from "@/types";

type IconButtonProps = {
  icon: Icon;
  variant?: ColorVariant;
  color?: Color;
  size?: FontSize;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
} & ComponentProps<"button">;

/**
 * IconButton Component
 * @param children 子要素
 * @param size ボタンのサイズ
 * @param variant ボタンのバリアント
 * @param color 色の選択
 * @param disabled 押せない状態(真偽値)
 * @param onClick 実行する関数
 * @returns
 */
export const IconButton = ({
  icon,
  size = "xl",
  variant = "paint",
  color = "primary",
  disabled = false,
  onClick,
  ...props
}: IconButtonProps): JSX.Element => {
  return (
    <button
      type={"button"}
      className={cn(
        colorVariantMap[variant](color, { actionable: true }),
        fontSizeMap[size],
        roundedMap["full"],
        paddingMap[1]
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {createElement(iconMap[icon])}
    </button>
  );
};
