"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "../../assets/logo.svg";
import { Button } from "@/app/components/Button";
import LoginIcon from "../../assets/icons/arrow.svg";
import { Input } from "@/app/components/Input";
import { useApi } from "@/app/hooks/useApi";
import { UserLoginDto } from "@/app/dtos/UserDto";
import { api } from "@/app/utils/apiFetch";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const router = useRouter();
  const { saveUser } = useAuth();

  const {
    loading,
    submit: login,
    //error,
  } = useApi<string, [body: UserLoginDto]>(api.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(form);

    if (response.error) {
      console.error(response.error);
      return;
    }

    //If login worked, save the token
    if (response.data) {
      saveUser(response.data);
      console.log("Token saved:", response.data);
      router.push("/dashboard");
    } else {
      console.error("No token received:", response);
    }
  };

  // Guest login button handler
  const handleGuest = () => {
    saveUser("guest");
    router.push("/dashboard");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-linear-to-br from-brand via-cyan to-green">
      <div className="bg-white text-gray-800 rounded-2xl shadow-xl w-[480px] p-16">
        <div className="flex flex-col gap-4 mb-16">
          <Logo className="size-16 rounded-lg mx-auto" />
          <h1 className="text-2xl font-poppins font-bold text-center">
            Welcome Back!
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <Input
              label="Username"
              value={form.username}
              placeholder="Nikita_15"
              type="text"
              name="username"
              onChange={handleChange}
              required
            />

            <div className="flex flex-col gap-1">
              <Input
                label="Password"
                value={form.password}
                placeholder="****************"
                type="password"
                name="password"
                onChange={handleChange}
                required
              />
              <Link
                href="#"
                className="text-dark text-sm hover:underline self-end cursor-pointer"
              >
                Forgot Password
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="!bg-brand w-full"
              icon={LoginIcon}
              iconClassName="!size-4"
              disabled={loading}
            >
              {loading ? "Verifying Credentials..." : "Log In"}
            </Button>

            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <Link href="/signup" className="font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </form>

        <div className="bg-dark-16 h-[1px] rounded-full w-[300px] mx-auto my-8" />

        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={handleGuest}
        >
          Continue as Guest
        </Button>
      </div>
    </div>
  );
}
