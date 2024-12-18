import apiClient from "../apiClient";

export const increaseHearts = async (data) => {
    if (!!data.memberId === false) {
        alert("로그인 후 이용해주시기 바랍니다.");
        window.location.href = "/login";
    } else {
        try {
            const config = {
                params: {
                    memberId: data.memberId,
                    postId: data.postId,
                },
            };
            await apiClient.post("/api/hearts", null, config);

            return true;
        } catch (error) {
            console.log("Error increaseHearts response");

            return false;
        }
    }
};

export const decreaseHearts = async (data) => {
    if (!!data.memberId === false) {
        alert("로그인 후 이용해주시기 바랍니다.");
        window.location.href = "/login";
    } else {
        try {
            const config = {
                params: {
                    memberId: data.memberId,
                    postId: data.postId,
                },
            };
            await apiClient.delete("/api/hearts", config);

            return true;
        } catch (error) {
            console.log("Error decreaseHearts response");

            return false;
        }
    }
};
