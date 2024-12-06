// Get the subItems of an Item

import { useState } from "react";
import { fetchAllSubItemsOfItem } from "../../services/subItemService";
import { handleApiErrors } from "@/utils/handleErrors";

export const getAllSubItemsOfItem = () => {
  const [allSubItems, setAllSubItems] = useState([]);
  const [isAllSubItemLoading, setAllSubItemIsLoading] = useState(true);
  const [allSubItemError, setAllSubItemError] = useState(null);

  const getAllSubItems = async (itemId) => {
    try {
      setAllSubItemIsLoading(true);
      const data = await fetchAllSubItemsOfItem(itemId);
      setAllSubItems(data);
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setAllSubItemError(errorMessage);
    } finally {
      setAllSubItemIsLoading(false);
    }
  };
  return { allSubItems, getAllSubItems, isAllSubItemLoading, allSubItemError };
};
