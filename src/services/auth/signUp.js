import apiClient from "../apiClient";
import { getJWTToken } from "../../utils/JWTToken";

const jwtToken = getJWTToken();

export const submitSignUp = async (submitData) => {
    try {
        if (!!jwtToken) {
            alert("잘못된 접근입니다.");
            window.location.href = "/";
        } else {
            await apiClient.post("/api/signup", submitData);
            window.location.replace("/");
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                return error.response.data.message;
            }
        }
        throw error;
    }
};

export const checkMemberId = async (memberId) => {
    try {
        const config = {
            params: {
                memberId: memberId,
            },
        };
        const response = await apiClient.get("/api/memberid/check", config);
        return response.data.status;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                return error.response.data.status;
            }
        }
        throw error;
    }
};

export const checkNickname = async (nickname) => {
    try {
        const config = {
            params: {
                nickname: nickname,
            },
        };
        const response = await apiClient.get("/api/nicknames/check", config);
        return response.data.status;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                return error.response.data.status;
            }
        }
        throw error;
    }
};
