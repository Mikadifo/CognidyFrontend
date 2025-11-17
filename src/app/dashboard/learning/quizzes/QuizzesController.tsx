"use client";

import { DescriptionCard } from "@/app/components/DescriptionCard";
import QuizzesDto from "@/app/dtos/QuizzesDto";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/Button";
import QuizzQuestion from "@/app/components/QuizzQuestion";
import { useApi } from "@/app/hooks/useApi";
import { api } from "@/app/utils/apiFetch";
import { useAuth } from "@/app/hooks/useAuth";
import GuestLoginCTA from "@/app/components/GuestLoginCTA";
import QuizzesSkeleton from "@/app/skeletons/QuizzesSkeleton";
import GenerationNotification, {
  GeneratingSection,
} from "@/app/components/GenerationNotification";

export function QuizzesController() {
  const { getToken } = useAuth();
  const [token, setToken] = useState("");
  const [quizzesCompleted, setQuizzesCompleted] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);
  const [missedCount, setMissedCount] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const {
    submit: getQuizzes,
    loading,
    error,
    data: quizzes,
  } = useApi<QuizzesDto[], []>(api.fetchQuizzes);

  useEffect(() => {
    setToken(getToken() || "");
  }, [getToken]);

  useEffect(() => {
    if (!getToken() || getToken() === "guest") {
      return;
    }

    getQuizzes();

    setCurrentQuiz(0);
  }, [setCurrentQuiz, getQuizzes]);

  const hasQuizzes = () => {
    return quizzes && quizzes?.length > 0;
  };

  const restartQuizzes = () => {
    setQuizzesCompleted(false);
    setCurrentQuiz(0);
    setMissedCount(0);
    setCorrectCount(0);

    getQuizzes();
  };

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
    }
  };

  if (error && typeof error === "string") {
    return error;
  }

  if (token === "guest") {
    return <GuestLoginCTA />;
  }

  return (
    <div className="flex flex-col gap-8">
      {!loading ? (
        <GenerationNotification
          section={GeneratingSection.QUIZZES}
          fetchFunction={hasQuizzes() ? () => {} : getQuizzes}
        />
      ) : null}

      <div className="flex gap-16">
        {!hasQuizzes() && !loading && (
          <p className="text-md">
            You don&apos;t have quizzes yet. Upload a file to generate quizzes
            using AI.
          </p>
        )}

        {loading ? (
          <QuizzesSkeleton />
        ) : hasQuizzes() ? (
          quizzesCompleted ? (
            <div className="flex flex-col gap-12 w-[640px]">
              <div className="flex flex-col gap-2">
                <h3>You’ve completed all the quizzes!</h3>
                <p>
                  Great job! You’ve answered every question — ready for a new
                  challenge?  You can try them all again in a fresh order or add
                  new quizzes by uploading more files.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Button onClick={restartQuizzes}>Try Again</Button>
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
            <QuizzQuestion
              handleNext={handleNext}
              quizz={quizzes[currentQuiz]}
            />
          )
        ) : null}

        {hasQuizzes() ? (
          <DescriptionCard
            sourceFileName={quizzes[currentQuiz].sourceFileName}
            label="quizzes"
            total={quizzes.length}
            missed={missedCount}
            correct={correctCount}
            onRestart={restartQuizzes}
          />
        ) : null}
      </div>
    </div>
  );
}
