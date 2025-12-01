"use client";

import { useEffect, useState } from "react";
import PencilIcon from "@/app/assets/icons/pencil.svg";
import { Button } from "@/app/components/Button";
import { DashboardHeader } from "@/app/components/DashboardHeader";
import { useApi } from "@/app/hooks/useApi";
import { api } from "@/app/utils/apiFetch";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [editingField, setEditingField] = useState<"username" | "email" | null>(
    null,
  );

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [oldPasswordValid, setOldPasswordValid] = useState<boolean | null>(null);
  const { submit: checkPasswordApi } = useApi(api.checkPassword);

  // UseApi wrapper for fetching user
  const { submit: fetchUser, loading: fetchingUser } = useApi(api.getUser);

  // Update user hook
  const { submit: updateUser } = useApi(api.updateUser);
  const { submit: resetPasswordApi } = useApi(api.resetPassword);

  // Load user on mount
  useEffect(() => {
    fetchUser().then((res) => {
      if (res?.data) {
        setUsername(res.data.username);
        setEmail(res.data.email);
      }
    });
  }, [fetchUser]);

  if (fetchingUser) return <div className="p-6">Loading...</div>;

  const handleEdit = (field: "username" | "email") => {
    setEditingField(field);
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  const handleSave = async () => {
    const res = await updateUser({ username, email });

    if (res?.token) {
      localStorage.setItem("token", res.token); // Save NEW TOKEN
    }

    if (res?.message) alert(res.message);
  };

  const handlePasswordUpdate = async () => {
  if (oldPasswordValid !== true) {
    return alert("Please verify your current password first.");
  }

  if (!password || !newPassword) {
    return alert("Please fill out both password fields.");
  }

  try {
    const res = await resetPasswordApi({
      password,
      new_password: newPassword,
    });

    if (res?.message) {
      alert(res.message);
    }

    // Reset UI after success
    setPassword("");
    setNewPassword("");
    setShowPasswordFields(false);
    setOldPasswordValid(null);
  } catch (err) {
    console.error(err);
    alert("Something went wrong updating your password.");
  }
};


  const handleCheckPassword = async () => {
  if (!password) {
    alert("Please enter your current password first.");
    return;
  }

  const res = await checkPasswordApi({ password });

   const isValid = res?.data?.valid === true;
  setOldPasswordValid(isValid);
};

  const deleteAccount = () => {
    alert("Account deletion feature coming soon!");
  };

  return (
    <div className="flex flex-col p-8 lg:p-10 text-dark gap-2">
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
              disabled={true}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 ${
                editingField === "email"
                  ? "bg-white border-brand"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {showPasswordFields && (
          <>
            {/* Current Password */}
            <div>
              <label className="text-sm font-semibold">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              />
            </div>

            {/* Check Password Button */}
            <Button 
               className="bg-dark text-white hover:opacity-80 w-full mt-2"
               onClick={handleCheckPassword}
               >
              Check current password
            </Button>

            {/* Feedback Message */}
            {oldPasswordValid === true && (
              <p className="text-green-600 text-sm">✔ Password is correct</p>
            )}
            {oldPasswordValid === false && (
              <p className="text-red-600 text-sm">✘ Incorrect password</p>
            )}


            {/* New Password */}
            <div>
              <label className="text-sm font-semibold">New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              />
            </div>

            {/* Submit */}
            <Button
              className="bg-brand text-white hover:bg-brand/90 w-full"
              onClick={handlePasswordUpdate}
            >
              Update Password
            </Button>
          </>
        )}

        {/* Buttons Section */}
        <div className="mt-8 flex flex-col gap-3">
          <Button
            className="bg-dark text-white hover:opacity-80 w-full"
            onClick={() => setShowPasswordFields(true)}
          >
            Reset your password
          </Button>
          <Button
            className="bg-red text-white hover:bg-red-600 w-full"
            onClick={deleteAccount}
          >
            Delete Account
          </Button>
          <Button
            className="!bg-brand text-white hover:opacity-80 w-full"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
