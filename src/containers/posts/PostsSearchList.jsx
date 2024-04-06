import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { loadPostsSearchList } from "../../services/posts/posts";
import TabList from "./TabList";
import PostContext from "../../context/PostContext";
import ListBox from "../../styles/components/posts/PostsListBox";
import PostsListTitle from "../../styles/components/posts/PostsListTitle";
import styled from "styled-components";
import PageContext from "../../context/PageContext";
import PaginationContainer from "./PaginationContainer";
import ListContainer from "./ListContainer";
import ListBlank from "./ListBlank";

const PostsListTitleCategory = styled(PostsListTitle)`
    width: 110px;
    text-align: center;
`;

const PostsSearchList = () => {
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [listItem, setListItem] = useState([]);
    const [categoryTextList, setCategoryTextList] = useState({});
    const [page, setPage] = useState(1);

    const { categoryItem } = useOutletContext();

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const categoryId = queryParams.get("category_id");
    const searchType = queryParams.get("search_type");
    const text = queryParams.get("text");

    useEffect(() => {
        setValue(searchType);
    }, [searchType]);

    useEffect(() => {
        async function loadPostsSearchData() {
            const response = await loadPostsSearchList(
                categoryId === "0" ? null : categoryId,
                value,
                text,
                page - 1
            );
            setListItem(response);
            setIsLoading(true);
        }
        if (value !== "") {
            loadPostsSearchData();
        }
    }, [value, text, categoryId, page]);

    const categoryText = (categoryId) => {
        return categoryTextList[categoryId];
    };

    useEffect(() => {
        if (categoryItem.length !== 0) {
            const updatedCategoryText = {};
            categoryItem.forEach((item) => {
                updatedCategoryText[item.categoryId] = item.categoryName;
            });
            setCategoryTextList(updatedCategoryText);
        }
    }, [categoryItem]);

    return (
        <>
            {isLoading ? (
                <ListBox>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <PostsListTitle>
                            '{text}'에 대한 검색 결과
                        </PostsListTitle>
                        <PostsListTitleCategory>
                            {categoryText(categoryId)}
                        </PostsListTitleCategory>
                    </div>
                    <PostContext.Provider value={{ value, setValue }}>
                        <TabList
                            menuItem={[
                                { id: "title", name: "제목" },
                                { id: "content", name: "내용" },
                                { id: "creator", name: "작성자" },
                            ]}
                        ></TabList>
                    </PostContext.Provider>
                    {listItem.length === 0 ? (
                        <ListBlank></ListBlank>
                    ) : (
                        <>
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

export default PostsSearchList;
