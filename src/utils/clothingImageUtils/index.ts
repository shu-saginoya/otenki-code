// filepath: src/utils/clothingImageUtils.ts
import { clothingImages } from "@/data/clothingImages";

import type { ClothingImageId, ClothingCategory } from "@/types";

// 画像IDから画像パスを取得
export const getClothingImagePath = (imageId: ClothingImageId): string => {
  return clothingImages[imageId]?.path || "/images/clothing/default.png";
};

// カテゴリに対応する全画像を取得
export const getClothingImagesByCategory = (category: ClothingCategory) => {
  return Object.entries(clothingImages)
    .filter(([, image]) => image.category === category)
    .map(([id, image]) => ({
      id,
      ...image,
    }));
};
