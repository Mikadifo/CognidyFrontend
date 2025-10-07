import type { Meta, StoryObj } from "@storybook/nextjs";
import Cards from "./../assets/icons/playingCards.svg";
import Roadmap from "./../assets/icons/stylusNote.svg";
import Puzzle from "./../assets/icons/puzzlePiece.svg";
import { SectionOption } from "./SectionOption";

const icons = {
  Cards: Cards,
  Roadmap: Roadmap,
  Puzzle: Puzzle,
};

const meta: Meta<typeof SectionOption> = {
  title: "Section Option",
  component: SectionOption,
  parameters: {
    docs: {
      description: {
        component:
          "A reusable Section Option Link. (Icon is larger in the actual component, but we are using turbo pack and storyboook uses webpack which is not configured, so no worry about it)",
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
} satisfies Meta<typeof SectionOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "label",
    icon: Roadmap,
    href: "/example",
  },
};

