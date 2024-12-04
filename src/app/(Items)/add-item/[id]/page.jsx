"use client";

import React, { useEffect, useState } from "react";
import { getItemsDetails } from "@/app/api/hooks/Item/getItemsDetails";
import { getAllSubItems } from "@/app/api/hooks/SubItem/getAllSubItems";
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
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubItemForm from "@/components/Forms/SubItemForm";
import CommentForm from "@/components/Forms/CommentForm";
import SubitemsList from "@/components/ItemDetail/SubitemsList";
import CommentsList from "@/components/ItemDetail/CommentsList";

const Page = () => {
  const [hasFetchedSubItems, setHasFetchedSubItems] = useState(false);
  const [selectedSubItemId, setSelectedSubItemId] = useState(null);
  const { itemDetails, getDetails, isLoading, error } = getItemsDetails();
  const { userData, isLoggedIn } = useSelector((state) => state.auth);
  const { subItems, getSubItems, isSubItemLoading, subItemError } =
    getAllSubItems();

  const { comments, getComments, isCommentsLoading, commentError } =
    getCommentsOfSubItems();

  const params = useParams();
  const { id } = params;

  // Function to handle the subItemId passed from the child
  const handleSubItemClick = (subItemId) => {
    setSelectedSubItemId(subItemId);
    getComments(subItemId);
    console.log("Selected SubItem ID:", subItemId);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getDetails(id);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (itemDetails?.itemId && userData?.userId) {
      getSubItems(itemDetails.itemId, userData.userId);
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
      <div className="w-[70%] border-0 border-black px-[10px]">
        <Card className="">
          <CardHeader>
            <CardTitle>{itemDetails?.itemName}</CardTitle>
            <CardDescription>{itemDetails?.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p>created At: {convertToIST(itemDetails?.createdAt)}</p>
              <p>updated At: {convertToIST(itemDetails?.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
        <SubitemsList
          userId={userData?.userId}
          itemId={itemDetails?.itemId}
          subItems={subItems}
          isSubItemLoading={isSubItemLoading}
          subItemError={subItemError}
          onSubItemClick={handleSubItemClick}
        />
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
