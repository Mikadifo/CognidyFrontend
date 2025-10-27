import LoadingIcon from "@/app/assets/icons/loadingIcon.svg";

interface GenerationNotificationProps {
  section: string;
  loading?: boolean;
}

export default function GenerationNotification({
  section,
  loading = true,
}: GenerationNotificationProps) {
  return (
    <div
      className="rounded-[5px] bg-yellow-88 text-dark font-nunito text-base font-semibold px-6 py-3 flex gap-4 items-center w-fit"
      hidden={!loading}
    >
      <span>Generating personalized {section.toLowerCase()}</span>
      <LoadingIcon className="animate-spin" />
    </div>
  );
}
