import { Temp } from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Temp> = {
  title: "Parts/Temp",
  component: Temp,
  tags: ["autodocs"],
  argTypes: {
    number: {
      control: { type: "number" },
      description: "気温（数値）",
      table: { type: { summary: "number" } },
    },
    type: {
      control: { type: "radio" },
      options: ["default", "highest", "lowest"],
      description: "温度のタイプ",
      table: { type: { summary: '"default" | "highest" | "lowest"' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "気温を表示するシンプルなコンポーネント。`type`で色分けができます。",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Temp>;

export const Default: Story = {
  args: {
    number: 23.5,
    type: "default",
  },
};

export const Highest: Story = {
  args: {
    number: 32.1,
    type: "highest",
  },
};

export const Lowest: Story = {
  args: {
    number: 10.2,
    type: "lowest",
  },
};

export const Empty: Story = {
  args: {
    number: undefined,
    type: "default",
  },
};
