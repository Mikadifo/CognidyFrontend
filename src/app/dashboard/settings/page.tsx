"use client";

import { useState } from "react";
import PencilIcon from "@/app/assets/icons/pencil.svg";
import { Button } from "@/app/components/Button";
import { DashboardHeader } from "@/app/components/DashboardHeader";

export default function Settings() {
  const [username, setUsername] = useState("Nikita_15");
  const [email, setEmail] = useState("name@example.com");
  const [editingField, setEditingField] = useState<"username" | "email" | null>(
    null,
  );

  const handleEdit = (field: "username" | "email") => {
    setEditingField(field);
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  const resetPassword = () => {
    alert("Password reset feature coming soon!");
  };

  const deleteAccount = () => {
    alert("Account deletion feature coming soon!");
  };

  return (
    <div className="flex flex-col p-10 text-dark gap-2">
      <DashboardHeader
        heading="Settings"
        subheading="Customize your experience and app preferences"
      />

      {/* Form Section */}
      <div className="flex flex-col gap-6 max-w-md">
        {/* Username Field */}
        <div>
          <label className="text-sm font-semibold">Username:</label>
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={username}
              disabled={editingField !== "username"}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={handleBlur}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 ${
                editingField === "username"
                  ? "bg-white border-brand"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
            <button
              className="ml-2 p-2 hover:bg-gray-200 rounded-md"
              onClick={() => handleEdit("username")}
            >
              <PencilIcon className="size-4" />
            </button>
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="text-sm font-semibold">Email:</label>
          <div className="flex items-center mt-2">
            <input
              type="email"
              value={email}
              disabled={editingField !== "email"}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 ${
                editingField === "email"
                  ? "bg-white border-brand"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
            <button
              className="ml-2 p-2 hover:bg-gray-200 rounded-md"
              onClick={() => handleEdit("email")}
            >
              <PencilIcon className="size-4" />
            </button>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-8 flex flex-col gap-3">
          <Button
            className="bg-dark text-white hover:bg-dark-08 w-full"
            onClick={resetPassword}
          >
            Reset your password
          </Button>
          <Button
            className="bg-red text-white hover:bg-red-600 w-full"
            onClick={deleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
