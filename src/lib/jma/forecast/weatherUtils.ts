import { isSameDate, getHour, toHalfWidth } from "@/utils";

import { TIME_RANGES } from "./constants";

import type { TimeSeriesData, PopsByTimeRange } from "./types";

export const convertTemperatureData = (
  tempsForDay: TimeSeriesData[]
): { tempMin: string; tempMax: string } => {
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

  return { tempMin, tempMax };
};

export const convertPopsData = (
  pops: TimeSeriesData[],
  date: string
): PopsByTimeRange => {
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

  return popsForDay;
};

export const sanitizeWeatherText = (text: string): string => {
  return toHalfWidth(text).replace(/[<>]/g, "");
};
