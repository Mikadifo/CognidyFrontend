"use client";

import React from "react";
import Logo from "@/app/assets/logo.svg";
import LoginIcon from "@/app/assets/icons/arrow.svg";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

function GuestLoginCTA() {
  const router = useRouter();

  return (
    <div className="border-1 border-dark-88 rounded-lg p-16 flex flex-col gap-16 items-center w-[480px]">
      <div className="flex flex-col gap-4">
        <Logo className="size-16 rounded-lg mx-auto" />
        <h1 className="text-2xl font-poppins font-bold text-center">
          Welcome!
        </h1>
      </div>

      <div className="flex flex-col gap-8 w-full">
        <Button
          className="!bg-brand w-full"
          icon={LoginIcon}
          iconClassName="!size-4"
          onClick={() => router.push("/login")}
        >
          Log In
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/signup")}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
}

export default GuestLoginCTA;
