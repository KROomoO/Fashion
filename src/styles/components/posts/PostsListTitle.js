import styled from "styled-components";

const StyledListTitle = styled.p`
    width: 500px;
    height: 28px;
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 700;
    line-height: 28.64px;
    text-align: left;
    color: #222222;
    margin-bottom: 48px;
`;

const PostsListTitle = (props) => {
    return (
        <StyledListTitle className={props.className}>
            {props.children}
        </StyledListTitle>
    );
};

export default PostsListTitle;
