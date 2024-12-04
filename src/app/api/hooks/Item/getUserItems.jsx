import { useState } from "react";
import { fetchAllItems } from "../../services/itemService";
import { handleApiErrors } from "@/utils/handleErrors";

export const getUserItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getItems = async (userId) => {
    try {
      setIsLoading(true);
      const data = await fetchAllItems(userId);
      setItems(data);
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return { items, getItems, isLoading, error };
};
