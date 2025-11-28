export const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const LocalStorageKeys = {
  HIDE_COMPLETED: "hideCompletedGoals",
  CURRENT_QUIZ: "currentQuiz",
} as const;

export const MAX_ROADMAP_GOALS = 15;

export const SectionColors = {
  quizzes: "#7464d2",
  flashcards: "#ff68a4",
  puzzles: "#9fa2d8",
} as const;
