import { Meta, StoryObj } from "@storybook/react";

import { Card } from "@/components";

export default {
  title: "Parts/Card",
  component: Card,
  argTypes: {
    children: {
      control: { type: "text" },
      description: "子要素",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: { type: "text" },
      description: "ユーティリティクラス",
      table: {
        type: { summary: "string" },
      },
    },
    variant: {
      control: { type: "text" },
      defaultValue: "default",
      description: "デザインの変更",
      table: {
        type: { summary: "string" },
      },
    },
    padding: {
      control: { type: "text" },
      defaultValue: "small",
      description: "内側のスペースの広さ",
      table: {
        type: { summary: "string" },
      },
    },
  },
} as Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

// デフォルトカード
export const Default: Story = {
  args: {
    children: "Default Card",
  },
};

// Paintカード
export const Paint: Story = {
  args: {
    children: "Paint Card",
    color: "error",
    variant: "paint",
  },
};

// Tonalカード
export const Tonal: Story = {
  args: {
    children: "Tonal Card",
    variant: "tonal",
  },
};
