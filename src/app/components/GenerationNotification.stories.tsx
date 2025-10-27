import type { Meta, StoryObj } from "@storybook/nextjs";
import GenerationNotification, {
  GeneratingSection,
} from "./GenerationNotification";

const meta: Meta<typeof GenerationNotification> = {
  title: "Generation Notification",
  component: GenerationNotification,
  parameters: {
    docs: {
      description: {
        component:
          "Loading indicator that appears while content is being generated",
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
    section: GeneratingSection.PUZZLES,
  },
};
