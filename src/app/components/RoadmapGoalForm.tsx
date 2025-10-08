import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import RoadmapGoal from "../models/RoadmapGoal";
import { Input } from "./Input";
import { Button } from "./Button";

interface RoadmapGoalFormProps {
  goals: RoadmapGoal[];
  setGoals: Dispatch<SetStateAction<RoadmapGoal[]>>;
}

export const RoadmapGoalForm: FC<RoadmapGoalFormProps> = ({
  goals,
  setGoals,
}) => {
  const [newGoalOrder, setNewGoalOrder] = useState<number>(goals.length + 1);
  const [newGoalTitle, setNewGoalTitle] = useState<string>("");
  const [newGoalBrief, setNewGoalBrief] = useState<string>("");

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
  };

  return (
    <form
      className="flex bg-dark-08 rounded-lg p-8 w-[400px] flex-col gap-8 h-fit"
      onSubmit={handleAddGoal}
    >
      <div className="flex flex-col gap-4">
        <Input
          label={`Goal number (1 - ${goals.length + 1})`}
          placeholder="Goal #"
          type="number"
          min={1}
          max={goals.length + 1}
          required
          value={newGoalOrder}
          onChange={handleNewGoalOrder}
        />
        <Input
          label="Goal title"
          placeholder="Goal title"
          type="text"
          required
          value={newGoalTitle}
          onChange={handleNewGoalTitle}
        />
        <Input
          label="Goal brief"
          placeholder="Goal brief"
          type="text"
          required
          value={newGoalBrief}
          onChange={handleNewGoalBrief}
        />
      </div>

      <Button type="submit" className="!bg-brand">
        Create Custom Goal
      </Button>
    </form>
  );
};
