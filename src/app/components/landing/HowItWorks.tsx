import { ComponentType, SVGProps } from "react";
import UploadIcon from "@/app/assets/icons/uploadIcon.svg";
import TransformIcon from "@/app/assets/icons/transformIcon.svg";
import DashboardIcon from "@/app/assets/icons/dashboardIcon.svg";

export default function HowItWorks() {
  return (
    <div className="bg-dark-08 px-8">
      <div className="w-full xl:w-[1184px] py-28 xl:py-32 mx-auto flex flex-col gap-16">
        <div className="flex gap-10 items-center">
          <h2 className="font-bold font-poppins text-dark text-3xl xl:text-[32px] whitespace-nowrap">
            How It Works
          </h2>
          <div className="relative w-full h-[1px] bg-dark-16 after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:size-2 after:bg-[#c4c5cc] after:rounded-full" />
        </div>

        <div className="flex flex-wrap gap-6 justify-evenly xl:justify-between w-full">
          <Card
            icon={UploadIcon}
            title="Upload Your Notes"
            content="Drop your lecture notes, slides, or summaries"
          />
          <Card
            icon={TransformIcon}
            title="AI Transforms Them"
            content="Generates flashcards, puzzles, and a roadmap"
          />
          <Card
            icon={DashboardIcon}
            title="Learn Your Way"
            content="Choose useful tools that fit your style"
          />
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
}

function Card({ icon: Icon, title, content }: CardProps) {
  return (
    <div className="flex gap-8 p-8 bg-dark-88 text-white rounded-2xl items-center w-[352px]">
      <Icon className="h-12" />

      <div className="flex flex-col gap-1">
        <b className="font-poppins text-lg md:text-xl">{title}</b>
        <p className="font-nunito text-base md:text-lg opacity-80">{content}</p>
      </div>
    </div>
  );
}
