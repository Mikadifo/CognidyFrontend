"use client";

import { ComponentType, FC, SVGProps, useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";

import LogoHorizontal from "./../assets/logoHorizontal.svg";
import MenuIcon from "./../assets/icons/menuIcon.svg";
import BookIcon from "./../assets/icons/book.svg";
import ExitIcon from "./../assets/icons/exit.svg";
import ArrowIcon from "./../assets/icons/arrow.svg";
import LearningIcon from "./../assets/icons/learning.svg";
import ProgressIcon from "./../assets/icons/barChart.svg";
import NotesIcon from "./../assets/icons/notes.svg";
import SettingsIcon from "./../assets/icons/settings.svg";

import { Button } from "./Button";
import { useRouter, usePathname } from "next/navigation";

interface SideBarMobileProps {
  className?: string;
}

export const SideBarMobile: FC<SideBarMobileProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isGuest, setIsGuest] = useState(false);

  // Detect guest mode
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === "guest") setIsGuest(true);
  }, []);

  // Dynamic click handler
  const router = useRouter();

  const handleClick = () => {
    if (isGuest) {
      // Guest user → clear token and redirect to login
      localStorage.removeItem("token");
      router.push("/login");
    } else {
      // Logged-in user → log out
      logout();
    }
  };

  return (
    <div
      className={`flex flex-col w-full h-fit bg-white border-b border-dark-16 fixed top-0 p-3 z-50 sm:hidden ${className}`}
    >
      <div className="flex w-full justify-between">
        <LogoHorizontal className="h-8 min-h-8" />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-pointer"
        >
          <MenuIcon className="h-7" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col w-full items-center">
          <ul className="w-full">
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

          {/* Dynamic Footer Button */}
          <Button
            className={`!rounded-none w-full text-sm lg:text-base ${
              isGuest ? "!bg-brand hover:opacity-60" : "bg-red hover:bg-red-600"
            }`}
            icon={isGuest ? ArrowIcon : ExitIcon}
            onClick={handleClick}
          >
            <span>{isGuest ? "Log In" : "Log Out"}</span>
          </Button>
        </div>
      )}
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
      className={`flex gap-2 text-dark text-base lg:text-[18px] font-poppins px-4 lg:px-6 py-3 items-center w-full justify-center ${active ? "bg-dark-08 font-bold" : "cursor-pointer hover:bg-dark-16"}`}
    >
      {<Icon className={`size-5 lg:size-6 ${active ? "" : "text-dark-88"}`} />}
      <span>{label}</span>
    </a>
  );
}
