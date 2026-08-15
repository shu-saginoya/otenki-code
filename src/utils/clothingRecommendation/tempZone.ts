/**
 * @file 気温帯判定ユーティリティー
 * @description
 * 気温値から気温帯IDを判定する純粋関数を提供する。
 */

import { TEMP_ZONES } from "@/constants/tempZone";

import type { TempZoneId } from "@/types";

/**
 * 単一の気温値から対応する気温帯IDを返す。
 *
 * @param temp - 判定対象の気温（摂氏）
 * @returns 対応する気温帯ID
 */
export const getTempZoneId = (temp: number): TempZoneId => {
  if (!Number.isFinite(temp)) {
    throw new Error(`Invalid temperature: ${temp}`);
  }

  const zone = TEMP_ZONES.find((zone) => {
    const minTemp = zone.minTemp ?? -Infinity;
    const maxTemp = zone.maxTemp ?? Infinity;
    return temp >= minTemp && temp <= maxTemp;
  });

  if (!zone) {
    throw new Error(`No TempZone found for temperature: ${temp}`);
  }

  return zone.id;
};

/**
 * 日中用の気温帯IDを最高気温から算出する。
 *
 * @param maxTemp - 最高気温（摂氏）
 * @returns 日中の気温帯ID
 */
export const resolveDaytimeTempZoneId = (maxTemp: number): TempZoneId => {
  return getTempZoneId(maxTemp);
};

/**
 * 朝夕用の気温帯IDを最高/最低気温から算出する。
 *
 * @param maxTemp - 最高気温（摂氏）
 * @param minTemp - 最低気温（摂氏）
 * @returns 朝夕の気温帯ID
 */
export const resolveMorningEveningTempZoneId = (
  maxTemp: number,
  minTemp: number
): TempZoneId => {
  const referenceTemp = Math.min(maxTemp, minTemp);
  return getTempZoneId(referenceTemp);
};
