import { DashboardHeader } from "@/app/components/DashboardHeader";
import { SectionOption } from "@/app/components/SectionOption";
import puzzlePieceIcon from "@/app/assets/icons/puzzlePiece.svg";
import Users from "@/app/assets/icons/users.svg"
import StylusNote from "@/app/assets/icons/stylusNote.svg"

export const metadata = {
  title: "Cognidy | Learning",
  description: "Learning section",
};

export default function Learning() {
  return (
    <div className="p-16 flex flex-col gap-8 w-full">
      <DashboardHeader
        heading="Your Learning"
        subheading="Learn and grow with personalized study sessions and games!"
      />
        <div className="flex flex-col">
          <span className="font-poppins font-normal text-xl">Goals</span>
          <div className="w-full h-0.5 bg-dark-16 rounded-full mt-4 mb-8" />
            <SectionOption
              label="Puzzles"
              icon={puzzlePieceIcon}
              href="progress/puzzles"
            />
          </div>
    
      <div className="flex flex-col">
        <span className="font-poppins font-normal text-xl">Coming Soon</span>
        <div className="w-full h-0.5 bg-dark-16 rounded-full mt-4 mb-8" />
        <div className="flex gap-8">
          <SectionOption
            label="Mentoring"
            icon={Users}
            href="learning/puzzles"
            disabled
          />
          <SectionOption
            label="Quizzes"
            icon={StylusNote}
            href="learning/puzzles"
            disabled
          />
        </div>
      </div>
    </div>
  );
}