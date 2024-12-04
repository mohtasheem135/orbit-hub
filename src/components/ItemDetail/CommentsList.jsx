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
import CommentForm from "../Forms/CommentForm";

const CommentsList = ({
  comments,
  selectedSubItemId,
  userId,
  isCommentsLoading,
}) => {
  return (
    <div className="w-[30%] border-0 border-black">
      {comments.length > 0 ? (
        <Card className="">
          <CardHeader>
            <CardTitle>Comments - {selectedSubItemId}</CardTitle>
            <CardDescription>
              <div className="flex justify-between items-center">
                <div>
                  <p>All the comments of associated members</p>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="border-dashed border-2 border-[#331100] shadow-md hover:bg-[#ffbb99]"
                      >
                        Add comment
                        <SquarePlus />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Comment</DialogTitle>
                        <DialogDescription>
                          Add the Comment Here
                        </DialogDescription>
                      </DialogHeader>
                      <CommentForm
                        userId={userId}
                        subItemId={selectedSubItemId}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            {isCommentsLoading ? (
              <p>Comments Loading...</p>
            ) : (
              comments.map((comment, index) => (
                <Card className="px-2 mb-2 py-4" key={index}>
                  <CardTitle>{comment?.fullName}</CardTitle>
                  <CardDescription className="mt-2">
                    {comment?.commentText}
                  </CardDescription>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Comments - {selectedSubItemId}</CardTitle>
            <CardDescription>
              <div className="flex justify-between items-center">
                <div>
                  <p>There are no comments, you can add now!!!</p>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="border-dashed border-2 border-[#331100] shadow-md hover:bg-[#ffbb99]"
                      >
                        Add comment
                        <SquarePlus />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Comment</DialogTitle>
                        <DialogDescription>
                          Add the Comment Here
                        </DialogDescription>
                      </DialogHeader>
                      <CommentForm
                        userId={userId}
                        subItemId={selectedSubItemId}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default CommentsList;
