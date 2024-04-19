import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "tui-color-picker/dist/tui-color-picker.css";
import PostsDataBox from "../../styles/components/posts/view/PostsDataBox";
import PostsProfileImg from "../../styles/components/posts/view/PostsProfileImg";
import PostsProfileNickname from "../../styles/components/posts/view/PostsProfileNickname";
import Duration from "./Duration";
import PostsIcon from "../../styles/components/posts/view/PostsIcon";
import PostsCount from "../../styles/components/posts/view/PostsCount";
import React, { useEffect, useState } from "react";
import PostsCommentContent from "../../styles/components/posts/PostsCommentContent";

const StyleItemBox = styled.div`
    width: 610px;
    margin: 36px auto;
    border-bottom: 1px solid #e7e8e9;
`;

const StyleContentBox = styled.div`
    width: 610px;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`;

const StyleSpan = styled.span`
    width: 66px;
    height: 22px;
    border-radius: 2px;
    border: 1px solid #e7e8e9;
    padding: 4px 6px;
    background-color: #f1f1f1;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: center;
    color: #333333;
    margin-right: 8px;
`;

const StyleTitle = styled.div`
    width: 480px;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: #222222;
`;

const StyleItemImg = styled.img`
    width: 610px;
    height: 250px;
    border-radius: 4px;
    margin: 24px 0px;
`;

const ListContainer = ({ item }) => {
    const { categoryItem } = useOutletContext();
    const [categoryTextList, setCategoryTextList] = useState({});

    const categoryText = (categoryId) => {
        return categoryTextList[categoryId];
    };

    useEffect(() => {
        if (categoryItem.length !== 0) {
            const updatedCategoryText = {};
            categoryItem.forEach((item) => {
                updatedCategoryText[item.categoryId] = item.categoryName;
            });
            setCategoryTextList(updatedCategoryText);
        }
    }, [categoryItem]);

    return (
        <>
            <StyleItemBox>
                <Link
                    to={`/posts?post_id=${item.postId}&category_id=${item.categoryId}`}
                >
                    <StyleContentBox>
                        <StyleSpan>{categoryText(item.categoryId)}</StyleSpan>
                        <StyleTitle>{item.title}</StyleTitle>
                    </StyleContentBox>
                    {!!item.commentContent ? (
                        <PostsCommentContent>
                            {item.commentContent}
                        </PostsCommentContent>
                    ) : null}
                    <div style={{ minHeight: "80px" }}>
                        <Viewer
                            initialValue={item.content}
                            plugin={[colorSyntax]}
                        />
                    </div>
                    {!!item.image ? (
                        <StyleItemImg src={item.image} alt="ContentImg" />
                    ) : null}
                    <PostsDataBox style={{ marginBottom: "32px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {/* <PostsProfileImg
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/profile.png"
                                }
                                alt="ProfileImg"
                            /> */}
                            {!!item.creator ? (
                                <PostsProfileNickname>
                                    {item.creator}
                                </PostsProfileNickname>
                            ) : null}
                            <Duration date={item.createDateTime} />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <PostsIcon
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/visibility.png"
                                }
                                alt="ViewCount"
                                style={{ margin: 0, marginLeft: "12px" }}
                            />
                            <PostsCount>{item.hits}</PostsCount>
                            {/* <PostsIcon
                                src={
                                    process.env.PUBLIC_URL + "/images/heart.png"
                                }
                                alt="CountLike"
                                style={{ margin: 0, marginLeft: "12px" }}
                            />
                            <PostsCount>{item.likeCount}</PostsCount> */}
                            <PostsIcon
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/message.png"
                                }
                                alt="CountMessage"
                                style={{ margin: 0, marginLeft: "12px" }}
                            />
                            <PostsCount>{item.commentCount}</PostsCount>
                        </div>
                    </PostsDataBox>
                </Link>
            </StyleItemBox>
        </>
    );
};

export default React.memo(ListContainer);
