/**
 * @file 服装についての型定義
 */
import { ClothingImageId } from "./clothingImage";

// 服装のカテゴリ
export type ClothingCategory = "tops" | "bottoms" | "outer";

// 服装のID
export type ClothingItemId = string;

// 服装アイテムの型
export type ClothingItem = {
  id: ClothingItemId;
  name: string;
  category: ClothingCategory;
  imageId: ClothingImageId;
  isDefault: boolean; // デフォルトアイテムかどうかのフラグ
  userId?: string; // カスタムアイテムの場合のみ設定
};
