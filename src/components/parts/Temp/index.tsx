import { JSX } from "react";

import { Text } from "@/components";
import { cn } from "@/lib/cn";

const tempTypeMap = {
  default: "text-current",
  highest: "text-red-500",
  lowest: "text-blue-500",
} as const;

type TempType = keyof typeof tempTypeMap;

export type TempProps = {
  number: number;
  type?: TempType;
};

/**
 * 気温の表示コンポーネント
 *
 * @param number 温度
 * @param type 温度のタイプ（default, highest, lowest）
 * @returns
 */
export const Temp = ({ number, type = "default" }: TempProps): JSX.Element => {
  if (typeof number !== "number" || isNaN(number)) return <Text>-</Text>;
  return (
    <span
      className={cn("flex items-center gap-1", tempTypeMap[type])}
      aria-label={`${number}度`}
    >
      <Text>{number}</Text>
      <Text>℃</Text>
    </span>
  );
};
