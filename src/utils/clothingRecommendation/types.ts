/**
 * @file 服装提案ユーティリティーの補助型定義
 * @description
 * 気温帯判定、ルール解決、提案組み立てで利用する型を集約する。
 */

import type {
  ClothingItem,
  ClothingItemCustom,
  ClothingItemDefault,
  ClothingItemId,
  ClothingTimeSlot,
  TempZoneClothingRule,
  TempZoneId,
  UserTempZoneClothingRule,
} from "@/types";

export type EffectiveRuleKey = string;

export type EffectiveRuleMap = Map<EffectiveRuleKey, TempZoneClothingRule>;

export type RecommendationSlot = {
  timeSlot: ClothingTimeSlot;
  tempZoneId: TempZoneId;
  itemIds: ClothingItemId[];
  items: ClothingItem[];
};

export type ClothingRecommendation = {
  daytime: RecommendationSlot;
  morningEvening: RecommendationSlot;
  meta: {
    maxTemp: number;
    minTemp: number;
  };
};

export type BuildClothingRecommendationInput = {
  maxTemp: number;
  minTemp: number;
  defaultRules: TempZoneClothingRule[];
  userRules: UserTempZoneClothingRule[];
  defaultItems: ClothingItemDefault[];
  customItems: ClothingItemCustom[];
  userId?: string;
};

export type RuleCoverageMissingKey = {
  tempZoneId: TempZoneId;
  timeSlot: ClothingTimeSlot;
};

export type RuleCoverageValidationResult = {
  missingKeys: RuleCoverageMissingKey[];
};
