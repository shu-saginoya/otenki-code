import { ReactNode, ComponentProps, FC } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
} & ComponentProps<"button">;

/**
 * Button Component
 * @param children 子要素
 * @param disabled 押せない状態(真偽値)
 * @param onClick 実行する関数
 * @returns
 */
const Button: FC<ButtonProps> = ({
  children,
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      type={"button"}
      className={
        "rounded-full border-0 bg-primary px-4 py-1 text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-primary-light"
      }
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
