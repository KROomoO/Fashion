import React from "react";
import styled from "styled-components";

const StyledSearchBar = styled.div`
    width: 600px;
    height: 100%;
    position: absolute;
    right: 110px;
    background-color: #ffffff;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transform: translateX(0px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    &.active {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
    }
`;

const SearchBar = React.forwardRef((props, ref) => {
    return (
        <StyledSearchBar className={props.className} ref={ref}>
            {props.children}
        </StyledSearchBar>
    );
});

export default SearchBar;
