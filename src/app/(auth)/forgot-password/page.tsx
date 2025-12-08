"use client";

import React, { useState } from "react";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { api } from "@/app/utils/apiFetch";
import { useApi } from "@/app/hooks/useApi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const { submit: requestReset, loading } = useApi(
    api.requestPasswordReset
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await requestReset({ email });

    if (res?.message) {
      alert(res.message); // → “Email sent!”
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-xl rounded-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            label="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button className="bg-brand text-white w-full">
            {loading ? "Sending Email..." : "Send Reset Email"}
          </Button>
        </form>
      </div>
    </div>
  );
}
