"use client";
import { useState } from "react";

export default function Flashcard({ //component has a front and back and a boolean to start at a certain side
    question, //front
    answer, //back
    defaultFlipped = false, // decides what side to start on
    className = "",
}: {
    question: React.ReactNode; //node cause can be text, JSX, icons, lists
    answer: React.ReactNode;
    defaultFlipped?: boolean;
    className?: string;
}) 

{
    //makes flashcard node flippable
    const [flipped, setFlipped] = useState(defaultFlipped);
    const toggle = () => setFlipped((f) => !f); //toggles the flip, will always be based on latest state

    return (
    <div
        role="button" //click card to flip
        tabIndex={0}  //makes card keyboard accessible
        autoFocus     
        onClick={toggle} 
        className={[
            "w-60 h-36 m-1.5 p-2.5", //fixed width and height for flashcard look
            "shrink-0 overflow-hidden", 
            "flex items-center justify-start select-none cursor-pointer",
            "bg-white text-black border-2 border-black rounded-[10px]", //black text white background with black rounded border
            "shadow-md hover:shadow-lg transition-shadow", //shadow in the back and shows more with hover
            "transform hover:-translate-y-[5px] transition-transform duration-[400ms]", //hover effect giving flashcards a small animation
            "text-left text-sm font-medium",
            "focus:outline-none focus:ring-2 focus:ring-black/40", 
            className,
        ].join(" ")}
    >
        {flipped ? answer : question} 
    </div>
    );
}

