import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { sendKakaoAuthCode } from "../../services/auth/socialSignUp";

const KakaoRedirect = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParmas = new URLSearchParams(location.search);

    const code = queryParmas.get("code");

    useEffect(() => {
        async function SendKakaoAuthCode() {
            const userInfo = await sendKakaoAuthCode(code);

            if (userInfo === "onExists") {
                window.location.replace("/");
            } else {
                const sendUserInfo = {
                    memberId: userInfo.kakaoMemberId,
                    email: userInfo.email,
                };
                navigate("/members/addinfo", {
                    state: {
                        addInfo: sendUserInfo,
                        social: "kakao",
                    },
                });
            }
        }
        SendKakaoAuthCode();
    }, [code, navigate]);
    return null;
};

export default KakaoRedirect;
