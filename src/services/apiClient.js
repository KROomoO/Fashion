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
         * webpack-dev-server 실행 후 테스트 진행해야 함 현재 react-scripts start로는 오류가 없었으나 webpack-dev-server, webpack 빌드 후 상황에 있어서는 테스트 필요한 부분이 있음(webpack-dev-server에서 오류가 없다면 webpack 빌드 파일 실행시 똑같이 오류가 없는지도 검색해봐야함)
         * 404페이지 생성 및 에러처리
         * 500페이지 생성 및 에러처리
         * 빌드 시 프록시 무조건 확인 후 빌드
         * 추가 오류에 관한 페이지 생성 및 에러처리 및 라우팅 처리 생각해봐야함
         */
        if (error.response) {
            const status = error.response.status;
            switch (status) {
                case 400:
                    if (
                        error.response.data.errorCode === "1001" ||
                        error.response.data.errorCode === "1003"
                    ) {
                        window.location.href = "/404";
                    } else {
                        alert(error.response.data.message);
                    }

                    break;
                case 401:
                    console.log(error.response.data);
                    alert(
                        "로그인 인증값이 유효하지 않습니다. 다시 로그인 후 이용해주세요."
                    );
                    localStorage.removeItem("jwt");
                    window.location.href = "/login";
                    break;
                case 404:
                    window.location.href = "/404";
                    break;
                case 500:
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
