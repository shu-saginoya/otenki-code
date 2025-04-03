import dayjs from "dayjs";
import "dayjs/locale/ja";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekday from "dayjs/plugin/weekday";

// プラグイン適用
dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);

// 日本語ロケールを設定
dayjs.locale("ja");

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
 */
export const sortWeatherByDate = <T extends { date: string }>(
  weatherData: T[]
): T[] => {
  return [...weatherData].sort(
    (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix()
  );
};

/**
 * 今日・明日・明後日を特定の文字列で返す
 * 例: "今日", "明日", "明後日", "4/3(木)"
 */
export const formatWeatherDate = (date: dayjs.ConfigType) => {
  const d = dayjs(date);
  if (d.isSame(dayjs(), "day")) return "今日";
  if (d.isSame(dayjs().add(1, "day"), "day")) return "明日";
  if (d.isSame(dayjs().add(2, "day"), "day")) return "明後日";
  return d.format("M/D(ddd)");
};
