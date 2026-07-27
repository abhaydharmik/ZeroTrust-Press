import axiosInstance from "../utils/axiosInstance"

export const toggleBookmark = async (blogId) => {
    return await axiosInstance.put(`/blogs/${blogId}/bookmark`)
}

export const getBookmarks = async () => {
    return axiosInstance.get(`/blogs/bookmarks`)
}