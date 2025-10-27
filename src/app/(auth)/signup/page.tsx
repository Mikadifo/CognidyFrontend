"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/app/components/Input";
import SignUpIcon from "../../assets/icons/arrow.svg";
import Logo from "../../assets/logo.svg";
import { Button } from "@/app/components/Button";
import { useApi } from "@/app/hooks/useApi";
import { api } from "@/app/utils/apiFetch";
import { useRouter } from "next/navigation";
import { UserSignUpDto } from "@/app/dtos/UserDto";

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const router = useRouter();
  const {
    //data: token,
    loading,
    submit: signup,
    //error,
  } = useApi<string, [body: UserSignUpDto]>(api.signup);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signup(form);

    if (response.error) {
      console.error(response.error);
      return;
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-linear-to-br from-brand via-cyan to-green">
      <div className="bg-white text-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex flex-col gap-4 mb-16">
          <Logo className="size-16 rounded-lg mx-auto" />
          <h1 className="text-2xl font-poppins text-center font-bold">
            Welcome!
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

            <Input
              label="Email"
              value={form.email}
              placeholder="name@example.com"
              type="email"
              name="email"
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              value={form.password}
              placeholder="****************"
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="!bg-brand w-full"
              icon={SignUpIcon}
              iconClassName="!size-4"
              disabled={loading}
            >
              {loading ? "Verifying Credentials..." : "Sign Up"}
            </Button>

            <p className="text-sm text-center">
              Have an account already?{" "}
              <Link href="/signup" className="font-bold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </form>

        <div className="bg-dark-16 h-[1px] rounded-full w-[300px] mx-auto my-8" />

        <Button variant="outline" className="w-full" type="button">
          Continue as Guest
        </Button>
      </div>
    </div>
  );
}
