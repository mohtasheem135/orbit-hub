import axiosInstance from "@/utils/axiosInstance";

export const fetchAllSubItems = async (itemId, userId) => {
  const response = await axiosInstance.get(
    `/subitems/item/${itemId}/user/${userId}`
  );
  return response.data;
};

export const createSubitem = async (subItemData, userId, itemId) => {
  try {
    const response = await axiosInstance.post(
      `/subitems/create/${userId}/${itemId}`,
      subItemData
    );
    return response.data; // Return response data
  } catch (error) {
    throw error; // Let error be handled by custom hook
  }
};
