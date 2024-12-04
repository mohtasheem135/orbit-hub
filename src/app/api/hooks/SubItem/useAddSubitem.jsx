import { useState } from "react";
import { handleApiErrors } from "@/utils/handleErrors";
import { createSubitem } from "../../services/subItemService";

export const useAddSubitem = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [itemError, setItemError] = useState(null);

  const addSubitem = async (subItemData, userId, itemId) => {
    try {
      setIsSubmitting(true);
      setItemError(null); // Reset previous errors
      const response = await createSubitem(subItemData, userId, itemId);
      return response; // Return response on success
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setItemError(errorMessage);
      throw err; // Re-throw error if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return { addSubitem, isSubmitting, itemError };
};
