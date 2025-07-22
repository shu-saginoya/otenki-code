import { isSameDate, toHalfWidth, getHour, type JmaWeatherCode } from "@/utils";

import type {
  JmaForecastResponse,
  OneWeekWeather,
  LatestWeather,
  DailyForecastSimple,
  DailyForecastDetail,
  JmaAreas,
  SelectedArea,
  JmaAreaCode,
} from "@/types";

// 型定義: timeSeriesのarea
type AreaObj = { area: { code: JmaAreaCode } };

// 汎用: 指定した timeSeries の availableAreaCodes を取得
const getAreaCodes = (timeSeries: { areas?: AreaObj[] }): JmaAreaCode[] =>
  timeSeries?.areas?.map((area) => area.area.code) ?? [];

// 汎用: 指定した timeSeries から selectedArea に最適なエリアコードを取得
const resolveAreaCode = (
  timeSeries: { areas?: AreaObj[] },
  selectedArea: SelectedArea
): JmaAreaCode | null => matchAreaCode(getAreaCodes(timeSeries), selectedArea);

// 汎用: 指定した timeSeries からエリアコード一致の area オブジェクトを取得
const findAreaObj = <T extends AreaObj>(
  timeSeries: { areas?: T[] },
  code: JmaAreaCode
): T | undefined => timeSeries?.areas?.find((obj) => obj.area.code === code);

// 汎用: 日付配列と値配列をまとめて TimeSeries 配列に変換
const createTimeSeriesList = (
  dateList: string[],
  valueList: string[]
): { time: string; value: string }[] =>
  dateList.map((date, index) => ({
    time: date,
    value: valueList[index],
  }));

// 直近予報の抽出（各 timeSeries ごとにエリアコードを指定）
const extractLatestWeather = (
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

// 週間予報の抽出（各 timeSeries ごとにエリアコードを指定）
const extractOneWeekWeather = (
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

// 詳細予報リスト生成
const createDailyForecastDetail = (
  dates: string[],
  weatherCodes: string[],
  weatherTexts: string[],
  winds: string[],
  waves: string[],
  pops: { time: string; value: string }[],
  temps: { time: string; value: string }[]
): DailyForecastDetail[] =>
  dates.map((date, index) => {
    // 降水確率
    const popsForDay = {
      "00:00-06:00": "",
      "06:00-12:00": "",
      "12:00-18:00": "",
      "18:00-24:00": "",
    };
    pops
      .filter((pop) => isSameDate(pop.time, date))
      .forEach((pop) => {
        const hour = getHour(pop.time);
        const hourToRange: Record<number, keyof typeof popsForDay> = {
          0: "00:00-06:00",
          6: "06:00-12:00",
          12: "12:00-18:00",
          18: "18:00-24:00",
        };
        const range = hourToRange[hour];
        if (range) popsForDay[range] = pop.value;
      });

    // 気温
    const tempsForDay = temps.filter((temp) => isSameDate(temp.time, date));
    let tempMin = "";
    let tempMax = "";
    if (tempsForDay.length === 2) {
      const hour0 = getHour(tempsForDay[0].time);
      const hour1 = getHour(tempsForDay[1].time);
      if (hour0 === 0 && hour1 === 9) {
        tempMin = tempsForDay[0].value;
        tempMax = tempsForDay[1].value;
      } else if (hour0 === 9 && hour1 === 0) {
        tempMin = "";
        tempMax = tempsForDay[0].value;
      }
    } else if (tempsForDay.length === 1) {
      const hour = getHour(tempsForDay[0].time);
      if (hour === 9) {
        tempMax = tempsForDay[0].value;
        tempMin = "";
      } else if (hour === 0) {
        tempMin = tempsForDay[0].value;
        tempMax = "";
      }
    }

    return {
      date,
      weatherCode: weatherCodes[index] as JmaWeatherCode,
      weatherText: toHalfWidth(weatherTexts[index]),
      wind: toHalfWidth(winds[index]),
      wave: toHalfWidth(waves[index]),
      pops: popsForDay,
      tempMax,
      tempMin,
    };
  });

// 簡易予報リスト生成
const createDailyForecastSimple = (
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

/**
 * メイン: 気象庁天気予報APIレスポンスと選択地域から日別予報を抽出
 */
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
  const popAreaCode = resolveAreaCode(popTS, selectedArea) || weatherAreaCode;
  const tempAreaCode = resolveAreaCode(tempTS, selectedArea) || weatherAreaCode;

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
    const weekTempAreaCode =
      resolveAreaCode(weekTempTS, selectedArea) || weekWeatherAreaCode;

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

/**
 * class20sのコードから全階層の地域情報を解決する
 */
export const resolveAreaHierarchy = (
  class20Code: string,
  areas: JmaAreas
): SelectedArea => {
  const class20 = areas.class20s[class20Code];
  if (!class20) throw new Error(`Class20 area not found: ${class20Code}`);
  const class15 = areas.class15s[class20.parent];
  if (!class15) throw new Error(`Class15 area not found: ${class20.parent}`);
  const class10 = areas.class10s[class15.parent];
  if (!class10) throw new Error(`Class10 area not found: ${class15.parent}`);
  const office = areas.offices[class10.parent];
  if (!office) throw new Error(`Office area not found: ${class10.parent}`);
  const center = areas.centers[office.parent];
  if (!center) throw new Error(`Center area not found: ${office.parent}`);

  return {
    center: { ...center, code: office.parent },
    office: { ...office, code: class10.parent },
    class10: { ...class10, code: class15.parent },
    class15: { ...class15, code: class20.parent },
    class20: { ...class20, code: class20Code },
  };
};

/**
 * 指定された階層の地域情報から、APIで使用する適切なエリアコードを取得する
 */
export const getAreaCodeForLevel = (
  selectedArea: SelectedArea,
  targetLevel: keyof SelectedArea
): string | null => selectedArea[targetLevel]?.code || null;

/**
 * APIレスポンスのエリアコードと選択された地域情報を照合し、適切なエリアコードを返す
 */
export const matchAreaCode = (
  apiAreaCodes: JmaAreaCode[],
  selectedArea: SelectedArea
): string | null => {
  const found = [
    selectedArea.class20?.code,
    selectedArea.class15?.code,
    selectedArea.class10?.code,
    selectedArea.office?.code,
    selectedArea.center?.code,
  ]
    .filter((code): code is string => typeof code === "string")
    .find((code) => apiAreaCodes.includes(code));
  return found ?? null;
};
