// components/SignupForm.js
"use client";

import { useState } from "react";

export default function SignupForm() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSignup} className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
      />
      <button
        type="submit"
        className="w-full bg-cyan-300 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-400"
      >
        Sign Up
      </button>
    </form>
  );
}
