import apiClient from "../apiClient";

const jwtToken = JSON.parse(localStorage.getItem("jwt"));

const logoutUser = async () => {
    if (!jwtToken) {
        alert("잘못된 접근입니다. 로그인 후 이용해주세요");
        window.location.href = "/login";
    } else if (new Date().getTime() > jwtToken.accessTokenExpiresIn) {
        localStorage.removeItem("jwt");
        window.location.replace("/");
    } else {
        try {
            await apiClient.get("/api/logout");

            localStorage.removeItem("jwt");
            window.location.replace("/");
        } catch (error) {
            console.log("Error logoutUser response");
        }
    }
};

export default logoutUser;
