"use client";

import { useState, useEffect } from "react";

import { Grid, Col, CurrentlyArea } from "@/components";
import { useJmaForecast } from "@/hooks";
import { useAppSelector } from "@/lib/hooks";
import { extractDailyForecast } from "@/utils";

export default function Home() {
  const [area, setArea] = useState<string>("");

  // Reduxの状態を取得
  const areas = useAppSelector((state) => state.areas);
  const { forecast, loading, error } = useJmaForecast();

  useEffect(() => {
    if (!areas.areaLv1 || !areas.areaLv2 || !areas.areaLv3 || !forecast) return;
    const { detailList, simpleList } = extractDailyForecast(
      forecast,
      areas.areaLv3.code
    );
    console.log(detailList);
    console.log(simpleList);

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
    </Grid>
  );
}
