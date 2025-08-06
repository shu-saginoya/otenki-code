import { isSameDate, getHour } from "@/utils";

import {
  findAreaObj,
  findAreaIndex,
  resolveAreaCodeByIndex,
  resolveAreaCode,
} from "./areaUtils";
import { TIME_RANGES } from "./constants";
import { sanitizeWeatherText, convertTemperatureData } from "./weatherUtils";

import type { TimeSeriesData, PopsByTimeRange } from "./types";
import type { JmaForecastResponse, SelectedArea } from "@/lib/jma";
import type {
  LatestWeather,
  OneWeekWeather,
  JmaAreaCode,
  JmaWeatherCode,
} from "@/lib/jma";
import type { DailyForecastSimple, DailyForecastDetail } from "@/types";

/**
 * 時系列データから時間と値のペアを作成する
 * @param dateList 日付のリスト
 * @param valueList 値のリスト
 * @returns 時系列データの配列
 */
export const createTimeSeriesList = (
  dateList: string[],
  valueList: string[]
): TimeSeriesData[] =>
  dateList.map((date, index) => ({
    time: date,
    value: valueList[index],
  }));

/**
 * 最新の天気予報データを抽出する
 * @param weather 最新の天気予報データ
 * @param codes エリアコードのマッピング
 * @returns 抽出された天気予報データ
 */
export const extractLatestWeather = (
  weather: LatestWeather,
  codes: { weather: JmaAreaCode; pop: JmaAreaCode; temp: JmaAreaCode }
) => ({
  dates: weather.timeSeries[0].timeDefines,
  weatherCodes:
    findAreaObj(weather.timeSeries[0], codes.weather)?.weatherCodes ?? [],
  weatherTexts:
    findAreaObj(weather.timeSeries[0], codes.weather)?.weathers ?? [],
  winds: findAreaObj(weather.timeSeries[0], codes.weather)?.winds ?? [],
  waves: findAreaObj(weather.timeSeries[0], codes.weather)?.waves ?? [],
  pops: (() => {
    const popTS = weather.timeSeries[1];
    const popObj = findAreaObj(popTS, codes.pop);
    return popObj ? createTimeSeriesList(popTS.timeDefines, popObj.pops) : [];
  })(),
  tempArea: findAreaObj(weather.timeSeries[2], codes.temp)?.area ?? {},
  temps: (() => {
    const tempTS = weather.timeSeries[2];
    const tempObj = findAreaObj(tempTS, codes.temp);
    return tempObj
      ? createTimeSeriesList(tempTS.timeDefines, tempObj.temps)
      : [];
  })(),
});

/**
 * 週間天気予報データを抽出する
 * @param week 週間天気予報データ
 * @param codes エリアコードのマッピング
 * @returns 抽出された週間天気予報データ
 */
export const extractOneWeekWeather = (
  week: OneWeekWeather,
  codes: { weather: JmaAreaCode; temp: JmaAreaCode }
) => ({
  weatherDates: week.timeSeries[0]?.timeDefines ?? [],
  weatherCodes:
    findAreaObj(week.timeSeries[0], codes.weather)?.weatherCodes ?? [],
  pops: findAreaObj(week.timeSeries[0], codes.weather)?.pops ?? [],
  tempsMin: findAreaObj(week.timeSeries[1], codes.temp)?.tempsMin ?? [],
  tempsMax: findAreaObj(week.timeSeries[1], codes.temp)?.tempsMax ?? [],
});

/**
 * 最新の天気予報データをもとに、日ごとの詳細な天気予報を作成する
 * @param dates 日時のリスト
 * @param weatherCodes 天気コードのリスト
 * @param weatherTexts 天気予報のテキストリスト
 * @param winds 風のテキストリスト
 * @param waves 波のテキストリスト
 * @param pops 降水確率のリスト
 * @param temps 気温のリスト
 * @returns 日ごとの詳細な天気予報のリスト
 */
