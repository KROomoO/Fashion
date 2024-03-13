import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./routes/pages/Main";
import Login from "./routes/pages/Login";
import SignUp from "./routes/pages/SignUp";
import MyPage from "./routes/pages/MyPage";
import NotFound from "./routes/pages/NotFound";
import Result from "./routes/pages/Result";
import KakaoRedirect from "./routes/auth/KakaoRedirect";
import NaverRedirect from "./routes/auth/NaverRedirect";
import GoogleRedirect from "./routes/auth/GoogleRedirect";
import SocialSignUp from "./routes/auth/SocialSignUp";
import PostsCreate from "./routes/pages/PostsCreate";
import PostsEdit from "./routes/pages/PostsEdit";
import PostsList from "./routes/pages/PostsList";
import PostsView from "./routes/pages/PostsView";
import PostsSearchResult from "./routes/pages/PostsSearchResult";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
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
                    <Route path="/members/addinfo" element={<SocialSignUp />} />
                    <Route path="/members/:id" element={<MyPage />} />
                    <Route path="/signup/result" element={<Result />} />
                    <Route path="/posts/create" element={<PostsCreate />} />
                    <Route
                        path="/posts/edit/:post_id"
                        element={<PostsEdit />}
                    />
                    <Route path="/posts/list" element={<PostsList />} />
                    <Route path="/posts/:post_id" element={<PostsView />} />
                    <Route
                        path="/posts/search"
                        element={<PostsSearchResult />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
