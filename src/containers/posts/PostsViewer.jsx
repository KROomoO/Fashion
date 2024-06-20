import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "tui-color-picker/dist/tui-color-picker.css";

import { deletePosts, loadPosts } from "../../services/posts/posts";
import Duration from "./Duration";

import { Stack, TextField } from "@mui/material";

import styled from "styled-components";
import PostsViewerBox from "../../styles/components/posts/view/PostsViewerBox";
import PostsCategoryTag from "../../styles/components/posts/view/PostsCategoryTag";
import PostsTitle from "../../styles/components/posts/view/PostsTitle";
import PostsDataBox from "../../styles/components/posts/view/PostsDataBox";
import PostsProfileImg from "../../styles/components/posts/view/PostsProfileImg";
import PostsProfileNickname from "../../styles/components/posts/view/PostsProfileNickname";
import PostsIcon from "../../styles/components/posts/view/PostsIcon";
import PostsCount from "../../styles/components/posts/view/PostsCount";
import PostsText from "../../styles/components/posts/view/PostsText";
import PostsButton from "../../styles/components/posts/PostsButton";
import { increaseHearts, decreaseHearts } from "../../services/posts/hearts";
import { getJWTToken } from "../../utils/JWTToken";
import CommentList from "./CommentList";
import { handleSubmitComment } from "../../utils/saveComment";

const UpdateButton = styled(PostsButton)`
    width: 100px !important;
    border: 1px solid #222222 !important;
    color: #222222 !important;
    background-color: #ffffff !important;
`;

const Button = styled(PostsButton)`
    width: 100px !important;
    margin-left: 10px;
`;

const PostsCommentTitle = styled.p`
    height: 24px;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    text-align: left;
    color: "#222222";
    margin-bottom: 24px;
`;

