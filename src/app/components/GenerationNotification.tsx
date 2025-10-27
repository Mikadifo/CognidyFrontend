import LoadingIcon from "@/app/assets/icons/loadingIcon.svg";
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
} from "../utils/notesStatus";

export enum GeneratingSection {
  ROADMAP,
  PUZZLES,
  FLASHCARDS,
}

interface GenerationNotificationProps {
  section: GeneratingSection;
}

export default function GenerationNotification({
  section,
}: GenerationNotificationProps) {
  const [hideNotification, setHideNotification] = useState<boolean>(true);
  const { submit: getGenerationStatuts } = useApi<
    GenerationStatusDto,
    [id: string]
  >(api.generationStatus);

  useEffect(() => {
    const newNoteId = getNewNoteId();

    if (!newNoteId) {
      return;
    }

    setHideNotification(isSectionComplete(section));

    const pollStatus = setInterval(async () => {
      const result = await getGenerationStatuts(getNewNoteId());

      if (result.error) {
        console.error(result.error);
        return;
      }

      const newStatus = result.data as GenerationStatusDto;
      updateNewNoteStatus(newStatus);

      if (isSectionComplete(section)) {
        clearInterval(pollStatus);
        setHideNotification(true);
      }

      if (allSectionsComplete()) {
        clearInterval(pollStatus);
        removeNewNoteStatus();
      }
    }, 3000);

    return () => clearInterval(pollStatus);
  }, [getGenerationStatuts]);

  const getGeneratingSectionString = () => {
    if (section === GeneratingSection.ROADMAP) {
      return "roadmap goals";
    }

    if (section === GeneratingSection.FLASHCARDS) {
      return "flashcards";
    }

    return "puzzles";
  };

  return (
    <div
      className="rounded-[5px] bg-yellow-88 text-dark font-nunito text-base font-semibold px-6 py-3 flex gap-4 items-center w-fit whitespace-nowrap max-h-[50px]"
      hidden={hideNotification}
    >
      <span>Generating personalized {getGeneratingSectionString()}</span>
      <LoadingIcon className="animate-spin size-5" />
    </div>
  );
}
