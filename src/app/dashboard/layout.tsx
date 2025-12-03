"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SideBar } from "../components/SideBar";
import { useAuth } from "@/app/hooks/useAuth";
import { SideBarMobile } from "../components/SideBarMobile";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      // No token → redirect to login
      router.push("/login");
    }
  }, [getToken, router]);

  return (
    <div className="flex flex-col sm:flex-row bg-white">
      <SideBar className="hidden sm:flex" />
      <SideBarMobile />
      <main className="flex-1 sm:min-h-screen sm:h-screen sm:overflow-scroll pt-[57px] sm:pt-0 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
