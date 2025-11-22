import CTA from "./CTA";

import GithubIcon from "@/app/assets/icons/githubIcon.svg";

export default function Footer() {
  return (
    <footer className="bg-dark-88 text-white w-full h-auto xl:h-[584px] xl:mt-[528px] xl:relative">
      <CTA />

      <div className="flex justify-between text-white font-nunito xl:w-[1184px] mx-auto pb-16 xl:absolute xl:bottom-0 xl:left-1/2 xl:-translate-x-1/2 mt-16 xl:mt-0 px-8 xl:px-0">
        <div className="flex flex-col gap-6">
          <b className="text-xl">We are open source!</b>

          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="https://github.com/Mikadifo/CognidyBackend"
                className="text-lg hover:underline flex gap-2 items-center"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon className="size-5" />
                <span>Cognidy API</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Mikadifo/CognidyFrontend"
                target="_blank"
                rel="noreferrer"
                className="text-lg hover:underline flex gap-2 items-center"
              >
                <GithubIcon className="size-5" />
                <span>Cognidy Web App</span>
              </a>
            </li>
          </ul>
        </div>

        <span className="opacity-65 text-base self-end">
          ©{new Date().getFullYear()} Cognidy
        </span>
      </div>
    </footer>
  );
}
