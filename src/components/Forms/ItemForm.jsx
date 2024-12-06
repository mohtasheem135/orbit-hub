"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useAddItem } from "@/app/api/hooks/Item/useAddItem";
import { useUpdateItem } from "@/app/api/hooks/Item/useUpdateItem";
import { useToast } from "../hooks/use-toast";
import { formatDateTime } from "@/utils/basicUtility";

const ItemForm = ({ userId, itemId, existingItem = null }) => {
  const { toast } = useToast();
  const { addItem, isSubmitting, itemError } = useAddItem();
  const { updateItem, isUpdating, itemUpdateError } = useUpdateItem();

  const formattedDateTime = formatDateTime();

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
  });

  useEffect(() => {
    if (existingItem) {
      setFormData({
        itemName: existingItem.itemName || "",
        description: existingItem.description || "",
      });
    }
  }, [existingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingItem) {
        await updateItem(formData, itemId);
      } else {
        await addItem(formData, userId);
      }
      toast({
        title: `Item ${existingItem ? "Updated!!!" : "Added!!!"}`,
        description: formattedDateTime,
      });
    } catch (err) {
      toast(itemError);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Item Name */}
      <div>
        <label htmlFor="itemName" className="block font-semibold">
          Item Name
        </label>
        <input
          type="text"
          name="itemName"
          id="itemName"
          value={formData.itemName}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded p-2"
        />
      </div>
      {/* Description */}
      <div>
        <label htmlFor="description" className="block font-semibold">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded p-2 h-[70px]"
        />
      </div>
      {/* Submit Button */}
      <Button type="submit">
        {existingItem
          ? isUpdating
            ? "Updating Item..."
            : "Update Item"
          : isSubmitting
          ? "Adding Item"
          : "Add Item"}
      </Button>
    </form>
  );
};

export default ItemForm;
