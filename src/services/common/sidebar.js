import apiClient from "../apiClient";

export const searchCategories = async () => {
    try {
        const response = await apiClient.get("/api/categories");

        return response.data.categoryList;
    } catch (error) {
        console.log("Error searchCategories response");
    }
};
