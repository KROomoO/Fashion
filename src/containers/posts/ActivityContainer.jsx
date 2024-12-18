import { useEffect, useState } from "react";
import { loadActivityPostsList } from "../../services/posts/posts";
import ListBox from "../../styles/components/posts/PostsListBox";
import PostContext from "../../context/PostContext";
import TabList from "./TabList";
import ListContainer from "./ListContainer";
import PageContext from "../../context/PageContext";
import PaginationContainer from "./PaginationContainer";
import { useParams } from "react-router-dom";
import ListBlank from "./ListBlank";

const ActivityContainer = () => {
    const [value, setValue] = useState("posts");
    const [page, setPage] = useState(1);
    const [listItem, setListItem] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        async function getActivityPostsList() {
            if (!!id) {
                const response = await loadActivityPostsList(
                    value,
                    id,
                    page - 1
                );
                setListItem(response);
                setIsLoading(true);
            } else {
                alert("잘못된 접근입니다. 로그인 후 이용해주세요");
                window.location.replace("/login");
            }
        }
        getActivityPostsList();
    }, [value, page, id]);

    return (
        <>
            {isLoading ? (
                <ListBox>
                    <PostContext.Provider value={{ value, setValue }}>
                        <TabList
                            menuItem={[
                                { id: "posts", name: "게시물" },
                                { id: "comments", name: "댓글" },
                                { id: "hearts", name: "좋아요" },
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

export default ActivityContainer;
