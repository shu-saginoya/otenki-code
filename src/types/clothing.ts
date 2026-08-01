/**
 * @file 服装についての型定義
 */
import { ClothingImageId } from "./clothingImage";

// 服装のID
export type ClothingItemId = string;

// 服装アイテムの型（デフォルト）
export type ClothingItemDefault = {
  id: ClothingItemId;
  name: string;
  imageId: ClothingImageId;
  type: "default";
};

// 服装アイテムの型（カスタム）
export type ClothingItemCustom = {
  id: ClothingItemId;
  name: string;
  imageId: ClothingImageId;
  type: "custom";
  userId: string;
};

// 服装アイテムの型
export type ClothingItem = ClothingItemDefault | ClothingItemCustom;
