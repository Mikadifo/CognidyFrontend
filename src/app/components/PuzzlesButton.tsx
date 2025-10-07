import { Button } from './Button';
import PuzzlePieceIcon from '../assets/icons/puzzlePiece.svg';

export function PuzzlesButton(){
   return (
      <Button
        as="a"
        href="/dashboard/learning/puzzles"
        variant="filled"
        className="flex flex-col items-center gap-2 px-8 py-6 w-[20%]"
      >
        <PuzzlePieceIcon className="w-6 h-6" />
        <span>Puzzles</span>
      </Button>
   );
}
