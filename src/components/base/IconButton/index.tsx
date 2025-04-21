import { ComponentProps, JSX, createElement } from "react";
import { iconMap, Icon } from "@/utils";
import {
  variantConceptMap,
  VariantConcept,
  fontSizeMap,
  FontSize,
} from "@/styles";
import type { Color } from "@/types";
import { cn } from "@/lib/cn";

type IconButtonProps = {
  icon: Icon;
  size?: FontSize;
  variant?: VariantConcept;
  color?: Color;
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
  className,
  onClick,
  ...props
}: IconButtonProps): JSX.Element => {
  return (
    <button
      type={"button"}
      className={cn(
        variantConceptMap[variant](color),
        "p-1",
        fontSizeMap[size],
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
