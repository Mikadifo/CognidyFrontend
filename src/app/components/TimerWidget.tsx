"use client";

import { FC, useEffect, useRef, useState } from "react";
import StartIcon from "../assets/icons/playIcon.svg";
import PauseIcon from "../assets/icons/pauseIcon.svg";
import RestartIcon from "../assets/icons/restartIcon.svg";

interface TimerWidgetProps {
  timer: number;
  isRunning?: boolean;
}

export const TimerWidget: FC<TimerWidgetProps> = ({
  timer,
  isRunning = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(timer * 60);
  const [running, setRunning] = useState<boolean>(isRunning);
  const [reset, setReset] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    setTimeLeft(timer * 60);
    setRunning(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [timer, reset]);

  useEffect(() => {
    if (!running) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }

          setRunning(false);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running]);

  return (
    <div className="flex rounded-full items-center justify-center text-dark mx-auto">
      <div className="flex items-center gap-1">
        <span className="font-poppins font-bold text-lg">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </span>
        <button
          className="cursor-pointer hover:bg-dark-04 rounded-full p-1"
          onClick={() => setRunning(!running)}
        >
          {running ? (
            <PauseIcon className="size-5" />
          ) : (
            <StartIcon className="size-5" />
          )}
        </button>

        <button
          className="cursor-pointer hover:bg-dark-04 rounded-full p-1"
          onClick={() => setReset(!reset)}
        >
          <RestartIcon className="size-5" />
        </button>
      </div>
    </div>
  );
};
