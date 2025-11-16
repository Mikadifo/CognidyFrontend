"use client";

import { useEffect,useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/app/components/Button";


export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [editingField, setEditingField] = useState<"username" | "email" | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data dynamically from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:5000/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username && data.email) {
          setUsername(data.username);
          setEmail(data.email);
        } else {
          console.warn("Invalid response:", data);
        }
      })
      .catch((err) => console.error("Error fetching user info:", err))
      .finally(() => setLoading(false));
  }, []);


  const handleEdit = (field: "username" | "email") => {
    setEditingField(field);
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  const handleSave = async () => {
  const token = localStorage.getItem("token");
  if (!token) return alert("You must be logged in.");

  const updatedData = { username, email };

  try {
    const res = await fetch("http://127.0.0.1:5000/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();
    alert(data.message || "Profile updated!");
  } catch (err) {
    console.error("Error updating user:", err);
    alert("Something went wrong!");
  }
};



  const resetPassword = () => {
    alert("Password reset feature coming soon!");
  };

  const deleteAccount = () => {
    alert("Account deletion feature coming soon!");
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex flex-col p-10 text-dark">
      {/* Title Section */}
      <div className="mb-6">
        <h2 className="text-brand text-sm font-semibold uppercase tracking-wider">Settings</h2>
        <h1 className="text-2xl font-semibold mt-2">
          Customize your experience and app preferences
        </h1>
      </div>

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
              <Pencil size={18} />
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
              <Pencil size={18} />
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
          <Button
               className="bg-brand text-white hover:bg-brand/90 w-full"
               onClick={handleSave}
            >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
