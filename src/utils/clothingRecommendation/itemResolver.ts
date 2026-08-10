/**
 * @file 服装アイテム解決ユーティリティー
 * @description
 * 服装IDと服装実体の相互変換、およびデフォルト/カスタム統合を担う。
 */

import type {
  ClothingItem,
  ClothingItemCustom,
  ClothingItemDefault,
  ClothingItemId,
} from "@/types";

/**
 * 服装アイテム配列をID参照しやすいマップ形式に変換する。
 *
 * @param items - 服装アイテム一覧
 * @returns 服装IDをキーにしたアイテムマップ
 */
export const buildClothingItemMap = (
  items: ClothingItem[]
): Map<ClothingItemId, ClothingItem> => {
  return new Map(items.map((item) => [item.id, item]));
};

/**
 * 服装アイテムID一覧を実体アイテム一覧に解決する。
 *
 * @param itemMap - 服装IDをキーにしたアイテムマップ
 * @param itemIds - 解決対象の服装アイテムID一覧
 * @returns 解決済みの服装アイテム一覧
 */
export const resolveClothingItemsByIds = (
  itemMap: ReadonlyMap<ClothingItemId, ClothingItem>,
  itemIds: ClothingItemId[]
): ClothingItem[] => {
  return itemIds
    .map((itemId) => itemMap.get(itemId))
    .filter((item): item is ClothingItem => item !== undefined);
};

/**
 * デフォルト服装とカスタム服装を統合し、提案計算に使う単一配列を返す。
 *
 * @param defaultItems - デフォルト服装一覧
 * @param customItems - カスタム服装一覧
 * @returns 統合後の服装アイテム一覧
 */
export const mergeDefaultAndCustomItems = (
  defaultItems: ClothingItemDefault[],
  customItems: ClothingItemCustom[]
): ClothingItem[] => {
  const mergedMap = new Map<ClothingItemId, ClothingItem>();

  [...defaultItems, ...customItems].forEach((item) => {
    // IDが重複した場合は後勝ちで上書きする
    mergedMap.set(item.id, item);
  });

  return [...mergedMap.values()];
};
