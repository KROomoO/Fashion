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
        console.log("Error searchUser response");
    }
};

export const updateEmail = async (email) => {
    try {
        if (
            window.confirm(`정말 변경하시겠습니까?\n변경 이메일 : ${email}`) ===
            true
        ) {
            const config = {
                params: {
                    member_id: jwtToken.memberId,
                },
            };
            await apiClient.put(
                "/api/members/emails",
                { email: email },
                config
            );

            window.location.replace(`/members/${jwtToken.memberId}`);
        } else {
            window.location.replace(`/members/${jwtToken.memberId}`);
        }
    } catch (error) {
        console.log("Error updateEmail response");
    }
};

export const updateNickname = async (nickname) => {
    try {
        if (
            window.confirm(
                `정말 변경하시겠습니까?\n변경 닉네임 : ${nickname}`
            ) === true
        ) {
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
        } else {
            window.location.replace(`/members/${jwtToken.memberId}`);
        }
    } catch (error) {
        console.log("Error updateNickname response");
    }
};

export const updatePassword = async (password) => {
    try {
        if (window.confirm("정말 변경하시겠습니까?") === true) {
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
        } else {
            window.location.replace(`/members/${jwtToken.memberId}`);
        }
    } catch (error) {
        console.log("Error updatePassword response");
    }
};

export const deleteUser = async (password) => {
    try {
        if (window.confirm("정말 삭제하시겠습니까?") === true) {
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
        } else {
            window.location.replace(`/members/${jwtToken.memberId}`);
        }
    } catch (error) {
        console.log("Error deleteUser response");
    }
};

export const deleteSocialUser = async () => {
    try {
        if (window.confirm("정말 삭제하시겠습니까?") === true) {
            const config = {
                params: {
                    member_id: jwtToken.memberId,
                },
            };
            await apiClient.delete("/api/social-members", config);
            localStorage.removeItem("jwt");
            window.location.replace("/");
        } else {
            window.location.replace(`/members/${jwtToken.memberId}`);
        }
    } catch (error) {
        console.log("Error deleteSocialUser response");
    }
};
