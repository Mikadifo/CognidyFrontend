"use client";

import React from "react";
import { SideBar } from "../components/SideBar";
import { useAuth } from "@/app/hooks/useAuth";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAuth(); // protects dashboard pages
  return (
    <div className="flex bg-white">
      <SideBar />
      {children}
    </div>
  );
}
