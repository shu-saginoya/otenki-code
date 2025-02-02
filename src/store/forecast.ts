// 天気予報を管理するストア

import { defineStore } from "pinia";
import { ref, readonly } from "vue";

export const useForecastStore = defineStore("forecast", () => {
  // Types
  type TempArea = {
    name: string;
    code: string;
  };
  type Forecast = {
    date: string;
    weather: string;
    minTemp: number | undefined;
    maxTemp: number;
    minTempNextDay: number | undefined;
  };

  // State
  // 地域
  const tempArea = ref<TempArea | undefined>();
  // 天気予報のリスト
  const forecasts = ref<Forecast[] | undefined>();

  // Setter
  const setForecasts = (list: Forecast[]): void => {
    forecasts.value = list;
  };
  const setTempArea = (name: string, code: string) => {
    tempArea.value = { name, code };
  };

  return {
    forecasts: readonly(forecasts),
    tempArea: readonly(tempArea),
    setForecasts,
    setTempArea,
  };
});
