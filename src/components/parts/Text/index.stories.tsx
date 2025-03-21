import { Meta, StoryObj } from "@storybook/react";
import { Text } from "@/components";

export default {
  title: "Parts/Text",
  component: Text,
  argTypes: {
    children: {
      control: { type: "text" },
      description: "子要素",
      table: {
        type: { summary: "string" },
      },
    },
    as: {
      control: { type: "select" },
      options: ["span", "p", "label", "h1", "h2", "h3", "h4", "h5", "h6"],
      description: "タグ",
      defaultValue: { summary: "span" },
    },
    family: {
      control: { type: "text" },
      description: "フォントファミリー",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: { type: "text" },
      description: "フォントサイズ",
      table: {
        type: { summary: "string" },
      },
    },
    weight: {
      control: { type: "text" },
      description: "フォントウェイト",
      table: {
        type: { summary: "string" },
      },
    },
    spacing: {
      control: { type: "text" },
      description: "文字間隔",
      table: {
        type: { summary: "string" },
      },
    },
  },
} as Meta<typeof Text>;

type Story = StoryObj<typeof Text>;

// デフォルトの文字
export const Default: Story = {
  args: {
    children: "デフォルト Default",
  },
};
export const LargeText: Story = {
  args: {
    children: "大きな文字",
    size: "lg",
  },
};

export const BoldText: Story = {
  args: {
    children: "太字テキスト",
    weight: "bold",
  },
};

export const CustomHeading: Story = {
  args: {
    children: "見出し",
    as: "h1",
    size: "xl",
    weight: "bold",
  },
};
