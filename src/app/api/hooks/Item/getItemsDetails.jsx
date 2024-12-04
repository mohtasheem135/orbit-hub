import { useState } from "react";
import { fetchItemDetails } from "../../services/itemService";
import { handleApiErrors } from "@/utils/handleErrors";

export const getItemsDetails = () => {
  const [itemDetails, setItemDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDetails = async (uniqueNumber) => {
    try {
      setIsLoading(true);
      const data = await fetchItemDetails(uniqueNumber);
      setItemDetails(data);
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return { itemDetails, getDetails, isLoading, error };
};
