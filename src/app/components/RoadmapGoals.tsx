"use client";

import { Dispatch, FC, SetStateAction } from "react";
import RoadmapGoal from "../models/RoadmapGoal";
import { ArcherContainer, ArcherElement } from "react-archer";
import DeleteIcon from "../assets/icons/trashcan.svg";
import { api } from "../utils/apiFetch";
import { useApi } from "../hooks/useApi";

interface RoadmapGoalsProps {
  goals: RoadmapGoal[];
  setGoals: Dispatch<SetStateAction<RoadmapGoal[]>>;
  getGoals: () => void;
}

export const RoadmapGoals: FC<RoadmapGoalsProps> = ({
  goals,
  setGoals,
  getGoals,
}) => {
  const { submit: deleteGoal, error } = useApi<{}, [order: number]>(
    api.deleteGoal,
  );

  const handleComplete = (order: number) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.order === order
          ? { ...goal, completed: !goal.completed }
          : { ...goal },
      ),
    );
  };

  const handleDelete = async (order: number) => {
    const confirmed = confirm("Are you sure you want to delte this goal?");

    if (!confirmed) {
      return;
    }

    await deleteGoal(order);

    if (error) {
      console.error(error);
    } else {
      getGoals();
    }
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
