import styled from "styled-components";

const StyledLoginButton = styled.button`
    width: 80px;
    height: 32px;
    border-radius: 4px;
    color: #222222;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    background-color: #ffffff;
    padding: 13px, 20px, 13px, 20px;
    border: none;
    margin-left: 33px;
    cursor: pointer;
    &:hover {
        background-color: #f8f8f8;
    }
`;

const LoginButton = (props) => {
    return (
        <StyledLoginButton className={props.className} onClick={props.onClick}>
            {props.children}
        </StyledLoginButton>
    );
};

export default LoginButton;
