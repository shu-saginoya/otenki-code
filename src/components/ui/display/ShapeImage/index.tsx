import Image, { ImageProps } from "next/image";
import { JSX } from "react";

import { cn } from "@/lib/cn";
import { roundedMap } from "@/styles";

type ShapeImageProps = {
  /** 代替テキスト（アクセシビリティのため必須） */
  alt: string;
  /** 画像の形状。デフォルトは円形（circle） */
  shape?: ImageShape;
  /** カスタムクラス名を追加 */
  className?: string;
} & Omit<ImageProps, "alt">; // alt を必須にするため除外

const variants = {
  circle: roundedMap["full"], // 円形
  square: roundedMap["none"], // 四角形
} as const;

type ImageShape = keyof typeof variants;

export const ShapeImage = ({
  alt,
  shape = "circle",
  className,
  ...props
}: ShapeImageProps): JSX.Element => {
  return (
    <Image {...props} alt={alt} className={cn(variants[shape], className)} />
  );
};
