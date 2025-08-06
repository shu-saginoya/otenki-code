import { fetcher } from "@/utils/index";

import { API_ENDPOINTS } from "./constants";
import { ForecastError } from "./errors";

import type { JmaForecastResponse } from "./types";

/**
 * コードの形式が正しいか検証
 * @param code 予報区コード
 * @returns 真偽値
 */
const isValidOfficeCode = (code: string): boolean => /^[0-9]{6}$/.test(code);

/**
 * レスポンスが予報データの形式かどうかを検証
 * @param data レスポンスデータ
 * @returns 真偽値
 */
export const isForecastResponse = (
  data: Partial<JmaForecastResponse>
): data is JmaForecastResponse => {
  return data && typeof data !== "undefined";
};

/**
 * 指定した予報区の天気予報を取得
 * @param officeCode 予報区コード（6桁の数字）
 * @returns JmaForecastResponse型の天気予報データ
 * @throws ForecastError - 無効なコード形式またはレスポンス形式が不正な場合
 */
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
