import Image, { ImageProps } from "next/image";
import { FC } from "react";
import clsx from "clsx";

type ShapeImageProps = {
  /** 代替テキスト（アクセシビリティのため必須） */
  alt: string;
  /** 画像の形状。デフォルトは円形（circle） */
  shape?: ImageShape;
  /** カスタムクラス名を追加 */
  className?: string;
} & Omit<ImageProps, "alt">; // alt を必須にするため除外

const variants = {
  circle: "rounded-full", // 円形
  square: "rounded-none", // 四角形
} as const;

type ImageShape = keyof typeof variants;

const ShapeImage: FC<ShapeImageProps> = ({
  alt,
  shape = "circle",
  className,
  ...props
}) => {
  return (
    <Image {...props} alt={alt} className={clsx(variants[shape], className)} />
  );
};

export default ShapeImage;
