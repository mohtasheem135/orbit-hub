import { useState } from "react";
import { fetchAllSubItemComments } from "../../services/commentService";
import { handleApiErrors } from "@/utils/handleErrors";

export const getCommentsOfSubItems = () => {
  const [comments, setComments] = useState([]);
  const [isCommentsLoading, setCommentsIsLoading] = useState(true);
  const [commentError, setCommentsError] = useState(null);

  const getComments = async (subItemId) => {
    try {
      setCommentsIsLoading(true);
      const data = await fetchAllSubItemComments(subItemId);
      setComments(data);
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setCommentsError(errorMessage);
    } finally {
      setCommentsIsLoading(false);
    }
  };
  return { comments, getComments, isCommentsLoading, commentError };
};
