"use client";

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
import { SquarePlus } from "lucide-react";
import SubItemForm from "../Forms/SubItemForm";

const SubitemsList = ({
  userId,
  itemId,
  subItems,
  isSubItemLoading,
  subItemError,
  onSubItemClick,
}) => {
  if (isSubItemLoading) {
    return <p>Loading...</p>;
  }
  if (subItemError) {
    return <p>Error Occurred man!!!</p>;
  }

  return (
    <Card className="mt-[10px]">
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
                  <Button
                    variant={"ghost"}
                    className="border-dashed border-2 border-[#331100] shadow-md hover:bg-[#ffbb99]"
                  >
                    Add subitem
                    <SquarePlus />
                  </Button>
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
      <CardContent className="space-y-2">
        {subItems.map((subitem, index) => (
          <Card
            className="px-2 py-4 cursor-pointer"
            key={index}
            // onClick={() => getAllSubItemComments(subitem?.subItemId)}
            onClick={() => onSubItemClick(subitem.subItemId)}
            // onClick={() => getAllSubItemComments(subitem?.subItemId)}
          >
            <CardTitle>{subitem?.subItemName}</CardTitle>
            <CardDescription className="mt-2">
              A List of All the subItems
            </CardDescription>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default SubitemsList;
