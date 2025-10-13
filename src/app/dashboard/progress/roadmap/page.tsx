import { DashboardHeader } from "@/app/components/DashboardHeader";
import { RoadmapController } from "./RoadmapController";

export const metadata = {
  title: "Cognidy | Roadmap",
  description: "Roadmap section",
};

export default function Roadmap() {
  return (
    <div className="p-16 flex flex-col gap-16 w-full overflow-y-scroll h-screen">
      <DashboardHeader
        heading="Roadmap"
        subheading="Follow personalized study goals built from your notes"
      />

      <RoadmapController />
    </div>
  );
}
