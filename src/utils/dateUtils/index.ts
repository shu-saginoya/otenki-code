import dayjs from "@/lib/dayjs";

/**
 *  日時を指定する方法が正しいかのバリデーション
 * @param {string} date
 * @returns {boolean}
 */
export const validateDateFormat = (date: string): boolean => {
  const formats = [
    "YYYY-MM-DD",
    "YYYY-MM-DDTHH:mm:ssZ",
    "YYYY-MM-DD HH:mm:ssZ",
    "YYYY-MM-DDTHH:mm:ss",
    "YYYY-MM-DD HH:mm:ss",
  ];
  const flag = dayjs(date, formats, true);
  return flag.isValid();
};

/**
 * 日付を「YYYY/MM/DD (ddd)」の形式でフォーマット
 * 例: 2025/04/03 (木)
 */
export const formatDate = (
  date: dayjs.ConfigType,
  format: string = "YYYY/MM/DD (ddd)"
) => {
  return dayjs(date).format(format);
};

/**
 * 相対時間を取得（例: "2時間前", "明日", "3日前"）
 */
export const formatRelative = (date: dayjs.ConfigType) => {
  return dayjs(date).fromNow();
};

/**
 * 取得した天気予報データを日付順にソート
 * @param {T[]} weatherData - 天気予報データの配列
 * @param {keyof T} dateKey - 日付を示すキー
 * @returns {T[]} - 日付順にソートされた天気予報データの配列
 * @template T - 天気予報データの型
 */
export const sortWeatherByDate = <T>(
  weatherData: T[],
  dateKey: keyof T
): T[] => {
  return [...weatherData].sort(
    (a, b) =>
      dayjs(a[dateKey] as string).unix() - dayjs(b[dateKey] as string).unix()
  );
};

/**
 * 今日・明日・明後日を特定の文字列で返す
 * 例: "きょう", "あした", "あさって", false
 */
export const getRelativeDayLabel = (date: dayjs.ConfigType): string | false => {
  const d = dayjs(date);
  if (d.isSame(dayjs(), "day")) return "きょう";
  if (d.isSame(dayjs().add(1, "day"), "day")) return "あした";
  if (d.isSame(dayjs().add(2, "day"), "day")) return "あさって";
  return false;
};

/**
 * 2つの日付が同じ日かどうかを比較
 * @param {string} date1 - 比較する最初の日付
 * @param {string} date2 - 比較する2番目の日付
 * @returns {boolean} - 同じ日であればtrue、そうでなければfalse
 */
export const isSameDate = (date1: string, date2: string): boolean => {
  if (!validateDateFormat(date1)) {
    throw new Error(`不正な日付形式: ${date1}`);
  }
  if (!validateDateFormat(date2)) {
    throw new Error(`不正な日付形式: ${date2}`);
  }
  return dayjs(date1).isSame(dayjs(date2), "day");
};

export const getHour = (date: string): number => {
  return dayjs(date).hour();
};
