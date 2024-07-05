import { useEffect, useState } from "react";
import PostsForm from "./PostsForm";
import { loadPosts } from "../../services/posts/posts";
import { useLocation } from "react-router-dom";

const EditContainer = () => {
    const [postData, setPostData] = useState({
        category_id: 0,
        title: "",
        member_id: "",
        viewCount: 0,
        date: "",
        content: "",
        likeCount: 0,
        commentCount: 0,
        post_id: 0,
    });

    const location = useLocation();

    const queryParmas = new URLSearchParams(location.search);

    const postId = queryParmas.get("post_id");
    const categoryId = queryParmas.get("category_id");

    useEffect(() => {
        async function loadPostData() {
            const response = await loadPosts(postId, categoryId);
            setPostData((prevState) => {
                return {
                    ...prevState,
                    category_id: response.categoryId,
                    title: response.title,
                    member_id: response.memberId,
                    viewCount: response.hits,
                    date: response.createdDate,
                    content: response.content,
                    likeCount: response.likeCount,
                    commentCount: response.commentCount,
                    post_id: response.postId,
                };
            });
        }
        loadPostData();
    }, [postId, categoryId]);
    return (
        <>
            <PostsForm postData={postData}></PostsForm>
        </>
    );
};

export default EditContainer;
