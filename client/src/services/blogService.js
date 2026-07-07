import axiosInstance from "../utils/axiosInstance";

export const getBlogs = (params) => axiosInstance.get("/blogs", { params });

export const getBlogById = (id) => axiosInstance.get(`/blogs/${id}`);

export const createBlog = (formData) =>
  axiosInstance.post("/blogs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateBlog = (id, formData) =>
  axiosInstance.put(`/blogs/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });

export const deleteBlog = (id) => axiosInstance.delete(`/blogs/${id}`);

export const likeBlog = (id) => axiosInstance.put(`/blogs/${id}/like`);

export const addComment = (id, text) =>
  axiosInstance.post(`/blogs/${id}/comment`, { text });

export const getMyBlogs = () => axiosInstance.get(`/blogs/my-blogs`);

export const getDashboard = () => axiosInstance.get(`/blogs/dashboard`);
