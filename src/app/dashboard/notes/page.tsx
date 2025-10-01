import { DashboardHeader } from "@/app/components/DashboardHeader";
import { FileController } from "./FileController";

export const metadata = {
  title: "Cognidy | Notes",
  description: "Notes section",
};

export default async function Notes() {
  return (
    <div className="p-16 flex flex-col gap-16">
      <DashboardHeader
        heading="Your Notes"
        subheading="Upload files or jot down your own study notes"
      />

      <div className="flex flex-col gap-8 w-[440px] text-dark font-nunito text-base">
        <div className="flex flex-col gap-1">
          <b>Uploaded notes</b>
          <span className="text-dark-88">You can upload up to 5 files</span>
        </div>

        <FileController />
      </div>
    </div>
  );
}