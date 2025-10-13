"use client";

import { FC } from "react";
import RoadmapGoal from "../models/RoadmapGoal";
import { ArcherContainer, ArcherElement } from "react-archer";
import DeleteIcon from "../assets/icons/trashcan.svg";
import { api } from "../utils/apiFetch";
import { useApi } from "../hooks/useApi";

interface RoadmapGoalsProps {
  goals: RoadmapGoal[];
  getGoals: () => void;
}

export const RoadmapGoals: FC<RoadmapGoalsProps> = ({ goals, getGoals }) => {
  const { submit: deleteGoal } = useApi<{}, [order: number]>(api.deleteGoal);
  const { submit: updateGoal } = useApi<
    {},
    [order: number, completed: boolean]
  >(api.updateGoalCompletion);

  const handleComplete = async (order: number, completed: boolean) => {
    const response = await updateGoal(order, !completed);

    if (response.error) {
      console.error(response.error);
      return;
    }

    getGoals();
  };

  const handleDelete = async (order: number) => {
    const confirmed = confirm("Are you sure you want to delte this goal?");

    if (!confirmed) {
      return;
    }

    const response = await deleteGoal(order);

    if (response.error) {
      console.error(response.error);
      return;
    }

    getGoals();
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
            <div className="flex flex-col gap-4 justify-between bg-dark-08 rounded-lg p-8 relative">
              <button
                type="button"
                className="absolute top-3 right-3 cursor-pointer hover:bg-red text-red rounded-full p-1.5 bg-white hover:text-white"
                onClick={() => handleDelete(order)}
              >
                <DeleteIcon className="size-3" />
              </button>

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
                    hidden={i >= 1 && !goals[i - 1].completed}
                    type="button"
                    className={`w-fit text-white text-xs font-bold px-4 py-1 rounded-full cursor-pointer hover:opacity-80 ${completed ? "bg-green" : "bg-dark"}`}
                    onClick={() => handleComplete(order, completed)}
                  >
                    {completed ? (
                      <div className="flex gap-2">
                        <span>Completed</span>
                        <div className="bg-white/80 w-0.5 h-auto" />
                        <span>Undo</span>
                      </div>
                    ) : (
                      "Mark as Completed"
                    )}
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
