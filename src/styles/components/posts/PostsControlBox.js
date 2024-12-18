import styled from "@emotion/styled";

const StyledPostsControlBox = styled.div`
    width: 1000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 36px auto 0px auto;
`;

export const PostsControlBox = (props) => {
    return (
        <StyledPostsControlBox className={props.className}>
            {props.children}
        </StyledPostsControlBox>
    );
};
