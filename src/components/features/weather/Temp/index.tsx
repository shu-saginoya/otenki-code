import { JSX } from "react";

import { Text } from "@/components/ui";
import { cn } from "@/lib/cn";
import { fontSizeMap, type FontSize } from "@/styles";

const tempTypeMap = {
  default: "text-current",
  highest: "text-red-500",
  lowest: "text-blue-500",
} as const;

type TempType = keyof typeof tempTypeMap;

export type TempProps = {
  number?: number;
  type?: TempType;
  size?: FontSize;
};

/**
 * 気温の表示コンポーネント
 *
 * @param number 温度
 * @param type 温度のタイプ（default, highest, lowest）
 * @returns
 */
export const Temp = ({
  number,
  type = "default",
  size,
}: TempProps): JSX.Element => {
  if (typeof number !== "number" || isNaN(number))
    return <Text className={size && fontSizeMap[size]}>-</Text>;
  return (
    <span
      className={cn(tempTypeMap[type], size && fontSizeMap[size])}
      aria-label={`${number}度`}
    >
      <Text>{number}</Text>
      <Text className="text-[0.75em]">℃</Text>
    </span>
  );
};
