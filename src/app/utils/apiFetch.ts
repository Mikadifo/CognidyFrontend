import { BASE_API } from "../constants";
import GenerationStatusDto from "../dtos/GenerationStatusDto";
import NewGoalDto from "../dtos/NewGoalDto";
import QuizzesDto from "../dtos/QuizzesDto";
import Session from "../models/Session";
import { UserLoginDto, UserSignUpDto } from "../dtos/UserDto";
import { Note } from "../models/Note";
import RoadmapGoal from "../models/RoadmapGoal";
import SessionDto from "../dtos/SessionDto";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : "";
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_API}${endpoint}`, options);
  let json: unknown;

  try {
    json = await res.json();
  } catch (e) {
    throw new Error(`Failed to parse response JSON: ${e}`);
  }

  if (!res.ok) {
    if (typeof json === "object" && json !== null) {
      const obj = json as Record<string, unknown>;
      const error = obj.error ?? res.statusText ?? `HTTP ${res.status}`;

      throw error instanceof Error ? error : error;
    }

    throw new Error(res.statusText || `HTTP ${res.status}`);
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
        Authorization: getAuthHeader(),
      },
    }),
  generationStatus: (id: string) =>
    request<{ data: GenerationStatusDto }>(`/notes/status/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
    }),
  deleteNote: (id: string) =>
    request<{ message: string }>(`/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
    }),
  uploadNoteAuth: (formData: FormData) =>
    request<{ data: Note }>(`/notes/upload/auth`, {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(),
      },
      body: formData,
    }),
  fetchGoals: () =>
    request<{ data: RoadmapGoal[] }>("/roadmap_goals", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
    }),
  newGoal: (newGoal: NewGoalDto) =>
    request<{ message: string }>(`/roadmap_goals/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify(newGoal),
    }),
  deleteGoal: (order: number) =>
    request<{ message: string }>(`/roadmap_goals/delete/${order}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
    }),
  updateGoalCompletion: (order: number, completed: boolean) =>
    request<{ message: string }>(`/roadmap_goals/complete/${order}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({ completed }),
    }),
  fetchQuizzes: () =>
    request<{ data: QuizzesDto[] }>("/quizzes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
    }),
  addSession: (newSession: SessionDto) =>
    request<{ message: string }>("/sessions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({
        ...newSession,
        completed_at: newSession.completed_at.toISOString().split("T")[0],
      }),
    }),
  getUser: () =>
    request<{ data: { username: string; email: string } }>(`/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
    }),
  updateUser: (payload: { username: string; email: string }) =>
    request<{ message: string; token: string }>(`/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify(payload),
    }),
  resetPassword: (payload: { password: string; new_password: string }) =>
    request<{ message: string }>(`/users/reset_password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify(payload),
    }),
  fetchSessions: () =>
    request<{ data: Session[] }>("/sessions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
    }),
};
