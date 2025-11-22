"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SideBar } from "../components/SideBar";
import { useAuth } from "@/app/hooks/useAuth";

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
    <div className="flex bg-white">
      <SideBar />
      <main className="flex-1 min-h-screen h-screen overflow-scroll">
        {children}
      </main>
    </div>
  );
}
