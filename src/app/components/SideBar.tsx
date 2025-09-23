"use client";

import { ComponentType, FC, SVGProps } from "react";

import Logo from "./../assets/logoHorizontal.svg";
import BookIcon from "./../assets/icons/book.svg";
import ExitIcon from "./../assets/icons/exit.svg";
import LearningIcon from "./../assets/icons/learning.svg";
import ProgressIcon from "./../assets/icons/barChart.svg";
import NotesIcon from "./../assets/icons/notes.svg";
import SettingsIcon from "./../assets/icons/settings.svg";

import { Button } from "./Button";
import { usePathname } from "next/navigation";

interface SideBarProps {
  className?: string;
}

export const SideBar: FC<SideBarProps> = ({ className }) => {
  const pathname = usePathname();

  const onLogout = () => {
    console.log("TODO: Logout");
  };

  return (
    <div
      className={`flex flex-col h-screen min-w-[240px] w-[240px] bg-white border-e border-dark-16 sticky left-0 ${className}`}
    >
      <div className="p-6 border-b border-dark-16">
        <Logo className="min-h-[36px] h-[36px]" />
      </div>

      <div className="flex flex-col h-full justify-between">
        <ul>
          <Item
            icon={BookIcon}
            label="Study"
            active={pathname.startsWith("/dashboard/study")}
            href="/dashboard/study"
          />
          <Item
            icon={LearningIcon}
            label="Learning"
            active={pathname.startsWith("/dashboard/learning")}
            href="/dashboard/learning"
          />
          <Item
            icon={ProgressIcon}
            label="Progress"
            active={pathname.startsWith("/dashboard/progress")}
            href="/dashboard/progress"
          />
          <Item
            icon={NotesIcon}
            label="Notes"
            active={pathname.startsWith("/dashboard/notes")}
            href="/dashboard/notes"
          />
          <Item
            icon={SettingsIcon}
            label="Settings"
            active={pathname.startsWith("/dashboard/settings")}
            href="/dashboard/settings"
          />
        </ul>

        <Button
          className="bg-red !rounded-none w-full"
          icon={ExitIcon}
          onClick={onLogout}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

interface ItemProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  active: boolean;
  href: string;
}

function Item({ icon: Icon, label, active, href }: ItemProps) {
  return (
    <a
      href={href}
      className={`flex gap-2 text-dark text-[18px] font-poppins px-6 py-3 items-center ${active ? "bg-dark-08 font-bold" : "cursor-pointer hover:bg-dark-16"}`}
    >
      {<Icon className={`size-6 ${active ? "" : "text-dark-88"}`} />}
      <span>{label}</span>
    </a>
  );
}
