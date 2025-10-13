"use client";

import { Button } from "@/app/components/Button";
import { RoadmapGoalForm } from "@/app/components/RoadmapGoalForm";
import { RoadmapGoals } from "@/app/components/RoadmapGoals";
import { useApi } from "@/app/hooks/useApi";
import { useGoalSettings } from "@/app/hooks/useGoalSettings";
import RoadmapGoal from "@/app/models/RoadmapGoal";
import { api } from "@/app/utils/apiFetch";
import { FC, useEffect } from "react";

export const RoadmapController: FC = () => {
  const { hideCompleted, setHideCompleted } = useGoalSettings();
  const {
    submit: getGoals,
    loading,
    error,
    data: goals,
  } = useApi<RoadmapGoal[], []>(api.fetchGoals);

  useEffect(() => {
    getGoals();
  }, []);

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return error;
  }

  const filteredGoals = hideCompleted
    ? goals?.filter((goal) => !goal.completed)
    : goals;

  return (
    <div className="flex flex-col gap-8 relative">
      <Button
        className="w-fit"
        variant="outline"
        onClick={() => setHideCompleted(!hideCompleted)}
      >
        {hideCompleted ? "Show" : "Hide"} completed goals
      </Button>

      <div className="flex gap-16 relative">
        <RoadmapGoals goals={filteredGoals || []} getGoals={getGoals} />
        <RoadmapGoalForm goals={filteredGoals || []} onSubmit={getGoals} />
      </div>
    </div>
  );
};
