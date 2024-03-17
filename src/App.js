import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Main from "./routes/pages/Main";
import Login from "./routes/pages/Login";
import SignUp from "./routes/pages/SignUp";
import MyPage from "./routes/pages/MyPage";
import NotFound from "./routes/pages/NotFound";
import KakaoRedirect from "./routes/auth/KakaoRedirect";
import NaverRedirect from "./routes/auth/NaverRedirect";
import GoogleRedirect from "./routes/auth/GoogleRedirect";
import SocialSignUp from "./routes/auth/SocialSignUp";
import CreatePost from "./routes/pages/PostsCreate";
import EditPost from "./routes/pages/PostsEdit";
import PostsList from "./routes/pages/PostsList";
import ViewPost from "./routes/pages/PostsView";
import PostsSearchResult from "./routes/pages/PostsSearchResult";
import PrivateRouteGroup from "./routes/auth/PrivateRouteGroup";
import SideBar from "./components/common/SideBar";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<Header />}>
                        <Route element={<SideBar />}>
                            <Route path="/" element={<Main />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />

                            <Route
                                path="/members/addinfo"
                                element={<SocialSignUp />}
                            />

                            <Route path="/posts/list" element={<PostsList />} />
                            <Route path="/posts" element={<ViewPost />} />
                            <Route
                                path="/posts/search"
                                element={<PostsSearchResult />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                        <Route element={<PrivateRouteGroup />}>
                            <Route path="/members/:id" element={<MyPage />} />
                            <Route
                                path="/posts/create"
                                element={<CreatePost />}
                            />
                            <Route path="/posts/edit" element={<EditPost />} />
                        </Route>
                    </Route>
                    <Route
                        path="/oauth/redirected/kakao"
                        element={<KakaoRedirect />}
                    />
                    <Route
                        path="/oauth/redirected/naver"
                        element={<NaverRedirect />}
                    />
                    <Route
                        path="/oauth/redirected/google"
                        element={<GoogleRedirect />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
