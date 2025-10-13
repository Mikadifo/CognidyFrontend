import { AUTH_TOKEN, BASE_API } from "../constants";
import NewGoalDto from "../dtos/NewGoalDto";
import { Note } from "../models/Note";
import RoadmapGoal from "../models/RoadmapGoal";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_API}${endpoint}`, options);
  let json: any;

  try {
    json = await res.json();
  } catch (e) {
    throw new Error(`Failed to parse response JSON: ${e}`);
  }

  if (!res.ok) {
    const errorMessage = json?.error || res.statusText || `HTTP ${res.status}`;
    throw new Error(errorMessage);
  }

  return json;
}

export const api = {
  fetchNotes: () =>
    request<{ data: Note[] }>("/notes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN, // TODO: use login token instead and also check for guest user, need auth hook
      },
    }),
  deleteNote: (id: string) =>
    request<{}>(`/notes/delete/${id}`, {
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
    request<{}>(`/roadmap_goals/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN, // TODO: use login token instead and also check for guest user, need auth hook
      },
      body: JSON.stringify(newGoal),
    }),
};
