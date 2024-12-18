import styled from "styled-components";

const StyledPostsCommentHeaderBox = styled.p`
    width: 100%;
    margin-bottom: 12px;
`;

const PostsCommentHeaderBox = (props) => {
    return (
        <StyledPostsCommentHeaderBox className={props.className}>
            {props.children}
        </StyledPostsCommentHeaderBox>
    );
};

export default PostsCommentHeaderBox;
