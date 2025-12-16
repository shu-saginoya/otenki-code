import type { ClothingItem } from "@/types";

// デフォルトの服装データ
export const defaultClothingItems: Omit<ClothingItem, "id" | "userId">[] = [
  // トップス
  {
    name: "半袖シャツ",
    category: "tops",
    temperatureRange: { min: 24, max: Infinity },
    imageId: "",
    isDefault: true,
  },
  {
    name: "長袖シャツ",
    category: "tops",
    temperatureRange: { min: 12, max: 24 },
    imageId: "",
    isDefault: true,
  },
  {
    name: "トレーナー",
    category: "tops",
    temperatureRange: { min: -Infinity, max: 12 },
    imageId: "",
    isDefault: true,
  },

  // ボトムス
  {
    name: "半ズボン",
    category: "bottoms",
    temperatureRange: { min: 24, max: Infinity },
    imageId: "",
    isDefault: true,
  },
  {
    name: "七分丈ズボン",
    category: "bottoms",
    temperatureRange: { min: 16, max: 24 },
    imageId: "",
    isDefault: true,
  },
  {
    name: "長ズボン",
    category: "bottoms",
    temperatureRange: { min: 8, max: 16 },
    imageId: "",
    isDefault: true,
  },
  {
    name: "厚手の長ズボン",
    category: "bottoms",
    temperatureRange: { min: -Infinity, max: 8 },
    imageId: "",
    isDefault: true,
  },

  // アウター
  {
    name: "帽子や日傘",
    category: "outer",
    temperatureRange: { min: 24, max: Infinity },
    imageId: "",
    isDefault: true,
  },
  {
    name: "なし",
    category: "outer",
    temperatureRange: { min: 20, max: 24 },
    imageId: "",
    isDefault: true,
  },
  {
    name: "カーディガン",
    category: "outer",
    temperatureRange: { min: 12, max: 20 },
    imageId: "",
    isDefault: true,
  },
  {
    name: "ウインドブレーカー",
    category: "outer",
    temperatureRange: { min: 8, max: 12 },
    imageId: "",
    isDefault: true,
  },
  {
    name: "ダウンジャケット",
    category: "outer",
    temperatureRange: { min: -Infinity, max: 8 },
    imageId: "",
    isDefault: true,
  },
];
