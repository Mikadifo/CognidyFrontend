"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/app/components/Button';

interface CrosswordCell {
  letter: string;
  number?: number;
  isBlocked: boolean;
  userInput: string;
}

interface CrosswordWord {
  id: number;
  word: string;
  clue: string;
  direction: 'across' | 'down';
  startRow: number;
  startCol: number;
}

interface CrosswordGameProps {
  onExit: () => void;
}

const CROSSWORD_DATA: CrosswordWord[] = [
  { id: 1, word: "CAT", clue: "Feline pet", direction: "across", startRow: 0, startCol: 0 },
  { id: 3, word: "TAR", clue: "Black sticky substance", direction: "down", startRow: 0, startCol: 2 },
  { id: 2, word: "RAT", clue: "Small rodent", direction: "across", startRow: 2, startCol: 2 },
  { id: 4, word: "ART", clue: "Creative work", direction: "down", startRow: 2, startCol: 3 },
];

const GRID_SIZE = 5;

export function CrosswordGame({ onExit }: CrosswordGameProps) {
  const [grid, setGrid] = useState<CrosswordCell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(() => {
    checkWinCondition();
  }, [grid]);

  const initializeGrid = () => {
    // Create empty grid
    const newGrid: CrosswordCell[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        letter: '',
        isBlocked: true,
        userInput: '',
      }))
    );

    // Place words and assign numbers
    CROSSWORD_DATA.forEach((wordData) => {
      const { word, startRow, startCol, direction, id } = wordData;
      
      for (let i = 0; i < word.length; i++) {
        const row = direction === 'across' ? startRow : startRow + i;
        const col = direction === 'across' ? startCol + i : startCol;
        
        if (row < GRID_SIZE && col < GRID_SIZE) {
          newGrid[row][col] = {
            letter: word[i],
            number: i === 0 ? id : newGrid[row][col].number,
            isBlocked: false,
            userInput: newGrid[row][col].userInput || '',
          };
        }
      }
    });

    setGrid(newGrid);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!grid[row][col].isBlocked) {
      setSelectedCell({ row, col });
    }
  };

  const handleInputChange = (row: number, col: number, value: string) => {
    if (value.length <= 1 && /^[A-Za-z]*$/.test(value)) {
      const newGrid = [...grid];
      newGrid[row][col].userInput = value.toUpperCase();
      setGrid(newGrid);
    }
  };

  const checkWinCondition = () => {
  // Add safety checks for grid initialization
  if (!grid || grid.length === 0 || !grid[0] || grid[0].length === 0) {
    return;
  }

  let allCorrect = true;
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const cell = grid[row]?.[col]; // Add optional chaining
      if (!cell) continue; // Skip if cell doesn't exist
      
      if (!cell.isBlocked && cell.userInput !== cell.letter) {
        allCorrect = false;
        break;
      }
    }
    if (!allCorrect) break;
  }
  setIsComplete(allCorrect);
};

  const saveAndExit = () => {
    // Here you could save the current state to localStorage or send to API
    localStorage.setItem('crosswordProgress', JSON.stringify(grid));
    onExit();
  };

  const resetGame = () => {
    initializeGrid();
    setSelectedCell(null);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center w-[400px] h-[400px] border-2 border-black bg-white rounded-lg p-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">You Win!</h1>
        <div className="flex gap-4">
          <Button onClick={resetGame} variant="filled">Play Again</Button>
          <Button onClick={onExit} variant="outline">Exit</Button>
        </div>
      </div>
    );
  }

  const acrossClues = CROSSWORD_DATA.filter(word => word.direction === 'across');
  const downClues = CROSSWORD_DATA.filter(word => word.direction === 'down');

  return (
    <div className="flex flex-col w-[400px] h-[400px] border-2 border-black bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Crossword Puzzle</h2>
        <div className="flex gap-2">
          <Button onClick={saveAndExit} variant="outline" className="text-xs px-2 py-1">
            Save & Exit
          </Button>
        </div>
      </div>

      <div className="flex gap-4 flex-1">
        {/* Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-5 gap-1 w-fit">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-8 h-8 border border-gray-400 flex items-center justify-center cursor-pointer relative text-xs font-bold
                    ${cell.isBlocked ? 'bg-black' : 'bg-white hover:bg-blue-50'}
                    ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-blue-200' : ''}
                  `}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {!cell.isBlocked && (
                    <>
                      {cell.number && (
                        <span className="absolute top-0 left-0 text-[8px] leading-none">
                          {cell.number}
                        </span>
                      )}
                      <input
                        type="text"
                        value={cell.userInput}
                        onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                        className="w-full h-full text-center bg-transparent border-none outline-none text-xs font-bold"
                        maxLength={1}
                      />
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Clues */}
        <div className="w-32 text-xs overflow-y-auto">
          <div className="mb-2">
            <h3 className="font-bold text-xs mb-1">Across</h3>
            {acrossClues.map((word) => (
              <div key={word.id} className="mb-1">
                <span className="font-semibold">{word.id}.</span> {word.clue}
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="font-bold text-xs mb-1">Down</h3>
            {downClues.map((word) => (
              <div key={word.id} className="mb-1">
                <span className="font-semibold">{word.id}.</span> {word.clue}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}