"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "../../assets/logo.svg";
import { Button } from "@/app/components/Button";
import LoginIcon from "../../assets/icons/arrow.svg";
import { Input } from "@/app/components/Input";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      res.ok
        ? alert("Login successful!")
        : alert(data.message || "Login failed");
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-linear-to-br from-brand via-cyan to-green">
      <div className="bg-white text-gray-800 rounded-2xl shadow-xl w-[480px] p-16">
        <div className="flex flex-col gap-4 mb-16">
          <Logo className="size-16 rounded-lg mx-auto" />
          <h1 className="text-2xl font-poppins font-semibold text-center">
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
            >
              Log In
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

        <Button variant="outline" className="w-full" type="button">
          Continue as Guest
        </Button>
      </div>
    </div>
  );
}
