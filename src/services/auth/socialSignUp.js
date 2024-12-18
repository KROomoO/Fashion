import apiClient from "../apiClient";

import { setJWTToken } from "../../utils/JWTToken";

export const sendGoogleAuthCode = async (code) => {
    try {
        const response = await apiClient.get("/api/oauth/google/login", {
            params: {
                code: code,
            },
        });
        if (response.data.data === undefined) {
            return response.data;
        } else {
            setJWTToken(response.data.data);
            return "onExists";
        }
    } catch (error) {
        console.log("Error sendGoogleAuthCode response");

        window.location.replace("/login");
    }
};

export const sendNaverAuthCode = async (code) => {
    try {
        const response = await apiClient.get("/api/oauth/naver/login", {
            params: {
                code: code,
            },
        });

        if (response.data.data === undefined) {
            return response.data;
        } else {
            setJWTToken(response.data.data);
            return "onExists";
        }
    } catch (error) {
        console.log("Error sendNaverAuthCode response");

        window.location.replace("/login");
    }
};

export const sendKakaoAuthCode = async (code) => {
    try {
        const response = await apiClient.get("/api/oauth/kakao/login", {
            params: {
                code: code,
            },
        });
        if (response.data.data === undefined) {
            return response.data;
        } else {
            setJWTToken(response.data.data);
            return "onExists";
        }
    } catch (error) {
        console.log("Error sendKakaoAuthCode response");

        window.location.replace("/login");
    }
};

export const signUpSocialUser = async (userInfo, social) => {
    try {
        const response = await apiClient.post(
            `/api/oauth/${social}/signup`,
            userInfo
        );
        await setJWTToken(response.data);
        window.location.replace("/");
    } catch (error) {
        console.log(`Error sendReturn${social}UserInfo response`);

        window.location.replace("/login");
    }
};
