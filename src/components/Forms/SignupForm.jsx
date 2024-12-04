"use client";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSignup } from "@/app/api/hooks/Auth/useSignUp";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    userName: "azad",
    email: "azad@signup.com",
    password: "121",
  });

  const { handleSignup, loading } = useSignup();

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    Cookies.set("auth", isLoggedIn, { expires: 1 / 2 }); // Expires in 5 minutes
    console.log("User Loggedin: ", isLoggedIn);
  }, [isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // await handleSignup(formData);
    try {
      await handleSignup(formData);
      console.log("Data sent to next file!", formData);
      //   alert("Data sent to next file!");
    } catch (err) {
      console.error("sending data error:", err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col">
        <label htmlFor="userName">Username</label>
        <input
          id="userName"
          name="userName"
          className="border-2 border-gray-400 rounded-sm px-1 py-1"
          placeholder="userName"
          value={formData.userName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="border-2 border-gray-400 rounded-sm px-1 py-1"
          placeholder="email"
          name="email"
          //   value={email}
          //   onChange={(e) => setEmail(e.target.value)}
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="border-2 border-gray-400 rounded-sm px-1 py-1"
          placeholder="password"
          type="password"
          name="password"
          //   value={password}
          //   onChange={(e) => setPassword(e.target.value)}
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <Button className="mt-4" type="submit">
        {loading ? "Signing up..." : "Signupx"}
      </Button>
    </form>
  );
};

export default SignupForm;
