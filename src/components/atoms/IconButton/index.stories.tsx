import { Meta, StoryObj } from "@storybook/react";
import IconButton from "./index";

export default {
  title: "Atoms/IconButton",
  component: IconButton,
  argTypes: {
    icon: {
      description: "アイコンを指定",
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

// 無効化ボタン
export const Disabled: Story = {
  args: {
    icon: "add",
    disabled: true,
    onClick: sampleFunc,
  },
};
