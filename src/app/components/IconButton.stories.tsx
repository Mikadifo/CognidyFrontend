import type { Meta, StoryObj } from "@storybook/nextjs";
import PencilIcon from "./../assets/icons/pencil.svg";
import TrashCanIcon from "./../assets/icons/trashcan.svg";
import { IconButton } from "./IconButton";

const icons = {
  Delete: TrashCanIcon,
  Edit: PencilIcon,
};

const meta: Meta<typeof IconButton> = {
  title: "Icon Button",
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component: "A reusable Icon Button component",
      },
    },
  },
  argTypes: {
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: { type: "select" },
      description: "just import svg icon and pass to this prop",
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: PencilIcon,
  },
};

