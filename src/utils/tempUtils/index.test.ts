import { generateDailyTemps } from "./index";

import type { Hour } from "@/types";

describe("generateDailyTemps", () => {
  const defaultParams = {
    tMax: 25,
    tMinToday: 15,
    tMinNext: 14,
  };

  describe("基本機能", () => {
    test("デフォルトのパラメータで正しく動作する", () => {
      const result = generateDailyTemps(defaultParams);

      expect(result).toHaveProperty("hourly");
      expect(result).toHaveProperty("morning");
      expect(result).toHaveProperty("evening");
      expect(Object.keys(result.hourly)).toHaveLength(24);
    });

    test("気温は指定された範囲内に収まる", () => {
      const { hourly } = generateDailyTemps(defaultParams);

      Object.values(hourly).forEach((temp) => {
        expect(temp).toBeGreaterThanOrEqual(
          Math.min(defaultParams.tMinToday, defaultParams.tMinNext)
        );
        expect(temp).toBeLessThanOrEqual(defaultParams.tMax);
      });
    });
  });

  describe("カスタム時刻設定", () => {
    test("カスタムの朝夕時刻で正しく動作する", () => {
      const params = {
        ...defaultParams,
        morningHour: 7 as Hour,
        eveningHour: 19 as Hour,
      };

      const result = generateDailyTemps(params);

      expect(result.hourly[7]).toBe(result.morning);
      expect(result.hourly[19]).toBe(result.evening);
    });
  });

  describe("エラーケース", () => {
    test("無効な朝の時刻でエラーを投げる", () => {
      expect(() => {
        generateDailyTemps({
          ...defaultParams,
          morningHour: 24 as Hour,
        });
      }).toThrow("Invalid hour");
    });

    test("無効な夕方の時刻でエラーを投げる", () => {
      expect(() => {
        generateDailyTemps({
          ...defaultParams,
          eveningHour: -1 as Hour,
        });
      }).toThrow("Invalid hour");
    });
  });

  describe("気温の特性", () => {
    test("14時（PEAK_HOUR）の気温変化が期待通りである", () => {
      const testParams = {
        tMax: 30, // より大きな気温差をつける
        tMinToday: 15,
        tMinNext: 14,
      };
      const { hourly } = generateDailyTemps(testParams);
      const peakTemp = hourly[14];

      // 気温変化の確認
      expect(peakTemp).toBeGreaterThan(hourly[5]); // 朝5時より高い
      expect(peakTemp - hourly[5]).toBeGreaterThan(5); // 朝5時との差が5度以上

      // 気温のピークを確認
      expect(peakTemp).toBeCloseTo(testParams.tMax, 1); // 最高気温に近い（小数点1桁の精度）
    });

    test("5時（MIN_MORNING_HOUR）が当日の最低気温に近い", () => {
      const { hourly } = generateDailyTemps(defaultParams);
      const morningMinTemp = hourly[5];

      expect(Math.abs(morningMinTemp - defaultParams.tMinToday)).toBeLessThan(
        1
      );
    });
  });

  describe("戻り値の型チェック", () => {
    test("全ての時間の気温が数値型である", () => {
      const { hourly } = generateDailyTemps(defaultParams);

      Object.values(hourly).forEach((temp) => {
        expect(typeof temp).toBe("number");
        expect(Number.isFinite(temp)).toBe(true);
      });
    });

    test("気温は小数点以下1桁に丸められている", () => {
      const { hourly } = generateDailyTemps(defaultParams);

      Object.values(hourly).forEach((temp) => {
        const decimalPlaces = temp.toString().split(".")[1]?.length || 0;
        expect(decimalPlaces).toBeLessThanOrEqual(1);
      });
    });
  });
});
