import { DashboardHeader } from "@/app/components/DashboardHeader";
import { TrendsController } from "./TrendsController";

export const metadata = {
  title: "Cognidy | Trends",
  description: "Trends section",
};

export default function Trends() {
  return (
    <div className="p-8 lg:p-16 flex flex-col gap-16 w-full overflow-y-scroll h-screen">
      <DashboardHeader
        heading="Trends"
        subheading="See how your study habits evolve over time"
      />

      <TrendsController />
    </div>
  );
}
