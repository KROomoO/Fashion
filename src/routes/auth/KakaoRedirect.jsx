import Axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const KakaoRedirect = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParmas = new URLSearchParams(location.search);

    const code = queryParmas.get("code");
    const state = queryParmas.get("state");

    useEffect(() => {
        const sendKakaoAuthData = async () => {
            try {
                const response = await Axios.post("/api/login/kakao", {
                    code: code,
                    state: state,
                });
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.log("Error sendKakaoAuthData response", error);
                throw error;
            }
        };
        sendKakaoAuthData();
    }, [code, state]);
};

export default KakaoRedirect;
