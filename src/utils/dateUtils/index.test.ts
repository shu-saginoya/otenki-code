import dayjs from "@/lib/dayjs";

import {
  validateDateFormat,
  formatDate,
  formatRelative,
  sortWeatherByDate,
  getRelativeDayLabel,
  isSameDate,
  getHour,
} from "./index";

describe("dateUtils", () => {
  describe("validateDateFormat", () => {
    it("正しい日付形式を検証できる", () => {
      expect(validateDateFormat("2025-04-03")).toBeTruthy();
      expect(validateDateFormat("2025-04-03T15:30:00")).toBeTruthy();
      expect(validateDateFormat("2025-04-03 15:30:00")).toBeTruthy();
      expect(validateDateFormat("2023-08-21T15:30:00+09:00")).toBeTruthy();
    });
    it("不正な日付形式を検出できる", () => {
      expect(validateDateFormat("2025/04/03")).toBeFalsy();
      expect(validateDateFormat("invalid-date")).toBeFalsy();
      expect(validateDateFormat("")).toBeFalsy();
    });
  });

  describe("formatDate", () => {
    it("デフォルトフォーマットで日付をフォーマットできる", () => {
      const date = "2025-04-03";
      expect(formatDate(date)).toBe("2025/04/03 (木)");
    });

    it("カスタムフォーマットで日付をフォーマットできる", () => {
      const date = "2025-04-03";
      expect(formatDate(date, "YYYY年MM月DD日")).toBe("2025年04月03日");
    });
  });

  describe("formatRelative", () => {
    it("相対時間を正しく表示できる", () => {
      const now = dayjs();
      const twoHoursAgo = now.subtract(2, "hour");
      expect(formatRelative(twoHoursAgo)).toBe("2時間前");
    });
  });

  describe("sortWeatherByDate", () => {
    it("日付でデータを正しくソートできる", () => {
      const weatherData = [
        { date: "2025-04-03", temp: 20 },
        { date: "2025-04-01", temp: 18 },
        { date: "2025-04-02", temp: 19 },
      ];

      const sorted = sortWeatherByDate(weatherData, "date");
      expect(sorted[0].date).toBe("2025-04-01");
      expect(sorted[1].date).toBe("2025-04-02");
      expect(sorted[2].date).toBe("2025-04-03");
    });
  });

  describe("getRelativeDayLabel", () => {
    beforeEach(() => {
      // テスト用に現在時刻を固定
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2025-04-03"));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("今日・明日・明後日のラベルを正しく返せる", () => {
      expect(getRelativeDayLabel("2025-04-03")).toBe("きょう");
      expect(getRelativeDayLabel("2025-04-04")).toBe("あした");
      expect(getRelativeDayLabel("2025-04-05")).toBe("あさって");
      expect(getRelativeDayLabel("2025-04-06")).toBe(false);
    });
  });

  describe("isSameDate", () => {
    it("同じ日付を正しく判定できる", () => {
      expect(isSameDate("2025-04-03", "2025-04-03T15:30:00")).toBeTruthy();
      expect(isSameDate("2025-04-03", "2025-04-04")).toBeFalsy();
    });

    it("不正な日付形式でエラーを投げる", () => {
      expect(() => isSameDate("invalid-date", "2025-04-03")).toThrow();
      expect(() => isSameDate("2025-04-03", "invalid-date")).toThrow();
    });
  });

  describe("getHour", () => {
    it("時間を正しく抽出できる", () => {
      expect(getHour("2025-04-03T15:30:00")).toBe(15);
      expect(getHour("2025-04-03T09:00:00")).toBe(9);
    });
  });
});
