import styled from "styled-components";
import { useForm, useWatch } from "react-hook-form";

import { Form as SignUpForm } from "../../styles/components/auth/Form";
import { Fieldset as SignUpFieldset } from "../../styles/components/auth/Fieldset";
import { Input as SignUpInput } from "../../styles/components/auth/Input";
import { Button as SignUpButton } from "../../styles/components/auth/Button";
import { ErrorMessage as SignUpErrorMessage } from "../../styles/components/auth/ErrorMessage";
import { SuccessMessage as SignUpSuccessMessage } from "../../styles/components/auth/SuccessMessage";
import { Hint as SignUpHint } from "../../styles/components/auth/Hint";
import { P as SignUpP } from "../../styles/components/auth/P";
import { SubSpan as SignUpSubSpan } from "../../styles/components/auth/SubSpan";

import {
    submitSignUp,
    checkMemberId,
    checkNickname,
} from "../../services/auth/signUp";
import { useEffect, useState } from "react";

import validationPatterns from "../../utils/validationPatterns";

const PasswordInput = styled(SignUpInput)`
    width: 400px;
`;

const PasswordConfirmInput = styled(SignUpInput)`
    margin-top: 8px;
    width: 400px;
`;

const EmailInput = styled(SignUpInput)`
    width: 400px;
`;

const SubmitButton = styled(SignUpButton)`
    width: 400px;
    padding: 13px, 175px;
    margin: 0;
    text-align: center;
`;

