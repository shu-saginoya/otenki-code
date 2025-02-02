// 天気予報を取得してストアにセットする関数

import { ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useAreasStore } from "@/store/areas";
import { useForecastStore } from "@/store/forecast";
import { useFetch } from "@/composables/utils/useFetch";
import { useDay } from "@/composables/utils/useDay";
import { useTexts } from "@/composables/utils/useTexts";
import type { ForecastList, AreaTypeA } from "@/types/jmaForecast";
const { fullSpacesToHalf } = useTexts();

export const useJmaForecast = () => {
  // グローバルステートを取得
  const { areaLv2, areaLv3 } = storeToRefs(useAreasStore());
  const { setForecasts, setTempArea } = useForecastStore();

  // アクセスポイントのURLを生成
  const accessPoint = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
  const key = areaLv2.value ? areaLv2.value.key : "130000";
  const url = accessPoint + key + ".json";

  // 気象庁天気予報のアクセスポイントからデータを取得
  const { data, error } = useFetch(url);

  // エリアLV3が配列の何番目かを記録する
  const areaNum = ref<number>(0);

  watchEffect((): void => {
    // 取得データが空の場合は早期リターン
    if (!data.value) return;

    // 取得した天気予報全体
    const forecast: ForecastList = data.value;

    // 直近の天気予報
    const latestForecast = forecast[0];

    // 天気予報オブジェクトが複雑なため以下に分割して整理
    // 直近の天気予報の日付
    const weathersDate = latestForecast.timeSeries[0].timeDefines;
    // 直近の天気予報の詳細
    const weathersList = latestForecast.timeSeries[0].areas;
    // もしエリア3がセットされていれば、天気予報の詳細から該当の地域を探す
    if (areaLv3.value) {
      findArea(weathersList, areaLv3.value.key);
    }
    // 天気(分割前)
    const weathersOriginal = weathersList[areaNum.value].weathers;
    // 天気配列
    const weathers = weathersOriginal.map((value) => fullSpacesToHalf(value));
    // 日付配列
    const tempsDate = latestForecast.timeSeries[2].timeDefines;
    // 広域の気温配列
    const tempsList = latestForecast.timeSeries[2].areas;
    console.log(tempsList);
    // 気温配列
    const temps = tempsList[0].temps;
    // エリア
    const tempArea = tempsList[areaNum.value].area;

    // 天気配列の日付と一致する気温配列の日付を探す関数
    const weathersDateNum = (tempDateNum: number): number => {
      if (compareDates(weathersDate[0], tempsDate[tempDateNum])) {
        return 0;
      } else if (compareDates(weathersDate[1], tempsDate[tempDateNum])) {
        return 1;
      } else if (compareDates(weathersDate[2], tempsDate[tempDateNum])) {
        return 2;
      } else {
        return 3;
      }
    };

    // グローバルステートにエリアを格納
    setTempArea(tempArea.name, tempArea.code);

    // グローバルステートに天気を格納
    if (tempsDate.length >= 4) {
      // 2日分の天気をセット
      setForecasts([
        {
          date: tempsDate[0],
          weather: weathers[weathersDateNum(0)],
          minTemp: temps[0] !== temps[1] ? Number(temps[0]) : undefined,
          maxTemp: Number(temps[1]),
          minTempNextDay: Number(temps[2]),
        },
        {
          date: tempsDate[2],
          weather: weathers[weathersDateNum(2)],
          minTemp: Number(temps[2]),
          maxTemp: Number(temps[3]),
          minTempNextDay: Number(temps[4]),
        },
      ]);
    } else {
      // 1日分の天気をセット
      setForecasts([
        {
          date: tempsDate[0],
          weather: weathers[0],
          minTemp: temps[0] !== temps[1] ? Number(temps[0]) : undefined,
          maxTemp: Number(temps[1]),
          minTempNextDay: Number(temps[2]),
        },
      ]);
    }
  });

  // 天気予報の詳細からキーに一致する地域を探し、その番号をareaNumに格納
  const findArea = (items: AreaTypeA[], key: string): void => {
    items.find((value, index) => {
      if (value.area.code === key) {
        areaNum.value = index;
      }
    });
  };

  // 年月日が一致するか判定する関数(時間は切り捨て)
  const compareDates = (dateA: string, dateB: string): boolean => {
    return useDay(dateA).formatYMD === useDay(dateB).formatYMD;
  };

  return {
    error,
  };
};
