import { Pagination, Stack } from "@mui/material";
import { useContext } from "react";
import PageContext from "../../context/PageContext";

const PaginationContainer = ({ count }) => {
    const { page, setPage } = useContext(PageContext);

    const changePages = (event, page) => {
        setPage(page);
    };
    return (
        <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
            <Stack>
                <Pagination
                    boundaryCount={4}
                    count={count}
                    defaultPage={page}
                    page={page}
                    shape="rounded"
                    size="medium"
                    onChange={(event, page) => changePages(event, page)}
                />
            </Stack>
        </div>
    );
};

export default PaginationContainer;
