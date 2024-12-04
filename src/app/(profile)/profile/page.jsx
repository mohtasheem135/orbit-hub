"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "@/app/api/hooks/Auth/getUserProfile";

const page = () => {
  const { userData, isLoggedIn } = useSelector((state) => state.auth);
  const { profile, getProfile, isLoading, error } = getUserProfile();

  useEffect(() => {
    if (isLoggedIn) {
      getProfile(userData?.userId);
    }
  }, [isLoggedIn]);
  if (error) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-[100px] pt-5">
      <p>User Id: {userData?.userId}</p>
      <br/>
      <p>Full Name: {profile?.fullName}</p>
      <p>User Name: {userData?.userName}</p>
      <p>Email: {userData?.email}</p>
      <p>Bio: {profile?.bio}</p>
      <p>Location: {profile?.location}</p>
    </div>
  );
};

export default page;
