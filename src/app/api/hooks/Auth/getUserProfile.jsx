import { useState } from "react";
import { fetchUserProfile } from "../../services/userService";
import { handleApiErrors } from "@/utils/handleErrors";

export const getUserProfile = () => {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfile = async (userId) => {
    try {
      setIsLoading(true);
      const data = await fetchUserProfile(userId);
      setProfile(data);
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return { profile, getProfile, isLoading, error };
};
