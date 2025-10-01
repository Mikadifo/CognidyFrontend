import type { Meta, StoryObj } from "@storybook/nextjs";
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
  parameters: {
    docs: {
      description: {
        component:
          "A reusable Button component with optional variant, icon, and polymorphic type (link|button) support.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["filled", "outline"],
    },
    as: {
      control: { type: "radio" },
      options: ["a", "button"],
      description: "a means behave as \\<a\\>",
    },
    href: {
      control: "text",
      description: "required if 'as' is set to 'a'",
    },
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: { type: "select" },
      description: "just import svg icon and pass to this prop",
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    disabled: { control: "boolean" },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
  },
  args: {
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
