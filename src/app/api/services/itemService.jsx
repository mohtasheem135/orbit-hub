import axiosInstance from "@/utils/axiosInstance";

export const fetchAllItems = async (userId) => {
  const response = await axiosInstance.get(`/items/user/${userId}`);
  return response.data;
};

export const fetchItemDetails = async (uniqueNumber) => {
  const response = await axiosInstance.get(`/items/${uniqueNumber}`);
  return response.data;
};

export const createItem = async (itemData, userId) => {
  try {
    const response = await axiosInstance.post(
      `/items/create/${userId}`,
      itemData
    );
    return response.data; // Return response data
  } catch (error) {
    throw error; // Let error be handled by custom hook
  }
};
