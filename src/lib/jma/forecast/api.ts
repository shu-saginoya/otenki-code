import { fetcher } from "@/utils/index";

import { API_ENDPOINTS } from "./constants";
import { ForecastError } from "./errors";

import type { JmaForecastResponse } from "./types";

const isValidOfficeCode = (code: string): boolean => /^[0-9]{6}$/.test(code);

export const isForecastResponse = (
  data: Partial<JmaForecastResponse>
): data is JmaForecastResponse => {
  return data && typeof data !== "undefined";
};

export const fetchForecast = async (
  officeCode: string
): Promise<JmaForecastResponse> => {
  if (!isValidOfficeCode(officeCode)) {
    throw new ForecastError("Invalid office code format", "INVALID_CODE");
  }

  const url = `${API_ENDPOINTS.FORECAST}${officeCode}.json`;
  const result = await fetcher<JmaForecastResponse>(url);

  if (!isForecastResponse(result)) {
    throw new ForecastError(
      "Invalid forecast response format",
      "INVALID_RESPONSE"
    );
  }

  return result;
};
