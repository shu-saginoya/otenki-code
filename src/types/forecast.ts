/**
 * 日別の予報をまとめた型
 */
export type DailyForecast = {
  date: string; // 日付 (YYYY-MM-DD)
  weatherCodes: string[]; // その日の各時刻の天気コードの配列
  pops: string[]; // その日の各時刻の降水確率の配列
  tempMax: number | null; // その日の最高気温（取得できなければ null）
  tempMin: number | null; // その日の最低気温（取得できなければ null）
};
