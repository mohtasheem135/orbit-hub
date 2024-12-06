import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { SquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import JoinItem from "@/components/Forms/JoinItem"

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
        <div className="flex space-x-4 mt-4 items-center">
          {/* <Button
            variant={"ghost"}
            onClick={handleClick}
            className="mt-[15px] border-dashed border-2 border-[#331100] shadow-md hover:bg-[#ffbb99]"
          >
            Add Item
            <SquarePlus />
          </Button> */}
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "#ffbb99",
            }}
            onClick={handleClick}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-dashed border-[#331100] h-[40px] px-4 rounded-md flex justify-center items-center"
          >
            Add Item
            <SquarePlus className="text-[#331100] ml-2" />
          </motion.button>
          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#ffbb99",
                  // padding: "5px 20px",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
                // onHoverStart={() => setIsHovered(true)}
                // onHoverEnd={() => setIsHovered(false)}
                className="border-2 border-dashed border-[#331100] h-[40px] px-4 rounded-md flex justify-center items-center"
              >
                Join Item
                <SquarePlus className="text-[#331100] ml-2" />
              </motion.button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Join Item</DialogTitle>
                <DialogDescription>
                  Enter the unique key to join the Item...
                </DialogDescription>
              </DialogHeader>
              <JoinItem userId={userData?.userId} />
            </DialogContent>
          </Dialog>
        </div>
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
