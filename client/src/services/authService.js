import axiosInstance from "../utils/axiosInstance";

export const registerUser = (userData) =>
  axiosInstance.post("/auth/register", userData);

export const loginUser = (userData) =>
  axiosInstance.post("/auth/login", userData);
