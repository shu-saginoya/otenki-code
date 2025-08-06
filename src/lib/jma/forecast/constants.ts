export const API_ENDPOINTS = {
  FORECAST: "https://www.jma.go.jp/bosai/forecast/data/forecast/",
} as const;

export const TIME_RANGES = {
  EARLY_MORNING: "00:00-06:00",
  MORNING: "06:00-12:00",
  AFTERNOON: "12:00-18:00",
  NIGHT: "18:00-24:00",
} as const;
