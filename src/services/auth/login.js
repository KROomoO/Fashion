import apiClient from "../apiClient";

import { setJWTToken } from "../../utils/JWTToken";

export const submitLogin = async (submitData) => {
    try {
        const response = await apiClient.post("/api/login", submitData);
        await setJWTToken(response.data.data);
        window.location.replace("/");
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                return alert("아이디 혹은 비밀번호가 유효하지 않습니다.");
            }
        }
        throw error;
    }
};
