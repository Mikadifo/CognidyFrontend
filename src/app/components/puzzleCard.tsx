"use client";

import { Button } from "@/app/components/Button";
import Image from "next/image";

interface PuzzleCardProps {
   title: string;
   previewImage?: string;
   onPlay: () => void;
   onDelete: () => void;
}

export function PuzzleCard({ title, previewImage, onPlay, onDelete }: PuzzleCardProps) {
   return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 max-w-sm w-full">
         {/* Puzzle Title */}
         <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center truncate">
            {title}
         </h3>
         
         {/* Crossword Preview Image */}
         <div className="relative w-full h-48 mb-4 bg-gray-100 rounded-md overflow-hidden">
            {previewImage ? (
               <Image
                  src={previewImage}
                  alt={`${title} crossword preview`}
                  fill
                  className="object-cover"
               />
            ) : (
               // Placeholder crossword grid when no image
               <div className="flex items-center justify-center h-full">
                  <div className="grid grid-cols-5 gap-1 p-4">
                     {Array.from({ length: 25 }).map((_, i) => (
                        <div
                           key={i}
                           className={`w-4 h-4 border border-gray-300 ${
                              Math.random() > 0.3 ? 'bg-white' : 'bg-gray-800'
                           }`}
                        />
                     ))}
                  </div>
               </div>
            )}
         </div>
         
         {/* Action Buttons */}
         <div className="flex gap-3">
            <Button
               onClick={onPlay}
               variant="filled"
               className="flex-1 py-2 text-sm font-medium"
            >
               Play
            </Button>
            <Button
               onClick={onDelete}
               variant="filled"
               className="flex-1 py-2 text-sm font-medium text-red-600 border-red-200 hover:bg-red-50"
            >
               Delete
            </Button>
         </div>
      </div>
   );
}

export default PuzzleCard;