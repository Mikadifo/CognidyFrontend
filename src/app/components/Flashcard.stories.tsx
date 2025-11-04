// import type { Meta, StoryObj } from "@storybook/react";
// import Flashcard, { FlashcardInterface } from "./Flashcard";

// const meta: Meta<typeof Flashcard> = {
//   title: "Components/Flashcard",
//   component: Flashcard,
//   args: {
//     question: "What is 2 + 2?",
//     answer: "4",
//   },
//   argTypes: {
//     onFlip: { action: "flip" },
//   },
// };
// export default meta;

// type Story = StoryObj<typeof Flashcard>;

// export const Default: Story = {};

// export const StartFlipped: Story = {
//   args: { defaultFlipped: true },
// };

// export const LongContent: Story = {
//   args: {
//     question:
//       "Explain the difference between thread-level and data-level parallelism in one paragraph.",
//     answer:
//       "Thread-level parallelism splits tasks across independent threads, while data-level parallelism applies the same operation across many data elements, often using SIMD.",
//   },
// };

// export const WithTailwindStyling: Story = {
//   args: {
//     className:
//       "w-full rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
//   },
// };


import React from 'react';
import Flashcard from './Flashcard'
import type {Meta, StoryObj} from '@storybook/react'

const meta: Meta<typeof Flashcard> = {
    title: 'Flashcard',
    component: Flashcard,
    parameters: {layout: 'centered'},
    args: {
        question: 'How many licks does it take to get to the center of a tootsie pop?',
        answer: 'The world may never know',
        defaultFlipped: false,
        className: '',
        
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const ManualInteractions: Story = {
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector<HTMLElement>('[role="button"]');
    if (!card) return;

    card.focus();

    card.click();
  },
};


