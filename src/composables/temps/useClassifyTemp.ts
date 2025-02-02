// 気温の分類を返すユーティリティ

import type { TempClass } from "@/types/tempClass";

export const useClassifyTemp = () => {
  // 気温の境界となる温度
  const temps: number[] = [4, 8, 12, 16, 20, 24, 28, 32];

  // 気温の分類名
  const classValues: TempClass[] = [
    "freezing",
    "cold",
    "chilly",
    "cool",
    "warm",
    "hot",
    "humid",
    "melting",
    "boiling",
  ];

  // 気温をもとに分類名を返す関数
  const tempClass = (temp: number): TempClass => {
    for (let i = 0; i < temps.length; i++) {
      if (temp <= temps[i]) {
        return classValues[i];
      }
    }
    return classValues[8];
  };

  return {
    tempClass,
  };
};
