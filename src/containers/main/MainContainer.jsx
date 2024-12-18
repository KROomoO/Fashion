import { useEffect, useState } from "react";
import PostContext from "../../context/PostContext";
import ListBox from "../../styles/components/posts/PostsListBox";
import TabList from "../posts/TabList";
import { loadMainPostsList } from "../../services/posts/posts";
import PaginationContainer from "../posts/PaginationContainer";
import PageContext from "../../context/PageContext";
import ListContainer from "../posts/ListContainer";

const MainContainer = () => {
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(1);
    const [listItem, setListItem] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getMainPostsList() {
            const response = await loadMainPostsList(
                page - 1,
                value === "trend" ? ["hits,desc", "commentCount,desc"] : ""
            );
            setListItem(response);
        }
        getMainPostsList();
    }, [value, page]);

    useEffect(() => {
        if (listItem.length !== 0) {
            setIsLoading(true);
        }
    }, [listItem]);

    return (
        <>
            {isLoading ? (
                <ListBox>
                    <PostContext.Provider value={{ value, setValue }}>
                        <TabList
                            menuItem={[
                                { id: 0, name: "전체글" },
                                { id: "trend", name: "인기글" },
                            ]}
                        ></TabList>
                    </PostContext.Provider>
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
                </ListBox>
            ) : (
                <h1>데이터없음</h1>
            )}
        </>
    );
};

export default MainContainer;
