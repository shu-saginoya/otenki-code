import { Meta, StoryObj } from "@storybook/react";

import { Switch } from "@/components";

export default {
  title: "Parts/Switch",
  component: Switch,
  argTypes: {
    checked: {
      control: { type: "boolean" },
      description: "チェックの状態",
      table: {
        type: { summary: "boolean" },
      },
    },
    onChange: {
      description: "onChange イベントハンドラ",
      table: {
        type: { summary: "function" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "無効化",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
} as Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

// Default
export const Default: Story = {
  args: {
    checked: true,
    onChange: () => {},
  },
};

// 無効化
export const Disabled: Story = {
  args: {
    checked: false,
    onChange: () => {},
    disabled: true,
  },
};
