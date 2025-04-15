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
