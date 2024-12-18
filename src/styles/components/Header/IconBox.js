import styled from "styled-components";

const StyledIconBox = styled.div`
    width: 680px;
    height: 32px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: right;
`;

const IconBox = (props) => {
    return (
        <StyledIconBox className={props.className}>
            {props.children}
        </StyledIconBox>
    );
};

export default IconBox;
