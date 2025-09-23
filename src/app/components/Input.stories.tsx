import type { Meta, StoryObj } from "@storybook/nextjs";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          "A reusable Input component, which inherits html input tag, so it has all input properties by default such as placeholder, value, disabled, etc.",
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Inactive: Story = {
  args: {
    label: "Label:",
    placeholder: "Placeholder",
  },
};

export const Focused: Story = {
  args: {
    label: "Label:",
    placeholder: "Placeholder",
    autoFocus: true,
  },
};

