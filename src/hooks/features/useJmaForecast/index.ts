"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { fetchForecast, type JmaForecastResponse } from "@/lib/jma";
import { RootState } from "@/lib/store";

/**
 * JMA（気象庁）の天気予報情報を状態として管理するカスタムフック
 * このフックは、選択されたエリアに基づいて天気予報を取得し、状態にセットして管理するためのものです。
 * @returns 天気予報情報、ローディング状態、エラー情報を含むオブジェクト
 */
export const useJmaForecast = () => {
  const { selectedArea } = useSelector((state: RootState) => state.areas);
  const office = selectedArea?.office;

  const [forecast, setForecast] = useState<JmaForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!office) return;

    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchForecast(office.code);
        setForecast(result);
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
