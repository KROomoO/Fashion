import Axios from "axios";

import { setJWTToken } from "../../utils/JWTToken";

export const sendGoogleAuthCode = async (code) => {
    try {
        const response = await Axios.get("/api/oauth/google/login", {
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
        // if (response.data.accessToken !== null) {
        //     setJWTToken(response.data.data);
        //     return "onExists";
        // } else {
        // return response.data;
        // }
    } catch (error) {
        console.log("Error sendGoogleAuthCode response");
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        window.location.replace("/login");
    }
};

export const sendNaverAuthCode = async (code) => {
    console.log(code);
    try {
        const response = await Axios.get("/api/oauth/naver/login", {
            params: {
                code: code,
            },
        });
        console.log(response.data);
        console.log(response.data.data);
        if (response.data.data === undefined) {
            return response.data;
        } else {
            setJWTToken(response.data.data);
            return "onExists";
        }
        // console.log("NaverCode", JSON.parse(response));
        // if (response.data.data.accessToken) {
        //     setJWTToken(response.data.data);
        //     return "onExists";
        // } else {
        // return response.data;
        // }
    } catch (error) {
        console.log("Error sendNaverAuthCode response");
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        window.location.replace("/login");
    }
};

export const sendKakaoAuthCode = async (code) => {
    try {
        const response = await Axios.get("/api/oauth/kakao/login", {
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
        // if (response.data.data.accessToken) {
        //     setJWTToken(response.data.data);
        //     return "onExists";
        // } else {
        // return response.data;
        // }
    } catch (error) {
        console.log("Error sendKakaoAuthCode response");
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        window.location.replace("/login");
    }
};

export const signUpSocialUser = async (userInfo, social) => {
    try {
        const response = await Axios.post(
            `/api/oauth/${social}/signup`,
            userInfo
        );
        console.log(response.data);
        await setJWTToken(response.data);
        window.location.replace("/");
    } catch (error) {
        console.log(`Error sendReturn${social}UserInfo response`);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        window.location.replace("/login");
    }
};
