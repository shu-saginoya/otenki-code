import { JSX } from "react";

import { Card, Text, Stack } from "@/components";
import { weatherCodeMap, WeatherCode } from "@/utils";

export type SimpleForecastCardProps = {
  date: string;
  weatherCode: WeatherCode;
  pop: string;
  tempMax: string | undefined;
  tempMin: string | undefined;
};

/**
 * 天気予報カード
 */
export const SimpleForecastCard = ({
  date,
  weatherCode,
  pop,
  tempMax,
  tempMin,
}: SimpleForecastCardProps): JSX.Element => {
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
      <Text>{pop}</Text>
    </Card>
  );
};
