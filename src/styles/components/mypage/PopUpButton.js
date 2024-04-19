import styled from "styled-components";

const StyledPopUpButton = styled.button`
    width: 100px;
    height: 48px;
    border-radius: 4px;
    padding: 13px 16px;
    background-color: #222222;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    color: #ffffff;
    margin-left: 16px;
    cursor: pointer;
`;

export const PopUpButton = (props) => {
    return (
        <StyledPopUpButton
            className={props.className}
            type={props.type}
            style={props.style}
            onClick={props.onClick}
        >
            {props.children}
        </StyledPopUpButton>
    );
};
