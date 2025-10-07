"use client";

import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import RoadmapGoal from "../models/RoadmapGoal";
import { ArcherContainer, ArcherElement } from "react-archer";
import AddIcon from "@/app/assets/icons/add.svg";
import { Input } from "./Input";
import { Button } from "./Button";

interface RoadmapGoalsProps {
  goals: RoadmapGoal[];
  setGoals: Dispatch<SetStateAction<RoadmapGoal[]>>;
}

export const RoadmapGoals: FC<RoadmapGoalsProps> = ({ goals, setGoals }) => {
  const [addingNewGoal, setAddingNewGoal] = useState(false);
  const [newGoalOrder, setNewGoalOrder] = useState<number>(0);
  const [newGoalTitle, setNewGoalTitle] = useState<string>("");
  const [newGoalBrief, setNewGoalBrief] = useState<string>("");

  const handleComplete = (order: number) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.order === order
          ? { ...goal, completed: !goal.completed }
          : { ...goal },
      ),
    );
  };

  const handleNewGoalOrder = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    setNewGoalOrder(value);
  };

  const handleNewGoalTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setNewGoalTitle(value);
  };

  const handleNewGoalBrief = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setNewGoalBrief(value);
  };

  const handleAddGoal = (event: FormEvent) => {
    event.preventDefault();

    newGoalTitle.trim();
    newGoalBrief.trim();

    if (
      newGoalOrder <= 0 ||
      newGoalOrder > goals.length + 1 ||
      !newGoalTitle ||
      !newGoalBrief
    ) {
      return;
    }

    const newGoal: RoadmapGoal = {
      order: newGoalOrder,
      title: newGoalTitle,
      brief: newGoalBrief,
      completed: false,
    };

    //TODO: CALL API HERE, so it will return sorted

    setGoals((prev) => [
      ...prev.map((goal) =>
        goal.order >= newGoal.order
          ? { ...goal, order: goal.order + 1 }
          : { ...goal },
      ),
      newGoal,
    ]);

    //TODO: PROBABLY delete this after API
    setGoals((prev) => [...prev].sort((a, b) => a.order - b.order));

    setNewGoalOrder(0);
    setNewGoalTitle("");
    setNewGoalBrief("");
    setAddingNewGoal(false);
  };

  return (
    <ArcherContainer strokeColor="#92959C" strokeDasharray="5,5">
      <div className="font-nunito text-dark flex gap-16 w-full flex-wrap">
        {goals.map(({ order, title, brief, completed }, i) => (
          <ArcherElement
            key={order}
            id={String(order)}
            relations={
              i < goals.length - 1
                ? [
                    {
                      targetId: String(goals[i + 1].order),
                      targetAnchor: "left",
                      sourceAnchor: "right",
                    },
                  ]
                : []
            }
          >
            <div className="flex flex-col gap-4 justify-between bg-dark-08 rounded-lg p-8 w-[240px]">
              <div className="flex flex-col gap-4">
                <span className="font-poppins font-bold text-xl text-brand">
                  {String(order).padStart(2, "0")}
                </span>

                <div className="flex flex-col gap-2 text-lg">
                  <b>{title}</b>
                  <p>{brief}</p>
                </div>
              </div>

              <button
                type="button"
                className={`w-fit text-white text-xs font-bold px-4 py-1 rounded-full cursor-pointer hover:opacity-80 ${completed ? "bg-green" : "bg-dark"}`}
                onClick={() => handleComplete(order)}
              >
                {completed ? "Completed" : "Mark as Completed"}
              </button>
            </div>
          </ArcherElement>
        ))}

        {addingNewGoal ? (
          <form
            className="flex bg-dark-08 rounded-lg p-8 w-[240px] flex-col justify-between gap-4"
            onSubmit={handleAddGoal}
          >
            <Input
              placeholder="Goal #"
              type="number"
              min={1}
              max={goals.length + 1}
              required
              value={newGoalOrder}
              onChange={handleNewGoalOrder}
            />
            <Input
              placeholder="Goal title"
              type="text"
              required
              value={newGoalTitle}
              onChange={handleNewGoalTitle}
            />
            <Input
              placeholder="Goal brief"
              type="text"
              required
              value={newGoalBrief}
              onChange={handleNewGoalBrief}
            />
            <Button type="submit" className="!bg-brand !py-2">
              Create
            </Button>
          </form>
        ) : (
          <button
            className="flex bg-dark-08 rounded-lg p-8 w-[240px] cursor-pointer hover:bg-dark-16 hover:opacity-80 items-center justify-center"
            type="button"
            onClick={() => setAddingNewGoal(true)}
          >
            <AddIcon className="size-12" />
          </button>
        )}
      </div>
    </ArcherContainer>
  );
};
