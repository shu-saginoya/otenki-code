/**
 * @file トップページのコンポーネント
 */
"use client";

import { useState, useEffect } from "react";

import {
  CurrentlyArea,
  ForecastCard,
  SimpleForecastCard,
} from "@/components/features";
import { Col, Grid } from "@/components/ui";
import { useJmaForecast } from "@/hooks/features";
import { useAppSelector } from "@/lib/hooks";
import { extractDailyForecast } from "@/lib/jma";

import type { DailyForecastSimple, DailyForecastDetail } from "@/types";

export default function Home() {
  // Reduxの状態を取得
  const { selectedArea } = useAppSelector((state) => state.areas);
  const currentlyAreaName = `${selectedArea.office?.name ?? ""} ${
    selectedArea.class20?.name ?? ""
  }`.trim();

  const { forecast, loading, error } = useJmaForecast();
  const [forecastsDetail, setForecastsDetail] =
    useState<DailyForecastDetail[]>();
  const [forecastsSimple, setForecastsSimple] =
    useState<DailyForecastSimple[]>();

  useEffect(() => {
    if (!selectedArea || !forecast) return;
    const { detailList, simpleList } = extractDailyForecast(
      forecast,
      selectedArea
    );
    setForecastsDetail(detailList);
    setForecastsSimple(simpleList);
  }, [selectedArea, forecast]);

  if (loading) {
    return (
      <p role="status" aria-live="polite" aria-busy="true">
        Loading...
      </p>
    );
  }
  if (error) {
    return <p role="alert">Error: {error.message}</p>;
  }

  return (
    <Grid gap={4}>
      <Col cols={12}>
        <CurrentlyArea area={currentlyAreaName} />
      </Col>
      <Col cols={12}>
        {forecastsDetail?.map((forecast) => (
          <ForecastCard key={forecast.date} {...forecast} />
        ))}
        {forecastsSimple?.map((forecast) => (
          <SimpleForecastCard key={forecast.date} {...forecast} />
        ))}
      </Col>
    </Grid>
  );
}
