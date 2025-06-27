import { WeatherCode } from "@/utils";

export type TimeSeries = {
  [time: `${string}T${string}+09:00`]: string;
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
  pops?: TimeSeries[]; // その日の各時刻の降水確率の配列
  temps?: TimeSeries[]; // その日の最高・最低気温
};

/**
 * 日別の予報をまとめた型(簡略)
 */
export type DailyForecastSimple = {
  date: string; // 日付 (YYYY-MM-DD)
  weatherCode: WeatherCode; // その日の天気コード
  pop: string; // その日の各時刻の降水確率の配列
  tempMax?: string; // その日の最高気温
  tempMin?: string; // その日の最低気温
};
