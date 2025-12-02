import { useEffect, useState } from "react";
import { LocalStorageKeys } from "../constants";

const { HIDE_COMPLETED } = LocalStorageKeys;

export function useGoalSettings() {
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const hide = localStorage.getItem(HIDE_COMPLETED);

    if (hide !== null && hide !== undefined) {
      setHideCompleted(JSON.parse(hide));
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(HIDE_COMPLETED, JSON.stringify(hideCompleted));
    }
  }, [hideCompleted, mounted]);

  return { hideCompleted, setHideCompleted };
}
