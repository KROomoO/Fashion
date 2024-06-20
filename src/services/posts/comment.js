import apiClient from "../apiClient";

export const saveComment = async ({
    parentCommentId,
    content,
    postId,
    memberId,
}) => {
    try {
        await apiClient.post("/api/comments", {
            parentCommentId: parentCommentId,
            content: content,
            postId: postId,
            memberId: memberId,
        });

        return true;
    } catch (error) {
        console.log("Error saveComment");

        return false;
    }
};

export const changeComment = async ({ commentId, content }) => {
    try {
        await apiClient.put("/api/comments", {
            commentId: commentId,
            content: content,
        });

        return true;
    } catch (error) {
        console.log("Error ChangeComment");

        return false;
    }
};

export const deleteComment = async ({ postId, commentId }) => {
    try {
        const config = {
            params: {
                post_id: postId,
                comment_id: commentId,
            },
        };
        await apiClient.delete("/api/comments", config);

        return true;
    } catch (error) {
        console.log("Error deleteComment");

        return false;
    }
};
