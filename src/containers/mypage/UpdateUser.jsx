import { useEffect, useState } from "react";
import styled from "styled-components";

import { ProfileBox as UpdateProfileBox } from "../../styles/components/mypage/ProfileBox";
import { ProfileImg as UpdateProfileImg } from "../../styles/components/mypage/ProfileImg";
import { ProfileEditBtn as UpdateProfileEditBtn } from "../../styles/components/mypage/ProfileEditBtn";
import { ProfileUpdateBox as UpdateUserBox } from "../../styles/components/mypage/ProfileUpdateBox";
import { ProfileSpan as UpdateUserSpan } from "../../styles/components/mypage/ProfileSpan";
import { ProfileDiv as UpdateUserDiv } from "../../styles/components/mypage/ProfileDiv";
import { ProfileHr as UpdateUserHr } from "../../styles/components/mypage/ProfileHr";
import { ProfileBlur as UpdateProfileBlur } from "../../styles/components/mypage/Blur";
import { PopUpBox } from "../../styles/components/mypage/PopUpBox";
import { PopUpTitle } from "../../styles/components/mypage/PopUpTitle";
import { PopUpSubTitle } from "../../styles/components/mypage/PopUpSubTitle";
import { PopUpInput } from "../../styles/components/mypage/PopUpInput";
import { PopUpButtonBox } from "../../styles/components/mypage/PopUpButtonBox";
import { PopUpButton } from "../../styles/components/mypage/PopUpButton";
import { PopUpHint } from "../../styles/components/mypage/PopUpHint";
import { checkNickname } from "../../services/auth/signUp";
import { ErrorMessage } from "../../styles/components/auth/ErrorMessage";
import { SuccessMessage } from "../../styles/components/auth/SuccessMessage";

import validationPatterns from "../../utils/validationPatterns";
import {
    deleteSocialUser,
    deleteUser,
    searchUser,
    updateEmail,
    updateNickname,
    updatePassword,
} from "../../services/mypage/update";
import { useParams } from "react-router-dom";

const UpdateProfileEditImg = styled.img`
    width: 17.25px;
    height: 18px;
    padding: 2.25px, 2.16px, 2.25px, 2.16px;
`;

const ArrorwRight = styled.img`
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
`;

const PopUpCancelButton = styled(PopUpButton)`
    background-color: #ffffff;
    color: #222222;
`;

const NicknameInput = styled(PopUpInput)`
    width: 290px;
    margin-right: 0px;
`;

const NicknameCheckButton = styled(PopUpButton)`
    margin-left: 8px;
`;

const PopUpErrorMessage = styled(ErrorMessage)`
    margin-left: 24px;
`;

const PopUpSuccessMessage = styled(SuccessMessage)`
    margin-left: 24px;
`;

