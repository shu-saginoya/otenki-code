import { JSX } from "react";

import { Card, Text, Stack } from "@/components";
import { weatherCodeMap, WeatherCode } from "@/utils";

import type { TimeAndValue } from "@/types";

export type ForecastCardProps = {
  date: string;
  weather: string;
  weatherCode: WeatherCode;
  wind: string;
  wave?: string;
  pops?: TimeAndValue[];
  tempMax?: string;
  tempMin?: string;
};

/**
 * 天気予報カード
 */
export const ForecastCard = ({
  date,
  weather,
  weatherCode,
  wind,
  wave,
  pops,
  tempMax,
  tempMin,
}: ForecastCardProps): JSX.Element => {
  return (
    <Card>
      <Text>date: {date}</Text>
      <hr />
      <Stack justify="center">
        <Text>{tempMin || "-"}</Text>
        <Text>/</Text>
        <Text>{tempMax || "-"}</Text>
      </Stack>
      <Text>{weatherCodeMap[weatherCode]}</Text>
      <Text>{weather}</Text>
      <Text>{wind}</Text>
      {wave && <Text>{wave}</Text>}
      {pops && <Text>{pops.join(",")}</Text>}
    </Card>
  );
};
