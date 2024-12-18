import styled from "styled-components";

const StyledIcon = styled.img`
    width: 32px;
    height: 32px;
    margin-left: 80px;
    cursor: pointer;
`;

const Icon = (props) => {
    return (
        <StyledIcon
            className={props.className}
            src={props.src}
            alt={props.alt}
            onClick={props.onClick}
        >
            {props.children}
        </StyledIcon>
    );
};

export default Icon;
