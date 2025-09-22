"use client";
import React, { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #0072ff 0%, #00c6ff 100%)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="Cognidy Logo"
          style={{ width: "60px", margin: "0 auto 15px auto", display: "block" }}
        />
        <h2 style={{ marginBottom: "20px", fontSize: "22px", fontWeight: "bold", color: "#000" }}>
          Welcome!
        </h2>

        <form>
          <div style={{ textAlign: "left", marginBottom: "15px" }}>
            <label style={{ fontWeight: "500", fontSize: "14px", color: "#000",
}}>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "15px" }}>
            <label style={{ fontWeight: "500", fontSize: "14px", color: "#000",
}}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <label style={{ fontWeight: "500", fontSize: "14px", color: "#000",
}}>Password</label>
            <input
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginTop: "5px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#0072ff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            Sign Up →
          </button>
        </form>

        <p style={{ fontSize: "14px" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#0072ff", fontWeight: "bold" }}>
            Log In
          </a>
        </p>

        <hr style={{ margin: "20px 0" }} />

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
