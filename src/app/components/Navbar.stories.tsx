import type { Meta, StoryObj } from "@storybook/nextjs";
import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Landing Navigation",
  component: Navbar,
  parameters: {
    docs: {
      description: {
        component: "This navbar is used for the landing page routes only",
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const NavBar: Story = {
  args: {},
};
