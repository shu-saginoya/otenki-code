/**
 * @file 服装提案ユーティリティーの公開エントリーポイント
 */

export type {
  EffectiveRuleKey,
  EffectiveRuleMap,
  RecommendationSlot,
  ClothingRecommendation,
  BuildClothingRecommendationInput,
  RuleCoverageMissingKey,
  RuleCoverageValidationResult,
} from "./types";

export {
  getTempZoneId,
  resolveDaytimeTempZoneId,
  resolveMorningEveningTempZoneId,
} from "./tempZone";

export {
  buildRuleKey,
  buildEffectiveRuleMap,
  findRule,
  getRuleItemIds,
} from "./ruleResolver";

export {
  buildClothingItemMap,
  resolveClothingItemsByIds,
  mergeDefaultAndCustomItems,
} from "./itemResolver";

export { buildClothingRecommendation } from "./recommendationBuilder";

export {
  sanitizeTemperature,
  normalizeItemIds,
  validateRuleCoverage,
} from "./normalize";
