import { useEffect, useState } from "react";
import QuizzesDto from "../dtos/QuizzesDto";
import { Button } from "./Button";
import CorrectIcon from "@/app/assets/icons/correctIcon.svg";
import IncorrectIcon from "@/app/assets/icons/incorrectIcon.svg";

interface QuizzesQuestion {
  quizz: QuizzesDto;
  handleNext: (correct: boolean) => void;
}

export default function QuizzQuestion({ quizz, handleNext }: QuizzesQuestion) {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);
  const [showCorrect, setShowCorrect] = useState<boolean>(false);

  useEffect(() => {
    const shuffledOptions = [...quizz.options].sort(() => Math.random() - 0.5);

    setOptions(shuffledOptions);
    setSelectedOption(null);
    setCompleted(false);
    setShowCorrect(false);
  }, [quizz, setOptions]);

  const isCorrect = (option: string) => {
    return selectedOption !== null && completed && option === quizz.correct;
  };

  const toggleCorrectAnswer = () => {
    if (!completed) return;

    setShowCorrect(!showCorrect);
  };

  const handleActionButton = () => {
    setShowCorrect(false);

    if (completed) {
      handleNext(isCorrect(selectedOption || ""));
      return;
    }

    if (selectedOption === null) {
      return;
    }

    setCompleted(true);
  };

  return (
    <div className="w-[640px] flex flex-col gap-12 font-nunito text-dark">
      <div className="flex flex-col gap-8">
        <p className="font-bold text-xl">{quizz.question}</p>

        <div className="flex flex-wrap gap-4">
          {options.map((option, index) => (
            <button
              className={`rounded-lg py-2 px-2 w-[calc(50%-8px)] text-base ${selectedOption === option ? "bg-brand-16" : "bg-dark-08"} ${!completed ? "cursor-pointer" : ""} relative`}
              onClick={() => (!completed ? setSelectedOption(option) : {})}
              key={index}
            >
              {option}
              {(option === selectedOption && completed) ||
              (quizz.correct === option && showCorrect) ? (
                isCorrect(option) ? (
                  <CorrectIcon className="size-4 absolute right-2 top-1/2 -translate-y-1/2" />
                ) : (
                  <IncorrectIcon className="size-4 absolute right-2 top-1/2 -translate-y-1/2" />
                )
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button disabled={selectedOption === null} onClick={handleActionButton}>
          {completed ? "Next" : "Submit"}
        </Button>
        {!isCorrect(selectedOption || "") && completed && (
          <Button variant="outline" onClick={toggleCorrectAnswer}>
            {showCorrect ? "Hide" : "Show"} correct answer
          </Button>
        )}
      </div>
    </div>
  );
}
