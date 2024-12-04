"use client";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSignup } from "@/app/api/hooks/Auth/useSignUp";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useAddItem } from "@/app/api/hooks/Item/useAddItem";
import { useToast } from "../hooks/use-toast";

const AddItemForm = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
  });

  const { userData, isLoggedIn } = useSelector((state) => state.auth);
  const { addItem, isSubmitting, itemError } = useAddItem();

  useEffect(() => {
    Cookies.set("auth", isLoggedIn, { expires: 1 / 2 }); // Expires in 5 minutes
    console.log("User Loggedin: ", isLoggedIn);
  }, [isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem(formData, userData?.userId);
      toast({
        title: "Item Added!",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } catch (err) {
      toast(itemError);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col">
        <label htmlFor="itemName">Item Name</label>
        <input
          id="itemName"
          name="itemName"
          className="border-2 border-gray-400 rounded-sm px-1 py-1"
          placeholder="itemName"
          value={formData.itemName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="border-2 border-gray-400 rounded-sm px-1 py-1 h-[50px]"
          placeholder="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <Button className="mt-4" type="submit">
        {isSubmitting ? "Adding Item..." : "Add Item"}
      </Button>
    </form>
  );
};

export default AddItemForm;
