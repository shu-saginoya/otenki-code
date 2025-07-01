import { isSameDate, toHalfWidth, getHour, type JmaWeatherCode } from "@/utils";

import type {
  JmaForecastResponse,
  OneWeekWeather,
  LatestWeather,
  DailyForecastSimple,
  DailyForecastDetail,
} from "@/types";

type TimeSeries = {
  time: string;
  value: string;
};

const createTimeSeriesList = (
  dateList: string[],
  valueList: string[]
): TimeSeries[] => {
  return dateList.map((date, index) => ({
    time: date,
    value: valueList[index],
  }));
};

/**
 * 気象庁天気予報APIのレスポンスと対象エリアコードを元に、日別の予報を抽出するユーティリティ関数
 *
 * @param { JmaForecastResponse } forecastResponse - 気象庁天気予報APIのレスポンス
 * @param { string } targetAreaCode - ユーザーが指定したエリアコード(Lv3/class10)
 * @returns { DailyForecastSimple, DailyForecastDetail }
 */
export const extractDailyForecast = (
  forecastResponse: JmaForecastResponse,
  targetAreaCode: string
) => {
  // APIの形式が正しくない場合はエラーを投げる
  if (!forecastResponse || !forecastResponse[0]?.timeSeries) {
    throw new Error("Invalid forecast response format");
  }

  // 気象庁APIのレスポンスを整理
  const latestWeather = extractLatestWeather(
    forecastResponse[0],
    targetAreaCode
  );
  const oneWeekWeather = forecastResponse[1]
    ? extractOneWeekWeather(forecastResponse[1], targetAreaCode)
    : {
        weatherDates: [],
        weatherCodes: [],
        pops: [],
        tempsMin: [],
        tempsMax: [],
      };

  const detailList = createDailyForecastDetail(
    latestWeather.dates,
    latestWeather.weatherCodes,
    latestWeather.weatherTexts,
    latestWeather.winds,
    latestWeather.waves,
    latestWeather.pops,
    latestWeather.temps
  );
  const simpleList = createDailyForecastSimple(
    oneWeekWeather.weatherDates,
    oneWeekWeather.weatherCodes,
    oneWeekWeather.pops,
    oneWeekWeather.tempsMin,
    oneWeekWeather.tempsMax
  );

  return {
    detailList,
    simpleList,
  };
};

// 気象庁の天気予報の情報を整理する(直近)
const extractLatestWeather = (weather: LatestWeather, code: string) => {
  // 天気オブジェクト
  const dates: string[] = weather.timeSeries[0].timeDefines;
  const weatherObjIndex: number = weather.timeSeries[0].areas.findIndex(
    (obj) => obj.area.code === code
  );
  const weatherObj = weather.timeSeries[0].areas[weatherObjIndex];
  const weatherCodes: string[] = weatherObj?.weatherCodes || [];
  const weatherTexts: string[] = weatherObj?.weathers || [];
  const winds: string[] = weatherObj?.winds || [];
  const waves: string[] = weatherObj?.waves || [];

  // 降水確率オブジェクト
  const popDates: string[] = weather.timeSeries[1].timeDefines;
  const popObj = weather.timeSeries[1].areas.find(
    (obj) => obj.area.code === code
  );
  const pops: TimeSeries[] = popObj
    ? createTimeSeriesList(popDates, popObj.pops)
    : [];

  // 最高・最低気温オブジェクト
  const tempDates: string[] = weather.timeSeries[2].timeDefines;
  const tempObj = weather.timeSeries[2].areas[weatherObjIndex];
  const tempArea = tempObj?.area || {};
  const temps: TimeSeries[] = tempObj
    ? createTimeSeriesList(tempDates, tempObj.temps)
    : [];

  return {
    dates,
    weatherCodes,
    weatherTexts,
    winds,
    waves,
    pops,
    tempArea,
    temps,
  };
};

// 気象庁の天気予報の情報を整理する(1週間)
const extractOneWeekWeather = (weather: OneWeekWeather, code: string) => {
  // 天気オブジェクト
  const weatherDates: string[] = weather.timeSeries[0].timeDefines || [];
  const weatherObjIndex: number = weather.timeSeries[0].areas.findIndex(
    (obj) => obj.area.code === code
  );
  const weatherObj = weather.timeSeries[0].areas[weatherObjIndex];

  const weatherCodes: string[] = weatherObj?.weatherCodes || [];
  const pops: string[] = weatherObj?.pops || [];

  // 気温オブジェクト
  const tempDates: string[] = weather.timeSeries[1].timeDefines;
  const tempObj = weather.timeSeries[1].areas[weatherObjIndex];
  const tempArea = tempObj?.area || {};
  const tempsMin: string[] = tempObj?.tempsMin || [];
  const tempsMax: string[] = tempObj?.tempsMax || [];

  return {
    weatherDates,
    weatherCodes,
    pops,
    tempDates,
    tempArea,
    tempsMin,
    tempsMax,
  };
};

// 直近の天気予報を日毎のオブジェクトにまとめる
const createDailyForecastDetail = (
  dates: string[],
  weatherCodes: string[],
  weatherTexts: string[],
  winds: string[],
  waves: string[],
  pops: TimeSeries[],
  temps: TimeSeries[]
): DailyForecastDetail[] => {
  const result: DailyForecastDetail[] = [];

  dates.forEach((date, index) => {
    // pops
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
        if (range) {
          popsForDay[range] = pop.value;
        }
      });

    // temps
    const tempsForDay = temps.filter((temp) => isSameDate(temp.time, date));
    let tempMin = "";
    let tempMax = "";
    if (tempsForDay.length === 2) {
      const hour0 = tempsForDay[0].time.slice(11, 13);
      const hour1 = tempsForDay[1].time.slice(11, 13);
      if (hour0 === "00" && hour1 === "09") {
        tempMin = tempsForDay[0].value;
        tempMax = tempsForDay[1].value;
      } else if (hour0 === "09" && hour1 === "00") {
        tempMin = "";
        tempMax = tempsForDay[0].value;
      }
    } else if (tempsForDay.length === 1) {
      const hour = tempsForDay[0].time.slice(11, 13);
      if (hour === "09") {
        tempMax = tempsForDay[0].value;
        tempMin = "";
      } else if (hour === "00") {
        tempMin = tempsForDay[0].value;
        tempMax = "";
      }
    }
    result.push({
      date: date,
      weatherCode: weatherCodes[index] as JmaWeatherCode,
      weatherText: toHalfWidth(weatherTexts[index]),
      wind: toHalfWidth(winds[index]),
      wave: toHalfWidth(waves[index]),
      pops: popsForDay,
      tempMax,
      tempMin,
    });
  });

  return result;
};

// 週間の天気予報を日毎のオブジェクトにまとめる
const createDailyForecastSimple = (
  dates: string[],
  weatherCodes: string[],
  pops: string[],
  tempsMin: string[],
  tempsMax: string[]
): DailyForecastSimple[] => {
  const result: DailyForecastSimple[] = [];

  dates.forEach((date, index) => {
    result.push({
      date: date,
      weatherCode: weatherCodes[index] as JmaWeatherCode,
      pop: pops[index],
      tempMin: tempsMin[index],
      tempMax: tempsMax[index],
    });
  });

  return result;
};