export const createDailyForecastDetail = (
  dates: string[],
  weatherCodes: string[],
  weatherTexts: string[],
  winds: string[],
  waves: string[],
  pops: TimeSeriesData[],
  temps: TimeSeriesData[]
): DailyForecastDetail[] =>
  dates.map((date, index) => {
    // 降水確率
    const popsForDay: PopsByTimeRange = {
      [TIME_RANGES.EARLY_MORNING]: "",
      [TIME_RANGES.MORNING]: "",
      [TIME_RANGES.AFTERNOON]: "",
      [TIME_RANGES.NIGHT]: "",
    };

    pops
      .filter((pop) => isSameDate(pop.time, date))
      .forEach((pop) => {
        const hour = getHour(pop.time);
        const hourToRange: Record<number, keyof typeof TIME_RANGES> = {
          0: "EARLY_MORNING",
          6: "MORNING",
          12: "AFTERNOON",
          18: "NIGHT",
        };
        const rangeKey = hourToRange[hour];
        if (rangeKey) {
          popsForDay[TIME_RANGES[rangeKey]] = pop.value;
        }
      });

    // 気温
    const tempsForDay = temps.filter((temp) => isSameDate(temp.time, date));
    const { tempMin, tempMax } = convertTemperatureData(tempsForDay);

    return {
      date,
      weatherCode: weatherCodes[index] as JmaWeatherCode,
      weatherText: sanitizeWeatherText(weatherTexts[index]),
      wind: sanitizeWeatherText(winds[index]),
      wave: sanitizeWeatherText(waves[index]),
      pops: popsForDay,
      tempMax,
      tempMin,
    };
  });

/**
 * 週間の天気予報データをもとに、日ごとの簡易的な天気予報を作成する
 * @param dates 日時のリスト
 * @param weatherCodes 天気コードのリスト
 * @param pops 降水確率のリスト
 * @param tempsMin 最低気温のリスト
 * @param tempsMax 最高気温のリスト
 * @returns 日ごとの簡易的な天気予報のリスト
 */
export const createDailyForecastSimple = (
  dates: string[],
  weatherCodes: string[],
  pops: string[],
  tempsMin: string[],
  tempsMax: string[]
): DailyForecastSimple[] =>
  dates.map((date, index) => ({
    date,
    weatherCode: weatherCodes[index] as JmaWeatherCode,
    pop: pops[index],
    tempMin: tempsMin[index],
    tempMax: tempsMax[index],
  }));

export const extractDailyForecast = (
  forecastResponse: JmaForecastResponse,
  selectedArea: SelectedArea
) => {
  if (!forecastResponse || !forecastResponse[0]?.timeSeries) {
    throw new Error("Invalid forecast response format");
  }

  // --- 直近予報 各 timeSeries ごとにエリアコード決定 ---
  const weatherTS = forecastResponse[0].timeSeries[0];
  const popTS = forecastResponse[0].timeSeries[1];
  const tempTS = forecastResponse[0].timeSeries[2];

  const weatherAreaCode = resolveAreaCode(weatherTS, selectedArea);
  const weatherAreaIndex = findAreaIndex(weatherTS, weatherAreaCode || "0");
  const popAreaCode = resolveAreaCode(popTS, selectedArea) || weatherAreaCode;
  const tempAreaCode = resolveAreaCodeByIndex(tempTS, weatherAreaIndex);

  if (!weatherAreaCode || !popAreaCode || !tempAreaCode) {
    throw new Error(
      "Failed to resolve required area codes for forecast extraction"
    );
  }

  const latestWeather = extractLatestWeather(forecastResponse[0], {
    weather: weatherAreaCode,
    pop: popAreaCode,
    temp: tempAreaCode,
  });

  // --- 週間予報 各 timeSeries ごとにエリアコード決定 ---
  let oneWeekWeather: ReturnType<typeof extractOneWeekWeather> = {
    weatherDates: [],
    weatherCodes: [],
    pops: [],
    tempsMin: [],
    tempsMax: [],
  };
  if (forecastResponse[1]) {
    const weekWeatherTS = forecastResponse[1].timeSeries[0];
    const weekTempTS = forecastResponse[1].timeSeries[1];

    const weekWeatherAreaCode = resolveAreaCode(weekWeatherTS, selectedArea);
    const weekWeatherAreaIndex = findAreaIndex(
      weekWeatherTS,
      weekWeatherAreaCode || "0"
    );
    const weekTempAreaCode =
      resolveAreaCodeByIndex(weekTempTS, weekWeatherAreaIndex) ||
      weekWeatherAreaCode;

    if (!weekWeatherAreaCode || !weekTempAreaCode) {
      throw new Error(
        "Failed to resolve required area codes for one week forecast extraction"
      );
    }

    oneWeekWeather = extractOneWeekWeather(forecastResponse[1], {
      weather: weekWeatherAreaCode,
      temp: weekTempAreaCode,
    });
  }

  return {
    detailList: createDailyForecastDetail(
      latestWeather.dates,
      latestWeather.weatherCodes,
      latestWeather.weatherTexts,
      latestWeather.winds,
      latestWeather.waves,
      latestWeather.pops,
      latestWeather.temps
    ),
    simpleList: createDailyForecastSimple(
      oneWeekWeather.weatherDates,
      oneWeekWeather.weatherCodes,
      oneWeekWeather.pops,
      oneWeekWeather.tempsMin,
      oneWeekWeather.tempsMax
    ),
  };
};
