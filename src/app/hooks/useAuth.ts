"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If token doesn’t exist, force redirect to login
    if (!token) {
      router.push("/login");
    }
  }, [router]);
}
