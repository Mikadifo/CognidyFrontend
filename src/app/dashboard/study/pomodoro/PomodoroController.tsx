"use client";

import { Button } from "@/app/components/Button";
import TimerIcon from "../../../assets/icons/timerIcon.svg";
import ClockIcon from "../../../assets/icons/clockIcon.svg";
import RestartIcon from "../../../assets/icons/restartIcon.svg";
import { FC, useState } from "react";
import { Timer } from "@/app/components/Timer";

export const PomodoroController: FC = () => {
  const [timer, setTimer] = useState<number>(25); // in minutes
  const [reset, setReset] = useState<boolean>(false);
  const [currentTimer, setCurrentTimer] = useState<
    "pomodoro" | "short" | "long"
  >("pomodoro");

  const setShort = () => {
    setTimer(5);
    setCurrentTimer("short");
  };

  const setLong = () => {
    setTimer(15);
    setCurrentTimer("long");
  };

  const setPomodoro = () => {
    setTimer(25);
    setCurrentTimer("pomodoro");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-8 font-nunito text-dark">
      <div className="flex flex-col gap-4">
        <Timer timer={timer} reset={reset} />
        <Button className="bg-brand!">Open Widget</Button>
      </div>

      <ul className="flex flex-col gap-2">
        <li>
          <button
            className={`flex gap-2 py-1 px-3 ${currentTimer === "pomodoro" ? "bg-brand-08" : "hover:bg-dark-04 cursor-pointer"} rounded-md`}
            disabled={currentTimer === "pomodoro"}
            onClick={setPomodoro}
          >
            <TimerIcon className="size-6" />
            Pomodoro
          </button>
        </li>
        <li>
          <button
            className={`flex gap-2 py-1 px-3 ${currentTimer === "short" ? "bg-brand-08" : "hover:bg-dark-04 cursor-pointer"} rounded-md`}
            disabled={currentTimer === "short"}
            onClick={setShort}
          >
            <ClockIcon className="size-6" />
            Short Break
          </button>
        </li>
        <li>
          <button
            className={`flex gap-2 py-1 px-3 ${currentTimer === "long" ? "bg-brand-08" : "hover:bg-dark-04 cursor-pointer"} rounded-md`}
            disabled={currentTimer === "long"}
            onClick={setLong}
          >
            <ClockIcon className="size-6" />
            Long Break
          </button>
        </li>
        <li>
          <button
            className="flex gap-2 py-1 px-3 hover:bg-dark-04 rounded-md cursor-pointer"
            onClick={() => setReset(!reset)}
          >
            <RestartIcon className="size-6" />
            Restart
          </button>
        </li>
      </ul>
    </div>
  );
};
