/**
 * @file 天気と服装の相関の型定義
 * @description
 * 気温と服装の相関ルールを定義する型。気温は範囲を示すため境界値として`minTemp`をもつ。そのため、先頭要素は必ず`-Infinity`となるため、`minTemp`属性自体を持たせない設計である。
 */
import { ClothingCategory, ClothingItemId } from "./clothing";

// 気温と服装の相関ルールの型
export type TempClothingRule = {
  minTemp: number;
  clothingItemId: ClothingItemId;
};

// 先頭要素は必ず`-Infinity`となるため、`minTemp`属性自体を持たせない
export type TempClothingFirstRule = {
  clothingItemId: ClothingItemId;
};

// 先頭要素を必須にした相関ルール配列
export type TempClothingRuleList = [
  TempClothingFirstRule,
  ...TempClothingRule[],
];

// カテゴリごとの温度と服装の相関ルールの型
export type TempClothingRules = Record<ClothingCategory, TempClothingRuleList>;

// カテゴリごとの温度をもとにした服装の戻り値
export type TempClothingRecommendation = Record<
  ClothingCategory,
  ClothingItemId
>;
