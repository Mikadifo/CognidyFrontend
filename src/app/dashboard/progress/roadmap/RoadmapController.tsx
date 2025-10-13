"use client";

import { Button } from "@/app/components/Button";
import { RoadmapGoalForm } from "@/app/components/RoadmapGoalForm";
import { RoadmapGoals } from "@/app/components/RoadmapGoals";
import { useApi } from "@/app/hooks/useApi";
import { useGoalSettings } from "@/app/hooks/useGoalSettings";
import RoadmapGoal from "@/app/models/RoadmapGoal";
import RoadmapGoalsSkeleton from "@/app/skeletons/RoadmapGoalsSkeleton";
import { api } from "@/app/utils/apiFetch";
import { FC, useEffect, useState } from "react";

export const RoadmapController: FC = () => {
  const [onLoadFetching, setOnLoadFetching] = useState(true);
  const { hideCompleted, setHideCompleted } = useGoalSettings();
  const {
    submit: getGoals,
    loading,
    error,
    data: goals,
  } = useApi<RoadmapGoal[], []>(api.fetchGoals);

  useEffect(() => {
    getGoals();
    setOnLoadFetching(true);
  }, []);

  const fetchAfterLoad = () => {
    setOnLoadFetching(false);
    getGoals();
  };

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
        {onLoadFetching && loading ? (
          <RoadmapGoalsSkeleton />
        ) : (
          <RoadmapGoals goals={filteredGoals || []} getGoals={fetchAfterLoad} />
        )}
        <RoadmapGoalForm
          goals={filteredGoals || []}
          onSubmit={fetchAfterLoad}
        />
      </div>
    </div>
  );
};