const AuthSignUpForm = () => {
    const { register, handleSubmit, control, getValues } = useForm();
    const [duplicateMemberId, setDuplicateMemberId] = useState("");
    const [duplicateNickname, setDuplicateNickname] = useState("");
    const [onFocusInput, setOnFocusInput] = useState("");
    const [regexPassword, setRegexPassword] = useState(false);
    const [regexPasswordConfirm, setRegexPasswordConfirm] = useState(false);

    const handleSignUpSubmit = async (data) => {
        if (
            duplicateMemberId === "SUCCESS" &&
            duplicateNickname === "SUCCESS"
        ) {
            const submitData = {
                memberId: data.memberId,
                email: data.email,
                memberIdChecked: duplicateMemberId === "SUCCESS" ? true : false,
                password: data.password,
                confirmPassword: data.passwordConfirm,
                nickname: data.nickname,
                nicknameChecked: duplicateNickname === "SUCCESS" ? true : false,
            };
            await submitSignUp(submitData);
        } else {
            alert("아이디 혹은 닉네임 중복 확인을 진행해주세요.");
        }
    };

    const handleSignUpCheckMemberId = async () => {
        const result = await checkMemberId(getValues("memberId"));
        setDuplicateMemberId(result);
    };

    const handleSignUpCheckNickname = async () => {
        const result = await checkNickname(getValues("nickname"));
        setDuplicateNickname(result);
    };

    const inputData = useWatch({
        control,
        name: onFocusInput,
    });

    useEffect(() => {
        switch (onFocusInput) {
            case "memberId":
                setDuplicateMemberId("");
                break;
            case "password":
                validationPatterns.passwordRegex.test(inputData)
                    ? setRegexPassword(true)
                    : setRegexPassword(false);
                break;
            case "passwordConfirm":
                getValues("password") === inputData
                    ? setRegexPasswordConfirm(true)
                    : setRegexPasswordConfirm(false);
                break;
            case "nickname":
                setDuplicateNickname("");
                break;
            default:
                return;
        }
    }, [inputData, onFocusInput, getValues]);

    return (
        <>
            <SignUpForm onSubmit={handleSubmit(handleSignUpSubmit)}>
                <SignUpFieldset>
                    <SignUpP>아이디</SignUpP>
                    <SignUpInput
                        type="text"
                        {...register("memberId", {
                            required: true,
                            minLength: 4,
                            maxLength: 15,
                            pattern: {
                                value: validationPatterns.memberIdRegex,
                            },
                        })}
                        onFocus={(item) => setOnFocusInput(item.target.name)}
                        placeholder="아이디를 입력해주세요"
                        style={{
                            borderColor:
                                duplicateMemberId === "FAIL"
                                    ? "#ff5a5a"
                                    : "#d9d9d9",
                        }}
                    />
                    <SignUpButton
                        type="button"
                        onClick={handleSignUpCheckMemberId}
                    >
                        중복 확인
                    </SignUpButton>
                    <input
                        type="hidden"
                        {...register("memberIdAvailable")}
                        value={duplicateMemberId}
                    />
                    {onFocusInput !== "memberId" ? null : duplicateMemberId ===
                      "FAIL" ? (
                        <SignUpErrorMessage>
                            이미 가입된 아이디입니다.
                        </SignUpErrorMessage>
                    ) : duplicateMemberId === "SUCCESS" ? (
                        <SignUpSuccessMessage>
                            사용 가능한 아이디입니다.
                        </SignUpSuccessMessage>
                    ) : null}
                </SignUpFieldset>
                <SignUpFieldset>
                    <SignUpP>비밀번호</SignUpP>
                    <PasswordInput
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                            maxLength: 20,
                            pattern: {
                                value: validationPatterns.passwordRegex,
                            },
                        })}
                        placeholder="비밀번호를 입력해주세요"
                        onFocus={(item) => setOnFocusInput(item.target.name)}
                        style={{
                            borderColor:
                                onFocusInput === "password"
                                    ? regexPassword
                                        ? "#d9d9d9"
                                        : "#ff5a5a"
                                    : "#d9d9d9",
                        }}
                    />
                    {onFocusInput !==
                    "password" ? null : regexPassword ? null : (
                        <SignUpErrorMessage>
                            올바르지 않은 비밀번호 형식입니다.
                        </SignUpErrorMessage>
                    )}

                    <PasswordConfirmInput
                        type="password"
                        {...register("passwordConfirm", {
                            required: true,
                            minLength: 8,
                            maxLength: 20,
                        })}
                        placeholder="비밀번호를 다시 입력해주세요"
                        onFocus={(item) => setOnFocusInput(item.target.name)}
                        style={{
                            borderColor:
                                onFocusInput === "passwordConfirm"
                                    ? regexPasswordConfirm
                                        ? "#d9d9d9"
                                        : "#ff5a5a"
                                    : "#d9d9d9",
                        }}
                    />
                    {onFocusInput !==
                    "passwordConfirm" ? null : regexPasswordConfirm ? null : (
                        <SignUpErrorMessage>
                            비밀번호가 일치하지 않습니다.
                        </SignUpErrorMessage>
                    )}

                    <SignUpHint>
                        영문 대소문자, 특수문자, 숫자 중 3가지 이상으로 조합하여
                        8~20자로 입력해주세요.
                    </SignUpHint>
                </SignUpFieldset>
                <SignUpFieldset>
                    <SignUpP>닉네임</SignUpP>
                    <SignUpInput
                        type="text"
                        {...register("nickname", {
                            required: true,
                            minLength: 2,
                            maxLength: 16,
                            pattern: {
                                value: validationPatterns.nicknameRegex,
                            },
                        })}
                        placeholder="닉네임을 입력해주세요"
                        onFocus={(item) => setOnFocusInput(item.target.name)}
                        style={{
                            borderColor:
                                duplicateNickname === "FAIL"
                                    ? "#ff5a5a"
                                    : "#d9d9d9",
                        }}
                    />
                    <SignUpButton
                        type="button"
                        onClick={handleSignUpCheckNickname}
                    >
                        중복 확인
                    </SignUpButton>
                    <input
                        type="hidden"
                        {...register("nicknameAvailable")}
                        value={duplicateNickname}
                    />
                    {onFocusInput !== "nickname" ? null : duplicateNickname ===
                      "FAIL" ? (
                        <SignUpErrorMessage>
                            이미 가입된 닉네임입니다.
                        </SignUpErrorMessage>
                    ) : duplicateNickname === "SUCCESS" ? (
                        <SignUpSuccessMessage>
                            사용 가능한 닉네임입니다.
                        </SignUpSuccessMessage>
                    ) : null}
                    <SignUpHint>
                        한글, 영문(대소문자), 숫자를 조합하여 2~16자로
                        입력해주세요.
                    </SignUpHint>
                </SignUpFieldset>
                <SignUpFieldset>
                    <SignUpP>
                        이메일<SignUpSubSpan>&nbsp;(선택)</SignUpSubSpan>
                    </SignUpP>
                    <EmailInput
                        type="email"
                        {...register("email", { minLength: 6, maxLength: 35 })}
                        placeholder="이메일을 입력해주세요"
                    />
                </SignUpFieldset>
                <SubmitButton type="submit">가입하기</SubmitButton>
            </SignUpForm>
        </>
    );
};

export default AuthSignUpForm;
