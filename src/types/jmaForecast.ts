export type Area = {
  name: string; // 地域名（例：東京地方）
  code: string; // 地域コード（例：130010）
};

// 各エリアの天気予報データ（府県予報区の単位）
export type ForecastArea = {
  area: Area;
  weatherCodes: string[]; // 天気コード（6時間ごとの予報、3つセット）
  pops: string[]; // 降水確率（6時間ごとの予報、3つセット）
  reliabilities?: string[]; // 予報の信頼度（中期予報などで使われる場合あり）
  temps: string[]; // 気温（2日分の日中の最高・最低気温など）
  tempsMin?: string[]; // 最低気温（1週間予報など）
  tempsMinUpper?: string[];
  tempsMinLower?: string[];
  tempsMax?: string[]; // 最高気温（1週間予報など）
  tempsMaxUpper?: string[];
  tempsMaxLower?: string[];
};

// 日付ごとの予報
export type ForecastTimeSeries = {
  timeDefines: string[]; // 予報の対象日時（ISO8601形式）
  areas: ForecastArea[]; // 各エリアの予報データ
};

// 天気予報データ全体の構造
export type ForecastData = {
  publishingOffice: string; // 発表官署（例：東京地方気象台）
  reportDatetime: string; // 発表日時（ISO8601形式）
  timeSeries: ForecastTimeSeries[]; // 各時間軸ごとのデータ（短期、週間など）
};

export type ForecastResponse = ForecastData[];
