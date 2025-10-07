"use client";
import React, { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        console.log("User created:", data);
      } else {
        alert(data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error("Error signing up:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c] px-4">
      <div className="bg-[#111827] text-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-cyan-700/30">
        <h1 className="text-3xl font-semibold mb-6 text-center text-cyan-400">
          Create an Account ✨
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-300">Full Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#1f2937] border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#1f2937] border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-[#1f2937] border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-colors text-white py-2 rounded-lg font-semibold shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

