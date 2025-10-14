import { DashboardHeader } from "@/app/components/DashboardHeader";
import { SectionOption } from "@/app/components/SectionOption";
import puzzlePieceIcon from "@/app/assets/icons/puzzlePiece.svg";

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
        <div className="w-full h-0.5 bg-dark-16 rounded-full mt-4 mb-8" />
        <SectionOption
          label="Puzzles"
          icon={puzzlePieceIcon}
          href="learning/puzzles"
        />
      </div>

      <div className="flex flex-col">
        <div className="w-full h-0.5 bg-dark-16 rounded-full mt-4 mb-8" />
        <SectionOption
          label="Coming Soon"
          icon={puzzlePieceIcon}
          href="learning/puzzles"
          disabled={true}
        />
      </div>
    </div>
  );
}