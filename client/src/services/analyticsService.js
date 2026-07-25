import axiosInstance from "../utils/axiosInstance"

export const getAnalytics = async () => {
    return await axiosInstance.get("/admin/analytics")
}