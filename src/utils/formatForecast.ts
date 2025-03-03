import type { JmaForecastResponse, DailyForecast } from "@/types";

/**
 * ForecastResponse と対象エリアコードを元に、日別の予報を抽出するユーティリティ関数
 *
 * @param forecastResponse - 気象庁天気予報APIのレスポンス
 * @param targetAreaCode - ユーザーが指定したエリアコード
 * @returns DailyForecast の配列（昇順にソート済み）
 */
export const extractDailyForecast = (
  forecastResponse: JmaForecastResponse,
  targetAreaCode: string
): DailyForecast[] => {
  if (forecastResponse.length === 0) {
    return [];
  }
  // 短期予報として、最初の ForecastData を利用
  const forecastData = forecastResponse[0];
  const dailyMap: Record<string, DailyForecast> = {};

  // 複数の時系列データをループ（例：午前、午後など）
  for (const timeSeries of forecastData.timeSeries) {
    // 対象エリアの ForecastArea を抽出
    const areaForecast = timeSeries.areas.find(
      (fa) => fa.area.code === targetAreaCode
    );
    if (!areaForecast) {
      continue;
    }
    // timeDefines と各予報データの配列はインデックスで対応している前提
    timeSeries.timeDefines.forEach((time, index) => {
      // ISO8601文字列から日付部分を抽出（例："2023-05-11T06:00:00+09:00" -> "2023-05-11"）
      const date = time.split("T")[0];
      if (!dailyMap[date]) {
        dailyMap[date] = {
          date,
          weatherCodes: [],
          pops: [],
          tempMax: null,
          tempMin: null,
        };
      }
      // 天気コード、降水確率の集計
      if (areaForecast.weatherCodes[index]) {
        dailyMap[date].weatherCodes.push(areaForecast.weatherCodes[index]);
      }
      if (areaForecast.pops[index]) {
        dailyMap[date].pops.push(areaForecast.pops[index]);
      }
      // 最高・最低気温については、各時刻で取得できる値のうち最初に存在するものを採用（必要に応じて集計ロジックを拡張してください）
      if (
        !dailyMap[date].tempMax &&
        areaForecast.tempsMax &&
        areaForecast.tempsMax[index]
      ) {
        dailyMap[date].tempMax = Number(areaForecast.tempsMax[index]);
      }
      if (
        !dailyMap[date].tempMin &&
        areaForecast.tempsMin &&
        areaForecast.tempsMin[index]
      ) {
        dailyMap[date].tempMin = Number(areaForecast.tempsMin[index]);
      }
    });
  }

  // 日付順にソートして配列に変換
  return Object.values(dailyMap).sort((a, b) => a.date.localeCompare(b.date));
};

// 最高気温と最低気温の平均
export const averageTemp = (tempMax: number, tempMin: number) => {
  return (tempMax + tempMin) / 2;
};

// 最高気温と最低気温の差
export const differenceTemp = (tempMax: number, tempMin: number) => {
  return tempMax - tempMin;
};

// 朝と夕方ころの予想気温
export const morningAndEveningTemp = (tempMax: number, tempMin: number) => {
  return differenceTemp(tempMax, tempMin) / 4 + tempMin;
};
