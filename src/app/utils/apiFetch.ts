import { AUTH_TOKEN, BASE_API } from "../constants";
import { Note } from "../models/Note";

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
};
