type Pop = {
  time: string; // 日時
  value: string; // 値
};

/**
 * 日別の予報をまとめた型(詳細)
 */
export type DailyForecastDetail = {
  date: string; // 日付 (YYYY-MM-DD)
  weatherCodes: string; // その日の天気コード
  weatherText: string; // その日の天気のテキスト
  wind: string; // その日の風のテキスト
  wave: string; // その日の波のテキスト
  pops: Pop[] | undefined; // その日の各時刻の降水確率の配列
  tempMax: number | undefined; // その日の最高気温（取得できなければ undefined）
  tempMin: number | undefined; // その日の最低気温（取得できなければ undefined）
};

/**
 * 日別の予報をまとめた型(簡略)
 */
export type DailyForecastSimple = {
  date: string; // 日付 (YYYY-MM-DD)
  weatherCodes: string; // その日の天気コード
  pop: string; // その日の各時刻の降水確率の配列
  tempMax: number | undefined; // その日の最高気温（取得できなければ undefined）
  tempMin: number | undefined; // その日の最低気温（取得できなければ undefined）
};

export type DailyForecast = {
  detail: DailyForecastDetail[];
  simple: DailyForecastSimple[];
};
