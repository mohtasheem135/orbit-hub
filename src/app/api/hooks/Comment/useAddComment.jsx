import { useState } from "react";
import { handleApiErrors } from "@/utils/handleErrors";
import { createComment } from "../../services/commentService";

export const useAddComment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [itemError, setItemError] = useState(null);

  const addComment = async (commentData, userId, subItemId) => {
    try {
      setIsSubmitting(true);
      setItemError(null); // Reset previous errors
      const response = await createComment(commentData, userId, subItemId);
      return response; // Return response on success
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setItemError(errorMessage);
      throw err; // Re-throw error if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return { addComment, isSubmitting, itemError };
};
