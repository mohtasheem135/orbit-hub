"use client";

import React, { useEffect, useRef, useState } from "react";
import { getItemsDetails } from "@/app/api/hooks/Item/getItemsDetails";
import { getAllSubItemsOfUser } from "@/app/api/hooks/SubItem/getAllSubItemsOfUser";
import { getAllSubItemsOfItem } from "@/app/api/hooks/SubItem/getAllSubItemsOfItem";
import { getCommentsOfSubItems } from "@/app/api/hooks/Comment/getCommentsOfSubItems";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertToIST } from "@/utils/basicUtility";
import SubitemsList from "@/components/ItemDetail/SubitemsList";
import CommentsList from "@/components/ItemDetail/CommentsList";
import { SquarePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ItemForm from "@/components/Forms/ItemForm";
import { motion } from "motion/react";

const Page = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [containerData, setContainerData] = useState({});
  const [screenHeight, setScreenHeight] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  const [hasFetchedSubItems, setHasFetchedSubItems] = useState(false);
  const [selectedSubItemId, setSelectedSubItemId] = useState(null);
  const { itemDetails, getDetails, isLoading, error } = getItemsDetails();
  const { userData, isLoggedIn } = useSelector((state) => state.auth);
  const { subItems, getSubItems, isSubItemLoading, subItemError } =
    getAllSubItemsOfUser();

  const { allSubItems, getAllSubItems, isAllSubItemLoading, allSubItemError } =
    getAllSubItemsOfItem();

  const { comments, getComments, isCommentsLoading, commentError } =
    getCommentsOfSubItems();

  const params = useParams();
  const { id } = params;

  const handleSubItemClick = (subItemId) => {
    setSelectedSubItemId(subItemId);
    getComments(subItemId);
    console.log("Selected SubItem ID:", subItemId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("fixed-container");
      setContainerData(container?.getBoundingClientRect());

      if (container?.getBoundingClientRect().top <= 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateScreenHeight = () => {
      setScreenHeight(window.innerHeight);
    };

    updateScreenHeight();

    window.addEventListener("resize", updateScreenHeight);

    return () => window.removeEventListener("resize", updateScreenHeight);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getDetails(id);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (itemDetails?.itemId && userData?.userId) {
      // getSubItems(itemDetails.itemId, userData.userId);
      getAllSubItems(itemDetails.itemId);
      setHasFetchedSubItems(true);
    }
  }, [itemDetails, userData, hasFetchedSubItems]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="px-[100px] mt-[30px] flex">
      <div className="w-[70%] h-full relative border-0 border-black px-[10px]">
        <Card className="">
          <CardHeader>
            <CardTitle>{itemDetails?.itemName}</CardTitle>
            <CardDescription>
              <div className="flex justify-between items-center">
                <div>
                  <p>{itemDetails?.description}</p>
                </div>
                <div>
                  {userData?.userId === itemDetails?.adminUserId && (
                    <Dialog>
                      <DialogTrigger asChild>
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
                            Edit Item
                          </span>
                          <SquarePlus className="text-[#331100]" />
                        </motion.button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Item</DialogTitle>
                          <DialogDescription>
                            Edit your Item here...
                          </DialogDescription>
                        </DialogHeader>
                        <ItemForm
                          userId={userData?.userId}
                          itemId={itemDetails?.itemId}
                          existingItem={itemDetails}
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p>created At: {convertToIST(itemDetails?.createdAt)}</p>
              <p>updated At: {convertToIST(itemDetails?.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>

        <div
          id="fixed-container"
          className="border-0 border-black w-full"
          style={{ height: `${containerData.height}` }}
        >
          <div
            className={`border-0 border-red-600 mt-[15px] ${
              isSticky
                ? "fixed top-0 border-0 border-black overflow-y-auto custom-scrollbar"
                : ""
            }`}
            style={{
              width: `${isSticky ? containerData.width : ""}`,
              height: `${isSticky ? screenHeight - 20 : containerData.height}`,
            }}
          >
            <SubitemsList
              userId={userData?.userId}
              itemId={itemDetails?.itemId}
              allSubItems={allSubItems}
              isAllSubItemLoading={isAllSubItemLoading}
              allSubItemError={allSubItemError}
              memberships={itemDetails?.memberships}
              onSubItemClick={handleSubItemClick}
            />
          </div>
        </div>
      </div>
      <CommentsList
        comments={comments}
        selectedSubItemId={selectedSubItemId}
        isCommentsLoading={isCommentsLoading}
        userId={userData?.userId}
      />
    </div>
  );
};

export default Page;
