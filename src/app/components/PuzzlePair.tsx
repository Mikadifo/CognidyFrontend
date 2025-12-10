import { useEffect, useState } from "react";
import { Button } from "./Button";
import CorrectIcon from "@/app/assets/icons/correctIcon.svg";
import IncorrectIcon from "@/app/assets/icons/incorrectIcon.svg";
import PuzzlesDto from "../dtos/PuzzlesDto";
import { ArcherContainer, ArcherElement } from "react-archer";

interface PuzzlePairProps {
  puzzle: PuzzlesDto;
  handleNext: (correct: boolean) => void;
}

export default function PuzzlePair({ puzzle, handleNext }: PuzzlePairProps) {
  const [leftOptions, setLeftOptions] = useState<string[]>([]);
  const [rightOptions, setRightOptions] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);
  const [showCorrect, setShowCorrect] = useState<boolean>(false);
  const [matches, setMatches] = useState<{ left: string; right: string }[]>([]);

  useEffect(() => {
    const left = puzzle.pairs.map((pair) => pair.left);
    const right = puzzle.pairs.map((pair) => pair.right);
    const shuffledLeft = [...left].sort(() => Math.random() - 0.5);
    const shuffledRight = [...right].sort(() => Math.random() - 0.5);

    setLeftOptions(shuffledLeft);
    setRightOptions(shuffledRight);
    setSelectedLeft(null);
    setSelectedRight(null);
    setCompleted(false);
    setShowCorrect(false);
  }, [puzzle, setLeftOptions, setRightOptions]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      setMatches((prev) => [
        ...prev.filter(
          (m) => m.left !== selectedLeft && m.right !== selectedRight,
        ),
        { left: selectedLeft, right: selectedRight },
      ]);

      setSelectedLeft(null);
      setSelectedRight(null);
    }
  }, [selectedLeft, selectedRight]);

  const isCorrect = () => {
    if (!completed) {
      return false;
    }

    for (const pair of puzzle.pairs) {
      const selectedPair = matches.filter((m) => m.left === pair.left)[0];

      if (selectedPair.right !== pair.right) {
        return false;
      }
    }

    return true;
  };

  const toggleCorrectAnswer = () => {
    if (!completed) return;

    setShowCorrect(!showCorrect);
  };

  const handleActionButton = () => {
    //setShowCorrect(false);

    if (completed) {
      handleNext(isCorrect());
      return;
    }

    if (matches.length < 4) {
      return;
    }

    setCompleted(true);
  };

  return (
    <div className="w-[640px] flex flex-col gap-12 font-nunito text-dark">
      <div className="flex flex-col gap-8">
        <p className="font-bold text-xl">Match the pairs</p>

        <ArcherContainer strokeColor="#92959C" strokeDasharray="5,5">
          <div className="flex gap-8 justify-between">
            <div className="flex flex-col gap-4">
              {leftOptions.map((left, index) => (
                <ArcherElement
                  id={left}
                  key={index}
                  relations={matches
                    .filter((m) => m.left === left)
                    .map((m) => ({
                      targetId: m.right,
                      targetAnchor: "left",
                      sourceAnchor: "right",
                    }))}
                >
                  <button
                    className={`rounded-lg px-4 py-2 text-base text-center w-[196px] cursor-pointer hover:opacity-80 ${left === selectedLeft ? "bg-brand-16" : "bg-dark-08"}`}
                    onClick={() => setSelectedLeft(left)}
                  >
                    {left}
                  </button>
                </ArcherElement>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {rightOptions.map((right, index) => (
                <ArcherElement key={index} id={right}>
                  <button
                    className={`rounded-lg px-4 py-2 text-base text-center w-[256px] cursor-pointer hover:opacity-80 ${right === selectedRight ? "bg-brand-16" : "bg-dark-08"}`}
                    onClick={() => setSelectedRight(right)}
                  >
                    {right}
                  </button>
                </ArcherElement>
              ))}
            </div>
          </div>
        </ArcherContainer>
      </div>

      <div className="flex flex-col gap-4">
        <Button disabled={matches.length < 4} onClick={handleActionButton}>
          {completed ? "Next" : "Submit"}
        </Button>
        {/*!isCorrect() && completed && (
          <Button variant="outline" onClick={toggleCorrectAnswer}>
            {showCorrect ? "Hide" : "Show"} correct answer
          </Button>
	  )*/}
      </div>
    </div>
  );
}
