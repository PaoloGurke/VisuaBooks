import React, { useState } from 'react';
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface LoginPageProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginPage({ setLoggedIn, setUserName, setProfileImage }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      alert(`Logged in as ${email}`);
      setLoggedIn(true);
      setUserName("User");           
      setProfileImage("/default-avatar.png"); 

      navigate("/"); // go to HOME, not profile
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
           className="
    w-full border border-gray-300 rounded px-3 py-2
    text-black placeholder-gray-500 bg-white
    dark:text-white dark:placeholder-gray-400 dark:bg-gray-800
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
  "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
           className="
    w-full border border-gray-300 rounded px-3 py-2
    text-black placeholder-gray-500 bg-white
    dark:text-white dark:placeholder-gray-400 dark:bg-gray-800
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
  "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="mt-2">Login</Button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account? <Link href="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
