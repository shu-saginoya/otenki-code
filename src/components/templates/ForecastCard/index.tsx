import { JSX } from "react";

import { Card, Text, Stack, Badge, Temp } from "@/components";
import { type JmaWeatherCode, jmaWeatherCodeMap } from "@/lib/jma";
import { formatDate, getRelativeDayLabel } from "@/utils";

export type ForecastCardProps = {
  date: string;
  weather: string;
  weatherCode: JmaWeatherCode;
  wind: string;
  wave?: string;
  pops?: {
    "00:00-06:00": string;
    "06:00-12:00": string;
    "12:00-18:00": string;
    "18:00-24:00": string;
  };
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
        <Temp
          number={tempMin ? Number(tempMin) : undefined}
          type={"lowest"}
        ></Temp>
        <Text>/</Text>
        <Temp
          number={tempMax ? Number(tempMax) : undefined}
          type={"highest"}
        ></Temp>
      </Stack>
      <Text as={"p"}>天気コード: {jmaWeatherCodeMap[weatherCode]}</Text>
      <Text as={"p"}>天気: {weather}</Text>
      <Text as={"p"}>風: {wind}</Text>
      {wave && <Text as={"p"}>波: {wave}</Text>}
      {pops && (
        <>
          <Text as={"p"}>降水確率:</Text>
          <Text as={"p"}>00:00-06:00: {pops["00:00-06:00"]}</Text>
          <Text as={"p"}>06:00-12:00: {pops["06:00-12:00"]}</Text>
          <Text as={"p"}>12:00-18:00: {pops["12:00-18:00"]}</Text>
          <Text as={"p"}>18:00-24:00: {pops["18:00-24:00"]}</Text>
        </>
      )}
    </Card>
  );
};
