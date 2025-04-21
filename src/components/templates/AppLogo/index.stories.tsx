import { Meta, StoryObj } from "@storybook/react";

import { AppLogo } from "@/components";

export default {
  title: "Templates/AppLogo",
  component: AppLogo,
  argTypes: {},
} as Meta<typeof AppLogo>;

type Story = StoryObj<typeof AppLogo>;

// デフォルト
export const Default: Story = {
  args: {},
};
