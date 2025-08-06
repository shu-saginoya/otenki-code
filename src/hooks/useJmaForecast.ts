"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { fetchForecast, type JmaForecastResponse } from "@/lib/jma";
import { RootState } from "@/lib/store";

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
