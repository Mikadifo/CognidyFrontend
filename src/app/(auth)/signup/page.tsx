"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.svg";

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      res.ok ? alert("Signup successful!") : alert(data.message || "Signup failed");
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
          Welcome!
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
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
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
          </div>

          <button
            type="submit"
            className="w-full bg-brand text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Sign Up →
          </button>

          <p className="text-xs text-center mt-2">
            Have an account already?{" "}
            <Link href="/login" className="font-semibold text-brand">
              Log In
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
