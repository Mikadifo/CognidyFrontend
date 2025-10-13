"use client";

import { RoadmapGoalForm } from "@/app/components/RoadmapGoalForm";
import { RoadmapGoals } from "@/app/components/RoadmapGoals";
import { useApi } from "@/app/hooks/useApi";
import RoadmapGoal from "@/app/models/RoadmapGoal";
import { api } from "@/app/utils/apiFetch";
import { FC, useEffect } from "react";

export const RoadmapController: FC = () => {
  const {
    submit: getGoals,
    loading,
    error,
    data: goals,
    setData: setGoals,
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

  return (
    <div className="flex gap-16 relative">
      <RoadmapGoals
        goals={goals || []}
        setGoals={setGoals}
        getGoals={getGoals}
      />
      <RoadmapGoalForm goals={goals || []} onSubmit={getGoals} />
    </div>
  );
};
