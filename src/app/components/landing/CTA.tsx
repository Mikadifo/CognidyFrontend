import { Button } from "../Button";

export default function CTA() {
  return (
    <div className="w-full xl:w-[1184px] bg-brand rounded-lg text-white p-28 xl:p-32 flex gap-20 xl:gap-24 xl:absolute xl:z-10 xl:left-1/2 xl:-translate-x-1/2 xl:bottom-1/2 justify-center">
      <div className="bg-[#25CAA2] h-[290px] w-[70px] rounded-2xl self-center" />

      <div className="flex gap-16">
        <div className="flex flex-col gap-8">
          <h1 className="font-poppins text-4xl xl:text-5xl leading-12 xl:leading-14 font-bold w-[400px]">
            Boost Your Learning Instantly
          </h1>
          <p className="font-nunito opacity-65 text-2xl xl:text-[28px] font-normal w-[444px]">
            Upload your notes and get flashcards, quizzes, and study plans made
            just for you.
          </p>
          <Button
            as="a"
            href="/dashboard"
            className="w-fit bg-white !text-dark"
          >
            Get Started Free
          </Button>
        </div>

        <div className="flex-col gap-24 hidden md:flex">
          <div className="relative w-[212px] h-[138px] bg-[#5B87FE] rounded-2xl after:content-[''] after:absolute after:-left-6 after:-bottom-6 after:border-4 after:border-[#2F5ADB] after:w-full after:h-full after:rounded-2xl after:-z-10" />

          <div className="bg-[#FCCA77] rounded-full size-[130px]" />
        </div>
      </div>
    </div>
  );
}
