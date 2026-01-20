import React, { useState } from 'react';
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface SignUpPageProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpPage({ setLoggedIn, setUserName, setProfileImage }: SignUpPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // <-- new username field
  const [, navigate] = useLocation();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password && username) { // ensure username is filled
      alert(`Signed up as ${email}`);
      
      setLoggedIn(true);
      setUserName(username);              // <-- use the username user entered
      setProfileImage("/default-avatar.png"); // default anonymous profile

      navigate("/"); // redirect to homepage
    } else {
      alert("Please enter all required fields");
    }
  };

  // Shared Tailwind input styles
  const inputClass = `
    w-full border border-gray-300 rounded px-3 py-2
    text-black placeholder-gray-500 bg-white
    dark:text-white dark:placeholder-gray-400 dark:bg-gray-800
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
  `;

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            className={inputClass}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="mt-2">Sign Up</Button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}