const PopUpItem = ({ item, socialType, onHandleClosePopUp }) => {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [duplicateNickname, setDuplicateNickname] = useState("");
    const [password, setPassword] = useState({
        asIsPassword: "",
        toBePassword: "",
        confirmToBePassword: "",
    });
    const [deletePassword, setDeletePassword] = useState("");
    const [onFocusInput, setOnFocusInput] = useState("");

    const handleUpdateEmail = () => {
        updateEmail(email);
    };

    const handleUpdateNickname = () => {
        if (validationPatterns.nicknameRegex.test(nickname) !== true) {
            alert("닉네임 형식을 확인해주세요");
        } else if (duplicateNickname !== "SUCCESS") {
            alert("닉네임 중복 확인을 진행해주세요");
        } else {
            console.log("api");
            updateNickname(nickname);
        }
    };

    const handleCheckNickname = async () => {
        const response = await checkNickname(nickname);
        setDuplicateNickname(response);
    };

    const handleChangeCurrentPassword = (event) => {
        setPassword((prevState) => {
            return { ...prevState, asIsPassword: event.target.value };
        });
    };

    const handleChangeNewPassword = (event) => {
        setPassword((prevState) => {
            return { ...prevState, toBePassword: event.target.value };
        });
    };

    const handleChangeNewPasswordConfirm = (event) => {
        setPassword((prevState) => {
            return {
                ...prevState,
                confirmToBePassword: event.target.value,
            };
        });
    };

    const handleChangePassword = () => {
        if (
            validationPatterns.passwordRegex.test(password.asIsPassword) !==
            true
        ) {
            alert("비밀번호 형식을 확인해주세요");
        } else if (
            validationPatterns.passwordRegex.test(password.toBePassword) !==
            true
        ) {
            alert("비밀번호 형식을 확인해주세요");
        } else if (password.toBePassword !== password.confirmToBePassword) {
            alert("새로운 비밀번호가 일치하지 않습니다");
        } else {
            updatePassword(password);
        }
    };

    const handleDeleteUser = () => {
        if (!socialType) {
            if (
                validationPatterns.passwordRegex.test(deletePassword) !== true
            ) {
                alert("비밀번호를 확인해주세요");
            } else {
                deleteUser(deletePassword);
            }
        } else {
            deleteSocialUser();
        }
    };

    const PopUp = {
        email: (
            <>
                <PopUpTitle>이메일 변경</PopUpTitle>
                <PopUpSubTitle>이메일</PopUpSubTitle>
                <PopUpInput
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <PopUpButtonBox>
                    <PopUpCancelButton
                        onClick={() => onHandleClosePopUp("none")}
                    >
                        취소
                    </PopUpCancelButton>
                    <PopUpButton onClick={handleUpdateEmail}>저장</PopUpButton>
                </PopUpButtonBox>
            </>
        ),
        password: (
            <>
                <PopUpTitle>비밀번호 변경</PopUpTitle>
                <PopUpSubTitle>현재 비밀번호</PopUpSubTitle>
                <PopUpInput
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    onChange={(e) => handleChangeCurrentPassword(e)}
                    onFocus={(e) => setOnFocusInput(e.target.name)}
                    value={password.asIsPassword}
                />
                {onFocusInput === "password" &&
                validationPatterns.passwordRegex.test(password.asIsPassword) !==
                    true ? (
                    <PopUpErrorMessage>
                        올바르지 않은 비밀번호 형식입니다.
                    </PopUpErrorMessage>
                ) : null}
                <PopUpSubTitle>새로운 비밀번호</PopUpSubTitle>
                <PopUpInput
                    type="password"
                    name="newPassword"
                    placeholder="새로운 비밀번호를 입력해주세요"
                    onChange={(e) => handleChangeNewPassword(e)}
                    onFocus={(e) => setOnFocusInput(e.target.name)}
                    value={password.toBePassword}
                />
                {onFocusInput === "newPassword" &&
                validationPatterns.passwordRegex.test(password.toBePassword) !==
                    true ? (
                    <PopUpErrorMessage>
                        올바르지 않은 비밀번호 형식입니다.
                    </PopUpErrorMessage>
                ) : null}
                <PopUpInput
                    type="password"
                    name="confirmNewPassword"
                    placeholder="새로운 비밀번호를 다시 입력해주세요"
                    onChange={(e) => handleChangeNewPasswordConfirm(e)}
                    onFocus={(e) => setOnFocusInput(e.target.name)}
                    value={password.confirmToBePassword}
                />
                {onFocusInput === "confirmNewPassword" &&
                password.toBePassword !== password.confirmToBePassword ? (
                    <PopUpErrorMessage>
                        비밀번호가 일치하지 않습니다.
                    </PopUpErrorMessage>
                ) : null}
                <PopUpHint>
                    영문 대소문자, 특수문자, 숫자 중 3가지 이상으로 조합하여
                    8~20자로 입력해주세요.
                </PopUpHint>
                <PopUpButtonBox>
                    <PopUpCancelButton
                        onClick={() => onHandleClosePopUp("none")}
                    >
                        취소
                    </PopUpCancelButton>
                    <PopUpButton onClick={handleChangePassword}>
                        저장
                    </PopUpButton>
                </PopUpButtonBox>
            </>
        ),
        nickname: (
            <>
                <PopUpTitle>닉네임 변경</PopUpTitle>
                <PopUpSubTitle>닉네임</PopUpSubTitle>
                <NicknameInput
                    type="text"
                    name="nickname"
                    placeholder="닉네임을 입력해주세요"
                    onChange={(e) => setNickname(e.target.value)}
                    value={nickname}
                    onFocus={(e) => setOnFocusInput(e.target.name)}
                />
                <NicknameCheckButton
                    type="button"
                    onClick={handleCheckNickname}
                >
                    중복 확인
                </NicknameCheckButton>
                {onFocusInput === "nickname" &&
                validationPatterns.nicknameRegex.test(nickname) !== true ? (
                    <PopUpErrorMessage>
                        올바르지 않은 닉네임 형식입니다.
                    </PopUpErrorMessage>
                ) : duplicateNickname !== "" ? (
                    duplicateNickname !== "SUCCESS" ? (
                        <PopUpErrorMessage>
                            이미 사용중인 닉네임입니다.
                        </PopUpErrorMessage>
                    ) : (
                        <PopUpSuccessMessage>
                            사용 가능한 닉네임입니다.
                        </PopUpSuccessMessage>
                    )
                ) : null}
                <PopUpHint>
                    영문 대소문자, 숫자, 한글을 조합하여 2~16자로 입력해주세요.
                </PopUpHint>
                <PopUpButtonBox>
                    <PopUpCancelButton
                        onClick={() => onHandleClosePopUp("none")}
                    >
                        취소
                    </PopUpCancelButton>
                    <PopUpButton onClick={handleUpdateNickname}>
                        저장
                    </PopUpButton>
                </PopUpButtonBox>
            </>
        ),
        delete: (
            <>
                <PopUpTitle>회원 탈퇴</PopUpTitle>
                {socialType ? null : (
                    <>
                        <PopUpSubTitle>비밀번호</PopUpSubTitle>
                        <PopUpInput
                            type="password"
                            name="deletePassword"
                            placeholder="회원 탈퇴를 위해 다시 한 번 인증해주세요"
                            onChange={(e) => setDeletePassword(e.target.value)}
                            value={deletePassword}
                            onFocus={(e) => setOnFocusInput(e.target.name)}
                        />
                        {onFocusInput === "deletePassword" &&
                        validationPatterns.passwordRegex.test(
                            deletePassword
                        ) !== true ? (
                            <PopUpErrorMessage>
                                올바르지 않은 비밀번호 형식입니다.
                            </PopUpErrorMessage>
                        ) : null}
                    </>
                )}
                <PopUpButtonBox>
                    <PopUpCancelButton
                        onClick={() => onHandleClosePopUp("none")}
                    >
                        취소
                    </PopUpCancelButton>
                    <PopUpButton onClick={handleDeleteUser}>
                        탈퇴하기
                    </PopUpButton>
                </PopUpButtonBox>
            </>
        ),
    };
    return PopUp[item];
};

