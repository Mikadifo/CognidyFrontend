export interface CrosswordMetadata {
  puzzleID: string;
  title: string;
  completed: boolean;
  gridSize: number;
}

export interface CrosswordWord {
  number: number;
  word: string;
  direction: 'across' | 'down';
  startRow: number;
  startCol: number;
  length: number;
  hint: string;
}

export interface CrosswordPuzzle {
  metadata: CrosswordMetadata;
  answerGrid: (string | null)[][];
  userGrid: (string | null)[][];
  words: CrosswordWord[];
}