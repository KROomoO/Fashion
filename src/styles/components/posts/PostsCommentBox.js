import styled from "styled-components";

const StyledPostsCommentBox = styled.div`
    width: 860px;
    margin-bottom: 32px;
`;

const PostsCommentBox = (props) => {
    return (
        <StyledPostsCommentBox
            className={props.className}
            style={props.style}
            onClick={props.onClick}
        >
            {props.children}
        </StyledPostsCommentBox>
    );
};

export default PostsCommentBox;
