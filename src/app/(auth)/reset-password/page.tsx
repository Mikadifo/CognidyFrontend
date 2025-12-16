"use client";

import React, { useState } from "react";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { api } from "@/app/utils/apiFetch";
import { useApi } from "@/app/hooks/useApi";
import { useRouter, useSearchParams } from "next/navigation";
import { isStrongPassword } from "@/app/utils/validation";


export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");

  const { submit: resetPassword, loading } = useApi(api.resetPasswordPublic);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Missing reset token!");
      return;
    }

    if (!isStrongPassword(newPassword)) {
    window.alert(
      "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol."
    );
    return;
  }

    const res = await resetPassword({
      token,
      new_password: newPassword,
    });

    if (res?.message) {
      alert(res.message);
      router.push("/login");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="bg-white w-full max-w-md shadow-xl rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Your New Password
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Button type="submit" className="bg-brand text-white w-full">
            {loading ? "Saving..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

