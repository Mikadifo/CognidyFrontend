import { DashboardHeader } from "@/app/components/DashboardHeader";
import { SectionOption } from "@/app/components/SectionOption";
import puzzlePieceIcon from "@/app/assets/icons/puzzlePiece.svg"
import  FileUploadProps from "@/app/components/FileUpload";
import textNotes from '@/app/assets/icons/textNotes.svg';

export const metadata = {
  title: "Cognidy | Learning",
  description: "Learning section",
};

export default function Puzzles() {
  return (

    // these will access the user's notes, and allow the user to upload notes if they want a new set or do not have one in the db
    // cases to account for:
    //  -user has notes: must be able to access notes from this page
    //  -user has no notes: must be able to upload new notes
    // options for notes upload -
    //  -user uploads a .txt file with a format that has spelling and definitions, to be able to technically read w/o AI agent
    //  -user uploads raw notes in any way, and AI agent puts them into a technically-readable format
    // either way, notes must be technically readable for the puzzle generation algorithm to work w/o AI agent;
    //  -AI agent being able to make format more difficult (e.g. finding synonyms, quizzing on custom definitions, etc.) is a plus; only usable when user has account?
    <div className="p-16 flex flex-col gap-8 w-full">
      <DashboardHeader
        heading="Puzzles"
        subheading="Solve puzzles to enhance your learning experience! Begin by choosing your notes, or uploading new notes to get started."
      />

      <div className="flex flex-col">
        <div className="w-full h-0.5 bg-dark-16 rounded-full mt-4 mb-8" />
        <div className="flex gap-6 justify-center">
          <SectionOption
            label="Saved Notes"
            icon={textNotes}
            href="/dashboard/learning/puzzles"
          />
          <SectionOption
            label="Upload Notes"
            icon={textNotes}
            href="/dashboard/learning/puzzles"
          />
        </div>
      </div>
    </div>

    //
  );
}