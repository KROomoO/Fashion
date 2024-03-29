import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "tui-color-picker/dist/tui-color-picker.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { uploadImageFile } from "../../services/posts/testS3";
import { savePosts, updatePosts } from "../../services/posts/posts";

import { PostsFormBox } from "../../styles/components/posts/PostsFormBox";
import { PostsInput } from "../../styles/components/posts/PostsInput";
import PostsButton from "../../styles/components/posts/PostsButton";
import { PostsControlBox } from "../../styles/components/posts/PostsControlBox";
import { PostsBackImg } from "../../styles/components/posts/PostsBackImg";

// const CONTENT_KEY = "CONTENT_KEY";

const editorInitialValue = "";

const PostsForm = ({ postData }) => {
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [categoryMenu, setCategoryMenu] = useState([]);

    const { categoryItem } = useOutletContext();

    const editRef = useRef(null);

    const navigate = useNavigate();

    // 임시저장기능
    // const handleDraft = () => {
    //     const markDownContent = editRef.current.getInstance().getMarkdown();
    //     // const htmlContent = editRef.current.getInstance().getHTML();

    //     localStorage.setItem(CONTENT_KEY, markDownContent);
    // };

    // const handleDeleteDraft = () => {
    //     localStorage.removeItem(CONTENT_KEY);

    //     editRef.current.getInstance().setMarkdown("");
    // };

    useEffect(() => {
        if (categoryItem.length !== 0) {
            const copyItem = categoryItem.filter(
                (element) => element.categoryName !== "전체글"
            );
            setCategoryMenu(copyItem);
        }
    }, [categoryItem]);

    const handleSubmitPost = async () => {
        const submitData = {
            title: title,
            image: "testURL",
            // image: imageURL,
            content: editRef.current.getInstance().getMarkdown(),
            categoryId: Number(category),
        };
        if (category === "") {
            alert("카테고리 선택");
        } else if (title === "") {
            alert("타이틀 입력");
        } else if (editRef.current.getInstance().getMarkdown().length <= 0) {
            alert("본문 입력");
        } else {
            if (postData && Object.keys(postData).length !== 0) {
                await updatePosts({
                    ...submitData,
                    post_id: postData.post_id,
                    category_id: category,
                });
            } else {
                const response = await savePosts(submitData);
                console.log(response);
            }
        }
    };

    useEffect(() => {
        if (postData && Object.keys(postData).length !== 0) {
            setCategory(postData.category_id);
            setTitle(postData.title);
            editRef.current.getInstance().setMarkdown(postData.content);
        }
    }, [postData]);

    return (
        <>
            <PostsControlBox>
                <PostsBackImg
                    src={process.env.PUBLIC_URL + "/images/arrow-right.png"}
                    alt="navigateBack"
                    onClick={() => navigate(-1)}
                />
                <PostsButton onClick={handleSubmitPost}>등록하기</PostsButton>
            </PostsControlBox>

            <PostsFormBox>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: "860px",
                    }}
                >
                    <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
                        <InputLabel id="select-category">게시판</InputLabel>
                        <Select
                            labelId="select-category"
                            id="select-category"
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                            sx={{
                                boxShadow: "none",
                                ".MuiOutlinedInput-notchedOutline": {
                                    border: 0,
                                },
                            }}
                        >
                            {categoryMenu.map((item, index) => {
                                return (
                                    <MenuItem
                                        key={index}
                                        value={item.categoryId}
                                    >
                                        {item.categoryName}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <PostsInput
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <Editor
                    initialValue={editorInitialValue}
                    ref={editRef}
                    previewStyle="tab"
                    height="600px"
                    initialEditType="wysiwyg"
                    language="ko-KR"
                    useCommandShortcut={false}
                    usageStatistics={false}
                    plugins={[colorSyntax]}
                    hooks={{
                        addImageBlobHook: async (blob, callback) => {
                            console.log(blob);
                            console.log(blob.size);
                            const file = new File(
                                [blob],
                                encodeURI(blob.name),
                                {
                                    type: blob.type,
                                }
                            );
                            console.log(file);
                            const responseURL = await uploadImageFile(file);
                            if (imageURL === "") {
                                setImageURL(responseURL);
                            }
                            console.log(responseURL);
                            callback(responseURL);
                        },
                    }}
                />

                {/* <button onClick={handleDraft}>임시저장</button>
                <button onClick={handleDeleteDraft}>임시저장제거</button> */}
            </PostsFormBox>
        </>
    );
};

export default PostsForm;
