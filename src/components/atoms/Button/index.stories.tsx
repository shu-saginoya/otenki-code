import { Meta, StoryObj } from "@storybook/react";
import Button from "./index";

export default {
  title: "Atoms/Button",
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
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "Disabledフラグ",
      table: {
        type: { summary: "boolean" },
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
