import type { Meta, StoryObj } from "@storybook/nextjs";
import { SideBar } from "./SideBar";

const meta: Meta<typeof SideBar> = {
  title: "Dashboard Navigation",
  component: SideBar,
  parameters: {
    docs: {
      description: {
        component: "This sidebar is used for the dashboard page routes only",
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof SideBar>;

export const Sidebar: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/dashboard/study",
      },
    },
  },
  args: {},
};
