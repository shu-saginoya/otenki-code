/**
 * @file 服装提案組み立てユーティリティー
 * @description
 * 気温帯判定、ルール解決、アイテム解決を組み合わせて最終提案を返す。
 */

import {
  buildClothingItemMap,
  mergeDefaultAndCustomItems,
  resolveClothingItemsByIds,
} from "./itemResolver";
import { normalizeItemIds, sanitizeTemperature } from "./normalize";
import { getRuleItemIds, buildEffectiveRuleMap } from "./ruleResolver";
import {
  resolveDaytimeTempZoneId,
  resolveMorningEveningTempZoneId,
} from "./tempZone";

import type {
  BuildClothingRecommendationInput,
  ClothingRecommendation,
} from "./types";

/**
 * 気温、ルール、服装アイテムから日中・朝夕それぞれの提案結果を組み立てて返す。
 *
 * @param input - 提案生成に必要な入力一式
 * @returns 日中/朝夕の提案結果と算出メタ情報
 */
export const buildClothingRecommendation = (
  input: BuildClothingRecommendationInput
): ClothingRecommendation => {
  const {
    maxTemp,
    minTemp,
    defaultRules,
    userRules,
    defaultItems,
    customItems,
    userId,
  } = input;

  const normalizedMaxTemp = sanitizeTemperature(maxTemp);
  const normalizedMinTemp = sanitizeTemperature(minTemp);

  if (normalizedMaxTemp === null || normalizedMinTemp === null) {
    throw new Error("Invalid forecast temperatures");
  }

  const daytimeZoneId = resolveDaytimeTempZoneId(normalizedMaxTemp);
  const morningEveningZoneId = resolveMorningEveningTempZoneId(
    normalizedMaxTemp,
    normalizedMinTemp
  );

  const ruleMap = buildEffectiveRuleMap(defaultRules, userRules, userId);
  const allItems = mergeDefaultAndCustomItems(defaultItems, customItems);
  const itemMap = buildClothingItemMap(allItems);

  const daytimeItemIds = normalizeItemIds(
    getRuleItemIds(ruleMap, daytimeZoneId, "daytime")
  );
  const morningEveningItemIds = getRuleItemIds(
    ruleMap,
    morningEveningZoneId,
    "morningEvening"
  );
  const normalizedMorningEveningItemIds = normalizeItemIds(
    morningEveningItemIds
  );

  return {
    daytime: {
      timeSlot: "daytime",
      tempZoneId: daytimeZoneId,
      itemIds: daytimeItemIds,
      items: resolveClothingItemsByIds(itemMap, daytimeItemIds),
    },
    morningEvening: {
      timeSlot: "morningEvening",
      tempZoneId: morningEveningZoneId,
      itemIds: normalizedMorningEveningItemIds,
      items: resolveClothingItemsByIds(
        itemMap,
        normalizedMorningEveningItemIds
      ),
    },
    meta: {
      maxTemp: normalizedMaxTemp,
      minTemp: normalizedMinTemp,
    },
  };
};
