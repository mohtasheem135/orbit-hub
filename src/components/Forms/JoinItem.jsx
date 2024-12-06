"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { formatDateTime } from "@/utils/basicUtility";
import { useToast } from "../hooks/use-toast";
import { useJoinItem } from "@/app/api/hooks/Item/useJoinItem";

const JoinItem = ({ userId }) => {
  const formattedDateTime = formatDateTime();
  const { toast } = useToast();

  const { joinItem, isJoining, joiningError } = useJoinItem();

  const [uniqueKey, setUniqueKey] = useState("");
  const handleInputChange = (e) => {
    setUniqueKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uniqueKey) {
      toast({
        title: `Enter the key to join.`,
        description: formattedDateTime,
      });
    }

    try {
      const data = await joinItem(userId, uniqueKey);
      toast({
        title: data,
        description: formattedDateTime,
      });
    } catch (err) {
      toast({
        title: err?.response?.data,
        // description: err?.response?.data,
        description: formattedDateTime,
      });
    }
  };

  return (
    <div className="">
      {/* Input field */}
      <label htmlFor="uniqueKey" className="block font-semibold mb-2">
        Enter Key:
      </label>
      <input
        type="text"
        id="uniqueKey"
        value={uniqueKey}
        onChange={handleInputChange}
        className="border border-gray-400 rounded p-2 w-full"
        placeholder="Type something here..."
      />
      <motion.button
        whileHover={{
          scale: 1.1,
          backgroundColor: "#ffbb99",
          border: "none",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        className="shadow-md border-[1px] border-[#331100] bg[#331100] h-[30px] px-3 text-[14px] rounded-md flex justify-center items-center mt-4"
        onClick={handleSubmit}
      >
        Join Item
      </motion.button>
    </div>
  );
};

export default JoinItem;
