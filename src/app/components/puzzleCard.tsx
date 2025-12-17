"use client";
import React, { useState } from 'react'
import { Button } from '@/app/components/Button'
import textNotes from "@/app/assets/icons/textNotes.svg";
import { CrosswordGame } from '@/app/components/CrosswordGame';

function PuzzleCard(){
   const [showGame, setShowGame] = useState(false);

   const handlePlayClick = () => {
      setShowGame(true);
   };

   const handleExitGame = () => {
      setShowGame(false);
   };

   if (showGame) {
      return <CrosswordGame onExit={handleExitGame} />;
   }

   return (
      <div className='flex flex-col items-center justify-center w-50 h-50 border border-black bg-white py-1 rounded-lg'>
         <PuzzleCardTitle title='discrete.txt puzzle'></PuzzleCardTitle>
         <PuzzleCardPreview />
         <div className='flex flex-row gap-2'>
            <CardButton label="Play" onClick={handlePlayClick}/>
            <CardButton label="Delete"/>
         </div>
      </div>
   );
}

export { PuzzleCard };

function PuzzleCardTitle({ title }: { title: string }){
   if (title.length == 0){
      return <h2>Crossword Puzzle</h2>
   }
   else{
      return <h2>{title}</h2>
   }
}

function PuzzleCardPreview(){
   const TextNotesIcon = textNotes;
   return <div className='w-24 h-24'><TextNotesIcon className='w-full h-full' /></div>
}

function CardButton({ label, onClick }: { label: string, onClick?: () => void }){
   return <Button variant="filled" onClick={onClick}>{label}</Button>
}