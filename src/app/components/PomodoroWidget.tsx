import { useEffect, useState } from "react";
import { TimerWidget } from "./TimerWidget";
import OptionsIcon from "./../assets/icons/optionsIcon.svg";
import ClockIcon from "./../assets/icons/clockIcon.svg";
import TimerIcon from "./../assets/icons/timerIcon.svg";
import CloseIcon from "./../assets/icons/closeIcon.svg";

export const PomodoroWidget = ({}) => {
  const [timer, setTimer] = useState<number>(25); // in minutes
  const [showOptions, setShowOptions] = useState(false);
  const [currentTimer, setCurrentTimer] = useState<
    "pomodoro" | "short" | "long"
  >("pomodoro");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const widgetEnabled = localStorage.getItem("pomodoro");

    if (widgetEnabled) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, []);

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

  const removeGlobalWidget = () => {
    localStorage.removeItem("pomodoro");
    setHidden(true);
  };

  return (
    <div
      className="absolute top-3 right-6 border-1 border-dark-16 p-4 bg-white drop-shadow-xl flex flex-col gap-4 rounded-2xl"
      hidden={hidden}
    >
      <div className="flex gap-4">
        <TimerWidget timer={timer} />

        <button
          className="p-2 hover:bg-dark-04 rounded-full cursor-pointer"
          onClick={() => setShowOptions(!showOptions)}
        >
          <OptionsIcon className="size-5" />
        </button>
      </div>

      <ul
        className="flex flex-col gap-2 font-nunito text-dark"
        hidden={!showOptions}
      >
        <li>
          <button
            className={`flex gap-2 py-1 px-3 ${currentTimer === "pomodoro" ? "bg-brand-08" : "hover:bg-dark-04 cursor-pointer"} rounded-md w-full items-center`}
            disabled={currentTimer === "pomodoro"}
            onClick={setPomodoro}
          >
            <TimerIcon className="size-4" />
            Pomodoro
          </button>
        </li>
        <li>
          <button
            className={`flex gap-2 py-1 px-3 ${currentTimer === "short" ? "bg-brand-08" : "hover:bg-dark-04 cursor-pointer"} rounded-md w-full items-center`}
            disabled={currentTimer === "short"}
            onClick={setShort}
          >
            <ClockIcon className="size-4" />
            Short Break
          </button>
        </li>
        <li>
          <button
            className={`flex gap-2 py-1 px-3 ${currentTimer === "long" ? "bg-brand-08" : "hover:bg-dark-04 cursor-pointer"} rounded-md w-full items-center`}
            disabled={currentTimer === "long"}
            onClick={setLong}
          >
            <ClockIcon className="size-4" />
            Long Break
          </button>
        </li>
        <li>
          <button
            className="flex gap-2 py-1 px-3 hover:bg-dark-04 rounded-md cursor-pointer w-full items-center"
            onClick={removeGlobalWidget}
          >
            <CloseIcon className="size-4" />
            Close Widget
          </button>
        </li>
      </ul>
    </div>
  );
};
