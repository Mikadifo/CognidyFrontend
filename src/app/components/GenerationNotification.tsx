import LoadingIcon from "@/app/assets/icons/loadingIcon.svg";

export enum GeneratingSection {
  ROADMAP,
  PUZZLES,
  FLASHCARDS,
}

interface GenerationNotificationProps {
  section: GeneratingSection;
  loading?: boolean;
}

export default function GenerationNotification({
  section,
  loading = true,
}: GenerationNotificationProps) {
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
      hidden={!loading}
    >
      <span>Generating personalized {getGeneratingSectionString()}</span>
      <LoadingIcon className="animate-spin size-5" />
    </div>
  );
}
