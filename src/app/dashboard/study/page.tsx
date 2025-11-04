import { DashboardHeader } from "@/app/components/DashboardHeader";
import { SectionOption } from "@/app/components/SectionOption";

import FlashcardIcon from "./../../assets/icons/playingCards.svg";
import PomodoroIcon from "./../../assets/icons/timer.svg";
import CheatsheetIcon from "./../../assets/icons/textNotes.svg";



export const metadata = {
  title: "Cognidy | Study",
  description: "Study section",
};

export default function Study() {
  return (
    <div className="p-16 flex flex-col gap-8 w-full">
      <DashboardHeader
        heading="Study tools"
        subheading="Choose how you want to study"
      />

    <div className= "flex flex-col">
      <span className="font-poppins font-normal text-xl">Revision</span>
      <div className="w-full h-0.5 bg-dark-16 rounded-full mt-4 mb-8"/>
      <SectionOption
        label="Flashcards"
        icon={FlashcardIcon}
        href="study/flashcards"
      />
    </div>

      <div className="flex flex-col">
        <span className="font-poppins font-normal text-xl">Coming Soon</span>
        <div className="w-full h-0.5 bg-dark-16 rounded-full mt-4 mb-8"/>
        <div className="flex gap-8">
          <SectionOption
            label="Pomodoro"
            icon={PomodoroIcon}
            href="study/pomodoro"
            disabled //not available yet so not clickable
          />
          <SectionOption
            label="Cheat Sheets"
            icon={CheatsheetIcon}
            href="study/cheatsheet"
            disabled
          />
          </div>
      </div>
    </div>
    
  )
}

