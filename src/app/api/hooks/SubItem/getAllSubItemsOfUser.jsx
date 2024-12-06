// Get the subItems of an Item added by a user

import { useState } from "react";
import { fetchAllSubItems } from "../../services/subItemService";
import { handleApiErrors } from "@/utils/handleErrors";

export const getAllSubItemsOfUser = () => {
  const [subItems, setSubItems] = useState([]);
  const [isSubItemLoading, setSubItemIsLoading] = useState(true);
  const [subItemError, setSubItemError] = useState(null);

  const getSubItems = async (itemId, userId) => {
    try {
      setSubItemIsLoading(true);
      const data = await fetchAllSubItems(itemId, userId);
      setSubItems(data);
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setSubItemError(errorMessage);
    } finally {
      setSubItemIsLoading(false);
    }
  };
  return { subItems, getSubItems, isSubItemLoading, subItemError };
};
