import { useEffect, useState } from "react";
import PostsCommentBox from "../../styles/components/posts/PostsCommentBox";
import PostsCommentHeaderBox from "../../styles/components/posts/PostsCommentHeaderBox";
import PostsProfileNickname from "../../styles/components/posts/view/PostsProfileNickname";
import Duration from "./Duration";
import PostsCommentContent from "../../styles/components/posts/PostsCommentContent";
import styled from "styled-components";
import { Stack, TextField } from "@mui/material";
import PostsButton from "../../styles/components/posts/PostsButton";
import {
    handleSubmitComment,
    handleEditComment,
    handleDeleteComment,
} from "../../utils/saveComment";
import { getJWTToken } from "../../utils/JWTToken";

const ReplyComment = styled.span`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 14.32px;
    text-align: left;
    color: #797979;
    cursor: pointer;
    &:hover {
        color: orange;
    }
`;

const PostsCommentBottomBox = styled.div`
    width: 100%;
    margin-bottom: 12px;
`;

const ChildPostsCommentBox = styled(PostsCommentBox)`
    padding-left: 50px;
`;

const CancelButton = styled(PostsButton)`
    width: 40px;
    border: 1px solid #222222 !important;
    color: #222222 !important;
    background-color: #ffffff !important;
`;

const SubmitButton = styled(PostsButton)`
    width: 40px;
    margin-left: 8px;
`;

const DeletedComment = styled.p`
    height: 40px;
    color: #cacaca;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    text-align: left;
`;

const EditComment = ({ content, postId, commentId, setIsOpenEditBox }) => {
    const [contentValue, setContentValue] = useState("");

    useEffect(() => {
        if (content !== "") {
            setContentValue(content);
        }
    }, [content]);

    return (
        <>
            <div style={{ width: "100%" }}>
                <Stack sx={{ width: "100%" }}>
                    <TextField
                        hiddenLabel
                        variant="outlined"
                        placeholder="댓글을 작성해주세요"
                        multiline
                        rows={3}
                        fullWidth
                        onChange={(e) => setContentValue(e.target.value)}
                        value={contentValue}
                    />
                </Stack>
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "16px",
                    marginBottom: "12px",
                }}
            >
                <CancelButton onClick={() => setIsOpenEditBox(false)}>
                    취소
                </CancelButton>
                <SubmitButton
                    onClick={() =>
                        handleEditComment({
                            commentId: commentId,
                            content: contentValue,
                        })
                    }
                >
                    수정
                </SubmitButton>
            </div>
        </>
    );
};

const ChildComment = ({ commentItem, postId, memberId }) => {
    const [isOpenEditBox, setIsOpenEditBox] = useState(false);
    return (
        <>
            <ChildPostsCommentBox>
                {isOpenEditBox ? (
                    <EditComment
                        content={commentItem.content}
                        postId={postId}
                        commentId={commentItem.commentId}
                        setIsOpenEditBox={setIsOpenEditBox}
                    ></EditComment>
                ) : (
                    <>
                        <PostsCommentHeaderBox>
                            <PostsProfileNickname>
                                {commentItem.creator}
                            </PostsProfileNickname>
                            <Duration date={commentItem.createdDate} />
                        </PostsCommentHeaderBox>
                        <PostsCommentContent>
                            {commentItem.content}
                        </PostsCommentContent>
                        <PostsCommentBottomBox
                            style={{ display: "flex", justifyContent: "end" }}
                        >
                            {memberId === commentItem.memberId ? (
                                <>
                                    <ReplyComment
                                        onClick={() => {
                                            setIsOpenEditBox(!isOpenEditBox);
                                        }}
                                    >
                                        수정
                                    </ReplyComment>
                                    <ReplyComment
                                        style={{ marginLeft: "12px" }}
                                        onClick={() =>
                                            handleDeleteComment({
                                                postId: postId,
                                                commentId:
                                                    commentItem.commentId,
                                            })
                                        }
                                    >
                                        삭제
                                    </ReplyComment>
                                </>
                            ) : null}
                        </PostsCommentBottomBox>
                    </>
                )}
            </ChildPostsCommentBox>
        </>
    );
};

