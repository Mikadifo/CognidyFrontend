import FlashcardMockup from "@/app/assets/imgs/flashcardMockup.png";
import PuzzlesMockup from "@/app/assets/imgs/puzzlesMockup.jpg";
import RoadmapMockup from "@/app/assets/imgs/roadmapMockup.jpg";
import Image, { StaticImageData } from "next/image";

export default function MVPs() {
  return (
    <div className="w-[1184px] my-32 flex mx-auto justify-center flex-col gap-48">
      <MVP
        title="Study - Flashcards"
        content="Stop wasting time making flashcards. Upload your notes and get instant, accurate cards that help you memorize faster."
        img={FlashcardMockup}
        alt="Flashcard Mockup"
        comingSon={["Pomodoro", "Cheat Sheets"]}
      />
      <MVP
        title="Learning - Puzzles"
        content="Turn tough concepts into interactive puzzles and games. Studying feels less like work—and more like solving challenges."
        img={PuzzlesMockup}
        alt="Puzzles Mockup"
        comingSon={["Mentoring", "Quizzes"]}
        imgLeft={false}
      />
      <MVP
        title="Progress - Roadmap"
        content="Track your progress with a clear, visual roadmap. See what you’ve mastered, what needs review, and what’s next."
        img={RoadmapMockup}
        alt="Flashcard Mockup"
        comingSon={["Charts", "Trends"]}
      />
    </div>
  );
}

interface MVPProps {
  title: string;
  content: string;
  img: StaticImageData;
  alt: string;
  comingSon: string[];
  imgLeft?: boolean;
}

function MVP({
  title,
  content,
  img,
  alt,
  comingSon,
  imgLeft = true,
}: MVPProps) {
  return (
    <div className="flex gap-32 items-center">
      <Image
        src={img}
        alt={alt}
        className={`${imgLeft ? "order-first" : "order-last"}`}
      />

      <div
        className={`${imgLeft ? "order-last" : "order-first"} font-nunito flex flex-col gap-16`}
      >
        <div className="flex flex-col gap-8">
          <h2 className="font-bold font-poppins text-[32px]">{title}</h2>
          <p className="text-[28px]">{content}</p>
        </div>

        <div className="flex flex-col gap-4">
          <b className="font-poppins text-xl">Coming Soon</b>
          <div className="flex gap-4">
            {comingSon.map((item, index) => (
              <span
                key={index}
                className="rounded-full bg-dark-08 px-6 py-2 text-base"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
