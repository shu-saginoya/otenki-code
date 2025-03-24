import { ComponentProps, JSX, createElement } from "react";
import { iconMap, Icon } from "@/utils";
import {
  buttonBase,
  buttonColorMap,
  ButtonColor,
  fontSizeMap,
  FontSize,
} from "@/styles";
import clsx from "clsx";

type IconButtonProps = {
  icon: Icon;
  size?: FontSize;
  color?: ButtonColor;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
} & ComponentProps<"button">;

/**
 * IconButton Component
 * @param children 子要素
 * @param size ボタンのサイズ
 * @param color 色の選択
 * @param disabled 押せない状態(真偽値)
 * @param onClick 実行する関数
 * @returns
 */
export const IconButton = ({
  icon,
  size = "xl",
  color = "none",
  disabled = false,
  className,
  onClick,
  ...props
}: IconButtonProps): JSX.Element => {
  return (
    <button
      type={"button"}
      className={clsx(
        buttonBase,
        "p-1",
        fontSizeMap[size],
        buttonColorMap[color],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {createElement(iconMap[icon])}
    </button>
  );
};
