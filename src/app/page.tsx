/**
 * @file トップページのコンポーネント
 */
"use client";

import { CurrentlyArea } from "@/components/features";
import { Col, Grid } from "@/components/ui";
import { useAppSelector } from "@/lib/hooks";

// Phase 2 の地域選択確認中は、予報取得・表示を停止する。
// 天気予報の実装を再開する際は、このコメント内のコードを復元する。
// import { useState, useEffect } from "react";
// import { ForecastCard, SimpleForecastCard } from "@/components/features";
// import { useJmaForecast } from "@/hooks/features";
// import { extractDailyForecast } from "@/lib/jma";
// import type { DailyForecastSimple, DailyForecastDetail } from "@/types";

export default function Home() {
  // Reduxの状態を取得
  const { selectedArea } = useAppSelector((state) => state.areas);
  const currentlyAreaName = `${selectedArea.office?.name ?? ""} ${
    selectedArea.class20?.name ?? ""
  }`.trim();

  /*
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

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  */

  return (
    <Grid gap={4}>
      <Col cols={12}>
        <CurrentlyArea area={currentlyAreaName} />
      </Col>
      {/*
      <Col cols={12}>
        {forecastsDetail?.map((forecast) => (
          <ForecastCard key={forecast.date} {...forecast} />
        ))}
        {forecastsSimple?.map((forecast) => (
          <SimpleForecastCard key={forecast.date} {...forecast} />
        ))}
      </Col>
      */}
    </Grid>
  );
}
