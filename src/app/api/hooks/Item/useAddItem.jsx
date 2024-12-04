import { useState } from "react";
// import { postEvent } from '../services/eventService';
import { handleApiErrors } from "@/utils/handleErrors";
import { createItem } from "../../services/itemService";

export const useAddItem = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [itemError, setItemError] = useState(null);

  const addItem = async (itemData, userId) => {
    try {
      setIsSubmitting(true);
      setItemError(null); // Reset previous errors
      const response = await createItem(itemData, userId);
      return response; // Return response on success
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setItemError(errorMessage);
      throw err; // Re-throw error if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return { addItem, isSubmitting, itemError };
};
