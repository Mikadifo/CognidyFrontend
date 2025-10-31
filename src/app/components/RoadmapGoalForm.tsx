import { ChangeEvent, FC, FormEvent, useState } from "react";
import RoadmapGoal from "../models/RoadmapGoal";
import { Input } from "./Input";
import { Button } from "./Button";
import { useApi } from "../hooks/useApi";
import { api } from "../utils/apiFetch";
import NewGoalDto from "../dtos/NewGoalDto";
import { title } from "process";

interface RoadmapGoalFormProps {
  goals: RoadmapGoal[];
  onSubmit: () => void;
}

export const RoadmapGoalForm: FC<RoadmapGoalFormProps> = ({
  goals,
  onSubmit,
}) => {
  const [newGoal, setNewGoal] = useState<NewGoalDto>({
    order: goals.length + 1,
    title: "",
    brief: "",
  });
  const {
    loading,
    submit: createGoal,
    error,
  } = useApi<void, [newGoal: NewGoalDto]>(api.newGoal);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({
    order: "",
    title: "",
    brief: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewGoal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddGoal = async (event: FormEvent) => {
    event.preventDefault();

    const newTitle = newGoal.title.trim();
    const newBrief = newGoal.brief.trim();

    if (newGoal.order <= 0 || newGoal.order > goals.length + 1) {
      setValidationErrors({
        ...validationErrors,
        order: `Order must be in range (1-${goals.length + 1})`,
      });

      return;
    }

    if (!newTitle) {
      setValidationErrors({
        ...validationErrors,
        title: "Title cannot be empty",
      });
      return;
    }

    if (!newTitle) {
      setValidationErrors({
        ...validationErrors,
        brief: "Brief cannot be empty",
      });
      return;
    }

    const response = await createGoal({
      order: newGoal.order,
      title: newTitle,
      brief: newBrief,
    });

    if (response.error) {
      return;
    }

    setNewGoal({ order: 0, title: "", brief: "" });
    onSubmit();
  };

  const getError = (name: string) => {
    if (validationErrors[name]) {
      return validationErrors[name];
    }

    if (error) {
      if (typeof error === "object") {
        return error[name];
      } else {
        return String(error);
      }
    }

    return undefined;
  };

  return (
    <form
      className="flex bg-dark-08 rounded-lg p-8 w-[400px] flex-col gap-8 h-fit sticky top-0"
      onSubmit={handleAddGoal}
    >
      <div className="flex flex-col gap-4">
        <Input
          name="order"
          label={`Goal number (1 - ${goals.length + 1})`}
          placeholder="Goal #"
          type="number"
          min={1}
          max={goals.length + 1}
          required
          value={newGoal.order}
          onChange={handleChange}
          hidden={goals.length === 0}
          error={getError("order")}
        />
        <Input
          name="title"
          label="Goal title"
          placeholder="Goal title"
          type="text"
          required
          value={newGoal.title}
          onChange={handleChange}
          error={getError("title")}
        />
        <Input
          name="brief"
          label="Goal brief"
          placeholder="Goal brief"
          type="text"
          required
          value={newGoal.brief}
          onChange={handleChange}
          error={getError("brief")}
        />
      </div>

      <Button type="submit" className="!bg-brand" disabled={loading}>
        {loading ? "Loading..." : "Create Custom Goal"}
      </Button>
    </form>
  );
};
