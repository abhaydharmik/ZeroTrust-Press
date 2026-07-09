import axiosInstance from "../utils/axiosInstance";

export const getProfile = () => axiosInstance.get("/users/profile");

export const updateProfile = (data) =>
  axiosInstance.put("/users/profile", data);

export const uploadAvatar = (formData) =>
  axiosInstance.post("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const changePassword = (data) =>
  axiosInstance.put("/users/change-password", data);
