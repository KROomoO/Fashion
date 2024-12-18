import styled from "styled-components";

const StyledListBox = styled.div`
    width: 610px;
    margin: 60px auto 0px auto;
`;

const ListBox = (props) => {
    return (
        <StyledListBox className={props.className}>
            {props.children}
        </StyledListBox>
    );
};

export default ListBox;
