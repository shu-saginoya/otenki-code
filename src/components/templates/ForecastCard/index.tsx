import { JSX, createElement } from "react";

import { Card, Text, Stack, Badge, Temp, ShapeImage } from "@/components";
import {
  type JmaWeatherCode,
  jmaWeatherCodeMap,
  getJmaWeatherIcon,
} from "@/lib/jma";
import {
  formatDate,
  getRelativeDayLabel,
  toHalfWidthSpace,
  iconMap,
} from "@/utils";

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
  const jmaWeatherIcon = getJmaWeatherIcon(weatherCode);

  return (
    <Card>
      <Stack direction="col" gap={2}>
        <Stack justify="center" align="center" gap={2}>
          {relativeDayLabel && <Badge content={relativeDayLabel}></Badge>}
          <Text>{formatDate(date, "YYYY年M月D日 ddd曜日")}</Text>
        </Stack>
        <hr />
        <Stack justify="center" align="center" gap={2}>
          <Temp
            number={tempMin ? Number(tempMin) : undefined}
            type={"lowest"}
            size={"3xl"}
          ></Temp>
          <Text>/</Text>
          <Temp
            number={tempMax ? Number(tempMax) : undefined}
            type={"highest"}
            size={"3xl"}
          ></Temp>
        </Stack>
        <Stack align="center" gap={2}>
          {jmaWeatherIcon && (
            <ShapeImage
              src={jmaWeatherIcon.dayIcon}
              alt=""
              width={64}
              height={64}
            ></ShapeImage>
          )}
          {jmaWeatherCodeMap[weatherCode]}
        </Stack>

        <Stack direction="col">
          <Stack align="center" gap={2}>
            天気{createElement(iconMap["partlySunny"])}
            {toHalfWidthSpace(weather)}
          </Stack>
          <Stack align="center" gap={2}>
            風{createElement(iconMap["windy"])}
            {toHalfWidthSpace(wind)}
          </Stack>
          {wave && (
            <Stack align="center" gap={2}>
              波{createElement(iconMap["waves"])}
              {toHalfWidthSpace(wave)}
            </Stack>
          )}
          {pops && (
            <Stack gap={2} align="center">
              <Text as={"p"}>降水確率:</Text>
              <Stack direction="col" align="center">
                <Text size="sm">0-6</Text>
                <Text>{pops["00:00-06:00"] || "-"}</Text>
              </Stack>
              <Stack direction="col" align="center">
                <Text size="sm">6-12</Text>
                <Text>{pops["06:00-12:00"] || "-"}</Text>
              </Stack>
              <Stack direction="col" align="center">
                <Text size="sm">12-18</Text>
                <Text>{pops["12:00-18:00"] || "-"}</Text>
              </Stack>
              <Stack direction="col" align="center">
                <Text size="sm">18-24</Text>
                <Text>{pops["18:00-24:00"] || "-"}</Text>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
