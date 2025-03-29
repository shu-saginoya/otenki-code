"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { Grid, Col, CurrentlyArea } from "@/components";

export default function Home() {
  const [area, setArea] = useState<string>("");

  // Reduxの状態を取得
  const areas = useAppSelector((state) => state.areas);

  useEffect(() => {
    if (areas.areaLv1 && areas.areaLv2 && areas.areaLv3) {
      setArea(
        `${areas.areaLv1.name} ${areas.areaLv2.name} ${areas.areaLv3.name}`
      );
    }
  }, [areas]);

  return (
    <Grid gap={4}>
      <Col cols={12}>
        <CurrentlyArea area={area} />
      </Col>
    </Grid>
  );
}
