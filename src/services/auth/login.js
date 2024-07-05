import apiClient from "../apiClient";

import { setJWTToken } from "../../utils/JWTToken";

export const submitLogin = async (submitData) => {
    try {
        const response = await apiClient.post("/api/login", submitData);

        await setJWTToken(response.data.data);

        window.location.replace("/");
    } catch (error) {
        console.log("Error submitLogin response");
    }
};
