"use client";

import { Dispatch, FC, SetStateAction } from "react";
import RoadmapGoal from "../models/RoadmapGoal";
import { ArcherContainer, ArcherElement } from "react-archer";

interface RoadmapGoalsProps {
  goals: RoadmapGoal[];
  setGoals: Dispatch<SetStateAction<RoadmapGoal[]>>;
}

export const RoadmapGoals: FC<RoadmapGoalsProps> = ({ goals, setGoals }) => {
  const handleComplete = (order: number) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.order === order
          ? { ...goal, completed: !goal.completed }
          : { ...goal },
      ),
    );
  };

  return (
    <ArcherContainer strokeColor="#92959C" strokeDasharray="5,5">
      <div className="font-nunito text-dark flex flex-col gap-16 w-[480px]">
        {goals.map(({ order, title, brief, completed }, i) => (
          <ArcherElement
            key={order}
            id={String(order)}
            relations={
              i < goals.length - 1
                ? [
                    {
                      targetId: String(goals[i + 1].order),
                      targetAnchor: "top",
                      sourceAnchor: "bottom",
                    },
                  ]
                : []
            }
          >
            <div className="flex flex-col gap-4 justify-between bg-dark-08 rounded-lg p-8">
              <div className="flex gap-4">
                <span className="font-poppins font-bold text-xl text-brand">
                  {String(order).padStart(2, "0")}
                </span>

                <div className="flex flex-col gap-4 text-lg">
                  <div className="flex flex-col gap-2">
                    <b>{title}</b>
                    <p>{brief}</p>
                  </div>
                  <button
                    type="button"
                    className={`w-fit text-white text-xs font-bold px-4 py-1 rounded-full cursor-pointer hover:opacity-80 ${completed ? "bg-green" : "bg-dark"}`}
                    onClick={() => handleComplete(order)}
                  >
                    {completed ? "Completed" : "Mark as Completed"}
                  </button>
                </div>
              </div>
            </div>
          </ArcherElement>
        ))}
      </div>
    </ArcherContainer>
  );
};
