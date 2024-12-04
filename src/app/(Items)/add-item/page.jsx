"use client";

import { getUserItems } from "@/app/api/hooks/Item/getUserItems";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AddItemForm from "@/components/Forms/AddItemForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter()
  const { userData, isLoggedIn } = useSelector((state) => state.auth);
  const { items, getItems, isLoading, error } = getUserItems();

  useEffect(() => {
    if (isLoggedIn) {
      getItems(userData?.userId);
    }
  }, [isLoggedIn]);

  const goToDetailPage=(itemId)=>{
    router.push(`/add-item/${itemId}`)
  }

  return (
    <div className="flex">
      <div className="flex justify-center items-center w-1/2">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Add Item</CardTitle>
            <CardDescription>Add an Item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AddItemForm />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center items-center w-1/2 ">
        {isLoading ? (
          "Loading...."
        ) : (
          <Card className="h-[85vh] px-[30px] py-2 mt-4 border-0 border-black overflow-y-auto overflow-x-hidden custom-scrollbar">
            {items.map((item, index) => (
              <Card onClick={()=>goToDetailPage(item.uniqueNumber)} key={index} className="w-[650px] mb-2 cursor-pointer">
                <CardHeader>
                  <CardTitle>{item?.itemName} - {item?.itemId}</CardTitle>
                  <CardDescription>{item?.description}</CardDescription>
                  <CardDescription>{item?.uniqueNumber}</CardDescription>
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
