"use client";

import { useState, useEffect } from "react";

import {
  Grid,
  Col,
  CurrentlyArea,
  ForecastCard,
  SimpleForecastCard,
} from "@/components";
import { useJmaForecast } from "@/hooks";
import { useAppSelector } from "@/lib/hooks";
import { extractDailyForecast } from "@/utils";

import type { DailyForecastSimple, DailyForecastDetail } from "@/types";

export default function Home() {
  const [area, setArea] = useState<string>("");

  // Reduxの状態を取得
  const areas = useAppSelector((state) => state.areas);
  const { forecast, loading, error } = useJmaForecast();
  const [forecastsDetail, setForecastsDetail] =
    useState<DailyForecastDetail[]>();
  const [forecastsSimple, setForecastsSimple] =
    useState<DailyForecastSimple[]>();

  useEffect(() => {
    if (!areas.areaLv1 || !areas.areaLv2 || !areas.areaLv3 || !forecast) return;
    const { detailList, simpleList } = extractDailyForecast(
      forecast,
      areas.areaLv3.code
    );
    setForecastsDetail(detailList);
    setForecastsSimple(simpleList);

    setArea(
      `${areas.areaLv1.name} ${areas.areaLv2.name} ${areas.areaLv3.name}`
    );
  }, [areas, forecast]);

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
        <CurrentlyArea area={area} />
      </Col>
      <Col cols={12}>
        {forecastsDetail && (
          <ForecastCard
            date={forecastsDetail[0].date}
            weather={forecastsDetail[0].weatherText}
            weatherCode={forecastsDetail[0].weatherCode}
            wind={forecastsDetail[0].wind}
            wave={forecastsDetail[0].wave}
            pops={forecastsDetail[0].pops}
            tempMax={forecastsDetail[0].temps?.[0]?.value}
            tempMin={forecastsDetail[0].temps?.[1]?.value}
          ></ForecastCard>
        )}
        {forecastsSimple && (
          <SimpleForecastCard
            date={forecastsSimple[3].date}
            weatherCode={forecastsSimple[3].weatherCode}
            pop={forecastsSimple[3].pop}
            tempMax={forecastsSimple[3].tempMax}
            tempMin={forecastsSimple[3].tempMin}
          ></SimpleForecastCard>
        )}
      </Col>
    </Grid>
  );
}
