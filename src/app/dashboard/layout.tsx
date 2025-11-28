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
      <SideBarMobile className="sm:hidden" />
      <main className="flex-1 min-h-screen h-screen overflow-scroll">
        {children}
      </main>
    </div>
  );
}
