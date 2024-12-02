// services/authService.js

import axiosInstance from "../../../utils/axiosInstance";

export const loginUser = async (formData) => {
  //   const response = await axiosInstance.post(
  //     "/users/find",
  //     formData.toString(),
  //     {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     }
  //   );
  const response = await fetch("http://localhost:8080/api/v1/users/find", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // x-www-form-urlencoded format
    },
    body: formData.toString(), // Convert formData to a query string
  });
  return response.data;
};

export const signup = async (data) => {
  const response = await axiosInstance.post("/users/create", data);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
