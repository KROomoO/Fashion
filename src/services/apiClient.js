import Axios from "axios";
import { getJWTToken, refreshJWTToken } from "../utils/JWTToken";

const jwtToken = await getJWTToken();

const configHeaders = {
    Authorization: "",
    "Authorization-refresh": "",
};

if (!!jwtToken) {
    configHeaders[
        "Authorization"
    ] = `${jwtToken.grantType} ${jwtToken.accessToken}`;
    configHeaders[
        "Authorization-refresh"
    ] = `${jwtToken.grantType} ${jwtToken.refreshToken}`;
}

const apiClient = Axios.create({
    headers: !!jwtToken ? configHeaders : {},
});

apiClient.interceptors.response.use(
    (response) => {
        if (!!jwtToken && !!response.headers.authorization) {
            refreshJWTToken(
                response.headers.authorization,
                response.headers["authorization-refresh"]
            );
        }
        return response;
    },
    (error) => {
        /**
         * TODO:
         * api 요청 apiClient 변경 및 테스트 마무리
         * 에러처리 마무리 (비밀번호 및 아이디 틀림, 아이디 중복, 닉네임 중복 등 생각하고 있었음)
         * 404페이지 생성 및 에러처리
         * 500페이지 생성 및 에러처리
         */
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    console.log("setAxiosInterceptors", status);
                    break;
                case 401:
                    console.log(error.response.data);
                    console.log("setAxiosInterceptors", status);
                    console.log(error.response.data.errorCode);
                    if (error.response.data.errorCode === "TOKEN_06") {
                        alert(
                            "로그인 유효기간이 만료되었습니다. 다시 로그인 후 이용해주세요."
                        );
                        localStorage.removeItem("jwt");
                        window.location.href = "/login";
                    } else {
                        alert(
                            "로그인 인증 값이 손상되었습니다. 다시 로그인 후 이용해주세요."
                        );
                        localStorage.removeItem("jwt");
                        window.location.href = "/login";
                    }
                    break;
                case 404:
                    console.log("setAxiosInterceptors", status);
                    window.location.href = "/404";
                    break;
                case 500:
                    console.log("setAxiosInterceptors", status);
                    console.log("500");
                    window.location.href = "/500";
                    break;
                default:
                    return;
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
