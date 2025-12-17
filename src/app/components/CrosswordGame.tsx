// components/CrosswordGame.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { CrosswordPuzzle, CrosswordWord } from '@/app/models/Crossword';

interface CrosswordGameProps {
  puzzle: CrosswordPuzzle;
  onExit: () => void;
}

export function CrosswordGame({ puzzle, onExit }: CrosswordGameProps) {
  const [userGrid, setUserGrid] = useState<(string | null)[][]>(puzzle.userGrid);
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [selectedWord, setSelectedWord] = useState<CrosswordWord | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHints, setShowHints] = useState(true);

  // Load saved progress from session storage
  useEffect(() => {
    const savedProgress = sessionStorage.getItem(`progress_${puzzle.metadata.puzzleID}`);
    if (savedProgress) {
      const parsedGrid = JSON.parse(savedProgress);
      setUserGrid(parsedGrid);
    }
  }, [puzzle.metadata.puzzleID]);

  // Save progress to session storage
  const saveProgress = () => {
    sessionStorage.setItem(`progress_${puzzle.metadata.puzzleID}`, JSON.stringify(userGrid));
  };

  // Check win condition
  useEffect(() => {
    checkWinCondition();
  }, [userGrid]);

  const checkWinCondition = () => {
    if (!puzzle.answerGrid || !userGrid) return;

    let allCorrect = true;
    for (let row = 0; row < puzzle.answerGrid.length; row++) {
      for (let col = 0; col < puzzle.answerGrid[row].length; col++) {
        const answerCell = puzzle.answerGrid[row][col];
        const userCell = userGrid[row][col];
        
        // If answer cell has a letter, user cell must match
        if (answerCell !== null && userCell !== answerCell) {
          allCorrect = false;
          break;
        }
      }
      if (!allCorrect) break;
    }
    
    if (allCorrect) {
      setIsComplete(true);
      // Mark as completed in session storage
      const completedPuzzle = { ...puzzle, metadata: { ...puzzle.metadata, completed: true } };
      sessionStorage.setItem(`crossword_${puzzle.metadata.puzzleID}`, JSON.stringify(completedPuzzle));
    }
  };

  const handleCellClick = (row: number, col: number) => {
    // Only allow clicking on cells that should have letters
    if (puzzle.answerGrid[row][col] !== null) {
      setSelectedCell({ row, col });
      
      // Find word that starts at or contains this cell
      const wordAtCell = puzzle.words.find(word => {
        if (word.direction === 'across') {
          return row === word.startRow && col >= word.startCol && col < word.startCol + word.length;
        } else {
          return col === word.startCol && row >= word.startRow && row < word.startRow + word.length;
        }
      });
      
      setSelectedWord(wordAtCell || null);
    }
  };

  const handleInputChange = (row: number, col: number, value: string) => {
    if (value.length <= 1 && /^[A-Za-z]*$/.test(value)) {
      const newGrid = [...userGrid];
      newGrid[row][col] = value.toUpperCase() || null;
      setUserGrid(newGrid);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (e.key === 'Backspace' && !userGrid[row][col]) {
      // Move to previous cell if current is empty
      moveToPreviousCell(row, col);
    } else if (e.key.length === 1 && /^[A-Za-z]$/.test(e.key)) {
      // Move to next cell after input
      setTimeout(() => moveToNextCell(row, col), 0);
    }
  };

  const moveToNextCell = (row: number, col: number) => {
    if (!selectedWord) return;
    
    if (selectedWord.direction === 'across') {
      const nextCol = col + 1;
      if (nextCol < selectedWord.startCol + selectedWord.length) {
        setSelectedCell({ row, col: nextCol });
      }
    } else {
      const nextRow = row + 1;
      if (nextRow < selectedWord.startRow + selectedWord.length) {
        setSelectedCell({ row: nextRow, col });
      }
    }
  };

  const moveToPreviousCell = (row: number, col: number) => {
    if (!selectedWord) return;
    
    if (selectedWord.direction === 'across') {
      const prevCol = col - 1;
      if (prevCol >= selectedWord.startCol) {
        setSelectedCell({ row, col: prevCol });
      }
    } else {
      const prevRow = row - 1;
      if (prevRow >= selectedWord.startRow) {
        setSelectedCell({ row: prevRow, col });
      }
    }
  };

  const clearGrid = () => {
    const clearedGrid = puzzle.userGrid.map(row => row.map(() => null));
    setUserGrid(clearedGrid);
    sessionStorage.removeItem(`progress_${puzzle.metadata.puzzleID}`);
  };

  const deletePuzzle = () => {
    sessionStorage.removeItem(`crossword_${puzzle.metadata.puzzleID}`);
    sessionStorage.removeItem(`progress_${puzzle.metadata.puzzleID}`);
    onExit();
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Congratulations!</h1>
        <p className="text-xl text-gray-700 mb-6">You completed the crossword puzzle!</p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setIsComplete(false);
              clearGrid();
            }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Exit
          </button>
        </div>
      </div>
    );
  }

  const gridSize = puzzle.metadata.gridSize;
  const acrossWords = puzzle.words.filter(word => word.direction === 'across');
  const downWords = puzzle.words.filter(word => word.direction === 'down');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{puzzle.metadata.title}</h2>
          <p className="text-gray-600">Fill in the crossword puzzle</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowHints(!showHints)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </button>
          <button
            onClick={saveProgress}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Save Progress
          </button>
          <button
            onClick={clearGrid}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={deletePuzzle}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onExit}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Exit
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Grid */}
        <div className="flex-1">
          <div 
            className="inline-grid gap-px bg-gray-300 p-2 rounded-lg"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {userGrid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isAnswerCell = puzzle.answerGrid[rowIndex][colIndex] !== null;
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                const isInSelectedWord = selectedWord && (
                  (selectedWord.direction === 'across' && 
                   rowIndex === selectedWord.startRow && 
                   colIndex >= selectedWord.startCol && 
                   colIndex < selectedWord.startCol + selectedWord.length) ||
                  (selectedWord.direction === 'down' && 
                   colIndex === selectedWord.startCol && 
                   rowIndex >= selectedWord.startRow && 
                   rowIndex < selectedWord.startRow + selectedWord.length)
                );
                
                // Find word number for this cell
                const wordNumber = puzzle.words.find(word => 
                  word.startRow === rowIndex && word.startCol === colIndex
                )?.number;

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      w-8 h-8 border border-gray-400 flex items-center justify-center relative text-xs font-bold
                      ${!isAnswerCell ? 'bg-black' : 'bg-white cursor-pointer hover:bg-blue-50'}
                      ${isSelected ? 'ring-2 ring-blue-500' : ''}
                      ${isInSelectedWord && !isSelected ? 'bg-blue-100' : ''}
                    `}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {isAnswerCell && (
                      <>
                        {wordNumber && (
                          <span className="absolute top-0 left-0 text-[8px] leading-none text-blue-600 font-bold">
                            {wordNumber}
                          </span>
                        )}
                        <input
                          type="text"
                          value={cell || ''}
                          onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                          className="w-full h-full text-center bg-transparent border-none outline-none text-xs font-bold uppercase"
                          maxLength={1}
                          autoComplete="off"
                        />
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Hints */}
        {showHints && (
          <div className="w-80 max-h-96 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-blue-600">Across</h3>
              <div className="space-y-2">
                {acrossWords.map((word) => (
                  <div 
                    key={word.number}
                    className={`p-2 rounded cursor-pointer transition-colors ${
                      selectedWord?.number === word.number ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSelectedWord(word);
                      setSelectedCell({ row: word.startRow, col: word.startCol });
                    }}
                  >
                    <span className="font-semibold text-blue-600">{word.number}.</span> {word.hint}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-3 text-green-600">Down</h3>
              <div className="space-y-2">
                {downWords.map((word) => (
                  <div 
                    key={word.number}
                    className={`p-2 rounded cursor-pointer transition-colors ${
                      selectedWord?.number === word.number ? 'bg-green-100 border-l-4 border-green-500' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSelectedWord(word);
                      setSelectedCell({ row: word.startRow, col: word.startCol });
                    }}
                  >
                    <span className="font-semibold text-green-600">{word.number}.</span> {word.hint}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected word info */}
      {selectedWord && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="font-semibold">
            {selectedWord.number} {selectedWord.direction.toUpperCase()}: {selectedWord.hint}
          </p>
          <p className="text-sm text-gray-600">
            {selectedWord.length} letters • Click on the word in the grid to edit
          </p>
        </div>
      )}
    </div>
  );
}