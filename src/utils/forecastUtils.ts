import type { JmaForecastResponse, DailyForecast, DailyForecastSimple, DailyForecastDetail } from "@/types";
import { isSameDate } from "@/lib/dayjs"

/**
 * ForecastResponse と対象エリアコードを元に、日別の予報を抽出するユーティリティ関数
 *
 * @param forecastResponse - 気象庁天気予報APIのレスポンス
 * @param targetAreaCode - ユーザーが指定したエリアコード(Lv3)
 * @returns DailyForecast の配列（昇順にソート済み）
 */
export const extractDailyForecast = (
  forecastResponse: JmaForecastResponse,
  targetAreaCode: string
): DailyForecast | undefined => {
  // APIの形式が正しくない場合は早期リターン
  if (!forecastResponse) return undefined;

  const response = {
    detail: [],
    simple: [],
  };

  const latestWeather = forecastResponse[0];
  const oneWeekWeather = forecastResponse[1];

  const weathers = latestWeather.timeSeries[0].areas.find((area) => area.area.code === targetAreaCode);
  const weathersOrder = latestWeather.timeSeries[0].timeDefines.find((time) => isSameDate(time, )

  const pops = latestWeather.timeSeries[1].areas.find((pops) => pops.area.code === targetAreaCode);

  const temps = latestWeather.timeSeries[2].areas.find((temps) => temps.area.code === targetAreaCode);

latestWeather.timeSeries[0].timeDefines.forEach((date, index) => {
  const obj: DailyForecastDetail = {
    date: date,
    weatherCodes: weathers?.weatherCodes
    weatherText: 
    wind: 
    wave: 
    pops: 
    tempMax: 
    tempMin: 
  };
})
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
