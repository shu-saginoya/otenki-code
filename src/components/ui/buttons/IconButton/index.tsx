import { ComponentProps, JSX, createElement } from "react";

import { cn } from "@/lib/cn";
import { iconMap, Icon } from "@/lib/reactIcons";
import {
  colorVariantMap,
  fontSizeMap,
  roundedMap,
  paddingMap,
  FontSize,
  ColorVariant,
} from "@/styles";

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
 * アイコンボタンコンポーネント
 *
 * @param icon アイコンの種類
 * @param size ボタンのサイズ
 * @param variant ボタンのバリアント
 * @param color 色の選択
 * @param disabled 押せない状態(真偽値)
 * @param onClick 実行する関数
 * @param rest button要素の標準属性
 * @returns
 */
export const IconButton = ({
  icon,
  size = "xl",
  variant = "paint",
  color = "primary",
  disabled = false,
  onClick,
  ...rest
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
      {...rest}
    >
      {createElement(iconMap[icon])}
    </button>
  );
};
