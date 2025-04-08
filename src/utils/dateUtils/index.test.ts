import {
  validateDateFormat,
  formatDate,
  formatRelative,
  sortWeatherByDate,
  formatWeatherDate,
  isSameDate,
} from "./index";

describe("dateUtils", () => {
  test("validateDateFormat should return true for valid date", () => {
    expect(validateDateFormat("2025-04-03")).toBe(true);
  });

  test("validateDateFormat should return false for invalid date", () => {
    expect(validateDateFormat("invalid-date")).toBe(false);
  });

  test("formatDate should format date correctly", () => {
    expect(formatDate("2025-04-03")).toBe("2025/04/03 (木)");
  });

  test("formatRelative should return relative time", () => {
    const now = new Date();
    expect(formatRelative(now)).toBe("数秒前");
  });

  test("sortWeatherByDate should sort weather data by date", () => {
    const weatherData = [
      { date: "2025-04-05", temp: 20 },
      { date: "2025-04-03", temp: 15 },
      { date: "2025-04-04", temp: 18 },
    ];
    const sorted = sortWeatherByDate(weatherData, "date");
    expect(sorted[0].date).toBe("2025-04-03");
    expect(sorted[1].date).toBe("2025-04-04");
    expect(sorted[2].date).toBe("2025-04-05");
  });

  test("formatWeatherDate should return '今日', '明日', or '明後日'", () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(today.getDate() + 2);

    expect(formatWeatherDate(today)).toBe("今日");
    expect(formatWeatherDate(tomorrow)).toBe("明日");
    expect(formatWeatherDate(dayAfterTomorrow)).toBe("明後日");
  });

  test("isSameDate should return true for the same day", () => {
    expect(isSameDate("2025-04-03", "2025-04-03")).toBe(true);
  });

  test("isSameDate should return false for different days", () => {
    expect(isSameDate("2025-04-03", "2025-04-04")).toBe(false);
  });
});
