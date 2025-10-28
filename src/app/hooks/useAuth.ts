"use client";

import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  // Save token (for login or signup)
  const saveUser = (token: string) => {
    localStorage.setItem("token", token);
  };

  // Get token (used to check authentication)
  const getToken = (): string | null => {
    return localStorage.getItem("token");
  };

  // Logout function (used in Sidebar)
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return { saveUser, getToken, logout };
}
