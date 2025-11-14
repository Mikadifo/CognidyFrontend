import { useEffect, useState } from "react";
import { LocalStorageKeys } from "../constants";

const { CURRENT_QUIZ } = LocalStorageKeys;

export function useCurrentQuiz() {
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = localStorage.getItem(CURRENT_QUIZ);

    if (current !== null && current !== undefined) {
      setCurrentQuiz(JSON.parse(current));
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(CURRENT_QUIZ, JSON.stringify(currentQuiz));
    }
  }, [currentQuiz, mounted]);

  return { currentQuiz, setCurrentQuiz };
}
