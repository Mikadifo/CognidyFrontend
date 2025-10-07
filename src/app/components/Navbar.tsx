import { FC } from "react";
import Logo from "./../assets/logoHorizontal.svg";
import { Button } from "./Button";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <header
      className={`flex w-full bg-white border-b border-dark-16 px-8 py-2 justify-between sticky top-0 z-50 ${className}`}
    >
      <Logo height={48} />
      <Button className="!bg-brand" as="a" href="/dashboard">
        Dashboard
      </Button>
    </header>
  );
};
