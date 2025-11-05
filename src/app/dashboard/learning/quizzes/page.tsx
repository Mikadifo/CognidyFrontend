import { DashboardHeader } from "@/app/components/DashboardHeader";
import { QuizzesController } from "./QuizzesController";

export const metadata = {
  title: "Cognidy | Quizzes",
  description: "Quizzes section",
};

export default function Quizzes() {
  return (
    <div className="p-16 flex flex-col gap-16 w-full overflow-y-scroll h-screen">
      <DashboardHeader
        heading="Quizzes"
        subheading="Test your knowledge with fun and fast quizzes!"
      />

      <QuizzesController />
    </div>
  );
}
