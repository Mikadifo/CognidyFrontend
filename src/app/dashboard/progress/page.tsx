import { DashboardHeader } from "@/app/components/DashboardHeader";
import { SectionOption } from "@/app/components/SectionOption";

import RoadmapIcon from "./../../assets/icons/conversionPath.svg";
import StreaksIcon from "./../../assets/icons/flame.svg";
import TrendsIcon from "./../../assets/icons/trendingUp.svg";

export const metadata = {
  title: "Cognidy | Progress",
  description: "Progress section",
};

export default function Progress() {
  return (
    <div className="p-16 flex flex-col gap-8 w-full">
      <DashboardHeader
        heading="Your Progress"
        subheading="See how far you’ve come with clear insights and stats"
      />

      <div className="flex flex-col">
        <span className="font-poppins font-normal text-xl">Goals</span>
        <div className="w-full h-0.5 bg-dark-16 rounded-full mt-4 mb-8" />
        <SectionOption
          label="Roadmap"
          icon={RoadmapIcon}
          href="progress/roadmap"
        />
      </div>

      <div className="flex flex-col">
        <span className="font-poppins font-normal text-xl">Coming Soon</span>
        <div className="w-full h-0.5 bg-dark-16 rounded-full mt-4 mb-8" />
        <div className="flex gap-8">
          <SectionOption
            label="Streaks"
            icon={StreaksIcon}
            href="progress/streaks"
            disabled
          />
          <SectionOption
            label="Trends"
            icon={TrendsIcon}
            href="progress/trends"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
