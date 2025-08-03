import { JSX } from "react";

import { Card, Text, Stack } from "@/components";
import { jmaWeatherCodeMap, type JmaWeatherCode } from "@/lib/jma";

export type SimpleForecastCardProps = {
  date: string;
  weatherCode: JmaWeatherCode;
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
      <Text>{jmaWeatherCodeMap[weatherCode]}</Text>
      <Text>{pop}</Text>
    </Card>
  );
};
