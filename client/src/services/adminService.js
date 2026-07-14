import axiosInstance from "../utils/axiosInstance";

export const getDashboardStats = () => axiosInstance.get("/admin/dashboard");

export const getUsers = (page = 1, limit = 10, search = "") =>
  axiosInstance.get(`/admin/users?page=${page}&limit${limit}&search=${search}`);

export const updateUserRole = (id, role) => 
    axiosInstance.put(`/admin/users/${id}/role`)

export const deleteUser = (id) => 
    axiosInstance.delete(`/admin/user/${id}`)

export const getBlogs = (page=1, limit=10, search="") => 
    axiosInstance.get(`/admin/blogs?page=${page}&limit=${limit}&search=${search}`) 

export const deleteBlog = (id) => 
    axiosInstance.delete(`/admin/blogs/${id}`)