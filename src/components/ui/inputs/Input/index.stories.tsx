import { Meta, StoryObj } from "@storybook/react";

import { Input } from "./";

export default {
  title: "Parts/Input",
  component: Input,
  argTypes: {
    placeholder: {
      control: { type: "text" },
      description: "プレースホルダー",
      table: {
        type: { summary: "string" },
      },
    },
    hasError: {
      control: { type: "boolean" },
      defaultValue: true,
      description: "バリデーションエラーフラグ",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

// テキスト入力
export const Default: Story = {
  args: {
    type: "text",
    name: "default",
    placeholder: "プレースホルダー",
  },
};

// 赤枠のテキスト入力
export const Error: Story = {
  args: {
    type: "text",
    name: "error",
    hasError: true,
    placeholder: "プレースホルダー",
  },
};

// 無効化のテキスト入力
export const Disabled: Story = {
  args: {
    type: "text",
    name: "disabled",
    value: "無効化",
    disabled: true,
  },
};
