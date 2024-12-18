import styled from "styled-components";

const StyledBlank = styled.div`
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.48px;
    text-align: left;
    color: #222222;
    text-align: center;
    margin-top: 200px;
`;

const ListBlank = () => {
    return (
        <>
            <StyledBlank>
                검색된 게시물이 없습니다.
                <br /> 다른 카테고리를 살펴보시거나 새로운 게시물을
                기대해주세요!
            </StyledBlank>
        </>
    );
};

export default ListBlank;
