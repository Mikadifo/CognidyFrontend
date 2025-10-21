import { AUTH_TOKEN, BASE_API } from "../constants";
import NewGoalDto from "../dtos/NewGoalDto";
import { UserLoginDto, UserSignUpDto } from "../dtos/UserDto";
import { Note } from "../models/Note";
import RoadmapGoal from "../models/RoadmapGoal";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_API}${endpoint}`, options);
  let json: unknown;

  try {
    json = await res.json();
  } catch (e) {
    throw new Error(`Failed to parse response JSON: ${e}`);
  }

  if (!res.ok) {
    let errorMessage: string;

    if (
      typeof json === "object" &&
      json !== null &&
      "error" in json &&
      typeof (json as { error: unknown }).error === "string"
    ) {
      errorMessage = (json as { error: string }).error;
    } else {
      errorMessage = res.statusText || `HTTP ${res.status}`;
    }

    throw new Error(errorMessage);
  }

  return json as T;
}

export const api = {
  login: (user: UserLoginDto) =>
    request<{ data: string }>(`/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }),
  signup: (user: UserSignUpDto) =>
    request<{ data: string }>(`/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }),
  fetchNotes: () =>
    request<{ data: Note[] }>("/notes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN, // TODO: use login token instead and also check for guest user, need auth hook
      },
    }),
  deleteNote: (id: string) =>
    request<{ message: string }>(`/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN, // TODO: use login token instead and also check for guest user, need auth hook
      },
    }),
  uploadNoteAuth: (formData: FormData) =>
    request<{ data: Note }>(`/notes/upload/auth`, {
      method: "POST",
      headers: {
        Authorization: AUTH_TOKEN, // TODO: use login token instead and also check for guest user, need auth hook
      },
      body: formData,
    }),
  fetchGoals: () =>
    request<{ data: RoadmapGoal[] }>("/roadmap_goals", {
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN, // TODO: use login token instead and also check for guest user, need auth hook
      },
    }),
  newGoal: (newGoal: NewGoalDto) =>
    request<{ message: string }>(`/roadmap_goals/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN, // TODO: use login token instead and also check for guest user, need auth hook
      },
      body: JSON.stringify(newGoal),
    }),
  deleteGoal: (order: number) =>
    request<{ message: string }>(`/roadmap_goals/delete/${order}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN, // TODO: use login token instead and also check for guest user, need auth hook
      },
    }),
  updateGoalCompletion: (order: number, completed: boolean) =>
    request<{ message: string }>(`/roadmap_goals/complete/${order}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN, // TODO: use login token instead and also check for guest user, need auth hook
      },
      body: JSON.stringify({ completed }),
    }),
};
