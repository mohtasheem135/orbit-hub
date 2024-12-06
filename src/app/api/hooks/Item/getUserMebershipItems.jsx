import { useState } from "react";
import { fetchAllJoinedItems } from "../../services/itemService";
import { handleApiErrors } from "@/utils/handleErrors";

export const getUserMebershipItems = () => {
  const [joinedItems, setItems] = useState([]);
  const [isJoinedItemsLoading, setJoinedItemsIsLoading] = useState(true);
  const [joinedItemsError, setJoinedItemError] = useState(null);

  const getJoinedItems = async (userId) => {
    try {
      setJoinedItemsIsLoading(true);
      const data = await fetchAllJoinedItems(userId);
      setItems(data);
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setJoinedItemError(errorMessage);
    } finally {
      setJoinedItemsIsLoading(false);
    }
  };
  return {
    joinedItems,
    getJoinedItems,
    isJoinedItemsLoading,
    joinedItemsError,
  };
};
