import { ReactNode, ComponentProps, JSX, createElement } from "react";
import { iconMap, Icon } from "@/utils";
import {
  buttonBase,
  buttonColorMap,
  ButtonColor,
  fontSizeMap,
  FontSize,
} from "@/styles";
import { Stack } from "@/components";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  size?: FontSize;
  color?: ButtonColor;
  disabled?: boolean;
  block?: boolean;
  prependIcon?: Icon;
  appendIcon?: Icon;
  onClick?: () => void;
} & ComponentProps<"button">;

/**
 * Button Component
 * @param children 子要素
 * @param size ボタンのサイズ
 * @param color 色の選択
 * @param disabled 押せない状態(真偽値)
 * @param block ボタンをブロック要素にする(真偽値)
 * @param onClick 実行する関数
 * @returns
 */
export const Button = ({
  children,
  size = "base",
  color = "primary",
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
      className={clsx(
        buttonBase,
        fontSizeMap[size],
        buttonColorMap[color],
        "px-4 py-1",
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
