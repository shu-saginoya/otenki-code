import { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "@/components";

export default {
  title: "Base/IconButton",
  component: IconButton,
  argTypes: {
    icon: {
      control: "text",
      description: "アイコンを指定",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: { type: "text" },
      defaultValue: "xl",
      description: "ボタンのサイズ",
      table: {
        type: { summary: "string" },
      },
    },
    variant: {
      control: { type: "text" },
      defaultValue: "paint",
      description: "ボタンのデザイン",
      table: {
        type: { summary: "string" },
      },
    },
    color: {
      control: { type: "text" },
      defaultValue: "primary",
      description: "ボタンの色",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "Disabledフラグ",
      table: {
        type: { summary: "boolean" },
      },
    },
    className: {
      control: { type: "text" },
      description: "ユーティリティクラス",
      table: {
        type: { summary: "string" },
      },
    },
    onClick: {
      description: "onClick イベントハンドラ",
      table: {
        type: { summary: "function" },
      },
    },
  },
} as Meta<typeof IconButton>;

type Story = StoryObj<typeof IconButton>;

const sampleFunc = () => alert("ボタンが押されました");

// デフォルトボタン
export const Default: Story = {
  args: {
    icon: "check",
    onClick: sampleFunc,
  },
};

// 大きいボタン
export const Size2XL: Story = {
  args: {
    icon: "close",
    size: "2xl",
    color: "warning",
    onClick: sampleFunc,
  },
};

// 無効化ボタン
export const Disabled: Story = {
  args: {
    icon: "add",
    disabled: true,
    onClick: sampleFunc,
  },
};
