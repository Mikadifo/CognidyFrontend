"use client"; 

import { DashboardHeader } from "@/app/components/DashboardHeader";
import { SectionOption } from "@/app/components/SectionOption";
import { PuzzleCard } from "@/app/components/puzzleCard";
import textNotes from "@/app/assets/icons/textNotes.svg";
import React from "react";

// Remove metadata from client component
// export const metadata = {
//   title: "Cognidy | Learning",
//   description: "Learning section",
// };

export default function Puzzles() {
  const puzzles = [
    {
      id: "1",
      title: "Math Algebra Basics",
      previewImage: "/crossword-math.png"
    },
    {
      id: "2", 
      title: "Biology Cell Structure",
      previewImage: "/crossword-biology.png"
    },
    {
      id: "3",
      title: "World History Timeline"
    },
    {
      id: "4",
      title: "Chemistry Periodic Table"
    },
    {
      id: "5",
      title: "English Literature Terms"
    }
  ];

  const handlePlayPuzzle = (puzzleId: string) => {
    console.log("Playing puzzle:", puzzleId);
    // TODO: Play puzzle logic, start the game
    // router.push(`/dashboard/learning/puzzles/play/${puzzleId}`);
  };

  const handleDeletePuzzle = (puzzleId: string) => {
    console.log("Deleting puzzle:", puzzleId);
    // TODO: Call delete API and update state, remove puzzle from UI, database, and local storage if applicable
    // deletePuzzle(puzzleId);
  };

  return (
    <div className="p-16 flex flex-col gap-8 w-full">
      <DashboardHeader
        heading="Puzzles"
        subheading="Solve puzzles to enhance your learning experience! Begin by choosing your notes, or uploading new notes to get started."
      />

      <div className="flex flex-col">
        <div className="w-full h-0.5 bg-dark-16 rounded-full mt-4 mb-8" />
        
        {/* Upload Options */}
        <div className="flex gap-6 justify-center mb-8">
          <SectionOption
            label="Saved Notes"
            icon={textNotes}
            href="/dashboard/learning/puzzles/saved"
          />
          <SectionOption
            label="Upload Notes"
            icon={textNotes}
            href="/dashboard/learning/puzzles/upload"
          />
        </div>

        {/* Puzzle Cards Grid */}
        {puzzles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {puzzles.map((puzzle) => (
              <PuzzleCard
                key={puzzle.id}
                title={puzzle.title}
                previewImage={puzzle.previewImage}
                onPlay={() => handlePlayPuzzle(puzzle.id)}
                onDelete={() => handleDeletePuzzle(puzzle.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No puzzles yet
            </h3>
            <p className="text-gray-500">
              Upload your notes to generate your first puzzle!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}