// 最高気温と最低気温をもとに演算するユーティリティ

import { computed } from "vue";

export const useTempCalc = (maxTemp: number, minTempList: number[]) => {
  // 最低気温は複数ある可能性があるので平均を算出する
  const minTemp = computed<number>(() => {
    const sum = minTempList.reduce((x, y) => x + y);
    return sum / minTempList.length;
  });

  // 最高気温と最低気温の平均
  const averageTemp = computed<number>(() => {
    return (maxTemp + minTemp.value) / 2;
  });

  // 最高気温と最低気温の差
  const differenceTemp = computed<number>(() => {
    return maxTemp - minTemp.value;
  });

  // 朝と夕方ころの予想気温
  const morningAndEveningTemp = computed<number>(() => {
    return differenceTemp.value / 4 + minTemp.value;
  });

  return {
    averageTemp,
    differenceTemp,
    morningAndEveningTemp,
  };
};
