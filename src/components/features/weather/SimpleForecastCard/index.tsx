import { JSX } from "react";

import { Temp } from "@/components/features";
import { Card, Text, Stack, ShapeImage } from "@/components/ui";
import {
  jmaWeatherCodeMap,
  type JmaWeatherCode,
  getJmaWeatherIcon,
} from "@/lib/jma";
import { formatDate } from "@/utils";

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
  const jmaWeatherIcon = getJmaWeatherIcon(weatherCode);
  return (
    <Card>
      <Stack justify="center" className="py-1">
        <Text>{formatDate(date, "M/D (ddd)")}</Text>
      </Stack>
      <hr />
      <Stack justify="center" align="center" gap={1}>
        <Temp
          number={tempMin ? Number(tempMin) : undefined}
          type={"lowest"}
          size={"lg"}
        ></Temp>
        <Text>/</Text>
        <Temp
          number={tempMax ? Number(tempMax) : undefined}
          type={"highest"}
          size={"lg"}
        ></Temp>
      </Stack>
      <Stack direction="col" align="center">
        {jmaWeatherIcon && (
          <ShapeImage
            src={jmaWeatherIcon.dayIcon}
            alt=""
            width={48}
            height={48}
          ></ShapeImage>
        )}
        <Text size={"sm"}>{jmaWeatherCodeMap[weatherCode]}</Text>
        <Text>{pop ? `${pop}%` : "-"}</Text>
      </Stack>
    </Card>
  );
};
