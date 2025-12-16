import { DashboardHeader } from "@/app/components/DashboardHeader";
import { PairsController } from "./PairsController";

export const metadata = {
  title: "Cognidy | Puzzles",
  description: "Puzzles section",
};

export default function Roadmap() {
  return (
    <div className="p-8 lg:p-16 flex flex-col gap-16 w-full">
      <DashboardHeader
        heading="Puzzles"
        subheading="Challenge yourself with interactive questions and exercises!"
      />

      <PairsController />
    </div>
  );
}
