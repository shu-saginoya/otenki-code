import { ReactNode, ComponentProps, JSX, createElement } from "react";

import { Stack } from "@/components";
import { cn } from "@/lib/cn";
import {
  colorVariantMap,
  fontSizeMap,
  roundedMap,
  paddingMap,
  actionableConcept,
  FontSize,
  ColorVariant,
} from "@/styles";
import { iconMap, Icon } from "@/utils";

import type { Color } from "@/types";

type ButtonProps = {
  children: ReactNode;
  variant?: ColorVariant;
  color?: Color;
  size?: FontSize;
  block?: boolean;
  disabled?: boolean;
  prependIcon?: Icon;
  appendIcon?: Icon;
  onClick?: () => void;
} & ComponentProps<"button">;

/**
 * Button Component
 * @param children 子要素
 * @param variant ボタンのバリアント
 * @param color 色の選択
 * @param size ボタンのサイズ
 * @param disabled 押せない状態(真偽値)
 * @param block ボタンをブロック要素にする(真偽値)
 * @param onClick 実行する関数
 * @returns
 */
export const Button = ({
  children,
  variant = "paint",
  color = "primary",
  size = "base",
  disabled = false,
  block = false,
  prependIcon,
  appendIcon,
  onClick,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      type={"button"}
      className={cn(
        colorVariantMap[variant](color),
        fontSizeMap[size],
        actionableConcept(),
        roundedMap["full"],
        paddingMap["1"],
        block && "block w-full"
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <Stack justify="between" align="center" gap={1}>
        {prependIcon && createElement(iconMap[prependIcon])}
        {children}
        {appendIcon && createElement(iconMap[appendIcon])}
      </Stack>
    </button>
  );
};
