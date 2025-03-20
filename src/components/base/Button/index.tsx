import { ReactNode, ComponentProps, JSX, createElement } from "react";
import { iconMap, Icon } from "@/utils";
import { Stack } from "@/components";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  color?: Color;
  disabled?: boolean;
  block?: boolean;
  prependIcon?: Icon;
  appendIcon?: Icon;
  onClick?: () => void;
} & ComponentProps<"button">;

const colorOptions = {
  primary:
    "bg-primary text-white hover:bg-primary-dark disabled:bg-primary-light",
  none: "bg-transparent text-foreground dark:text-background hover:bg-black/20 disabled:text-disabled disabled:hover:bg-transparent",
};

type Color = keyof typeof colorOptions;

/**
 * Button Component
 * @param children 子要素
 * @param color 色の選択
 * @param disabled 押せない状態(真偽値)
 * @param block ボタンをブロック要素にする(真偽値)
 * @param onClick 実行する関数
 * @returns
 */
export const Button = ({
  children,
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
      className={clsx([
        "rounded-full  border-0 px-4 py-1 transition-colors disabled:cursor-not-allowed",
        colorOptions[color],
        block && "block w-full",
      ])}
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
