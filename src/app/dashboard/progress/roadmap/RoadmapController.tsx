"use client";

import { Button } from "@/app/components/Button";
import GenerationNotification, {
  GeneratingSection,
} from "@/app/components/GenerationNotification";
import GuestLoginCTA from "@/app/components/GuestLoginCTA";
import { RoadmapGoalForm } from "@/app/components/RoadmapGoalForm";
import { RoadmapGoals } from "@/app/components/RoadmapGoals";
import { useApi } from "@/app/hooks/useApi";
import { useAuth } from "@/app/hooks/useAuth";
import { useGoalSettings } from "@/app/hooks/useGoalSettings";
import RoadmapGoal from "@/app/models/RoadmapGoal";
import RoadmapGoalsSkeleton from "@/app/skeletons/RoadmapGoalsSkeleton";
import { api } from "@/app/utils/apiFetch";
import { FC, useEffect, useState } from "react";

export const RoadmapController: FC = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState("");
  const [onLoadFetching, setOnLoadFetching] = useState(true);
  const [generating, setGenerating] = useState(false);
  const { hideCompleted, setHideCompleted } = useGoalSettings();
  const {
    submit: getGoals,
    loading,
    error,
    data: goals,
  } = useApi<RoadmapGoal[], []>(api.fetchGoals);
  const filteredGoals = hideCompleted
    ? goals?.filter((goal) => !goal.completed)
    : goals;

  useEffect(() => {
    setToken(getToken() || "");
  }, [getToken]);

  useEffect(() => {
    if (!getToken() || getToken() === "guest") {
      return;
    }

    getGoals();
    setOnLoadFetching(true);
  }, [getGoals, getToken]);

  const fetchAfterLoad = () => {
    setOnLoadFetching(false);
    getGoals();
  };

  const hasGoals = () => {
    return goals && goals?.length > 0;
  };

  const showFilter = () => {
    if (!hasGoals()) {
      return false;
    }

    if (!hideCompleted) {
      return (goals?.filter((goal) => goal.completed) ?? []).length > 0;
    }

    return hasGoals();
  };

  if (error && typeof error === "string") {
    return error;
  }

  if (token === "guest") {
    return <GuestLoginCTA />;
  }

  return (
    <div className="flex flex-col gap-8 relative">
      <div className="flex gap-8" hidden={loading}>
        {showFilter() && (
          <Button
            className="w-fit"
            variant="outline"
            onClick={() => setHideCompleted(!hideCompleted)}
          >
            {hideCompleted ? "Show" : "Hide"} completed goals
          </Button>
        )}

        {!hasGoals() && (
          <p className="text-md">
            You don&apos;t have goals yet. Create one or upload a file to
            generate goals using AI.
          </p>
        )}

        <GenerationNotification
          section={GeneratingSection.ROADMAP}
          fetchFunction={getGoals}
          setGenerating={setGenerating}
        />
      </div>

      <div className="flex gap-16 relative">
        {onLoadFetching && loading ? (
          <RoadmapGoalsSkeleton />
        ) : (
          hasGoals() && (
            <RoadmapGoals
              goals={filteredGoals || []}
              getGoals={fetchAfterLoad}
            />
          )
        )}

        {!generating && (
          <RoadmapGoalForm
            goals={filteredGoals || []}
            onSubmit={fetchAfterLoad}
          />
        )}
      </div>
    </div>
  );
};
