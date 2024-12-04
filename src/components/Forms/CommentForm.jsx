import { useState, useEffect } from "react";
import { useAddComment } from "@/app/api/hooks/Comment/useAddComment";
import { useToast } from "../hooks/use-toast";
import { Button } from "../ui/button";

const CommentForm = ({ userId, subItemId, existingComment = null }) => {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);

  const { toast } = useToast();
  const { addComment, isSubmitting, itemError } = useAddComment();


  // Populate the form with the existing comment if editing
  useEffect(() => {
    if (existingComment) {
      setCommentText(existingComment.commentText || "");
    }
  }, [existingComment]);

  // Handle form submission for adding or updating a comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {commentText: commentText}
    try {
      await addComment(data, userId, subItemId);
      toast({
        title: "Comment Added!",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } catch (err) {
      toast(itemError);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Comment Text */}
      <div>
        <label htmlFor="commentText" className="block font-semibold">
          Comment
        </label>
        <textarea
          name="commentText"
          id="commentText"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
          className="mt-1 block w-full border rounded p-2"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Saving..."
          : existingComment
          ? "Update Comment"
          : "Add Comment"}
      </Button>
    </form>
  );
};

export default CommentForm;
