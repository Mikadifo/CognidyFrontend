import Illustration from "@/app/assets/imgs/heroIllustration.svg";
import { Button } from "../Button";

export default function () {
  return (
    <div className="w-[1184px] my-32 flex gap-32 mx-auto justify-center">
      <div className="flex flex-col gap-8 text-dark">
        <h1 className="font-poppins text-5xl leading-14 font-bold w-[400px]">
          Turn Your Notes Into Smarter Study Tools
        </h1>
        <p className="font-nunito opacity-65 text-[28px] font-normal w-[444px]">
          Upload your class notes and instantly get flashcards, puzzles, and
          personalized study roadmaps
        </p>
        <Button className="w-fit">Start Learning Free</Button>
      </div>

      <Illustration className="h-[486px]" />
    </div>
  );
}