const UpdateUser = () => {
    const [blur, setBlur] = useState("none");
    const [clickItem, setClickItem] = useState("");
    const [userInfo, setUserInfo] = useState({
        memberId: "",
        email: "",
        nickname: "",
        socialType: "",
    });
    const [isLogin, setIsLogin] = useState(false);

    const { id } = useParams();

    const handleUpdateUserClick = (item) => {
        setBlur("block");
        setClickItem(item);
    };

    const handleClosePopUp = (property) => {
        setBlur(property);
    };

    useEffect(() => {
        async function getUserInfo() {
            const response = await searchUser(id);
            if (!!response) {
                setUserInfo((prevState) => {
                    return {
                        ...prevState,
                        memberId: response.memberId,
                        email: response.email,
                        nickname: response.nickname,
                        socialType: response.socialType,
                    };
                });
                setIsLogin(true);
            } else {
                alert("회원정보가 없습니다. 로그인 후 이용해주세요");
                window.location.replace("/login");
            }
        }
        getUserInfo();
    }, [id]);

    return (
        <>
            {isLogin ? (
                <>
                    <UpdateProfileBlur
                        style={{ display: blur }}
                        onClick={() => handleClosePopUp("none")}
                    />
                    <PopUpBox style={{ display: blur }}>
                        {clickItem === "" ? null : (
                            <PopUpItem
                                item={clickItem}
                                socialType={
                                    userInfo.socialType !== "" &&
                                    userInfo.socialType !== null
                                        ? true
                                        : false
                                }
                                onHandleClosePopUp={handleClosePopUp}
                            ></PopUpItem>
                        )}
                    </PopUpBox>
                    <UpdateProfileBox>
                        <UpdateProfileImg
                            src={
                                process.env.PUBLIC_URL +
                                "/images/profile-sample.jpg"
                            }
                            alt="ProfileImg"
                        />
                        <UpdateProfileEditBtn>
                            <UpdateProfileEditImg
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/profile-edit-img.png"
                                }
                                alt="profile-edit-img"
                            />
                        </UpdateProfileEditBtn>
                    </UpdateProfileBox>
                    <UpdateUserBox>
                        <UpdateUserSpan>아이디</UpdateUserSpan>
                        <UpdateUserSpan>{userInfo.memberId}</UpdateUserSpan>
                    </UpdateUserBox>
                    <UpdateUserHr />
                    <UpdateUserBox>
                        <UpdateUserSpan>이메일</UpdateUserSpan>
                        <UpdateUserDiv
                            onClick={() => handleUpdateUserClick("email")}
                        >
                            <UpdateUserSpan>{userInfo.email}</UpdateUserSpan>
                            <ArrorwRight
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/arrow-right.png"
                                }
                                alt="userInfoEditBtn"
                            />
                        </UpdateUserDiv>
                    </UpdateUserBox>
                    <UpdateUserHr />
                    {userInfo.socialType !== null &&
                    userInfo.socialType !== "" ? null : (
                        <>
                            <UpdateUserBox>
                                <UpdateUserSpan>비밀번호</UpdateUserSpan>
                                <UpdateUserDiv
                                    onClick={() =>
                                        handleUpdateUserClick("password")
                                    }
                                >
                                    <UpdateUserSpan>*********</UpdateUserSpan>
                                    <ArrorwRight
                                        src={
                                            process.env.PUBLIC_URL +
                                            "/images/arrow-right.png"
                                        }
                                        alt="userInfoEditBtn"
                                    />
                                </UpdateUserDiv>
                            </UpdateUserBox>
                            <UpdateUserHr />
                        </>
                    )}
                    <UpdateUserBox>
                        <UpdateUserSpan>닉네임</UpdateUserSpan>
                        <UpdateUserDiv
                            onClick={() => handleUpdateUserClick("nickname")}
                        >
                            <UpdateUserSpan>
                                {userInfo ? userInfo.nickname : null}
                            </UpdateUserSpan>
                            <ArrorwRight
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/arrow-right.png"
                                }
                                alt="userInfoEditBtn"
                            />
                        </UpdateUserDiv>
                    </UpdateUserBox>
                    <UpdateUserHr />
                    <UpdateUserBox>
                        <UpdateUserSpan>회원 탈퇴</UpdateUserSpan>
                        <UpdateUserDiv
                            style={{ width: "80px", justifyContent: "right" }}
                            onClick={() => handleUpdateUserClick("delete")}
                        >
                            <ArrorwRight
                                src={
                                    process.env.PUBLIC_URL +
                                    "/images/arrow-right.png"
                                }
                                alt="userInfoEditBtn"
                            />
                        </UpdateUserDiv>
                    </UpdateUserBox>
                </>
            ) : null}
        </>
    );
};

export default UpdateUser;
