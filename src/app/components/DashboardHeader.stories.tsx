import type { Meta, StoryObj } from "@storybook/nextjs";

import { DashboardHeader } from "./DashboardHeader";

const meta: Meta<typeof DashboardHeader> = {
  title: "Dashboard Header",
  component: DashboardHeader,
  parameters: {
    docs: {
      description: {
        component:
          "This header and subheading should be used in every route of the dashboard (See Figma)",
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: "heading",
    subheading: "subheading",
  },
};

