import type { ClothingItem } from "@/types/clothing";

// デフォルトの服装データ
export const defaultClothingItems: Omit<ClothingItem, "id" | "userId">[] = [
  // トップス
  {
    name: "半袖シャツ",
    category: "tops",
    temperatureRange: { min: 24, max: "none" },
    imageUrl: "/images/clothing/kids_kodomofuku_shirt_boy.png",
    isDefault: true,
  },
  {
    name: "長袖シャツ",
    category: "tops",
    temperatureRange: { min: 12, max: 24 },
    imageUrl: "/images/clothing/cloth_longt.png",
    isDefault: true,
  },
  {
    name: "トレーナー",
    category: "tops",
    temperatureRange: { min: "none", max: 12 },
    imageUrl: "/images/clothing/kodomofuku_boy.png",
    isDefault: true,
  },

  // ボトムス
  {
    name: "半ズボン",
    category: "bottoms",
    temperatureRange: { min: 24, max: "none" },
    imageUrl: "/images/clothing/shorts.png",
    isDefault: true,
  },
  {
    name: "七分丈ズボン",
    category: "bottoms",
    temperatureRange: { min: 16, max: 24 },
    imageUrl: "/images/clothing/shorts.png",
    isDefault: true,
  },
  {
    name: "長ズボン",
    category: "bottoms",
    temperatureRange: { min: 8, max: 16 },
    imageUrl: "/images/clothing/shorts.png",
    isDefault: true,
  },
  {
    name: "厚手の長ズボン",
    category: "bottoms",
    temperatureRange: { min: "none", max: 8 },
    imageUrl: "/images/clothing/shorts.png",
    isDefault: true,
  },

  // アウター
  {
    name: "帽子や日傘",
    category: "outer",
    temperatureRange: { min: 24, max: "none" },
    imageUrl: "/images/clothing/hiyake_goods.png",
    isDefault: true,
  },
  {
    name: "なし",
    category: "outer",
    temperatureRange: { min: 20, max: 24 },
    imageUrl: "/images/clothing/no-outer.png",
    isDefault: true,
  },
  {
    name: "カーディガン",
    category: "outer",
    temperatureRange: { min: 12, max: 20 },
    imageUrl: "/images/clothing/fashion_cardigan_set.png",
    isDefault: true,
  },
  {
    name: "ウインドブレーカー",
    category: "outer",
    temperatureRange: { min: 8, max: 12 },
    imageUrl: "/images/clothing/fashion_sutajan.png",
    isDefault: true,
  },
  {
    name: "ダウンジャケット",
    category: "outer",
    temperatureRange: { min: "none", max: 8 },
    imageUrl: "/images/clothing/fashion_down_jacket.png",
    isDefault: true,
  },
];
