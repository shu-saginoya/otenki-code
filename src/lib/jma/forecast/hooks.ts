"use client";

// 天気予報を取得する関数
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/lib/store";
import { fetcher } from "@/utils/index";

import type { JmaForecastResponse } from "./types";

// 型ガード関数
const isForecastResponse = (
  data: Partial<JmaForecastResponse>
): data is JmaForecastResponse => {
  return data && typeof data !== "undefined";
};

export const useJmaForecast = () => {
  // Reduxの状態から選択された地域情報を取得
  const { selectedArea } = useSelector((state: RootState) => state.areas);
  const office = selectedArea?.office;

  // フェッチするURLを生成
  const [forecast, setForecast] = useState<JmaForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!office) return;

    const accessPoint = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
    const url = `${accessPoint}${office.code}.json`;

    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcher<JmaForecastResponse>(url);
        if (isForecastResponse(result)) {
          setForecast(result);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("予報の取得に失敗しました")
        );
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [office]);

  return {
    forecast,
    loading,
    error,
  };
};
