import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import ArrowIcon from "./../assets/icons/arrow.svg";
import BarChartIcon from "./../assets/icons/barChart.svg";

const icons = {
  None: undefined,
  Arrow: ArrowIcon,
  BarChart: BarChartIcon,
};

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["filled", "outline"],
    },
    as: {
      control: { type: "radio" },
      options: ["a", "button"],
    },
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: { type: "select" },
    },
  },
  args: {
    variant: "filled",
    as: "button",
    icon: undefined,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: {
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    variant: "outline",
  },
};

export const Link: Story = {
  args: {
    children: "Button",
    as: "a",
    href: "/example",
  },
};

export const Icon: Story = {
  args: {
    children: "Button",
    icon: ArrowIcon,
  },
};
