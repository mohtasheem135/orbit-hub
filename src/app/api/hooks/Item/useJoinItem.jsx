import { useState } from "react";
import { handleApiErrors } from "@/utils/handleErrors";
import { postJoinItem } from "../../services/itemService";

export const useJoinItem = () => {
  const [isJoining, setIsJoining] = useState(false);
  const [joiningError, setJoiningError] = useState(null);

  const joinItem = async (userId, itemKey) => {
    try {
        setIsJoining(true);
        setJoiningError(null);
      const response = await postJoinItem(userId, itemKey);
      return response;
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setJoiningError(errorMessage);
      throw err;
    } finally {
        setIsJoining(false);
    }
  };

  return { joinItem, isJoining, joiningError };
};
