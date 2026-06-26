/**
 * @file 服装の画像を管理するためのファイル
 * @description
 * 服装の画像はアプリで固定でアイコンのように利用されるという前提でマップ形式でまとめている。
 * そのため、もし仕様が変更（ユーザーが自由に画像を登録できるなど）になった場合はこのファイルは不要となる。
 */
import type { ClothingImageMap } from "@/types";

export const clothingImages: ClothingImageMap = {
  cap: {
    path: "/images/clothing/cap.png",
    name: "キャップ",
  },
  cardigan: {
    path: "/images/clothing/cardigan.png",
    name: "カーディガン",
  },
  downCoat: {
    path: "/images/clothing/down-coat.png",
    name: "ダウンコート",
  },
  dressShirtShort: {
    path: "/images/clothing/dress-shirt-short.png",
    name: "半袖ワイシャツ",
  },
  dressShirt: {
    path: "/images/clothing/dress-shirt.png",
    name: "ワイシャツ",
  },
  duffleCoat: {
    path: "/images/clothing/duffle-coat.png",
    name: "ダッフルコート",
  },
  furCoat: {
    path: "/images/clothing/fur-coat.png",
    name: "ファーコート",
  },
  hat: {
    path: "/images/clothing/hat.png",
    name: "帽子",
  },
  hoodie: {
    path: "/images/clothing/hoodie.png",
    name: "パーカー",
  },
  jacket: {
    path: "/images/clothing/jacket.png",
    name: "ジャケット",
  },
  overalls: {
    path: "/images/clothing/overalls.png",
    name: "オーバーオール",
  },
  pantsLong: {
    path: "/images/clothing/pants-long.png",
    name: "長ズボン",
  },
  pantsMiddle: {
    path: "/images/clothing/pants-middle.png",
    name: "ミドル丈パンツ",
  },
  pantsShort: {
    path: "/images/clothing/pants-short.png",
    name: "短パン",
  },
  peaCoat: {
    path: "/images/clothing/pea-coat.png",
    name: "ピーコート",
  },
  skirtLong: {
    path: "/images/clothing/skirt-long.png",
    name: "ロングスカート",
  },
  skirtMiddle: {
    path: "/images/clothing/skirt-middle.png",
    name: "ミドル丈スカート",
  },
  skirtShort: {
    path: "/images/clothing/skirt-short.png",
    name: "ミニスカート",
  },
  sweater: {
    path: "/images/clothing/sweater.png",
    name: "セーター",
  },
  tShirtLong: {
    path: "/images/clothing/T-shirt-long.png",
    name: "長袖Tシャツ",
  },
  tShirt: {
    path: "/images/clothing/T-shirt.png",
    name: "Tシャツ",
  },
  tanktop: {
    path: "/images/clothing/tanktop.png",
    name: "タンクトップ",
  },
  trenchCoat: {
    path: "/images/clothing/trench-coat.png",
    name: "トレンチコート",
  },
  turtleneck: {
    path: "/images/clothing/turtleneck.png",
    name: "タートルネック",
  },
  umbrella: {
    path: "/images/clothing/umbrella.png",
    name: "傘",
  },
  varsityJacket: {
    path: "/images/clothing/varsity-jacket.png",
    name: "スタジャン",
  },
  vest: {
    path: "/images/clothing/vest.png",
    name: "ベスト",
  },
  windbreaker: {
    path: "/images/clothing/windbreaker.png",
    name: "ウインドブレーカー",
  },
};
