import { ComponentProps, FC, createElement } from "react";
import { iconOptions, IconOptions } from "@/utils/useIcons";

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
const IconButton: FC<IconButtonProps> = ({
  icon,
  disabled = false,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      type={"button"}
      className={`rounded-full border-0 p-1 disabled:cursor-not-allowed disabled:opacity-25 ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {createElement(iconOptions[icon])}
    </button>
  );
};

export default IconButton;
