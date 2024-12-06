import { useState } from "react";
import { fetchAllMembership } from "../../services/membershipServices";
import { handleApiErrors } from "@/utils/handleErrors";

export const getUserMembership = () => {
  const [memberships, setMemberships] = useState([]);
  const [membershipLoading, setMembershipLoading] = useState(true);
  const [membershipError, setMembershipError] = useState(null);

  const getMembershipList = async (userId) => {
    try {
      setMembershipLoading(true);
      const data = await fetchAllMembership(userId);
      setMemberships(data);
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setMembershipError(errorMessage);
    } finally {
      setMembershipLoading(false);
    }
  };
  return { memberships, getMembershipList, membershipLoading, membershipError };
};
