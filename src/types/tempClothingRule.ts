/**
 * @file 気温帯と服装の紐づけルールの型定義
 * @description
 * 気温帯ごとのセット/解除を型として安全に扱うための定義を提供する。
 */

import type { ClothingItemId } from "./clothing";
import type { TempZoneId } from "./tempZone";

// 服装を算出する時間帯
export type ClothingTimeSlot = "daytime" | "morningEvening";

// 気温帯ごとの服装セット
export type TempZoneClothingRule = {
  tempZoneId: TempZoneId;
  timeSlot: ClothingTimeSlot;
  itemIds: ClothingItemId[];
};

// ユーザーごとの気温帯服装セット（デフォルト設定の上書き用）
export type UserTempZoneClothingRule = TempZoneClothingRule & {
  userId: string;
};

// 服装と気温帯の関連設定一式
export type TempClothingConfig = {
  defaultRules: TempZoneClothingRule[];
  userRules: UserTempZoneClothingRule[];
};
