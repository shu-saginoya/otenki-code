import { ComponentProps, JSX, createElement } from "react";
import { iconMap, Icon } from "@/utils";

type IconButtonProps = {
  icon: Icon;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
} & ComponentProps<"button">;

/**
 * IconButton Component
 * @param children 子要素
 * @param disabled 押せない状態(真偽値)
 * @param onClick 実行する関数
 * @returns
 */
export const IconButton = ({
  icon,
  disabled = false,
  className,
  onClick,
  ...props
}: IconButtonProps): JSX.Element => {
  return (
    <button
      type={"button"}
      className={`rounded-full border-0 p-1 text-xl hover:opacity-50 hover:shadow-sm focus:opacity-50 focus:shadow-sm disabled:cursor-not-allowed disabled:opacity-25 ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {createElement(iconMap[icon])}
    </button>
  );
};
