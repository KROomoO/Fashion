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

        window.location.reload();
    } catch (error) {
        console.log("Error saveComment resonse");
    }
};

export const changeComment = async ({ commentId, content }) => {
    try {
        await apiClient.put("/api/comments", {
            commentId: commentId,
            content: content,
        });

        window.location.reload();
    } catch (error) {
        console.log("Error changeComment response");
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

        window.location.reload();
    } catch (error) {
        console.log("Error deleteComment response");
    }
};
