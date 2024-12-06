"use client";

import { getUserItems } from "@/app/api/hooks/Item/getUserItems";
import { getUserMebershipItems } from "@/app/api/hooks/Item/getUserMebershipItems";
import { getUserMembership } from "@/app/api/hooks/Membership/getUserMembership";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ItemForm from "@/components/Forms/ItemForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = () => {
  const router = useRouter();
  const [filter, setFilter] = useState("ALL");

  const { userData, isLoggedIn } = useSelector((state) => state.auth);
  const { items, getItems, isLoading, error } = getUserItems();
  const {
    joinedItems,
    getJoinedItems,
    isJoinedItemsLoading,
    joinedItemsError,
  } = getUserMebershipItems();

  useEffect(() => {
    if (isLoggedIn) {
      getItems(userData?.userId);
      getJoinedItems(userData?.userId);
    }
  }, [isLoggedIn]);

  const goToDetailPage = (itemId) => {
    router.push(`/add-item/${itemId}`);
  }

  // const getFilteredItems = () => {
  //   switch (filter) {
  //     case "ADMIN":
  //       return items; // Show all items created by the user as Admin
  //     case "PARTICIPANT":
  //       return joinedItems; // Show items where the user is a Participant
  //     case "ALL":
  //     default:
  //       return [...new Set([...items, ...joinedItems])]; // Merge both sets without duplicates
  //   }
  // };

  // const filteredItems = getFilteredItems();
  const filteredItems = useMemo(() => {
    switch (filter) {
        case 'ADMIN':
            return items; // Show all items created by the user as Admin
        case 'PARTICIPANT':
            return joinedItems; // Show items where the user is a Participant
        case 'ALL':
        default:
            return [...new Set([...items, ...joinedItems])]; // Merge both sets without duplicates
    }
}, [filter, items, joinedItems]);

  return (
    <div className="flex">
      <div className="flex justify-center items-center w-1/2">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Add Item</CardTitle>
            <CardDescription>Add an Item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ItemForm userId={userData?.userId} />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center items-center w-1/2 px-4">
        {isLoading ? (
          "Loading...."
        ) : (
          <Card className="h-[85vh] px-[30px] w-full py-2 mt-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <CardHeader>
              <CardTitle>
                <div className="space-x-4 -ml-[20px]">
                  <Button
                    className={`${
                      filter === "ALL"
                        ? "bg-[#331100] text-[#ffbb99]"
                        : "bg-[#ffbb99] text-[#331100] hover:bg-gray-500"
                    }`}
                    onClick={() => setFilter('ALL')}
                  >
                    All
                  </Button>
                  <Button
                    className={`${
                      filter === "ADMIN"
                        ? "bg-[#331100] text-[#ffbb99]"
                        : "bg-[#ffbb99] text-[#331100] hover:bg-gray-500"
                    }`}
                    onClick={() => setFilter("ADMIN")}
                  >
                    Admin
                  </Button>
                  <Button
                    className={`${
                      filter === "PARTICIPANT"
                        ? "bg-[#331100] text-[#ffbb99]"
                        : "bg-[#ffbb99] text-[#331100] hover:bg-gray-500"
                    }`}
                    onClick={() => setFilter("PARTICIPANT")}
                  >
                    Participant
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            {filteredItems.map((item, index) => (
              <Card
                onClick={() => goToDetailPage(item.uniqueNumber)}
                key={index}
                className="w-[650px] mb-2 cursor-pointer"
              >
                <CardHeader>
                  <CardTitle>
                    {item?.itemName} - {item?.itemId}
                  </CardTitle>
                  <CardDescription>
                    <div>
                      <p>{item?.description}</p>
                      <p>{item?.uniqueNumber}</p>
                      <p>{item?.isActive ? "True" : "False"}</p>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};

export default Page;
