"use client";

import { DescriptionCard } from "@/app/components/DescriptionCard";
import QuizzesDto from "@/app/dtos/QuizzesDto";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import quizzesData from "@/app/data/quizzes-mock.json";
import { Button } from "@/app/components/Button";
import CorrectIcon from "@/app/assets/icons/correctIcon.svg";
import IncorrectIcon from "@/app/assets/icons/incorrectIcon.svg";

export function QuizzesController() {
  const [quizzes, setQuizzes] = useState<QuizzesDto[] | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);
  const [missedCount, setMissedCount] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  useEffect(() => {
    //TODO: fetch here (randomized already) from DB, but check LocalStorage first
    setQuizzes(quizzesData as QuizzesDto[]);
    //TODO: getCurrentQuiz from localStorage or zero if empty
    setCurrentQuiz(0);
  }, [setCurrentQuiz, setQuizzes]);

  const handleNext = () => {
    const nextQuiz = currentQuiz + 1;

    if (quizzes && quizzes[nextQuiz]) {
      setCurrentQuiz(nextQuiz);
    }
  };

  if (!quizzes) {
    return null;
  }

  return (
    <div className="flex gap-16">
      <QuizzQuestion
        handleNext={handleNext}
        quizz={quizzes[currentQuiz]}
        setMissedCount={setMissedCount}
        setCorrectCount={setCorrectCount}
      />

      <DescriptionCard
        sourceFileName={quizzes[currentQuiz].sourceFileName}
        label="quizzes"
        total={quizzes.length}
        missed={missedCount}
        correct={correctCount}
      />
    </div>
  );
}

interface QuizzesQuestion {
  quizz: QuizzesDto;
  setMissedCount: Dispatch<SetStateAction<number>>;
  setCorrectCount: Dispatch<SetStateAction<number>>;
  handleNext: () => void;
}

const QuizzQuestion = ({
  quizz,
  setMissedCount,
  setCorrectCount,
  handleNext,
}: QuizzesQuestion) => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctOption, setCorrectOption] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);
  const [showCorrect, setShowCorrect] = useState<boolean>(false);

  useEffect(() => {
    const shuffledOptions = [...quizz.options].sort(() => Math.random() - 0.5);

    setOptions(shuffledOptions);
  }, [quizz, setOptions]);

  const isCorrect = (option?: string) => {
    return (
      selectedOption !== null &&
      completed &&
      (option ? option : selectedOption) === quizz.correct
    );
  };

  const toggleCorrectAnswer = () => {
    if (!completed) return;

    if (showCorrect) {
      //TODO: handle show correct
    } else {
      //TODO: handle hide correct
    }

    setShowCorrect(!showCorrect);
  };

  const handleActionButton = () => {
    if (completed) {
      handleNext();
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
              className={`rounded-lg py-2 w-[calc(50%-8px)] text-base ${selectedOption === option ? "bg-brand-16" : "bg-dark-08"} ${!completed ? "cursor-pointer" : ""} relative`}
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
              ) : (
                ""
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button disabled={selectedOption === null} onClick={handleActionButton}>
          {completed ? "Next" : "Submit"}
        </Button>
        {!isCorrect() && completed && (
          <Button variant="outline" onClick={toggleCorrectAnswer}>
            {showCorrect ? "Hide" : "Show"} correct answer
          </Button>
        )}
      </div>
    </div>
  );
};
