import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { loadCategoryPostsList } from "../../services/posts/posts";
import ListContainer from "./ListContainer";
import ListBox from "../../styles/components/posts/PostsListBox";
import PaginationContainer from "./PaginationContainer";
import PageContext from "../../context/PageContext";
import styled from "styled-components";
import ListBlank from "./ListBlank";

const StyledFilter = styled.span`
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 700;
    line-height: 16.71px;
    text-align: left;
    color: #cacaca;
    cursor: pointer;

    &.active {
        color: #333333;
    }
`;

const PostsCategoryList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = Number(queryParams.get("category_id"));
    const [sort, setSort] = useState("");
    const [listItem, setListItem] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadPostListData() {
            const response = await loadCategoryPostsList(
                categoryId === 0 ? null : categoryId,
                page - 1,
                sort
            );
            setListItem(response);
            setIsLoading(true);
        }
        loadPostListData();
    }, [categoryId, page, sort]);

    return (
        <>
            {isLoading ? (
                <ListBox>
                    {listItem.length === 0 ? (
                        <>
                            <ListBlank></ListBlank>
                        </>
                    ) : (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    height: "18px",
                                    alignItems: "center",
                                }}
                            >
                                <StyledFilter
                                    onClick={() => setSort("")}
                                    className={sort === "" ? "active" : ""}
                                >
                                    최신순
                                </StyledFilter>
                                <hr
                                    style={{
                                        margin: "6px 6px",
                                        width: "12px",
                                        height: "2px",
                                        backgroundColor: "#CACACA",
                                        border: "0px",
                                        transform: "rotate(90deg)",
                                    }}
                                />
                                <StyledFilter
                                    onClick={() =>
                                        setSort([
                                            "hits,desc",
                                            "commentCount,desc",
                                        ])
                                    }
                                    className={sort !== "" ? "active" : ""}
                                >
                                    인기순
                                </StyledFilter>
                            </div>
                            {listItem.map((item, index) => {
                                return (
                                    <ListContainer
                                        key={index}
                                        item={item}
                                    ></ListContainer>
                                );
                            })}
                            <PageContext.Provider value={{ page, setPage }}>
                                <PaginationContainer
                                    count={listItem[0].totalPages}
                                ></PaginationContainer>
                            </PageContext.Provider>
                        </>
                    )}
                </ListBox>
            ) : null}
        </>
    );
};

export default PostsCategoryList;
