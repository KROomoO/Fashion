import { Box, Tabs, Tab } from "@mui/material";
import { useContext } from "react";
import PostContext from "../../context/PostContext";

const TabList = ({ menuItem }) => {
    const { value, setValue } = useContext(PostContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <>
                <Box
                    sx={{
                        width: "100%",
                        color: "#222222",
                        marginBottom: "32px",
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                        TabIndicatorProps={{
                            style: {
                                background: "black",
                                color: "#222222",
                            },
                        }}
                        textColor="inherit"
                    >
                        {menuItem.map((item, index) => {
                            return (
                                <Tab
                                    sx={{
                                        color: "#222222",
                                        fontFamily: "Pretendard",
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        lineHeight: "19px",
                                        textAlign: "left",
                                        width: `calc(100% / ${menuItem.length})`,
                                    }}
                                    key={index}
                                    label={item.name}
                                    value={item.id}
                                ></Tab>
                            );
                        })}
                    </Tabs>
                </Box>
            </>
        </>
    );
};

export default TabList;
