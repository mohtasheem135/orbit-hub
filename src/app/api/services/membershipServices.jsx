import axiosInstance from "@/utils/axiosInstance";

export const fetchAllMembership = async (userId) => {
  const response = await axiosInstance.get(`/memberships/user/${userId}`);
  return response.data;
};