import { isSameDate, toHalfWidth, getHour, type JmaWeatherCode } from "@/utils";

import type {
  JmaForecastResponse,
  OneWeekWeather,
  LatestWeather,
  DailyForecastSimple,
  DailyForecastDetail,
  JmaAreas,
  SelectedArea,
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
 * 気象庁天気予報APIのレスポンスと選択された地域情報を元に、日別の予報を抽出するユーティリティ関数
 *
 * @param { JmaForecastResponse } forecastResponse - 気象庁天気予報APIのレスポンス
 * @param { SelectedArea } selectedArea - ユーザーが選択した地域情報
 * @returns { DailyForecastSimple, DailyForecastDetail }
 */
export const extractDailyForecast = (
  forecastResponse: JmaForecastResponse,
  selectedArea: SelectedArea
) => {
  // APIの形式が正しくない場合はエラーを投げる
  if (!forecastResponse || !forecastResponse[0]?.timeSeries) {
    throw new Error("Invalid forecast response format");
  }

  // APIレスポンスから利用可能なエリアコードを取得
  const availableAreaCodes = forecastResponse[0].timeSeries[0].areas.map(
    (area) => area.area.code
  );

  // 選択された地域情報と照合して適切なエリアコードを取得
  const targetAreaCode = matchAreaCode(availableAreaCodes, selectedArea);
  if (!targetAreaCode) {
    throw new Error("No matching area code found in API response");
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
    (obj) => {
      console.log(obj.area.code, code);
      return obj.area.code === code;
    }
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

/**
 * class20sのコードから全階層の地域情報を解決する
 * @param class20Code - class20sのエリアコード
 * @param areas - 気象庁の地域情報データ
 * @returns 全階層の地域情報
 */
export const resolveAreaHierarchy = (
  class20Code: string,
  areas: JmaAreas
): SelectedArea => {
  const class20 = areas.class20s[class20Code];
  if (!class20) {
    throw new Error(`Class20 area not found: ${class20Code}`);
  }

  const class15 = areas.class15s[class20.parent];
  if (!class15) {
    throw new Error(`Class15 area not found: ${class20.parent}`);
  }

  const class10 = areas.class10s[class15.parent];
  if (!class10) {
    throw new Error(`Class10 area not found: ${class15.parent}`);
  }

  const office = areas.offices[class10.parent];
  if (!office) {
    throw new Error(`Office area not found: ${class10.parent}`);
  }

  const center = areas.centers[office.parent];
  if (!center) {
    throw new Error(`Center area not found: ${office.parent}`);
  }

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
 * @param selectedArea - 選択された地域情報
 * @param targetLevel - 目標とする階層 ('center', 'office', 'class10', 'class15', 'class20')
 * @returns エリアコード
 */
export const getAreaCodeForLevel = (
  selectedArea: SelectedArea,
  targetLevel: keyof SelectedArea
): string | null => {
  const area = selectedArea[targetLevel];
  return area?.code || null;
};

/**
 * APIレスポンスのエリアコードと選択された地域情報を照合し、適切なエリアコードを返す
 * @param apiAreaCodes - APIレスポンスに含まれるエリアコードの配列
 * @param selectedArea - 選択された地域情報
 * @returns 照合されたエリアコード、またはnull
 */
export const matchAreaCode = (
  apiAreaCodes: string[],
  selectedArea: SelectedArea
): string | null => {
  // 各階層のコードを確認
  const possibleCodes = [
    selectedArea.class20?.code,
    selectedArea.class15?.code,
    selectedArea.class10?.code,
    selectedArea.office?.code,
    selectedArea.center?.code,
  ].filter(Boolean) as string[];

  // APIレスポンスのコードと照合
  for (const code of possibleCodes) {
    if (apiAreaCodes.includes(code)) {
      return code;
    }
  }

  return null;
};
