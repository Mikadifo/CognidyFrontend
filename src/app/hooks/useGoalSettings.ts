import { useEffect, useState } from "react";
import { LocalStorageKeys } from "../constants";

const { HIDE_COMPLETED } = LocalStorageKeys;

export function useGoalSettings() {
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  useEffect(() => {
    const hide = localStorage.getItem(HIDE_COMPLETED);

    if (hide) {
      setHideCompleted(JSON.parse(hide));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(HIDE_COMPLETED, JSON.stringify(hideCompleted));
  }, [hideCompleted]);

  return { hideCompleted, setHideCompleted };
}
