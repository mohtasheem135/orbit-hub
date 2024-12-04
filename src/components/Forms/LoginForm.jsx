"use client";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLogin } from "@/app/api/hooks/Auth/useLogin";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [username, setUsername] = useState("tony_stark");
  const [email, setEmail] = useState("tony@stark.com");
  const [password, setPassword] = useState("ironman");

  const { handleLogin, loading } = useLogin();

  const { userData, isLoggedIn, sessionExpiry } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    Cookies.set("auth", isLoggedIn, { expires: 1 / 2 }); // Expires in 5 minutes
    console.log("User Loggedin: ", isLoggedIn)
  }, [isLoggedIn]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          className="border-2 border-gray-400 rounded-sm px-1 py-1"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="border-2 border-gray-400 rounded-sm px-1 py-1"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="border-2 border-gray-400 rounded-sm px-1 py-1"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button className="mt-4" type="submit">
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
