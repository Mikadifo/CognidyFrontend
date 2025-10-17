"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.svg";

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
      res.ok ? alert("Login successful!") : alert(data.message || "Login failed");
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-brand via-cyan to-dark">
      <div className="bg-white text-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image src={logo} alt="Cognidy Logo" width={80} height={80} />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-poppins font-semibold text-center mb-8">
          Welcome Back!
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-nunito font-semibold mb-1">
              Username
            </label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Nikita_15"
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-nunito font-semibold mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
            <p className="text-xs text-right mt-1 text-brand cursor-pointer">
              Forgot Password
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-brand text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Log In →
          </button>

          <p className="text-xs text-center mt-2">
            Don’t have an account?{" "}
            <Link href="/signup" className="font-semibold text-brand">
              Create Account
            </Link>
          </p>

          <hr className="my-4" />

          <button
            type="button"
            className="w-full border border-gray-400 py-2 rounded-md font-semibold text-sm hover:bg-gray-100 transition"
          >
            Continue as Guest
          </button>
        </form>
      </div>
    </div>
  );
}
