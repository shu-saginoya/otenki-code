"use client";

import {
  TabGroup,
  TabList,
  Tab as HUTab,
  TabPanels,
  TabPanel,
} from "@headlessui/react";
import { ReactNode, JSX } from "react";

import { cn } from "@/lib/cn";
import { colorVariantMap, ColorVariant } from "@/styles";

import type { Color } from "@/types";

type TabItem = {
  label: string;
  content: ReactNode;
};

type TabProps = {
  items: TabItem[];
  defaultIndex?: number;
  variant?: ColorVariant;
  color?: Color;
  className?: string;
  onChange?: (index: number) => void;
};

/**
 * タブ切り替えコンポーネント
 * @param items - タブの項目（ラベルとコンテンツ）
 * @param defaultIndex - 初期選択タブのインデックス
 * @param variant - デザインバリアント
 * @param color - 色
 * @param className - 追加のクラス名
 * @param onChange - タブ変更時のコールバック
 */
export const Tab = ({
  items,
  defaultIndex = 0,
  variant = "tonal",
  color = "primary",
  className,
  onChange,
}: TabProps): JSX.Element => {
  return (
    <TabGroup defaultIndex={defaultIndex} onChange={onChange}>
      <TabList
        className={cn("flex gap-1 rounded-lg bg-foreground/10 p-1", className)}
      >
        {items.map((item) => (
          <HUTab
            key={item.label}
            className={cn(
              "w-full rounded font-medium transition-colors overflow-hidden",
              "focus-visible:outline-none focus-visible:ring",
              "data-[selected]:shadow",
              "data-[hover]:bg-foreground/5",
              "cursor-pointer"
            )}
          >
            {({ selected }) => (
              <span
                className={cn(
                  selected
                    ? colorVariantMap[variant](color)
                    : "text-foreground",
                  "inline-block w-full px-4 py-2"
                )}
              >
                {item.label}
              </span>
            )}
          </HUTab>
        ))}
      </TabList>
      <TabPanels className="mt-4">
        {items.map((item) => (
          <TabPanel key={item.label}>{item.content}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};
