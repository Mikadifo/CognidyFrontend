import { DashboardHeader } from "@/app/components/DashboardHeader";
import FlashcardsApi from "./FlashcardsAPI";
import GeminiCard from "./GeminiButton";

export const metadata = {
  title: "Cognidy | Flashcards",
  description: "Flashcards section",
};


export default function Flashcards() {
  return (
    <div className="p-16 flex flex-col gap-16 w-full overflow-y-scroll h-screen">
      <DashboardHeader
        heading="Flashcards"
        subheading="Practice and test your memory with quick study cards"
      />
      <FlashcardsApi/>
      <GeminiCard/>
    </div>
  ) 
}



