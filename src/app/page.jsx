"use client";

import { Button } from "@/components/ui/button";
import { store } from "./redux/store";
import { logout } from "./redux/slices/authSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import useDeviceType from "@/utils/useDeviceType";
import Home from "@/components/HomePage/Home"

export default function Page() {
  const deviceType = useDeviceType();

  const { isLoggedIn, sessionExpiry } = useSelector(
    // @ts-ignore
    (state) => state.auth
  );
  const date = new Date(sessionExpiry);
  const formattedDate = date.toLocaleString();

  useEffect(() => {
    Cookies.set("auth", isLoggedIn, { expires: 1 / 2 }); // Expires in 5 minutes
  }, [isLoggedIn]);

  return (
    <div className="w-full">
      {/* <h1>Mohtasheem</h1>
      <p>Session Expiry: {formattedDate}</p> */}
      {/* <br />
      <div>
        {deviceType === "mobile" && <p>This is a mobile device.</p>}
        {deviceType === "tablet" && (
          <p>This is a tablet (iPad or Android tablet).</p>
        )}
        {deviceType === "desktop" && <p>This is a desktop device.</p>}
      </div> */}
      <Home />
    </div>
  );
}
