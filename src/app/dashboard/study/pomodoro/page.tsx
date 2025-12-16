import { DashboardHeader } from "@/app/components/DashboardHeader";
import { PomodoroController } from "./PomodoroController";

export const metadata = {
  title: "Cognidy | Pomodoro",
  description: "Pomodoro section",
};

export default function Pomodoro() {
  return (
    <div className="p-8 lg:p-16 flex flex-col gap-16 w-full">
      <DashboardHeader
        heading="Pomodoro"
        subheading="Boost your productivity with timed focus cycles"
      />

      <PomodoroController />
    </div>
  );
}
