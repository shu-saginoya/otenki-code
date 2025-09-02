import { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./";

export default {
  title: "Parts/Badge",
  component: Badge,
  argTypes: {
    content: {
      control: { type: "text" },
      description: "バッジのテキスト",
      table: {
        type: { summary: "string" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["paint", "outlined", "tonal"],
      description: "バッジのバリアント",
      table: {
        type: { summary: "string" },
      },
    },
    color: {
      control: { type: "text" },
      description: "バッジの色",
      table: {
        type: { summary: "string" },
      },
    },
  },
} as Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

// デフォルトのバッジ
export const Default: Story = {
  args: {
    content: "2",
  },
};

// 空のバッジ
export const Empty: Story = {
  args: {
    color: "error",
  },
};

// 文字のバッジ
export const Text: Story = {
  args: {
    content: "あした",
    variant: "tonal",
    color: "warning",
  },
};
