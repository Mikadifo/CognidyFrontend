// app/dashboard/learning/puzzles/page.tsx
"use client";

import { useState } from 'react';
import { DashboardHeader } from "@/app/components/DashboardHeader";
import { SectionOption } from "@/app/components/SectionOption";
import { CrosswordFileUpload } from "@/app/components/CrosswordFileUpload";
import { CrosswordGame } from "@/app/components/CrosswordGame";
import { CrosswordPuzzle } from "@/app/models/Crossword";
import textNotes from "@/app/assets/icons/textNotes.svg";

export default function Puzzles() {
  const [currentPuzzle, setCurrentPuzzle] = useState<CrosswordPuzzle | null>(null);
  const [showGame, setShowGame] = useState(false);

  const handlePuzzleGenerated = (puzzle: CrosswordPuzzle) => {
    setCurrentPuzzle(puzzle);
    setShowGame(true);
  };

  const handleGameExit = () => {
    setShowGame(false);
    setCurrentPuzzle(null);
  };

  const loadSavedPuzzle = () => {
    // Look for puzzles in session storage
    const keys = Object.keys(sessionStorage).filter(key => key.startsWith('crossword_'));
    if (keys.length > 0) {
      const latestKey = keys[keys.length - 1];
      const saved = sessionStorage.getItem(latestKey);
      if (saved) {
        const puzzle: CrosswordPuzzle = JSON.parse(saved);
        setCurrentPuzzle(puzzle);
        setShowGame(true);
      }
    }
  };

  return (
    <div className="p-16 flex flex-col gap-8 w-full min-h-screen bg-gray-50">
      {!showGame ? (
        <>
          <DashboardHeader
            heading="Crossword Puzzles"
            subheading="Create and solve crossword puzzles from your study notes! Upload your notes to get started."
          />

          <div className="flex flex-col">
            <div className="w-full h-0.5 bg-gray-300 rounded-full mt-4 mb-8" />
            
            {/* Options Section */}
            <div className="flex gap-6 justify-center mb-8">
              <SectionOption
                label="Create New Puzzle"
                icon={textNotes}
                href="#"
              />
              <SectionOption
                label="Recent Puzzles"
                icon={textNotes}
                href="#"
              />
            </div>

            {/* File Upload Component */}
            <CrosswordFileUpload onPuzzleGenerated={handlePuzzleGenerated} />
          </div>
        </>
      ) : (
        <div className="w-full">
          <button
            onClick={handleGameExit}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back to Upload
          </button>
          
          {currentPuzzle && (
            <CrosswordGame 
              puzzle={currentPuzzle}
              onExit={handleGameExit}
            />
          )}
        </div>
      )}
    </div>
  );
}