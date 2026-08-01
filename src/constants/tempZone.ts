/**
 * @file 気温帯の定数設定ファイル
 */

import type { TempZone } from "@/types";

// 全気温帯の定義
export const TEMP_ZONES = [
  { id: "under4", minTemp: undefined, maxTemp: 4, label: "〜4℃" },
  { id: "5to9", minTemp: 5, maxTemp: 9, label: "5〜9℃" },
  { id: "10to14", minTemp: 10, maxTemp: 14, label: "10〜14℃" },
  { id: "15to19", minTemp: 15, maxTemp: 19, label: "15〜19℃" },
  { id: "20to24", minTemp: 20, maxTemp: 24, label: "20〜24℃" },
  { id: "25to29", minTemp: 25, maxTemp: 29, label: "25〜29℃" },
  { id: "30to34", minTemp: 30, maxTemp: 34, label: "30〜34℃" },
  { id: "over35", minTemp: 35, maxTemp: undefined, label: "35℃〜" },
] as const satisfies ReadonlyArray<TempZone>;
