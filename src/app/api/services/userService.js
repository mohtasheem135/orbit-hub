import axiosInstance from "@/utils/axiosInstance";

export const findUser = async ({ username, email, password }) => {
  const formData = new URLSearchParams();
  formData.append("userName", username);
  formData.append("email", email);
  formData.append("password", password);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/find`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    if (response.ok) {
      return await response.json(); // Return the parsed response
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage); // Throw an error for non-200 responses
    }
  } catch (error) {
    throw new Error(
      "An error occurred while finding the user: " + error.message
    );
  }
};

export const createUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/users/create", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserProfile = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}/profile`);
  return response.data;
};