const ParentComment = ({ commentItem, postId }) => {
    const [childCommentValue, setChildCommentValue] = useState("");
    const [isOpenReplyBox, setIsOpenReplyBox] = useState(false);
    const [isOpenEditBox, setIsOpenEditBox] = useState(false);
    const [memberId, setMemberId] = useState("");

    useEffect(() => {
        async function getMemberId() {
            const jwt = getJWTToken();
            if (!!jwt) {
                setMemberId(jwt.memberId);
            }
        }
        getMemberId();
    }, []);

    const handleOnclickReply = () => {
        if (memberId === "") {
            alert("로그인 후 이용해주세요.");
            window.location.href = "/login";
        } else {
            setIsOpenReplyBox(!isOpenReplyBox);
        }
    };

    return (
        <>
            <div
                style={{
                    width: "100%",
                    borderBottom: "1px solid #E7E8E9",
                    marginTop: "32px",
                }}
            >
                <PostsCommentBox>
                    {commentItem.deleteStatus === "Y" ? (
                        <DeletedComment>
                            작성자에 의해 댓글이 삭제되었습니다.
                        </DeletedComment>
                    ) : (
                        <>
                            {isOpenEditBox ? (
                                <EditComment
                                    content={commentItem.content}
                                    postId={postId}
                                    commentId={commentItem.commentId}
                                    setIsOpenEditBox={setIsOpenEditBox}
                                ></EditComment>
                            ) : (
                                <>
                                    <PostsCommentHeaderBox>
                                        <PostsProfileNickname>
                                            {commentItem.creator}
                                        </PostsProfileNickname>
                                        <Duration
                                            date={commentItem.createdDate}
                                        />
                                    </PostsCommentHeaderBox>
                                    <PostsCommentContent>
                                        {commentItem.content}
                                    </PostsCommentContent>
                                    <PostsCommentBottomBox
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <ReplyComment
                                            onClick={() => handleOnclickReply()}
                                        >
                                            답글
                                        </ReplyComment>
                                        <div>
                                            {memberId ===
                                            commentItem.memberId ? (
                                                <>
                                                    <ReplyComment
                                                        onClick={() => {
                                                            setIsOpenEditBox(
                                                                !isOpenEditBox
                                                            );
                                                            setIsOpenReplyBox(
                                                                false
                                                            );
                                                        }}
                                                    >
                                                        수정
                                                    </ReplyComment>
                                                    <ReplyComment
                                                        style={{
                                                            marginLeft: "12px",
                                                        }}
                                                        onClick={() =>
                                                            handleDeleteComment(
                                                                {
                                                                    postId: postId,
                                                                    commentId:
                                                                        commentItem.commentId,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        삭제
                                                    </ReplyComment>
                                                </>
                                            ) : null}
                                        </div>
                                    </PostsCommentBottomBox>
                                    {isOpenReplyBox ? (
                                        <>
                                            <Stack sx={{ width: "100%" }}>
                                                <TextField
                                                    hiddenLabel
                                                    variant="outlined"
                                                    placeholder="댓글을 작성해주세요"
                                                    multiline
                                                    rows={3}
                                                    fullWidth
                                                    onChange={(e) =>
                                                        setChildCommentValue(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={childCommentValue}
                                                />
                                            </Stack>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "end",
                                                    marginTop: "16px",
                                                    marginBottom: "12px",
                                                }}
                                            >
                                                <CancelButton
                                                    onClick={() =>
                                                        setIsOpenReplyBox(
                                                            !isOpenReplyBox
                                                        )
                                                    }
                                                >
                                                    취소
                                                </CancelButton>
                                                <SubmitButton
                                                    onClick={() =>
                                                        handleSubmitComment({
                                                            content:
                                                                childCommentValue,
                                                            postId: postId,
                                                            memberId: memberId,
                                                            parentCommentId:
                                                                commentItem.commentId,
                                                        })
                                                    }
                                                >
                                                    등록
                                                </SubmitButton>
                                            </div>
                                        </>
                                    ) : null}
                                </>
                            )}
                        </>
                    )}
                </PostsCommentBox>

                {!!commentItem.childComments ? (
                    <>
                        {commentItem.childComments.map((item, index) => {
                            return (
                                <ChildComment
                                    key={index}
                                    commentItem={item}
                                    parrentCommentId={commentItem.commentId}
                                    postId={postId}
                                    memberId={memberId}
                                ></ChildComment>
                            );
                        })}
                    </>
                ) : null}
            </div>
        </>
    );
};

const CommentList = ({ commentList, postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (commentList.length !== 0) {
            let formattedComments = [];

            for (let item of commentList) {
                if (!item.parentCommentId) {
                    formattedComments.push({
                        ...item,
                        childComments: commentList.filter(
                            (comment) =>
                                comment.parentCommentId === item.commentId
                        ),
                    });
                }
            }
            setComments(formattedComments);
        }
    }, [commentList]);

    return (
        <>
            {comments.length !== 0 ? (
                <>
                    {comments.map((item, index) => {
                        return (
                            <ParentComment
                                key={index}
                                commentItem={item}
                                postId={postId}
                            ></ParentComment>
                        );
                    })}
                </>
            ) : null}
        </>
    );
};

export default CommentList;
