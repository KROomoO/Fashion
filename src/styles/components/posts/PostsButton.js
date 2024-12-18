import styled from "@emotion/styled";

const StyledPostsButton = styled.button`
    width: 80px;
    height: 48px;
    color: #ffffff;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    background-color: #222222;
    border-radius: 4px;
    padding: 13px, 20px, 13px, 20px;
    cursor: pointer;
`;

const PostsButton = (props) => {
    return (
        <StyledPostsButton
            className={props.className}
            onClick={props.onClick}
            style={props.style}
            type={props.type}
        >
            {props.children}
        </StyledPostsButton>
    );
};

export default PostsButton;
