"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useAddSubitem } from "@/app/api/hooks/SubItem/useAddSubitem";
import { useToast } from "../hooks/use-toast";

const SubItemForm = ({ userId, itemId, existingSubItem = null }) => {
  const [formData, setFormData] = useState({
    subItemName: "",
    description: "",
    priority: "MEDIUM",
    status: "NOT_COMPLETED",
    dueDate: "",
  });

  const { toast } = useToast();
  const { addSubitem, isSubmitting, itemError } = useAddSubitem();

  useEffect(() => {
    if (existingSubItem) {
      setFormData({
        subItemName: existingSubItem.subItemName || "",
        description: existingSubItem.description || "",
        priority: existingSubItem.priority || "MEDIUM",
        status: existingSubItem.status || "NOT_COMPLETED",
        dueDate: existingSubItem.dueDate || "",
      });
    }
  }, [existingSubItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSubitem(formData, userId, itemId);
      toast({
        title: "Subitem Added!",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } catch (err) {
      toast(itemError);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Sub Item Name */}
      <div>
        <label htmlFor="subItemName" className="block font-semibold">
          Sub Item Name
        </label>
        <input
          type="text"
          name="subItemName"
          id="subItemName"
          value={formData.subItemName}
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
          className="mt-1 block w-full border rounded p-2"
        />
      </div>

      {/* Priority */}
      <div>
        <label htmlFor="priority" className="block font-semibold">
          Priority
        </label>
        <select
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block font-semibold">
          Status
        </label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="NOT_COMPLETED">Not Completed</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor="dueDate" className="block font-semibold">
          Due Date
        </label>
        <input
          type="datetime-local"
          name="dueDate"
          id="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded p-2"
        />
      </div>

      {/* Submit Button */}
      <Button type="submit">
        {existingSubItem
          ? "Update Sub Item"
          : isSubmitting
          ? "Adding Subitem"
          : "Add Subitem"}
      </Button>
    </form>
  );
};

export default SubItemForm;
