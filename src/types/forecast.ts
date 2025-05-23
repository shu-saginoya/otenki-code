import { WeatherCode } from "@/utils";

export type TimeAndValue = {
  time: string; // 日時 (YYYY-MM-DD)
  value: string; // 値
};

/**
 * 日別の予報をまとめた型(詳細)
 */
export type DailyForecastDetail = {
  date: string; // 日付 (YYYY-MM-DD)
  weatherCode: WeatherCode; // その日の天気コード
  weatherText: string; // その日の天気のテキスト
  wind: string; // その日の風のテキスト
  wave: string; // その日の波のテキスト
  pops: TimeAndValue[] | undefined; // その日の各時刻の降水確率の配列
  temps: TimeAndValue[] | undefined; // その日の最高・最低気温（取得できなければ undefined）
};

/**
 * 日別の予報をまとめた型(簡略)
 */
export type DailyForecastSimple = {
  date: string; // 日付 (YYYY-MM-DD)
  weatherCode: WeatherCode; // その日の天気コード
  pop: string; // その日の各時刻の降水確率の配列
  tempMax: string | undefined; // その日の最高気温（取得できなければ undefined）
  tempMin: string | undefined; // その日の最低気温（取得できなければ undefined）
};
