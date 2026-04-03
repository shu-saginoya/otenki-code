import { Meta, StoryObj } from "@storybook/react";

import { Tab } from "./";

export default {
  title: "Base/Tab",
  component: Tab,
  argTypes: {
    defaultIndex: {
      control: { type: "number" },
      defaultValue: 0,
      description: "初期選択タブのインデックス",
      table: {
        type: { summary: "number" },
      },
    },
    variant: {
      control: { type: "text" },
      defaultValue: "tonal",
      description: "タブのデザイン",
      table: {
        type: { summary: "string" },
      },
    },
    color: {
      control: { type: "text" },
      defaultValue: "primary",
      description: "タブの色",
      table: {
        type: { summary: "string" },
      },
    },
    onChange: {
      description: "タブ変更時のコールバック",
      table: {
        type: { summary: "function" },
      },
    },
  },
} as Meta<typeof Tab>;

type Story = StoryObj<typeof Tab>;

// デフォルトタブ
export const Default: Story = {
  args: {
    items: [
      { label: "タブ1", content: "タブ1のコンテンツです" },
      { label: "タブ2", content: "タブ2のコンテンツです" },
      { label: "タブ3", content: "タブ3のコンテンツです" },
    ],
  },
};

// 2タブ（ログイン風）
export const LoginRegister: Story = {
  args: {
    items: [
      { label: "ログイン", content: "ログインフォームがここに表示されます" },
      { label: "新規登録", content: "新規登録フォームがここに表示されます" },
    ],
  },
};

// Paintバリアント
export const Paint: Story = {
  args: {
    items: [
      { label: "タブA", content: "Paint バリアントのコンテンツA" },
      { label: "タブB", content: "Paint バリアントのコンテンツB" },
    ],
    variant: "paint",
    color: "primary",
  },
};

// Outlineバリアント
export const Outlined: Story = {
  args: {
    items: [
      { label: "タブA", content: "Outlined バリアントのコンテンツA" },
      { label: "タブB", content: "Outlined バリアントのコンテンツB" },
    ],
    variant: "outlined",
    color: "primary",
  },
};

// 初期選択タブを変更
export const SecondTabSelected: Story = {
  args: {
    items: [
      { label: "タブ1", content: "タブ1のコンテンツ" },
      { label: "タブ2", content: "タブ2が初期選択されています" },
    ],
    defaultIndex: 1,
  },
};
