import { ComponentProps, JSX, createElement } from "react";
import { iconOptions, IconOptions } from "@/utils";

type IconButtonProps = {
  icon: IconOptions;
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
const IconButton = ({
  icon,
  disabled = false,
  className,
  onClick,
  ...props
}: IconButtonProps): JSX.Element => {
  return (
    <button
      type={"button"}
      className={`rounded-full border-0 p-1 hover:opacity-80 focus:opacity-80 disabled:cursor-not-allowed disabled:opacity-25 ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {createElement(iconOptions[icon])}
    </button>
  );
};

export default IconButton;
