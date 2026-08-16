/**
 * @file 気温と服装の設定のデフォルト値を管理するファイル
 */
import type { ClothingItem } from "@/types";

// デフォルトの服装データ
export const defaultClothingItems: Omit<ClothingItem, "id" | "userId">[] = [
  {
    name: "半袖シャツ",
    imageId: "",
    type: "default",
  },
  {
    name: "長袖シャツ",
    imageId: "",
    type: "default",
  },
  {
    name: "トレーナー",
    imageId: "",
    type: "default",
  },
  {
    name: "半ズボン",
    imageId: "",
    type: "default",
  },
  {
    name: "七分丈ズボン",
    imageId: "",
    type: "default",
  },
  {
    name: "長ズボン",
    imageId: "",
    type: "default",
  },
  {
    name: "厚手の長ズボン",
    imageId: "",
    type: "default",
  },
  {
    name: "帽子や日傘",
    imageId: "",
    type: "default",
  },
  {
    name: "カーディガン",
    imageId: "",
    type: "default",
  },
  {
    name: "ウインドブレーカー",
    imageId: "",
    type: "default",
  },
  {
    name: "ダウンジャケット",
    imageId: "",
    type: "default",
  },
];
