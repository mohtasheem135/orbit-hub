"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, SquarePlus } from "lucide-react";
import SubItemForm from "../Forms/SubItemForm";
import { motion } from "motion/react";
import { getAllSubItemsOfUser } from "@/app/api/hooks/SubItem/getAllSubItemsOfUser";

const SubitemsList = ({
  userId,
  itemId,
  allSubItems,
  isAllSubItemLoading,
  allSubItemError,
  onSubItemClick,
  memberships,
}) => {
  const [selectedSubItemId, setSelectedSubItemId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [subItemData, setSubItemData] = useState(allSubItems);

  const { subItems, getSubItems, isSubItemLoading, subItemError } =
    getAllSubItemsOfUser();

  const handleClick = (subItemId) => {
    setSelectedSubItemId(subItemId);
    onSubItemClick(subItemId);
  };

  const handleSelectChange = async (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    getSubItems(itemId, userId);
    if (userId === "") {
      console.log("XXXXXXOO HHHHHH LLLLL empty ", userId, subItems);
      setSubItemData(subItems);
    } else {
      setSubItemData(allSubItems);
      console.log("XXXXXXOO HHHHHH LLLLL filled ", userId, allSubItems);
    }
  };

  if (isAllSubItemLoading) {
    return <p>Loading...</p>;
  }
  if (allSubItemError) {
    return <p>Error Occurred man!!!</p>;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>SubItems</CardTitle>
        <CardDescription>
          <div className="flex justify-between items-center">
            <div>
              <p>A List of All the subItems</p>
            </div>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  {/* <Button
                    variant={"ghost"}
                    className="border-dashed border-2 border-[#331100] shadow-md hover:bg-[#ffbb99]"
                  >
                    Add subitem
                    <SquarePlus />
                  </Button> */}
                  <motion.button
                    whileHover={{
                      // scale: 1.1,
                      backgroundColor: "#ffbb99",
                      padding: "5px 20px",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="border-2 border-dashed border-[#331100] rounded-md flex justify-center items-center"
                    style={{ padding: "5px 10px" }}
                  >
                    <span
                      className={`${
                        isHovered
                          ? "visible text-[#331100] pr-[5px] border-0 border-white"
                          : "hidden"
                      } transition-opacity duration-300`}
                    >
                      Add Subitem
                    </span>
                    <SquarePlus className="text-[#331100]" />
                  </motion.button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Subitem</DialogTitle>
                    <DialogDescription>Add the SubItem Here</DialogDescription>
                  </DialogHeader>
                  <SubItemForm userId={userId} itemId={itemId} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <label
            htmlFor="membersSelect"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Select Member:
          </label>
          <select
            id="membersSelect"
            value={selectedUserId}
            onChange={handleSelectChange}
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            {memberships.map((member) => (
              <option key={member.memberOfUserId} value={member.memberOfUserId}>
                {member.memberOfUserName}
              </option>
            ))}
          </select>
        </div>
      </CardContent>
      <CardContent className="space-y-2">
        {selectedUserId?.length > 0 ? (
          subItems.map((subitem, index) => (
            <Card
              key={index}
              onClick={() => handleClick(subitem.subItemId)}
              className={`px-2 py-4 cursor-pointer ${
                selectedSubItemId === subitem.subItemId
                  ? "bg-blue-200 border border-blue-500"
                  : "bg-white"
              }`}
            >
              <CardTitle>
                <div className="flex justify-between items-center">
                  <div>{subitem?.subItemName}</div>
                  <div className="flex items-center border02 border-black">
                    <MessageCircle className="text-gray-600" />
                    <p className="text-gray-600">{subitem?.comments?.length}</p>
                  </div>
                </div>
              </CardTitle>
              <CardDescription className="mt-2">
                {subitem?.description}
              </CardDescription>
            </Card>
          ))
        ) : (allSubItems.map((subitem, index) => (
          <Card
            key={index}
            onClick={() => handleClick(subitem.subItemId)}
            className={`px-2 py-4 cursor-pointer ${
              selectedSubItemId === subitem.subItemId
                ? "bg-blue-200 border border-blue-500"
                : "bg-white"
            }`}
          >
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>{subitem?.subItemName}</div>
                <div className="flex items-center border02 border-black">
                  <MessageCircle className="text-gray-600" />
                  <p className="text-gray-600">{subitem?.comments?.length}</p>
                </div>
              </div>
            </CardTitle>
            <CardDescription className="mt-2">
              {subitem?.description}
            </CardDescription>
          </Card>
        )))}
      </CardContent>
    </Card>
  );
};

export default SubitemsList;
