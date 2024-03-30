export const KakaoLogin = () => {
    const rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    return (window.location.href = kakaoURL);
};

export const NaverLogin = () => {
    const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_NAVER_REDIRECT_URI;
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;

    console.log(naverURL);

    return (window.location.href = naverURL);
};

export const GoogleLogin = () => {
    const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    const scope = process.env.REACT_APP_GOOGLE_SCOPE;
    const accessType = process.env.REACT_APP_GOOGLE_ACCESSTYPE;
    const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code`;

    return (window.location.href = googleURL);
};
