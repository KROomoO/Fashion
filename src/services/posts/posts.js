import Axios from "axios";
import qs from "qs";
import apiClient from "../apiClient";

const jwtToken = JSON.parse(localStorage.getItem("jwt"));

export const savePosts = async (submitData) => {
    try {
        const sendPostData = {
            ...submitData,
            memberId: jwtToken.memberId,
        };

        const response = await apiClient.post("/api/posts", sendPostData);

        window.location.href = `/posts?post_id=${response.data.postId}&category_id=${response.data.categoryId}`;
        return response;
    } catch (error) {
        console.log("Error savePosts response");
    }
};

export const loadPosts = async (
    post_id,
    category_id,
    request_member_id = ""
) => {
    try {
        const config = {
            params: {
                post_id: post_id,
                category_id: category_id,
                request_member_id:
                    request_member_id !== "" ? request_member_id : null,
            },
        };

        const response = await apiClient.get("/api/posts", config);

        return response.data;
    } catch (error) {
        console.log("Error loadPosts response");
    }
};

export const loadMainPostsList = async (page, sort = "") => {
    try {
        const config = {
            params: {
                page: page,
                sort: sort,
            },
            paramsSerializer: (params) => {
                const serializedParams = qs.stringify(params, {
                    arrayFormat: "repeat",
                });
                return serializedParams;
            },
        };

        const response = await apiClient.get("/api/boards", config);

        return response.data.getBoardListList;
    } catch (error) {
        console.log("Error loadMainPostsList response");
        return [];
    }
};

export const loadCategoryPostsList = async (category_id, page, sort = "") => {
    try {
        const config = {
            params: {
                category_id: category_id,
                page: page,
                sort: sort,
            },
            paramsSerializer: (params) => {
                const serializedParams = qs.stringify(params, {
                    arrayFormat: "repeat",
                });
                return serializedParams;
            },
        };
        const response = await apiClient.get("/api/boards", config);

        return response.data.getBoardListList;
    } catch (error) {
        console.log("Error loadCategoryPostsList response");
    }
};

export const loadPostsSearchList = async (
    categoryId,
    searchType,
    text,
    page
) => {
    try {
        const config = {
            params: {
                category_id: categoryId === 0 ? null : categoryId,
                search_condition: searchType,
                text: text,
                page: page,
            },
        };
        const response = await apiClient.get("/api/boards", config);

        return response.data.getBoardListList;
    } catch (error) {
        console.log("Error loadPostsSearchList response");
    }
};

export const loadActivityPostsList = async (value, memberId, page) => {
    try {
        const config = {
            params: {
                member_id: memberId,
                page: page,
            },
        };
        const response = await apiClient.get(
            `/api/members/my/${value}`,
            config
        );
        switch (value) {
            case "posts": {
                return response.data.postList;
            }
            case "comments": {
                return response.data.commentsPostList;
            }
            case "hearts": {
                return response.data.heartPostList;
            }
            default: {
                return response.data.postList;
            }
        }
    } catch (error) {
        console.log("Error loadActivityPostsList response");
    }
};

export const updatePosts = async (updateData) => {
    try {
        const config = {
            params: {
                post_id: updateData.post_id,
            },
        };
        await apiClient.put("/api/posts", updateData, config);

        window.location.href = `/posts?post_id=${updateData.post_id}&category_id=${updateData.categoryId}`;
    } catch (error) {
        console.log("Error updatePosts response");
    }
};

export const deletePosts = async (post_id) => {
    try {
        if (window.confirm("정말 삭제하시겠습니까?") === true) {
            const config = {
                params: {
                    post_id: post_id,
                },
            };
            await apiClient.delete("/api/posts", config);

            window.location.replace("/");
        } else {
            window.location.reload();
        }
    } catch (error) {
        console.log("Error deletePosts response");
    }
};

export const getImageURI = async (formData) => {
    // headers의 경우 일단 없이 진행하고 만일 content-type 에러 발생 시 주석 해제
    try {
        const response = await Axios.post("/api/image", formData, {
            headers: {
                Authorization: `Bearer ${jwtToken.accessToken}`,
                "Authorization-refresh": `Bearer ${jwtToken.refreshToken}`,
                // "Content-Type": "multipart/form-data",
            },
        });

        console.log(response);
    } catch (error) {
        console.log("Error getImageURI");
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }
};
