"use client";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        console.log("User:", data);
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c] px-4">
      <div className="bg-[#111827] text-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-cyan-700/30">
        <h1 className="text-3xl font-semibold mb-6 text-center text-cyan-400">
          Cognidy Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
              className="w-full px-3 py-2 bg-[#1f2937] border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
              className="w-full px-3 py-2 bg-[#1f2937] border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-colors text-white py-2 rounded-lg font-semibold shadow-md"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-cyan-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
