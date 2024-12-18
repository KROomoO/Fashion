import { Outlet, Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

const StyledSideBar = styled.div`
    width: 140px;
    position: absolute;
    margin-top: 60px;
    margin-right: 880px;
`;

const StyledMessage = styled.p`
    width: 124px;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    color: #333333;
    margin-bottom: 8px;
`;

const StyledCreateButton = styled.div`
    width: 140px;
    height: 32px;
    border-radius: 4px;
    padding: 13px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #333333;
    margin-bottom: 32px;
    cursor: pointer;
`;

const StyledCreateImg = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`;

const StyledCreateSpan = styled.span`
    width: 37px;
    height: 17px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff;
`;

const StyledMainMenu = styled.div`
    width: 100%;
    height: 32px;
    border-radius: 4px;
    padding: 2px 8px;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 700;
    line-height: 28px;
    text-align: left;
    color: #333333;
    margin-bottom: 16px;
`;

const StyledSubMenuBox = styled.div``;

const StyledSubMenu = styled.div`
    margin: 0px 21px 16px 20px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 700;
    line-height: 16.71px;
    text-align: left;
    color: #ababab;
    cursor: pointer;

    &.active {
        color: #222222;
    }
`;

const StyledMainContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const SideBar = () => {
    const [checkActive, setCheckActive] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [categories, setCategorise] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { categoryItem } = useOutletContext();

    const handleListItemClick = (item) => {
        setSelectedItem(Number(item.currentTarget.getAttribute("value")));
    };

    useEffect(() => {
        if (!!categories) setIsLoading(true);
    }, [categories]);

    useEffect(() => {
        if (!!categoryItem && categoryItem.length !== 0) {
            setCheckActive(categoryItem.map((item) => item.categoryId));
            setCategorise(categoryItem);
        }
    }, [categoryItem]);

    return (
        <>
            <StyledMainContainer>
                {isLoading ? (
                    <>
                        <StyledSideBar>
                            <StyledMessage>
                                다양한 패션글을 공유해보세요💬
                            </StyledMessage>
                            <Link to={"/posts/create"}>
                                <StyledCreateButton>
                                    <StyledCreateImg
                                        src={
                                            process.env.PUBLIC_URL +
                                            "/images/create.png"
                                        }
                                        alt="CreateButtonImg"
                                    />

                                    <StyledCreateSpan>글쓰기</StyledCreateSpan>
                                </StyledCreateButton>
                            </Link>
                            <div>
                                <StyledMainMenu
                                    style={{
                                        backgroundColor: checkActive.includes(
                                            selectedItem
                                        )
                                            ? "#f8f8f8"
                                            : null,
                                    }}
                                >
                                    커뮤니티
                                </StyledMainMenu>
                                <StyledSubMenuBox>
                                    {categories.map((item, index) => {
                                        return (
                                            <Link
                                                to={`/posts/list?category_id=${item.categoryId}`}
                                                key={index}
                                            >
                                                <StyledSubMenu
                                                    value={item.categoryId}
                                                    onClick={(e) =>
                                                        handleListItemClick(e)
                                                    }
                                                    className={
                                                        selectedItem ===
                                                        item.categoryId
                                                            ? "active"
                                                            : null
                                                    }
                                                >
                                                    {item.categoryName}
                                                </StyledSubMenu>
                                            </Link>
                                        );
                                    })}
                                </StyledSubMenuBox>
                                {/* <StyledMainMenu
                        style={{
                            backgroundColor: checkSelectItem.includes(
                                selectedItem
                            )
                                ? "#f8f8f8"
                                : null,
                        }}
                    >
                        공지사항
                    </StyledMainMenu> */}
                            </div>
                        </StyledSideBar>
                        <Outlet
                            context={{
                                tabsItem: [
                                    { categoryId: 0, categoryName: "전체글" },
                                    ...categories,
                                ],
                                categoryItem: categoryItem,
                            }}
                        />
                    </>
                ) : null}
            </StyledMainContainer>
        </>
    );
};

export default React.memo(SideBar);
