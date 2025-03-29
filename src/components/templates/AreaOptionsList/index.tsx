"use client";
import type { Area } from "@/types";

import { JSX } from "react";
import { List, ListItem, Button } from "@/components";

export type AreaOptionsListProps = {
  options: Record<string, { name: string }>;
  action: (area: Area) => void;
  goBackAction: () => void;
};

/**
 * 現在選択されている地域名を表示するためのコンポーネント
 *
 * @param {Record<string, { name: string }>} options - 選択肢オブジェクト
 * @param {() => void} action - 選択時の関数
 * @param {() => void} goBackAction - 戻る時の関数
 */
export const AreaOptionsList = ({
  options,
  action,
  goBackAction,
}: AreaOptionsListProps): JSX.Element => {
  return (
    <List>
      {Object.entries(options).map(([key, value]) => (
        <ListItem key={key}>
          <Button
            color="none"
            appendIcon="arrowForward"
            block
            onClick={() => action({ name: value.name, code: key })}
          >
            {value.name}
          </Button>
        </ListItem>
      ))}
      <ListItem>
        <Button
          color="none"
          appendIcon="arrowBackUp"
          block
          onClick={goBackAction}
        >
          もどる
        </Button>
      </ListItem>
    </List>
  );
};