const PostsViewer = () => {
    const [postValue, setPostValue] = useState({
        postId: 0,
        categoryId: 0,
        memberId: "",
        title: "",
        content: "",
        image: "",
        commentCount: 0,
        heartCount: 0,
        heartYn: "",
        hits: "",
        creator: "",
        createdDate: "",
        commentList: [],
    });

    const [activeHeart, setActiveHeart] = useState(false);
    const [memberId, setMemberId] = useState("");
    const [commentValue, setCommentValue] = useState("");

    const [categoryTextList, setCategoryTextList] = useState({});

    const { categoryItem } = useOutletContext();

    const navigate = useNavigate();

    const location = useLocation();

    const queryParmas = new URLSearchParams(location.search);

    const postId = queryParmas.get("post_id");
    const categoryId = queryParmas.get("category_id");

    useEffect(() => {
        async function loadPostData() {
            const jwt = await getJWTToken();

            const response = await loadPosts(
                postId,
                categoryId,
                !!jwt ? jwt.memberId : ""
            );

            setPostValue((prevState) => {
                return {
                    ...prevState,
                    postId: response.postId,
                    categoryId: response.categoryId,
                    memberId: response.memberId,
                    title: response.title,
                    content: response.content,
                    image: response.image,
                    commentCount: response.commentCount,
                    heartCount: response.heartCount,
                    heartYn: response.heartYn,
                    hits: response.hits,
                    creator: response.creator,
                    createdDate: response.createdDate,
                    commentList: response.commentList.commentList,
                };
            });

            if (!!jwt) {
                setMemberId(jwt.memberId);
            }
        }
        loadPostData();
    }, [postId, categoryId]);

    useEffect(() => {
        if (categoryItem.length !== 0) {
            const updatedCategoryText = {};
            categoryItem.forEach((item) => {
                updatedCategoryText[item.categoryId] = item.categoryName;
            });
            setCategoryTextList(updatedCategoryText);
        }
    }, [categoryItem]);

    useEffect(() => {
        if (postValue.heartYn === "Y") {
            setActiveHeart(true);
        }
    }, [postValue]);

    const categoryText = (categoryId) => {
        return categoryTextList[categoryId];
    };

    const handleOnClickUpdate = () => {
        navigate(
            `/posts/edit?post_id=${postValue.postId}&category_id=${postValue.categoryId}`
        );
    };

    const handleOnClickDelete = async () => {
        await deletePosts(postValue.postId);
    };

    const handleOnClickIncreaseHearts = async () => {
        const response = await increaseHearts({
            memberId: memberId,
            postId: postValue.postId,
        });
        if (response) {
            setActiveHeart(true);
            setPostValue((prevState) => {
                return {
                    ...prevState,
                    heartCount: postValue.heartCount + 1,
                };
            });
        }
    };

    const handleOnClickDecreaseHearts = async () => {
        const response = await decreaseHearts({
            memberId: memberId,
            postId: postValue.postId,
        });
        if (response) {
            setActiveHeart(false);
            setPostValue((prevState) => {
                return {
                    ...prevState,
                    heartCount: postValue.heartCount - 1,
                    heartYn: "N",
                };
            });
        }
    };

    return (
        <>
            <div style={{ width: "860px", margin: "36px auto" }}>
                <PostsViewerBox>
                    <PostsCategoryTag>
                        {categoryText(postValue.categoryId)}
                    </PostsCategoryTag>
                    <PostsTitle>{postValue.title}</PostsTitle>
                    <PostsDataBox>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <PostsProfileImg
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/profile.png"
                                }
                                alt="ProfileImg"
                            />
                            <PostsProfileNickname>
                                {postValue.creator}
                            </PostsProfileNickname>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <PostsIcon
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/visibility.png"
                                }
                                alt="ViewCount"
                            />
                            <PostsCount>{postValue.hits}</PostsCount>
                            <Duration date={postValue.createdDate} />
                        </div>
                    </PostsDataBox>
                    {postValue.content !== "" ? (
                        <div style={{ minHeight: "500px" }}>
                            <Viewer
                                initialValue={postValue.content}
                                plugin={[colorSyntax]}
                            />
                        </div>
                    ) : null}
                    <div style={{ display: "flex", marginBottom: "32px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                            onClick={
                                activeHeart
                                    ? handleOnClickDecreaseHearts
                                    : handleOnClickIncreaseHearts
                            }
                        >
                            {activeHeart ? (
                                <PostsIcon
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/active-heart.png"
                                    }
                                    alt="CountLike"
                                />
                            ) : (
                                <PostsIcon
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/heart.png"
                                    }
                                    alt="CountLike"
                                />
                            )}
                            <PostsText>좋아요</PostsText>
                            <PostsCount>{postValue.heartCount}</PostsCount>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: "16px",
                            }}
                        >
                            <PostsIcon
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/message.png"
                                }
                                alt="CountMessage"
                            />
                            <PostsText>댓글</PostsText>
                            <PostsCount>{postValue.commentCount}</PostsCount>
                        </div>
                    </div>
                </PostsViewerBox>
                {!!memberId ? (
                    memberId !== postValue.memberId ? null : (
                        <div
                            style={{
                                marginTop: "16px",
                                width: "100%",
                                display: "flex",
                                justifyContent: "right",
                            }}
                        >
                            <UpdateButton onClick={handleOnClickUpdate}>
                                수정하기
                            </UpdateButton>
                            <Button onClick={handleOnClickDelete}>
                                삭제하기
                            </Button>
                        </div>
                    )
                ) : null}
            </div>
            <div
                style={{
                    width: "860px",
                    margin: "0px auto",
                }}
            >
                <PostsCommentTitle>
                    댓글 {postValue.commentCount}
                </PostsCommentTitle>
                <Stack
                    sx={{
                        width: "100%",
                    }}
                >
                    <TextField
                        hiddenLabel
                        variant="outlined"
                        placeholder="댓글을 작성해주세요"
                        multiline
                        rows={4}
                        fullWidth
                        onChange={(e) => setCommentValue(e.target.value)}
                    />
                </Stack>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
                        marginTop: "16px",
                    }}
                >
                    <Button
                        onClick={() =>
                            handleSubmitComment({
                                content: commentValue,
                                postId: postId,
                                memberId: memberId,
                                parentCommentId: null,
                            })
                        }
                    >
                        댓글 등록
                    </Button>
                </div>
                <CommentList
                    commentList={postValue.commentList}
                    postId={postValue.postId}
                ></CommentList>
            </div>
        </>
    );
};

export default PostsViewer;
