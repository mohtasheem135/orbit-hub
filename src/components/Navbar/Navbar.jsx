"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const router = useRouter();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleNavigation = (name) => {
    if (isLoggedIn) {
      router.push(`/${name}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="bg-[#ffbb99] h-[70px] w-full flex justify-between items-center px-[100px]">
      <div className="">
        <p className="cursor-pointer font-bold text-[30px] text-[#331100]" onClick={() => handleNavigation("/")}>
          Orbit-Hub
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-3 ml-[30px]">
          <p
            className="px-2 py-1 text-[#331100] hover:bg-gray-200 cursor-pointer hover:rounded-sm hover:shadow-md"
            onClick={() => handleNavigation("/")}
          >
            Home
          </p>
          <p
            className="px-2 py-1 text-[#331100] hover:bg-gray-200 cursor-pointer hover:rounded-sm hover:shadow-md"
            onClick={() => handleNavigation("about")}
          >
            About
          </p>
        </div>
        <div
          className="rounded-full p-2 border-2 border-black cursor-pointer "
          onClick={() => handleNavigation("profile")}
        >
          <Image src="/user.png" width={30} height={30} alt="User Icon" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
