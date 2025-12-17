"use client";

import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const isBrowser = typeof window !== "undefined";


  // Save token (for login or signup)
  const saveUser = (token: string) => {
    if (!isBrowser) return;
    localStorage.setItem("token", token);
  };

  // Get token (used to check authentication)
  const getToken = (): string | null => {
    if (!isBrowser) return null;
    return localStorage.getItem("token");
  };

  // Logout function (used in Sidebar)
  const logout = () => {
    if (!isBrowser) return; 
    localStorage.removeItem("token");
    router.push("/login");
  };

  return { saveUser, getToken, logout };
}
