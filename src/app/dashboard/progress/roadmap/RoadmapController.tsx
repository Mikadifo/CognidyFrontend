"use client";

import { RoadmapGoalForm } from "@/app/components/RoadmapGoalForm";
import { RoadmapGoals } from "@/app/components/RoadmapGoals";
import RoadmapGoal from "@/app/models/RoadmapGoal";
import { FC, useEffect, useState } from "react";

//TODO: remove this when DB and API are done
async function getGoals() {
  return new Promise<RoadmapGoal[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            order: 1,
            title: "Syntax Basics",
            brief: "Practice print, variables, and data types",
            completed: true,
          },
          {
            order: 2,
            title: "Control Flow",
            brief: "Write 5 small scripts using loops & conditionals",
            completed: true,
          },
          {
            order: 3,
            title: "Functions",
            brief: "Build a mini calculator app",
            completed: false,
          },
          {
            order: 4,
            title: "Data Structures",
            brief:
              "Practice working with lists and dictionaries by storing and retrieving data",
            completed: false,
          },
          {
            order: 5,
            title: "Mini Project",
            brief:
              "Combine all concepts into a simple app (like a to-do list CLI)",
            completed: false,
          },
        ]),
      500,
    ),
  );
}

export const RoadmapController: FC = () => {
  const [goals, setGoals] = useState<RoadmapGoal[]>([]);

  useEffect(() => {
    async function fetchGoals() {
      //TODO: fetch from api
      const data = await getGoals();
      setGoals(data);
    }

    fetchGoals();
  }, []);

  return (
    <div className="flex gap-16">
      <RoadmapGoals goals={goals} setGoals={setGoals} />
      <RoadmapGoalForm goals={goals} setGoals={setGoals} />
    </div>
  );
};
