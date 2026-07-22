import axiosInstance from "../utils/axiosInstance"


export const getCategories = async () => {
    return await axiosInstance.get("/categories")
}

export const createCategory = async (data) => {
    return await axiosInstance.post("/categories", data)
}

export const updateCategory = async (id, data) => {
    return await axiosInstance.put(`/categories/${id}`, data)
}

export const deleteCategory = async (id) => {
    return await axiosInstance.delete(`/categories/${id}`)
}

export const getCategoryById = async (id) => {
    return await axiosInstance.get(`/categories/${id}`)
}

