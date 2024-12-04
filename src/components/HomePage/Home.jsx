import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { SquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";

const Home = () => {
  const { userData, sessionExpiry } = useSelector((state) => state.auth);
  const date = new Date(sessionExpiry);
  const formattedDate = date.toLocaleString();
  const router = useRouter();
  const handleClick = () => {
    router.push("/add-item");
  };
  return (
    <div className="border-0 border-black px-[100px]">
      <div className="border-0 border-black flex flex-col justify-center items-center py-[30px]">
        <p>{formattedDate}</p>
        <p className="text-[35px] text-[#ff884d] font-bold cursor-default">
          Welcome Back,
        </p>
        <p className="text-[#331100] cursor-default text-[20px] font-semibold">
          {userData?.userName}
        </p>
        <Button
          variant={"ghost"}
          onClick={handleClick}
          className="mt-[15px] border-dashed border-2 border-[#331100] shadow-md hover:bg-[#ffbb99]"
        >
          Add Item
          <SquarePlus />
        </Button>
      </div>
      <div className="border-0 border-black flex justify-center items-center">
        <Image
          src="/Homepage/img1.jpg"
          width={400}
          height={400}
          alt="Home Page Image"
        />
      </div>
    </div>
  );
};

export default Home;
