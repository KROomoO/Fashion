import apiClient from "../apiClient";

const jwtToken = JSON.parse(localStorage.getItem("jwt"));

export const searchUser = async (memberId) => {
    try {
        const config = {
            params: {
                member_id: memberId,
            },
        };
        const response = await apiClient.get("/api/members", config);

        return response.data.data;
    } catch (error) {
        console.log("Error searchUser data");
    }
};

export const updateEmail = async (email) => {
    try {
        const config = {
            params: {
                member_id: jwtToken.memberId,
            },
        };
        await apiClient.put("/api/members/emails", { email: email }, config);

        window.location.replace(`/members/${jwtToken.memberId}`);
    } catch (error) {
        console.log("Error updateEmail");
    }
};

export const updateNickname = async (nickname) => {
    try {
        console.log(nickname);
        const config = {
            params: {
                member_id: jwtToken.memberId,
            },
        };
        await apiClient.put(
            "/api/members/nicknames",
            { nickname: nickname },
            config
        );

        window.location.replace(`/members/${jwtToken.memberId}`);
    } catch (error) {
        console.log("Error updateNickname");
    }
};

export const updatePassword = async (password) => {
    try {
        const config = {
            params: {
                member_id: jwtToken.memberId,
            },
        };
        await apiClient.put(
            "/api/members/passwords",
            {
                asIsPassword: password.asIsPassword,
                toBePassword: password.toBePassword,
                confirmToBePassword: password.confirmToBePassword,
            },
            config
        );

        window.location.replace(`/members/${jwtToken.memberId}`);
    } catch (error) {
        console.log("Error updatePassword");
    }
};

export const deleteUser = async (password) => {
    try {
        const config = {
            params: {
                member_id: jwtToken.memberId,
            },
            data: {
                password: password,
            },
        };
        await apiClient.delete("/api/members", config);
        localStorage.removeItem("jwt");
        window.location.replace("/");
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                alert("비밀번호가 일치하지 않습니다.");
            }
        }
        console.log("Error DeletePassword");
    }
};

export const deleteSocialUser = async () => {
    try {
        const config = {
            params: {
                member_id: jwtToken.memberId,
            },
        };
        await apiClient.delete("/api/social-members", config);
        localStorage.removeItem("jwt");
        window.location.replace("/");
    } catch (error) {
        console.log("Error DeletePassword");
    }
};
