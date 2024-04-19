import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { getJWTToken } from "../../utils/JWTToken";
import logoutUser from "../../services/common/logout";
import useDetechClose from "../../hooks/useDetechClose";

import styled from "styled-components";

import Container from "../../styles/components/Header/Container";
import NavBox from "../../styles/components/Header/NavBox";
import Logo from "../../styles/components/Header/Logo";
import IconBox from "../../styles/components/Header/IconBox";
import Icon from "../../styles/components/Header/Icon";
import LoginButton from "../../styles/components/Header/LoginButton";
import Menu from "../../styles/components/Header/Menu";
import MenuItem from "../../styles/components/Header/MenuItem";
import { searchCategories } from "../../services/common/sidebar";
import SearchBar from "../../styles/components/Header/SearchBar";
import SelectBox from "../../styles/components/Header/SelectBox";

const SearchIcon = styled(Icon)`
    width: 40px;
    height: 32px;
    padding: 8px 12px;
    margin: 0px;
`;

const SearchInput = styled.input`
    width: 340px;
    height: 30px;
    padding: 4px;
    border: 0px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.71px;
    text-align: left;
    color: #333333;
    &::placeholder {
        color: #cacaca;
    }
`;

const searchTypeList = [
    { value: "title", text: "제목" },
    { value: "content", text: "내용" },
    { value: "creator", text: "작성자" },
];

const defaultSearchType = "title";

function Header() {
    const dropDownRef = useRef(null);
    const slideRef = useRef(null);
    const navigate = useNavigate();

    const [memberId, setMemberId] = useState("");
    const [isOpen, setIsOpen] = useDetechClose(dropDownRef, false);
    const [isOpenSearch, setIsOpenSearch] = useDetechClose(slideRef, false);
    const [categoryItem, setCategoryItem] = useState([]);
    const [selectCategory, setSelectCategory] = useState(0);
    const [selectSearchType, setSelectSearchType] = useState("");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const date = new Date();

        async function RememberMe() {
            const jwtToken = await getJWTToken();
            if (!!jwtToken) {
                if (date.getTime() > jwtToken.accessTokenExpiresIn) {
                    console.log("jwtAccessToken 기간 만료");
                    // localStorage.removeItem("jwt");
                } else {
                    setMemberId(jwtToken.memberId);
                    // 여기다가 service 폴더에서 구현한 자동로그인 로직 load
                    // const response = await Axios.get("/api/asdf", {
                    //     accessToken: jwt.accessToken,
                    //     refreshToken: jwt.refreshToken,
                    // });
                    // console.log(response);
                }
            }

            const response = await searchCategories();
            if (!!response)
                setCategoryItem([
                    { categoryId: 0, categoryName: "전체글" },
                    ...response,
                ]);
        }
        RememberMe();

        setSelectSearchType(defaultSearchType);
    }, []);

    useEffect(() => {
        console.log("header");
    }, []);

    useEffect(() => {
        if (categoryItem.length !== 0) {
            const defaultValue = categoryItem.find(
                (obj) => obj.categoryName === "전체글"
            )?.categoryId;

            setSelectCategory(defaultValue);
        }
    }, [categoryItem]);

    const handleChangeCategory = (e) => {
        if (e.target.value !== null) {
            setSelectCategory(Number(e.target.value));
        } else {
            setSelectCategory(e.target.value);
        }
    };

    const handleChangeSearchType = (e) => {
        setSelectSearchType(e.target.value);
    };

    const handleSearchEvent = () => {
        if (searchText === "") {
            alert("검색어를 입력해주세요");
        } else {
            navigate("/posts/search", {
                state: {
                    categoryId: selectCategory,
                    searchType: selectSearchType,
                    text: searchText,
                },
            });
        }
    };

    return (
        <>
            <Container>
                <NavBox>
                    <a href="/">
                        <Logo
                            src={process.env.PUBLIC_URL + "/images/logo.png"}
                            alt="Logo"
                        />
                    </a>
                    <IconBox>
                        <Icon
                            src={
                                process.env.PUBLIC_URL + "/images/magnifier.png"
                            }
                            alt="SearchBtn"
                            onClick={() => setIsOpenSearch(!isOpenSearch)}
                        />
                        <SearchBar
                            ref={slideRef}
                            className={isOpenSearch ? "active" : ""}
                        >
                            <div style={{ display: "flex" }}>
                                <SelectBox onChange={handleChangeCategory}>
                                    {categoryItem.length !== 0
                                        ? categoryItem.map((item, index) => {
                                              return (
                                                  <option
                                                      key={index}
                                                      value={item.categoryId}
                                                      defaultValue={
                                                          item.categoryId ===
                                                          null
                                                      }
                                                  >
                                                      {item.categoryName}
                                                  </option>
                                              );
                                          })
                                        : null}
                                </SelectBox>
                                <SelectBox
                                    onChange={handleChangeSearchType}
                                    style={{ width: "80px" }}
                                >
                                    {searchTypeList.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.value}
                                                defaultValue={
                                                    defaultSearchType ===
                                                    item.value
                                                }
                                            >
                                                {item.text}
                                            </option>
                                        );
                                    })}
                                </SelectBox>
                                <hr
                                    style={{
                                        margin: "6px 6px",
                                        width: "2px",
                                        backgroundColor: "#CACACA",
                                        border: "0px",
                                    }}
                                />
                            </div>
                            <SearchInput
                                placeholder="검색어를 입력해주세요"
                                defaultValue={searchText}
                                maxLength={38}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearchEvent();
                                    }
                                }}
                            />
                            <SearchIcon
                                src={
                                    process.env.PUBLIC_URL + "/images/Icon.png"
                                }
                                alt="SearchBarBtn"
                                onClick={() => handleSearchEvent()}
                            />
                        </SearchBar>
                        {memberId !== "" ? (
                            <>
                                <Icon
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/profile.png"
                                    }
                                    alt="ProfileImg"
                                    onClick={() => setIsOpen(!isOpen)}
                                />
                                <Menu
                                    ref={dropDownRef}
                                    className={isOpen ? "active" : ""}
                                >
                                    <Link to={`/members/activity/${memberId}`}>
                                        <MenuItem
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            내 활동
                                        </MenuItem>
                                    </Link>
                                    <Link to={`/members/${memberId}`}>
                                        <MenuItem
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            계정 설정
                                        </MenuItem>
                                    </Link>
                                    <MenuItem onClick={logoutUser}>
                                        로그아웃
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Link to={"/login"}>
                                <LoginButton>로그인</LoginButton>
                            </Link>
                        )}
                    </IconBox>
                </NavBox>
            </Container>
            <Outlet context={{ categoryItem: categoryItem }} />
        </>
    );
}

export default Header;
