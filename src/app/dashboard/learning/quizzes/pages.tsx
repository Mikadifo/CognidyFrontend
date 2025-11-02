import { DashboardHeader } from "@/app/components/DashboardHeader";
import React from "react";

export const metadata = {
  title: "Cognidy | Quizzes",
  description: "Quizzes section",
};

export default function Quizzes() {
  return (
    <div className="p-16 flex flex-col gap-16 w-full overflow-y-scroll h-screen">
      <DashboardHeader
        heading="Quizzes"
        subheading="Follow personalized study goals built from your notes"
      />
    </div>
  );
}
