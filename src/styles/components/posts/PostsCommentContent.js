import styled from "styled-components";

const StyledPostsCommentContent = styled.p`
    width: 100%;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    text-align: left;
    color: #333333;
    margin-bottom: 16px;
`;

const PostsCommentContent = (props) => {
    return (
        <StyledPostsCommentContent className={props.className}>
            {props.children}
        </StyledPostsCommentContent>
    );
};

export default PostsCommentContent;
