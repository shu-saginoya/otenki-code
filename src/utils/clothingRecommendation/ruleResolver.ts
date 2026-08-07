/**
 * @file 気温帯ルール解決ユーティリティー
 * @description
 * デフォルトルールとユーザー上書きルールを合成し、検索可能な形に変換する。
 */

import type {
  ClothingItemId,
  ClothingTimeSlot,
  TempZoneClothingRule,
  TempZoneId,
  UserTempZoneClothingRule,
} from "@/types";
import { normalizeItemIds } from "./normalize";
import type { EffectiveRuleKey, EffectiveRuleMap } from "./types";

/**
 * 気温帯IDと時間帯からルール検索用キーを生成する。
 *
 * @param tempZoneId - 気温帯ID
 * @param timeSlot - 服装算出の時間帯
 * @returns ルール検索キー
 */
export const buildRuleKey = (
  tempZoneId: TempZoneId,
  timeSlot: ClothingTimeSlot
): EffectiveRuleKey => {
  return `${tempZoneId}:${timeSlot}`;
};

/**
 * デフォルトルールにユーザー上書きルールを適用し、最終的に使用するルールマップを構築する。
 *
 * @param defaultRules - 全ユーザー共通のデフォルトルール
 * @param userRules - ユーザーごとの上書きルール
 * @param userId - 対象ユーザーID（未指定時はデフォルトルールのみ使用）
 * @returns 最終ルールマップ
 */
export const buildEffectiveRuleMap = (
  defaultRules: TempZoneClothingRule[],
  userRules: UserTempZoneClothingRule[],
  userId?: string
): EffectiveRuleMap => {
  const map: EffectiveRuleMap = new Map();

  defaultRules.forEach((rule) => {
    map.set(buildRuleKey(rule.tempZoneId, rule.timeSlot), {
      ...rule,
      itemIds: normalizeItemIds(rule.itemIds),
    });
  });

  if (!userId) {
    return map;
  }

  userRules
    .filter((rule) => rule.userId === userId)
    .forEach((rule) => {
      map.set(buildRuleKey(rule.tempZoneId, rule.timeSlot), {
        tempZoneId: rule.tempZoneId,
        timeSlot: rule.timeSlot,
        itemIds: normalizeItemIds(rule.itemIds),
      });
    });

  return map;
};

/**
 * 気温帯IDと時間帯に一致するルールをマップから取得する。
 *
 * @param ruleMap - ルールマップ
 * @param tempZoneId - 気温帯ID
 * @param timeSlot - 服装算出の時間帯
 * @returns 一致したルール。未設定時は undefined
 */
export const findRule = (
  ruleMap: ReadonlyMap<EffectiveRuleKey, TempZoneClothingRule>,
  tempZoneId: TempZoneId,
  timeSlot: ClothingTimeSlot
): TempZoneClothingRule | undefined => {
  return ruleMap.get(buildRuleKey(tempZoneId, timeSlot));
};

/**
 * 気温帯IDと時間帯に対応する服装アイテムID一覧を取得する。
 *
 * @param ruleMap - ルールマップ
 * @param tempZoneId - 気温帯ID
 * @param timeSlot - 服装算出の時間帯
 * @returns 服装アイテムID一覧（未設定時は空配列）
 */
export const getRuleItemIds = (
  ruleMap: ReadonlyMap<EffectiveRuleKey, TempZoneClothingRule>,
  tempZoneId: TempZoneId,
  timeSlot: ClothingTimeSlot
): ClothingItemId[] => {
  const rule = findRule(ruleMap, tempZoneId, timeSlot);
  return rule ? [...rule.itemIds] : [];
};
