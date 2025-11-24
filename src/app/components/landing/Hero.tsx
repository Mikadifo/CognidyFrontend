import Illustration from "@/app/assets/imgs/heroIllustration.svg";
import { Button } from "../Button";

export default function Hero() {
  return (
    <div className="w-full lg:w-[1184px] my-24 md:my-32 flex gap-20 lg:gap-32 mx-auto justify-center px-8">
      <div className="flex flex-col gap-5 md:gap-8 text-dark">
        <h1 className="font-poppins text-4xl md:text-5xl leading-12 md:leading-14 font-bold w-[400px]">
          Turn Your Notes Into Smarter Study Tools
        </h1>
        <p className="font-nunito opacity-65 text-2xl md:text-[28px] font-normal w-full sm:w-[444px]">
          Upload your class notes and instantly get flashcards, puzzles, and
          personalized study roadmaps
        </p>
        <Button as="a" href="/dashboard" className="w-fit">
          Start Learning Free
        </Button>
      </div>

      <Illustration className="h-[386px] xl:h-[486px] hidden lg:block" />
    </div>
  );
}
