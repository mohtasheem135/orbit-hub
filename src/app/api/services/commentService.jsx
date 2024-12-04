import axiosInstance from "@/utils/axiosInstance";

export const fetchAllSubItemComments = async (subItemId) => {
  const response = await axiosInstance.get(`/comments/${subItemId}`);
  return response.data;
};

export const createComment = async (subItemData, userId, subItemId) => {
  try {
    const response = await axiosInstance.post(
      `/comments/create/${userId}/${subItemId}`,
      subItemData
    );
    return response.data; // Return response data
  } catch (error) {
    throw error; // Let error be handled by custom hook
  }
};
