import styled from "styled-components";

const StyledSelectBox = styled.select`
    margin: 0px;
    display: block;
    width: 100px;
    height: 32px;
    border-radius: 4px;
    padding: 8px;
    border: 0px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.71px;
    text-align: left;
    color: #797979;
`;

const SelectBox = (props) => {
    return (
        <StyledSelectBox
            className={props.className}
            onChange={props.onChange}
            style={props.style}
        >
            {props.children}
        </StyledSelectBox>
    );
};

export default SelectBox;
