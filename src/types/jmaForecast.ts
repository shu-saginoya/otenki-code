// 気象庁の天気予報APIのレスポンス型定義
export type JmaForecastResponse = [LatestWeather, OneWeekWeather];

// 直近(1～3)日の天気予報
type LatestWeather = {
  publishingOffice: string; // 発表官署（例：東京地方気象台）,
  reportDatetime: string; // 発表日時（ISO8601形式）,
  timeSeries: [
    {
      timeDefines: TimeDefines;
      areas: AreasWeather[];
    },
    {
      timeDefines: TimeDefines;
      areas: AreasPops[];
    },
    {
      timeDefines: TimeDefines;
      areas: AreasTemps[];
    },
  ];
};

// 1週間の天気予報
type OneWeekWeather = {
  publishingOffice: string; // 発表官署（例：東京地方気象台）,
  reportDatetime: string; // 発表日時（ISO8601形式）,
  timeSeries: [
    {
      timeDefines: TimeDefines;
      areas: AreasOneWeekWeather[];
    },
    {
      timeDefines: TimeDefines;
      areas: AreasOneWeekTemps[];
    },
  ];
  tempAverage: {
    areas: AreasOneWeekAverage[];
  };
  precipAverage: {
    areas: AreasOneWeekPrecip[];
  };
};

// 各エリアの天気予報データ（府県予報区の単位）
type AreasWeather = {
  area: Area;
  weatherCodes: string[]; // 天気コード（6時間ごとの予報、3つセット）
  weathers: string[]; // 天気(日本語表記)
  winds: string[]; // 風（日本語表記）
  waves?: string[]; // 波（日本語表記）海のない地域にはない
};

// 各エリアの降水確率データ
type AreasPops = {
  area: Area;
  pops: string[]; // 降水確率
};

// 各エリアの気温データ
type AreasTemps = {
  area: Area;
  temps: string[]; // 気温（朝の最低気温、日中の最高気温）
};

// 各エリアの1週間の天気予報データ
type AreasOneWeekWeather = {
  area: Area;
  weatherCodes: string[];
  pops: string[];
  reliabilities: string[];
};

// 各エリアの1週間の気温予報データ
type AreasOneWeekTemps = {
  area: Area;
  tempsMin: string[]; // 最低気温
  tempsMinUpper: string[]; // 最低気温の上限
  tempsMinLower: string[]; // 最低気温の下限
  tempsMax: string[]; // 最高気温
  tempsMaxUpper: string[]; // 最高気温の上限
  tempsMaxLower: string[]; // 最高気温の下限
};

// 各エリアの向こう1週間の平均気温
type AreasOneWeekAverage = {
  area: Area;
  min: string;
  max: string;
};

// 各エリアの向こう1週間の降水量
type AreasOneWeekPrecip = {
  area: Area;
  min: string;
  max: string;
};

// エリア指定の基本形(共通事項)
type Area = {
  name: string; // 地域名（例：東京地方）
  code: string; // 地域コード（例：130010）
};

// 予報の対象日時（ISO8601形式 | 共通事項)
type TimeDefines = string[];
