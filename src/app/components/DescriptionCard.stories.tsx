import type { Meta, StoryObj } from "@storybook/nextjs";

import { DescriptionCard } from "./DescriptionCard";

const meta: Meta<typeof DescriptionCard> = {
  title: "Description Card",
  component: DescriptionCard,
  parameters: {
    docs: {
      description: {
        component:
          "This component is used in most of the MVP features. The remaining <label> is computed as follows: (total - correct - missed). <label> is a custom label you can use such as Flashcars, puzzles, etc.",
      },
    },
  },
} satisfies Meta<typeof DescriptionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sourceFileName: "sourceFileName",
    correct: 0,
    missed: 0,
    total: 0,
    label: "label",
  },
};

