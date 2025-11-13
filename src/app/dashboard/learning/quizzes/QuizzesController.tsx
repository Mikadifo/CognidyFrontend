"use client";

import { DescriptionCard } from "@/app/components/DescriptionCard";
import QuizzesDto from "@/app/dtos/QuizzesDto";
import { useEffect, useState } from "react";
import quizzesData from "@/app/data/quizzes-mock.json";
import { Button } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import QuizzQuestion from "@/app/components/QuizzQuestion";

export function QuizzesController() {
  const router = useRouter();
  const [quizzesCompleted, setQuizzesCompleted] = useState(false);
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

  const handleNext = (correct: boolean) => {
    if (correct) {
      setCorrectCount(correctCount + 1);
    } else {
      setMissedCount(missedCount + 1);
    }

    const nextQuiz = currentQuiz + 1;

    if (quizzes && quizzes[nextQuiz]) {
      setCurrentQuiz(nextQuiz);
    } else {
      setQuizzesCompleted(true);
      //TODO: clean everyting from localStorage
    }
  };

  if (!quizzes) {
    return null;
  }

  return (
    <div className="flex gap-16">
      {quizzesCompleted ? (
        <div className="flex flex-col gap-12 w-[640px]">
          <div className="flex flex-col gap-2">
            <h3>You’ve completed all the quizzes!</h3>
            <p>
              Great job! You’ve answered every question — ready for a new
              challenge?  You can try them all again in a fresh order or add new
              quizzes by uploading more files.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Button onClick={() => router.refresh()}>Try Again</Button>
            <Button
              as="a"
              href="/dashboard/learning"
              variant="outline"
              className="text-center"
            >
              Explore Learning
            </Button>
          </div>
        </div>
      ) : (
        <QuizzQuestion handleNext={handleNext} quizz={quizzes[currentQuiz]} />
      )}

      <DescriptionCard
        sourceFileName={quizzes[currentQuiz].sourceFileName}
        label="quizzes"
        total={quizzes.length}
        missed={missedCount}
        correct={correctCount}
        onRestart={() => {}}
      />
    </div>
  );
}
