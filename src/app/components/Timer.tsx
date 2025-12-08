"use client";

import { FC, useEffect, useRef, useState } from "react";
import StartIcon from "../assets/icons/playIcon.svg";
import PauseIcon from "../assets/icons/pauseIcon.svg";

interface TimerProps {
  timer: number;
  isRunning?: boolean;
  reset?: boolean;
}

export const Timer: FC<TimerProps> = ({
  timer,
  isRunning = false,
  reset = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(timer * 60);
  const [running, setRunning] = useState<boolean>(isRunning);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = timeLeft / (timer * 60);
  const radius = 100;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

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
    <div className="flex rounded-full items-center justify-center size-[200px] text-dark relative mx-auto">
      <svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2 + stroke} ${radius * 2 + stroke}`}
        className="overflow-visible absolute top-0 left-0"
      >
        <g
          transform={`rotate(-90 ${radius + stroke / 2} ${radius + stroke / 2})`}
        >
          <circle
            stroke="#E1E6F6"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            r={normalizedRadius}
            cx={radius + stroke / 2}
            cy={radius + stroke / 2}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
          <circle
            stroke="#1e4dd8"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * progress}
            r={normalizedRadius}
            cx={radius + stroke / 2}
            cy={radius + stroke / 2}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </g>
      </svg>

      <div className="absolute flex flex-col items-center">
        <span className="font-poppins font-bold text-[32px]">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </span>
        <button
          className="cursor-pointer hover:bg-dark-04 rounded-full p-2"
          onClick={() => setRunning(!running)}
        >
          {running ? (
            <PauseIcon className="size-7" />
          ) : (
            <StartIcon className="size-7" />
          )}
        </button>
      </div>
    </div>
  );
};
