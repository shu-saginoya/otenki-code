/**
 * @file 服装提案の防御・整形ユーティリティー
 * @description
 * 入力値やID配列の正規化、ルール欠落検証を行う。
 */

import { TEMP_ZONES } from "@/constants/tempZone";
import type {
  ClothingItemId,
  ClothingTimeSlot,
  TempZoneClothingRule,
} from "@/types";
import type {
  RuleCoverageMissingKey,
  RuleCoverageValidationResult,
} from "./types";

/**
 * 気温入力を検証し、利用可能な数値に正規化する。
 *
 * @param value - 検証対象の入力値
 * @returns 利用可能な気温値。無効な場合は null
 */
export const sanitizeTemperature = (value: unknown): number | null => {
  if (
    typeof value !== "number" ||
    Number.isNaN(value) ||
    !Number.isFinite(value)
  ) {
    return null;
  }

  return value;
};

/**
 * 服装アイテムID一覧を重複除去・空値除去して正規化する。
 *
 * @param itemIds - 正規化対象の服装アイテムID一覧
 * @returns 正規化後の服装アイテムID一覧
 */
export const normalizeItemIds = (
  itemIds: ClothingItemId[]
): ClothingItemId[] => {
  const normalized = itemIds
    .map((id) => id.trim())
    .filter((id) => id.length > 0);

  return [...new Set(normalized)];
};

/**
 * ルールが全気温帯×全時間帯をカバーしているか検証し、欠落キーを返す。
 *
 * @param rules - 検証対象の気温帯服装ルール一覧
 * @returns カバレッジ検証結果（欠落キー一覧）
 */
export const validateRuleCoverage = (
  rules: TempZoneClothingRule[]
): RuleCoverageValidationResult => {
  const timeSlots: ClothingTimeSlot[] = ["daytime", "morningEvening"];
  const existing = new Set(
    rules.map((rule) => `${rule.tempZoneId}:${rule.timeSlot}`)
  );

  const missingKeys: RuleCoverageMissingKey[] = [];

  TEMP_ZONES.forEach((zone) => {
    timeSlots.forEach((timeSlot) => {
      const key = `${zone.id}:${timeSlot}`;
      if (!existing.has(key)) {
        missingKeys.push({ tempZoneId: zone.id, timeSlot });
      }
    });
  });

  return { missingKeys };
};
