"use client";

import { useState, useEffect } from "react";

import {
  Grid,
  Col,
  CurrentlyArea,
  ForecastCard,
  SimpleForecastCard,
} from "@/components";
import { useAppSelector } from "@/lib/hooks";
import { useJmaForecast, extractDailyForecast } from "@/lib/jma";

import type { DailyForecastSimple, DailyForecastDetail } from "@/types";

export default function Home() {
  const [currentlyAreaName, setCurrentlyAreaName] = useState<string>("");

  // Reduxの状態を取得
  const { selectedArea } = useAppSelector((state) => state.areas);
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

    setCurrentlyAreaName(
      `${selectedArea.office?.name} ${selectedArea.class20?.name}`
    );
  }, [selectedArea, forecast]);

  if (loading)
    return (
      <Grid gap={4}>
        <Col cols={12}>
          <p>loading...</p>
        </Col>
      </Grid>
    );

  if (error)
    return (
      <Grid gap={4}>
        <Col cols={12}>
          <p>Error: {error.message}</p>
        </Col>
      </Grid>
    );

  return (
    <Grid gap={4}>
      <Col cols={12}>
        <CurrentlyArea area={currentlyAreaName} />
      </Col>
      <Col cols={12}>
        {forecastsDetail &&
          forecastsDetail.map((forecast) => (
            <ForecastCard
              key={forecast.date}
              date={forecast.date}
              weather={forecast.weatherText}
              weatherCode={forecast.weatherCode}
              wind={forecast.wind}
              wave={forecast.wave}
              pops={forecast.pops}
              tempMax={forecast.tempMax}
              tempMin={forecast.tempMin}
            ></ForecastCard>
          ))}
        {forecastsSimple &&
          forecastsSimple.map((forecast) => (
            <SimpleForecastCard
              key={forecast.date}
              date={forecast.date}
              weatherCode={forecast.weatherCode}
              pop={forecast.pop}
              tempMax={forecast.tempMax}
              tempMin={forecast.tempMin}
            ></SimpleForecastCard>
          ))}
      </Col>
    </Grid>
  );
}
