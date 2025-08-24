import type { Hour } from "@/types";

type Temp = number;

// 基本的な型定義
type TempCurveOptions = {
  tMax: Temp;
  tMinToday: Temp;
  tMinNext: Temp;
  morningHour?: Hour; // 朝の時刻（0-23）
  eveningHour?: Hour; // 夕方の時刻（0-23）
};

type HourlyTemps = Record<Hour, Temp>;

type DailyTempResult = {
  hourly: HourlyTemps;
  morning: Temp; // morningHourの気温
  evening: Temp; // eveningHourの気温
};

// 気温変化の基準時刻の定数（デフォルト値）
const TEMPERATURE_CONSTANTS = {
  PEAK_HOUR: 14, // 最高気温を記録する時刻（14:00）
  MIN_MORNING_HOUR: 5, // 最低気温を記録する時刻（05:00）
  MIN_NEXT_DAY_HOUR: 29, // 翌日の最低気温時刻（29:00 = 翌日05:00）
  HOURS_IN_DAY: 24,
  DEFAULT_MORNING_HOUR: 6, // デフォルトの朝の時刻
  DEFAULT_EVENING_HOUR: 18, // デフォルトの夕方の時刻
} as const;

/**
 * 指定された時刻が有効な範囲内（0-23）かチェックする純粋関数
 * @param hour - チェックする時刻
 */
const validateHour = (hour: unknown): Temp => {
  if (
    typeof hour !== "number" ||
    !Number.isInteger(hour) ||
    hour < 0 ||
    hour > 23
  ) {
    throw new Error(
      `Invalid hour: ${hour}. Hour must be an integer between 0 and 23.`
    );
  }
  return hour;
};

/**
 * 時間に基づいて気温上昇の比率を計算する純粋関数
 * @param hour - 時間（0-23）
 */
const calculateRisingRatio = (hour: Hour): Temp =>
  (hour - TEMPERATURE_CONSTANTS.MIN_MORNING_HOUR) /
  (TEMPERATURE_CONSTANTS.PEAK_HOUR - TEMPERATURE_CONSTANTS.MIN_MORNING_HOUR);

/**
 * 時間に基づいて気温下降の比率を計算する純粋関数
 * @param hour - 時間（0-23）
 */
const calculateFallingRatio = (hour: Hour): Temp =>
  (TEMPERATURE_CONSTANTS.MIN_NEXT_DAY_HOUR - hour) /
  (TEMPERATURE_CONSTANTS.MIN_NEXT_DAY_HOUR - TEMPERATURE_CONSTANTS.PEAK_HOUR);

/**
 * 値を0-1の範囲に正規化する純粋関数
 * @param value - 正規化する値
 */
const normalizeRatio = (value: number): number =>
  Math.max(0, Math.min(1, value));

/**
 * 正弦波を使用して滑らかな気温変化を計算する純粋関数
 * @param ratio - 正弦波の比率（0-1）
 * @param min - 最低気温
 * @param max - 最高気温
 */
const generateTemp = (ratio: number, min: Temp, max: Temp): Temp => {
  // 正弦波の結果（-1から1）を0から1の範囲に変換
  const normalizedSine =
    (Math.sin(normalizeRatio(ratio) * Math.PI - Math.PI / 2) + 1) / 2;
  return min + (max - min) * normalizedSine;
};

/**
 * 気温を指定された精度で丸める純粋関数
 * @param temp - 丸める気温
 * @param precision - 小数点以下の桁数
 */
const roundTemp = (temp: Temp, precision: number = 1): Temp =>
  parseFloat(temp.toFixed(precision));

/**
 * 1時間分の気温データを生成する純粋関数
 * @param hour - 時間（0-23）
 * @param tMax - 最高気温
 * @param tMinToday - 当日の最低気温
 * @param tMinNext - 翌日の最低気温
 */
const generateHourlyTemp = (
  hour: Hour,
  tMax: Temp,
  tMinToday: Temp,
  tMinNext: Temp
): Temp => {
  const { PEAK_HOUR } = TEMPERATURE_CONSTANTS;
  const ratio =
    hour <= PEAK_HOUR
      ? calculateRisingRatio(hour)
      : calculateFallingRatio(hour);

  const minTemp = hour <= PEAK_HOUR ? tMinToday : tMinNext;
  const temp = generateTemp(ratio, minTemp, tMax);

  return roundTemp(temp);
};

/**
 * 24時間分の気温データを生成する純粋関数
 * @param tMax - 最高気温
 * @param tMinToday - 当日の最低気温
 * @param tMinNext - 翌日の最低気温
 */
const generateAllHourlyTemps = (
  tMax: Temp,
  tMinToday: Temp,
  tMinNext: Temp
): HourlyTemps => {
  return Object.fromEntries(
    Array.from({ length: TEMPERATURE_CONSTANTS.HOURS_IN_DAY }, (_, hour) => {
      const validHour = validateHour(hour);
      return [
        validHour,
        generateHourlyTemp(validHour as Hour, tMax, tMinToday, tMinNext),
      ];
    })
  ) as HourlyTemps;
};

/**
 * 1日1時間単位の気温データを生成する関数
 * @param tMax - 最高気温
 * @param tMinToday - 当日の最低気温
 * @param tMinNext - 翌日の最低気温
 * @param morningHour - 朝の時刻
 * @param eveningHour - 夕方の時刻
 * @returns 24時間の気温データ配列と、指定された朝と夕方の気温
 */
export const generateDailyTemps = ({
  tMax,
  tMinToday,
  tMinNext,
  morningHour = TEMPERATURE_CONSTANTS.DEFAULT_MORNING_HOUR,
  eveningHour = TEMPERATURE_CONSTANTS.DEFAULT_EVENING_HOUR,
}: TempCurveOptions): DailyTempResult => {
  // 時刻の検証
  const validMorningHour = validateHour(morningHour);
  const validEveningHour = validateHour(eveningHour);

  // 時間ごとの気温データを生成
  const hourly = generateAllHourlyTemps(tMax, tMinToday, tMinNext);

  // 朝と夜の気温を取得
  const morning = hourly[validMorningHour as Hour];
  const evening = hourly[validEveningHour as Hour];

  return { hourly, morning, evening };
};
