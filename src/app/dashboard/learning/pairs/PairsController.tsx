"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";
import { useApi } from "@/app/hooks/useApi";
import { api } from "@/app/utils/apiFetch";
import SessionDto from "@/app/dtos/SessionDto";
import GuestLoginCTA from "@/app/components/GuestLoginCTA";
import { Button } from "@/app/components/Button";
import PuzzlePair from "@/app/components/PuzzlePair";
import { DescriptionCard } from "@/app/components/DescriptionCard";
import PuzzlesDto from "@/app/dtos/PuzzlesDto";
import GenerationNotification, {
  GeneratingSection,
} from "@/app/components/GenerationNotification";

export function PairsController() {
  const { getToken } = useAuth();
  const [token, setToken] = useState("");
  const [puzzlesCompleted, setPuzzlesCompleted] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState<number>(0);
  const [missedCount, setMissedCount] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const {
    submit: getPuzzles,
    loading,
    error,
    data: puzzles,
  } = useApi<PuzzlesDto[], []>(api.fetchPuzzlesPairs);
  const { submit: addSession } = useApi<string, [SessionDto]>(api.addSession);

  useEffect(() => {
    setToken(getToken() || "");
  }, [getToken]);

  useEffect(() => {
    if (!getToken() || getToken() === "guest") {
      return;
    }

    getPuzzles();

    setCurrentPuzzle(0);
  }, [setCurrentPuzzle, getPuzzles]);

  const hasPuzzles = () => {
    return puzzles && puzzles?.length > 0;
  };

  const restartPuzzles = () => {
    setPuzzlesCompleted(false);
    setCurrentPuzzle(0);
    setMissedCount(0);
    setCorrectCount(0);

    getPuzzles();
  };

  const handleNext = (correct: boolean) => {
    if (correct) {
      setCorrectCount(correctCount + 1);
    } else {
      setMissedCount(missedCount + 1);
    }

    const nextPuzzle = currentPuzzle + 1;

    if (puzzles && puzzles[nextPuzzle]) {
      setCurrentPuzzle(nextPuzzle);
    } else {
      setPuzzlesCompleted(true);

      if (!hasPuzzles()) {
        return;
      }

      addSession({
        total: puzzles!.length,
        correct: correct ? correctCount + 1 : correctCount,
        section: "puzzles",
        completed_at: new Date(),
      });
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
          section={GeneratingSection.PUZZLES}
          fetchFunction={hasPuzzles() ? () => {} : getPuzzles}
        />
      ) : null}

      <div className="flex gap-16">
        {!hasPuzzles() && (
          <p className="text-md">
            You don&apos;t have puzzles yet. Upload a file to generate puzzles
            using AI.
          </p>
        )}

        {hasPuzzles() ? (
          puzzlesCompleted ? (
            <div className="flex flex-col gap-12 w-[640px]">
              <div className="flex flex-col gap-2">
                <h3>You’ve completed all the puzzles!</h3>
                <p>
                  Great job! You’ve answered every question — ready for a new
                  challenge?  You can try them all again in a fresh order or add
                  new puzzles by uploading more files.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Button onClick={restartPuzzles}>Try Again</Button>
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
            <PuzzlePair
              handleNext={handleNext}
              puzzle={puzzles![currentPuzzle]}
            />
          )
        ) : null}

        {hasPuzzles() ? (
          <DescriptionCard
            sourceFileName={puzzles![currentPuzzle].sourceFileName}
            label="puzzles"
            total={puzzles!.length}
            missed={missedCount}
            correct={correctCount}
            onRestart={restartPuzzles}
          />
        ) : null}
      </div>
    </div>
  );
}
