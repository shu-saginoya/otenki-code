import { JSX } from "react";

import { Card, Text, Stack, Badge, Temp } from "@/components";
import {
  weatherCodeMap,
  WeatherCode,
  formatDate,
  getRelativeDayLabel,
} from "@/utils";

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
  const relativeDayLabel = getRelativeDayLabel(date);

  return (
    <Card>
      <Stack justify="center" align="center" gap={2}>
        {relativeDayLabel && <Badge content={relativeDayLabel}></Badge>}
        <Text>{formatDate(date)}</Text>
      </Stack>
      <hr />
      <Stack justify="center">
        <Temp number={Number(tempMin)} type={"lowest"}></Temp>
        <Text>/</Text>
        <Temp number={Number(tempMax)} type={"highest"}></Temp>
      </Stack>
      <Text as={"p"}>天気コード: {weatherCodeMap[weatherCode]}</Text>
      <Text as={"p"}>天気: {weather}</Text>
      <Text as={"p"}>風: {wind}</Text>
      {wave && <Text as={"p"}>波: {wave}</Text>}
      {pops && <Text as={"p"}>降水確率: {pops.join(",")}</Text>}
    </Card>
  );
};
