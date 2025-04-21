import { Meta, StoryObj } from "@storybook/react";

import { ShapeImage } from "@/components";

export default {
  title: "Parts/ShapeImage",
  component: ShapeImage,
  argTypes: {
    src: {
      control: { type: "text" },
      description: "画像 URL",
      table: {
        type: { summary: "string" },
      },
    },
    width: {
      control: { type: "number" },
      defaultValue: 320,
      description: "横幅",
      table: {
        type: { summary: "number" },
      },
    },
    height: {
      control: { type: "number" },
      defaultValue: 320,
      description: "縦幅",
      table: {
        type: { summary: "number" },
      },
    },
    alt: {
      control: { type: "text" },
      description: "画像の代替文",
      table: {
        type: { summary: "string" },
      },
    },
    shape: {
      options: ["circle", "square"],
      control: { type: "radio" },
      defaultValue: "square",
      description: "画像の形",
      table: {
        type: { summary: "circle | square" },
        defaultValue: { summary: "square" },
      },
    },
  },
} as Meta<typeof ShapeImage>;

type Story = StoryObj<typeof ShapeImage>;

// 円形
export const Circle: Story = {
  args: {
    src: "https://picsum.photos/350/350",
    height: 320,
    width: 320,
    alt: "円形サンプル画像",
    shape: "circle",
  },
};

// セカンダリボタン
export const Square: Story = {
  args: {
    src: "https://picsum.photos/350/350",
    height: 320,
    width: 320,
    alt: "四角形サンプル画像",
    shape: "square",
  },
};
