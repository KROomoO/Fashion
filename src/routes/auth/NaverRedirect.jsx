import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { sendNaverAuthCode } from "../../services/auth/socialSignUp";

const NaverRedirect = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParmas = new URLSearchParams(location.search);

    const code = queryParmas.get("code");

    useEffect(() => {
        async function SendNaverAuthCode() {
            const userInfo = await sendNaverAuthCode(code);
            if (userInfo === "onExists") {
                window.location.replace("/");
            } else {
                const sendUserInfo = {
                    memberId: userInfo.naverMemberId,
                    email: userInfo.email,
                };
                navigate("/members/addinfo", {
                    state: {
                        addInfo: sendUserInfo,
                        social: "naver",
                    },
                });
            }
        }
        SendNaverAuthCode();
    }, [code, navigate]);
    return null;
};

export default NaverRedirect;
