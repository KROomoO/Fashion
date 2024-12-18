import styled from "styled-components";
import React from "react";

const StyledMenu = styled.ul`
    background: #fff;
    border-radius: 8px;
    position: absolute;
    z-index: 1;
    top: 56px;
    right: -40px;
    width: 110px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    padding: 10px;
    &.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
`;

const Menu = React.forwardRef((props, ref) => {
    return (
        <StyledMenu className={props.className} ref={ref}>
            {props.children}
        </StyledMenu>
    );
});

export default Menu;
