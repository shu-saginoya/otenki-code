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

/**
 * 画像を円形・四角形で表示するコンポーネント
 *
 * @param alt 画像の代替テキスト（必須）
 * @param shape 画像の形状（circle または square）。デフォルトは circle。
 * @param className 追加のクラス名
 * @param その他画像に付与できる属性値全て
 */
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
