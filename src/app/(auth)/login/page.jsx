"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useLogin } from "../../api/hooks/Auth/useLogin";
// import { isAuthenticated } from '@/utils/isAuthenticated';
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function LoginPage() {
  //   const router = useRouter();
  const [username, setUsername] = useState("tony_stark");
  const [email, setEmail] = useState("tony@stark.com");
  const [password, setPassword] = useState("ironman");

  const [authStatus, setAuthStatus] = useState(null);

  const { handleLogin, message, loading } = useLogin();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, email, password);
  };

  // @ts-ignore
  const { userData, isLoggedIn, sessionExpiry } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
      // const date = new Date(sessionExpiry);
      // console.log("FFFFFXXXXXXXXXXXX ", date);
      // Set auth data in cookies when userData is available
      Cookies.set("auth", isLoggedIn, { expires: 1 / 288 }); // Expires in 5 minutes
      // console.log("XXXX Cookie Set:", Cookies.get()); // Check if the cookie is set correctly
  }, [isLoggedIn]);

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={onSubmit}
        className="border-2 border-black flex flex-col space-y-10 w-[350px]"
      >
        <input
          type="username"
          value={username}
          className="border-2 border-black text-black"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          className="border-2 border-black"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          className="border-2 border-black"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && <span>{message}</span>}
      <p>redux: {userData?.userName}</p>
      {/* <p className="text-black">isAuthenticated: {auth}</p> */}
    </div>
  );
}
