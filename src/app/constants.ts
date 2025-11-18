export const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const LocalStorageKeys = {
  HIDE_COMPLETED: "hideCompletedGoals",
  CURRENT_QUIZ: "currentQuiz",
} as const;

export const MAX_ROADMAP_GOALS = 15;
