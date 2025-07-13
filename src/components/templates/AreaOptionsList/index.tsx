"use client";

import { JSX } from "react";

import { List, ListItem, Button } from "@/components";

import type { JmaAreaCode } from "@/types";

export type AreaOptionsListProps = {
  options: Record<string, { name: string }>;
  action: (code: JmaAreaCode) => void;
  goBackAction: () => void;
};

/**
 * エリア選択肢リスト
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
  if (!options || Object.keys(options).length === 0) {
    return <p>選択肢がありません。</p>;
  }

  return (
    <List>
      {Object.entries(options).map(([key, value]) => (
        <ListItem key={key}>
          <Button
            color="background"
            appendIcon="arrowForward"
            block
            onClick={() => action(key)}
            aria-label={`選択: ${value.name}`}
          >
            {value.name}
          </Button>
        </ListItem>
      ))}
      <ListItem>
        <Button
          color="background"
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
