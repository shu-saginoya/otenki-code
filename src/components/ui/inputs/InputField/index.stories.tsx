import { Meta, StoryObj } from "@storybook/react";

import { InputField } from "./";

export default {
  title: "Parts/InputField",
  component: InputField,
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
    errorMessage: {
      control: { type: "text" },
      description: "エラーメッセージ",
      table: {
        type: { summary: "string" },
      },
    },
  },
} as Meta<typeof InputField>;

type Story = StoryObj<typeof InputField>;

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
    errorMessage: "入力内容に誤りがあります",
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
