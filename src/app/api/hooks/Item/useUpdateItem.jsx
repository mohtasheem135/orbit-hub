import { useState } from "react";
import { handleApiErrors } from "@/utils/handleErrors";
import { putUpdateItem } from "../../services/itemService";

export const useUpdateItem = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [itemUpdateError, setItemUpdateError] = useState(null);

  const updateItem = async (itemData, itemId) => {
    try {
        setIsUpdating(true);
        setItemUpdateError(null);
      const response = await putUpdateItem(itemData, itemId);
      return response;
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setItemUpdateError(errorMessage);
      throw err;
    } finally {
        setIsUpdating(false);
    }
  };

  return { updateItem, isUpdating, itemUpdateError };
};
