import LoadingIcon from "@/app/assets/icons/loadingIcon.svg";
import CloseIcon from "@/app/assets/icons/closeIcon.svg";
import { useApi } from "../hooks/useApi";
import GenerationStatusDto from "../dtos/GenerationStatusDto";
import { api } from "../utils/apiFetch";
import { useEffect, useState } from "react";
import {
  allSectionsComplete,
  getNewNoteId,
  isSectionComplete,
  removeNewNoteStatus,
  updateNewNoteStatus,
  sectionFailed,
} from "../utils/notesStatus";

export enum GeneratingSection {
  ROADMAP,
  PUZZLES,
  FLASHCARDS,
  QUIZZES,
}

interface GenerationNotificationProps {
  section: GeneratingSection;
  fetchFunction: () => void;
}

export default function GenerationNotification({
  section,
  fetchFunction,
}: GenerationNotificationProps) {
  const [hideNotification, setHideNotification] = useState<boolean>(true);
  const { submit: getGenerationStatuts, data } = useApi<
    GenerationStatusDto,
    [id: string]
  >(api.generationStatus);

  useEffect(() => {
    const newNoteId = getNewNoteId();

    if (!newNoteId) {
      return;
    }

    const pollStatus = async () => {
      const result = await getGenerationStatuts(getNewNoteId());

      if (result.error) {
        console.error(result.error);
        clearInterval(pollInterval);
        return;
      }

      const newStatus = result.data as GenerationStatusDto;
      updateNewNoteStatus(newStatus);
      setHideNotification(
        isSectionComplete(section) && !sectionFailed(section),
      );

      if (isSectionComplete(section)) {
        clearInterval(pollInterval);

        if (!sectionFailed(section)) {
          fetchFunction();
        }
      }

      if (allSectionsComplete()) {
        clearInterval(pollInterval);

        if (!sectionFailed(section)) {
          setHideNotification(true);
        }

        removeNewNoteStatus();
      }
    };

    pollStatus();

    const pollInterval = setInterval(pollStatus, 3000);

    return () => {
      clearInterval(pollInterval);
    };
  }, [getGenerationStatuts, fetchFunction, section]);

  const getGeneratingSectionString = () => {
    if (section === GeneratingSection.ROADMAP) {
      return "roadmap goals";
    }

    if (section === GeneratingSection.FLASHCARDS) {
      return "flashcards";
    }

    if (section === GeneratingSection.PUZZLES) {
      return "quizzes";
    }

    return "puzzles";
  };

  return (
    <div
      className={`rounded-[5px] ${data?.goals === "failed" ? "bg-red text-white" : "bg-yellow-88 text-dark"} font-nunito text-base font-semibold px-6 py-3 flex gap-4 items-center w-fit whitespace-nowrap max-h-[50px]`}
      hidden={hideNotification}
    >
      {data?.goals === "failed" ? (
        <>
          <span>
            Oops! We couldn&apos;t generate {getGeneratingSectionString()}. Try
            again later
          </span>
          <button
            type="button"
            className="cursor-pointer hover:rotate-6"
            onClick={() => setHideNotification(true)}
          >
            <CloseIcon className="size-5" />
          </button>
        </>
      ) : (
        <>
          <span>Generating personalized {getGeneratingSectionString()}</span>
          <LoadingIcon className="animate-spin size-5" />
        </>
      )}
    </div>
  );
}
