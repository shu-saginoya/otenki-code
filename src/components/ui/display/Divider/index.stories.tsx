import { Meta, StoryObj } from "@storybook/react";

import { Divider } from "./";

export default {
  title: "Parts/Divider",
  component: Divider,
  argTypes: {
    text: {
      control: { type: "text" },
      description: "線の上に表示するテキスト",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: { type: "text" },
      description: "追加のクラス名（任意）",
      table: {
        type: { summary: "string" },
      },
    },
  },
} as Meta<typeof Divider>;

type Story = StoryObj<typeof Divider>;

// デフォルト
export const Default: Story = {
  args: {
    text: "または",
  },
};

// 長いテキスト
export const LongText: Story = {
  args: {
    text: "こちらもおすすめ",
  },
};

// カスタムスタイル
export const CustomStyle: Story = {
  args: {
    text: "もっと見る",
    className: "my-8",
  },
};
