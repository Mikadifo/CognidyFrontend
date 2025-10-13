import { ChangeEvent, FC, FormEvent, useState } from "react";
import RoadmapGoal from "../models/RoadmapGoal";
import { Input } from "./Input";
import { Button } from "./Button";
import { useApi } from "../hooks/useApi";
import { api } from "../utils/apiFetch";
import NewGoalDto from "../dtos/NewGoalDto";

interface RoadmapGoalFormProps {
  goals: RoadmapGoal[];
  onSubmit: () => void;
}

export const RoadmapGoalForm: FC<RoadmapGoalFormProps> = ({
  goals,
  onSubmit,
}) => {
  const [newGoalOrder, setNewGoalOrder] = useState<number>(goals.length + 1);
  const [newGoalTitle, setNewGoalTitle] = useState<string>("");
  const [newGoalBrief, setNewGoalBrief] = useState<string>("");
  const { loading, submit: createGoal } = useApi<{}, [newGoal: NewGoalDto]>(
    api.newGoal,
  );

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

  const handleAddGoal = async (event: FormEvent) => {
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

    const newGoal: NewGoalDto = {
      order: newGoalOrder,
      title: newGoalTitle,
      brief: newGoalBrief,
    };

    const response = await createGoal(newGoal);

    if (response.error) {
      console.error(response.error);
      return;
    }

    setNewGoalOrder(0);
    setNewGoalTitle("");
    setNewGoalBrief("");

    onSubmit();
  };

  return (
    <form
      className="flex bg-dark-08 rounded-lg p-8 w-[400px] flex-col gap-8 h-fit sticky top-0"
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

      <Button type="submit" className="!bg-brand" disabled={loading}>
        {loading ? "Loading..." : "Create Custom Goal"}
      </Button>
    </form>
  );
};
