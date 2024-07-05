import {
    changeComment,
    deleteComment,
    saveComment,
} from "../services/posts/comment";

export const handleSubmitComment = async (data) => {
    if (!!data.memberId) {
        if (data.content === "") {
            alert("댓글을 입력해주세요");
        } else {
            await saveComment({
                content: data.content,
                postId: data.postId,
                memberId: data.memberId,
                parentCommentId: data.parentCommentId,
            });
        }
    } else {
        alert("로그인 후 이용해주세요.");
        window.location.href = "/login";
    }
};

export const handleEditComment = async (data) => {
    if (data.content === "") {
        alert("댓글을 입력해주세요");
    } else {
        await changeComment({
            commentId: data.commentId,
            content: data.content,
        });
    }
};

export const handleDeleteComment = async (data) => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
        await deleteComment({
            postId: data.postId,
            commentId: data.commentId,
        });
    } else {
        window.location.reload();
    }
};
