import { Meta, StoryObj } from "@storybook/react";

import { Badge } from "@/components";

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
  },
} as Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

// デフォルトのバッジ
export const Default: Story = {
  args: {
    content: "2",
    className: "bg-primary",
  },
};

// 文字のバッジ
export const Text: Story = {
  args: {
    content: "あした",
    className: "bg-warning",
  },
};
