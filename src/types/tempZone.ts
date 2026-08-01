/**
 * @file 気温帯の型定義
 * @description
 * 気温の範囲のルールを定義する型を提供。
 */

// 気温の下限/上限。境界なしは undefined で表現する
export type TempBound = number | undefined;

// 気温帯ID
export type TempZoneId =
  | "under4"
  | "5to9"
  | "10to14"
  | "15to19"
  | "20to24"
  | "25to29"
  | "30to34"
  | "over35";

// 気温帯メタ情報
export type TempZone = {
  id: TempZoneId; // 気温帯のID
  minTemp: TempBound; // 最低気温（摂氏）
  maxTemp: TempBound; // 最高気温（摂氏）
  label: string; // 気温帯のラベル
};
