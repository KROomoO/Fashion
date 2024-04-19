import Axios from "axios";

import { setJWTToken } from "../../utils/JWTToken";

export const submitLogin = async (submitData) => {
    console.log(submitData);
    try {
        const response = await Axios.post("/api/login", submitData);
        console.log(response);
        setJWTToken(response.data.data);
        window.location.replace("/");
    } catch (error) {
        console.log("Error submitLogin");
        if (error.response) {
            console.log(error.response.data.message);
            console.log(error.response.status);
            if (error.response.status === 400) {
                return alert("아이디 혹은 비밀번호가 유효하지 않습니다.");
            }
        }
        throw error;
    }
};
