import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components";

export default {
  title: "Base/Button",
  component: Button,
  argTypes: {
    children: {
      control: { type: "text" },
      defaultValue: "Button",
      description: "ボタンテキスト",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: { type: "text" },
      defaultValue: "base",
      description: "ボタンのサイズ",
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
    block: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "ブロック要素フラグ",
      table: {
        type: { summary: "boolean" },
      },
    },
    prependIcon: {
      control: { type: "text" },
      description: "childrenの前にアイコンを表示",
      table: {
        type: { summary: "string" },
      },
    },
    appendIcon: {
      control: { type: "text" },
      description: "childrenの後にアイコンを表示",
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
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

const sampleFunc = () => alert("ボタンが押されました");

// デフォルトボタン
export const Default: Story = {
  args: {
    children: "Default Button",
    onClick: sampleFunc,
  },
};

// 無効化ボタン
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
    onClick: sampleFunc,
  },
};

// ブロックボタン
export const Block: Story = {
  args: {
    children: "Block Button",
    block: true,
    onClick: sampleFunc,
  },
};

// アイコンボタン
export const Icon: Story = {
  args: {
    children: "Icon Button",
    appendIcon: "arrowForward",
    onClick: sampleFunc,
  },
};
