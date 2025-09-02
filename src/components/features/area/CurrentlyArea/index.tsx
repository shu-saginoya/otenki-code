"use client";

import { useRouter } from "next/navigation";
import { JSX } from "react";

import { Stack, Text, IconButton } from "@/components/ui";

export type CurrentlyAreaProps = {
  area?: string;
  note?: string;
};

/**
 * 現在選択されている地域名を表示するためのコンポーネント
 *
 * @param {string} area - 地域名
 * @param {string} note - 注意書き
 */
export const CurrentlyArea = ({
  area,
  note,
}: CurrentlyAreaProps): JSX.Element => {
  const router = useRouter();
  const open = (): void => {
    router.push("/select-area");
  };

  return (
    <Stack direction="col" align="center" gap={1}>
      <Stack align="center" gap={2}>
        <Text size="xl">{area || "地域を選択してください"}</Text>
        <IconButton
          icon="publishedWithChanges"
          color="primary"
          onClick={open}
        />
      </Stack>
      <Text>{note}</Text>
    </Stack>
  );
};
